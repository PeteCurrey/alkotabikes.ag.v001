/**
 * ALKOTA CYCLES — CONFIGURATOR RULES ENGINE
 * src/lib/configurator/engine.ts
 *
 * PURE FUNCTION. ZERO I/O. ZERO FRAMEWORK IMPORTS.
 * Identical function runs on client for interactive UI and on server as sole authority.
 */

import {
  ConfiguratorVersionSnapshot,
  EngineResult,
  Violation,
  ConfiguratorRule,
} from './types';

export class RuleCycleError extends Error {
  public oscillatingRuleIds: string[];

  constructor(oscillatingRuleIds: string[]) {
    super(
      `Rule evaluation failed to converge after 20 iterations (oscillating rules: ${oscillatingRuleIds.join(
        ', '
      )})`
    );
    this.name = 'RuleCycleError';
    this.oscillatingRuleIds = oscillatingRuleIds;
  }
}

/**
 * Main evaluation entry point for the Alkota Configurator.
 *
 * @param snapshot Frozen version snapshot containing tree, rules, and prices.
 * @param userSelections Current user selections map: groupKey -> optionKey.
 * @param market Target market identifier (e.g. 'GB' or 'US').
 * @param lockedKeys Set of groupKeys explicitly chosen/locked by the user.
 */
export function evaluateConfiguration(
  snapshot: ConfiguratorVersionSnapshot,
  userSelections: Record<string, string>,
  market: string = 'GB',
  lockedKeys: string[] = []
): EngineResult {
  const currency = snapshot.currency_defaults[market] || (market === 'GB' ? 'GBP' : 'USD');
  const taxInclusive = currency === 'GBP';

  // 1. Initialise Working State
  const resolvedSelections: Record<string, string> = { ...userSelections };
  const lockedSet = new Set<string>(lockedKeys);
  const availability: Record<string, 'available' | 'disabled' | 'unavailable_in_market'> = {};
  const violations: Violation[] = [];
  const ruleTrace: Array<{
    iteration: number;
    ruleId: string;
    ruleName: string;
    ruleType: ConfiguratorRule['rule_type'];
    action: string;
  }> = [];

  // Build lookup maps for fast access
  const groupMap = new Map(snapshot.groups.map((g) => [g.key, g]));
  const optionMap = new Map<string, { groupKey: string; optionKey: string; optionId: string }>();

  // Mark market availability for options
  for (const group of snapshot.groups) {
    if (!group.is_active) continue;
    for (const opt of group.options) {
      const optKey = `${group.key}:${opt.key}`;
      optionMap.set(opt.id, { groupKey: group.key, optionKey: opt.key, optionId: opt.id });
      optionMap.set(optKey, { groupKey: group.key, optionKey: opt.key, optionId: opt.id });

      if (!opt.is_active || opt.availability === 'discontinued') {
        availability[opt.id] = 'disabled';
        availability[optKey] = 'disabled';
      } else if (!opt.markets.includes(market)) {
        availability[opt.id] = 'unavailable_in_market';
        availability[optKey] = 'unavailable_in_market';
      } else {
        availability[opt.id] = 'available';
        availability[optKey] = 'available';
      }
    }
  }

  // Set default selections for groups where user hasn't explicitly selected
  for (const group of snapshot.groups) {
    if (!group.is_active) continue;
    if (!resolvedSelections[group.key]) {
      const defaultOpt = group.options.find(
        (o) => o.is_default && availability[o.id] === 'available'
      );
      if (defaultOpt) {
        resolvedSelections[group.key] = defaultOpt.key;
      } else {
        const firstAvail = group.options.find((o) => availability[o.id] === 'available');
        if (firstAvail) {
          resolvedSelections[group.key] = firstAvail.key;
        }
      }
    }
  }

  // 2. Sort Active Rules deterministically by Priority (ascending), then Rule ID
  const activeRules = [...snapshot.rules]
    .filter((r) => r.is_active)
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.id.localeCompare(b.id);
    });

  // 3. Fixpoint Iteration Loop (Max 20 Iterations)
  let iteration = 0;
  const MAX_ITERATIONS = 20;
  let stateChanged = true;
  const stateHistory: string[] = [];

  while (stateChanged && iteration < MAX_ITERATIONS) {
    iteration++;
    stateChanged = false;

    // Serialize current state for cycle detection
    const currentStateKey = JSON.stringify(resolvedSelections) + '|' + JSON.stringify(availability);
    stateHistory.push(currentStateKey);

    for (const rule of activeRules) {
      // Check if rule trigger matches current selection/market context
      const triggerFired = isTriggerMatched(rule.trigger, resolvedSelections, market, groupMap);
      if (!triggerFired) continue;

      // Apply rule effect
      switch (rule.rule_type) {
        case 'excludes': {
          const effectOptionKeys = resolveEffectOptions(rule.effect, snapshot);
          for (const target of effectOptionKeys) {
            const optKey = `${target.groupKey}:${target.optionKey}`;
            if (availability[optKey] !== 'disabled') {
              availability[optKey] = 'disabled';
              availability[target.optionId] = 'disabled';
              stateChanged = true;

              ruleTrace.push({
                iteration,
                ruleId: rule.id,
                ruleName: rule.name,
                ruleType: rule.rule_type,
                action: `Disabled ${target.groupKey}:${target.optionKey} (${rule.message})`,
              });

              // If currently selected option gets disabled
              if (resolvedSelections[target.groupKey] === target.optionKey) {
                if (lockedSet.has(target.groupKey)) {
                  violations.push({
                    ruleId: rule.id,
                    ruleType: rule.rule_type,
                    message: rule.message,
                    groupKey: target.groupKey,
                    optionKey: target.optionKey,
                    lockedConflict: true,
                  });
                } else {
                  // Find next available option in group
                  const group = groupMap.get(target.groupKey);
                  const fallbackOpt = group?.options.find(
                    (o) => o.key !== target.optionKey && availability[o.id] === 'available'
                  );
                  if (fallbackOpt) {
                    resolvedSelections[target.groupKey] = fallbackOpt.key;
                  } else {
                    delete resolvedSelections[target.groupKey];
                  }
                }
              }
            }
          }
          break;
        }

        case 'requires': {
          const effectOptionKeys = resolveEffectOptions(rule.effect, snapshot);
          for (const target of effectOptionKeys) {
            const currentSel = resolvedSelections[target.groupKey];
            if (currentSel !== target.optionKey) {
              const effectGroupHasRequired = effectOptionKeys.some(
                (e) => resolvedSelections[e.groupKey] === e.optionKey
              );

              if (!effectGroupHasRequired) {
                violations.push({
                  ruleId: rule.id,
                  ruleType: rule.rule_type,
                  message: rule.message,
                  groupKey: target.groupKey,
                  optionKey: target.optionKey,
                  lockedConflict: lockedSet.has(target.groupKey),
                });
              }
            }
          }
          break;
        }

        case 'restricts_to': {
          if (rule.effect.group_key) {
            const allowedKeys = new Set(rule.effect.option_keys || []);
            const group = groupMap.get(rule.effect.group_key);
            if (group) {
              for (const opt of group.options) {
                const optKey = `${group.key}:${opt.key}`;
                if (!allowedKeys.has(opt.key)) {
                  if (availability[optKey] !== 'disabled') {
                    availability[optKey] = 'disabled';
                    availability[opt.id] = 'disabled';
                    stateChanged = true;
                    ruleTrace.push({
                      iteration,
                      ruleId: rule.id,
                      ruleName: rule.name,
                      ruleType: rule.rule_type,
                      action: `Restricted group ${group.key}: disabled ${opt.key}`,
                    });
                  }
                }
              }
            }
          }
          break;
        }

        case 'auto_select': {
          if (rule.effect.group_key && rule.effect.value) {
            const groupKey = rule.effect.group_key;
            const targetOptionKey = String(rule.effect.value);

            if (resolvedSelections[groupKey] !== targetOptionKey) {
              if (lockedSet.has(groupKey)) {
                // User lock rule: do NOT silently overwrite locked selection
                violations.push({
                  ruleId: rule.id,
                  ruleType: rule.rule_type,
                  message: rule.message,
                  groupKey,
                  optionKey: targetOptionKey,
                  lockedConflict: true,
                });
              } else {
                resolvedSelections[groupKey] = targetOptionKey;
                stateChanged = true;
                ruleTrace.push({
                  iteration,
                  ruleId: rule.id,
                  ruleName: rule.name,
                  ruleType: rule.rule_type,
                  action: `Auto-selected ${groupKey}:${targetOptionKey}`,
                });
              }
            }
          }
          break;
        }

        case 'sets_default': {
          if (rule.effect.group_key && rule.effect.value) {
            const groupKey = rule.effect.group_key;
            const targetOptionKey = String(rule.effect.value);
            // Only set default if user has NOT explicitly locked this group
            if (!lockedSet.has(groupKey) && resolvedSelections[groupKey] !== targetOptionKey) {
              resolvedSelections[groupKey] = targetOptionKey;
              stateChanged = true;
              ruleTrace.push({
                iteration,
                ruleId: rule.id,
                ruleName: rule.name,
                ruleType: rule.rule_type,
                action: `Updated default for ${groupKey}:${targetOptionKey}`,
              });
            }
          }
          break;
        }

        case 'market_only': {
          const effectOptionKeys = resolveEffectOptions(rule.effect, snapshot);
          for (const target of effectOptionKeys) {
            const optKey = `${target.groupKey}:${target.optionKey}`;
            const allowedMarkets = rule.trigger.markets || [];
            if (allowedMarkets.length > 0 && !allowedMarkets.includes(market)) {
              if (availability[optKey] !== 'unavailable_in_market') {
                availability[optKey] = 'unavailable_in_market';
                availability[target.optionId] = 'unavailable_in_market';
                stateChanged = true;
                ruleTrace.push({
                  iteration,
                  ruleId: rule.id,
                  ruleName: rule.name,
                  ruleType: rule.rule_type,
                  action: `Market disabled ${target.groupKey}:${target.optionKey} for market ${market}`,
                });
              }
            }
          }
          break;
        }
      }
    }
  }

  // 4. Cycle Detection Check
  if (iteration >= MAX_ITERATIONS && stateChanged) {
    const oscillatingIds = activeRules.map((r) => r.id);
    throw new RuleCycleError(oscillatingIds);
  }

  // 5. Calculate Weight (Fabrication Trap Protection)
  let totalGrams: number | null = 0;
  let weightReason: string | null = null;

  for (const group of snapshot.groups) {
    if (!group.is_active) continue;
    const selectedKey = resolvedSelections[group.key];
    if (!selectedKey) continue;

    const option = group.options.find((o) => o.key === selectedKey);
    if (!option) continue;

    const isVerifiedWeight =
      option.weight_grams !== null &&
      (option.weight_source === 'manufacturer_published' || option.weight_source === 'measured');

    if (!isVerifiedWeight || option.weight_grams === null) {
      totalGrams = null;
      weightReason = `Weight hidden: option '${option.label}' (${group.label}) has unverified weight source ('${option.weight_source}')`;
      break;
    } else {
      if (totalGrams !== null) {
        totalGrams += option.weight_grams;
      }
    }
  }

  // 6. Calculate Pricing
  let subtotalMinor = snapshot.base_price_minor || 0;
  const deltas: EngineResult['pricing']['deltas'] = [];

  for (const group of snapshot.groups) {
    if (!group.is_active) continue;
    const selectedKey = resolvedSelections[group.key];
    if (!selectedKey) continue;

    const option = group.options.find((o) => o.key === selectedKey);
    if (!option) continue;

    const priceRow = option.prices[currency];
    const deltaMinor = priceRow ? priceRow.delta_minor : 0;
    subtotalMinor += deltaMinor;

    if (deltaMinor !== 0) {
      deltas.push({
        groupKey: group.key,
        optionKey: option.key,
        deltaMinor,
        label: `${group.label}: ${option.label}`,
      });
    }
  }

  // 7. Check Completion & Validation
  let isComplete = true;
  for (const group of snapshot.groups) {
    if (group.is_active && group.is_required && !resolvedSelections[group.key]) {
      isComplete = false;
      violations.push({
        ruleId: 'required_group_missing',
        ruleType: 'requires',
        message: `Required option group '${group.label}' has no selection.`,
        groupKey: group.key,
      });
    }
  }

  const isValid = violations.length === 0;

  return {
    resolvedSelections,
    availability,
    violations,
    pricing: {
      subtotalMinor,
      deltas,
      currency,
      taxInclusive,
    },
    weight: {
      totalGrams,
      reason: weightReason,
    },
    isValid,
    isComplete,
    ruleTrace,
  };
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function isTriggerMatched(
  trigger: ConfiguratorRule['trigger'],
  selections: Record<string, string>,
  market: string,
  groupMap: Map<string, any>
): boolean {
  if (trigger.markets && trigger.markets.length > 0) {
    if (!trigger.markets.includes(market)) return false;
  }

  if (trigger.option_keys && trigger.option_keys.length > 0) {
    for (const rawKey of trigger.option_keys) {
      const parts = rawKey.split(':');
      if (parts.length === 2) {
        const [groupKey, optKey] = parts;
        if (selections[groupKey] !== optKey) return false;
      }
    }
  }

  if (trigger.group_keys && trigger.group_keys.length > 0) {
    for (const groupKey of trigger.group_keys) {
      if (!selections[groupKey]) return false;
    }
  }

  return true;
}

function resolveEffectOptions(
  effect: ConfiguratorRule['effect'],
  snapshot: ConfiguratorVersionSnapshot
): Array<{ groupKey: string; optionKey: string; optionId: string }> {
  const results: Array<{ groupKey: string; optionKey: string; optionId: string }> = [];

  if (effect.option_keys && effect.option_keys.length > 0) {
    for (const rawKey of effect.option_keys) {
      const parts = rawKey.split(':');
      if (parts.length === 2) {
        const [groupKey, optionKey] = parts;
        const group = snapshot.groups.find((g) => g.key === groupKey);
        const option = group?.options.find((o) => o.key === optionKey);
        if (group && option) {
          results.push({ groupKey, optionKey, optionId: option.id });
        }
      }
    }
  }

  if (effect.group_key && effect.value) {
    const groupKey = effect.group_key;
    const optionKey = String(effect.value);
    const group = snapshot.groups.find((g) => g.key === groupKey);
    const option = group?.options.find((o) => o.key === optionKey);
    if (group && option) {
      results.push({ groupKey, optionKey, optionId: option.id });
    }
  }

  return results;
}
