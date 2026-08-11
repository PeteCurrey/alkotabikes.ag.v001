/**
 * ALKOTA CYCLES — CONFIGURATOR VALIDATION & PUBLISH SAFETY
 * src/lib/configurator/validation.ts
 */

import { ConfiguratorVersionSnapshot, ConfiguratorRule } from './types';
import { evaluateConfiguration, RuleCycleError } from './engine';

export interface ValidationIssue {
  type: 'error' | 'warning';
  code: string;
  message: string;
  groupKey?: string;
  optionKey?: string;
  ruleId?: string;
}

export interface PublishValidationReport {
  isValidForPublish: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  combinationCount: number;
}

/**
 * Runs full authoring safety validation on a draft configurator version snapshot.
 * Blocks publishing if any ERRORS exist.
 */
export function validateVersionForPublish(
  snapshot: ConfiguratorVersionSnapshot
): PublishValidationReport {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  // 1. Check default configuration validity & cycle detection
  try {
    const result = evaluateConfiguration(snapshot, {}, 'GB');
    if (!result.isValid) {
      errors.push({
        type: 'error',
        code: 'DEFAULT_CONFIG_INVALID',
        message: `Default configuration is invalid: ${result.violations.map((v) => v.message).join('; ')}`,
      });
    }
  } catch (err) {
    if (err instanceof RuleCycleError) {
      errors.push({
        type: 'error',
        code: 'RULE_CYCLE_DETECTED',
        message: err.message,
      });
    } else {
      errors.push({
        type: 'error',
        code: 'ENGINE_EVALUATION_ERROR',
        message: `Engine failed during evaluation: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  // 2. Check for Contradictory Rules (A requires B and A excludes B)
  const ruleMap = new Map<string, ConfiguratorRule>();
  for (const rule of snapshot.rules) {
    ruleMap.set(rule.id, rule);
  }

  for (let i = 0; i < snapshot.rules.length; i++) {
    for (let j = i + 1; j < snapshot.rules.length; j++) {
      const r1 = snapshot.rules[i];
      const r2 = snapshot.rules[j];

      if (
        (r1.rule_type === 'requires' && r2.rule_type === 'excludes') ||
        (r1.rule_type === 'excludes' && r2.rule_type === 'requires')
      ) {
        const sameTrigger = JSON.stringify(r1.trigger) === JSON.stringify(r2.trigger);
        const sameEffect = JSON.stringify(r1.effect) === JSON.stringify(r2.effect);

        if (sameTrigger && sameEffect) {
          errors.push({
            type: 'error',
            code: 'CONTRADICTORY_RULES',
            message: `Contradictory rules detected: Rule '${r1.name}' (${r1.id}) and Rule '${r2.name}' (${r2.id}) have identical triggers and conflicting effect types.`,
            ruleId: r1.id,
          });
        }
      }
    }
  }

  // 3. Group & Option Level Checks
  for (const group of snapshot.groups) {
    if (!group.is_active) continue;

    if (group.options.length === 1) {
      warnings.push({
        type: 'warning',
        code: 'SINGLE_OPTION_GROUP',
        message: `Group '${group.label}' (${group.key}) contains only 1 option. Consider merging or eliminating single-option groups.`,
        groupKey: group.key,
      });
    }

    let selectableInGB = 0;
    let selectableInUS = 0;
    const deltasGB: number[] = [];
    const deltasUS: number[] = [];

    for (const option of group.options) {
      if (!option.is_active) continue;

      if (option.markets.includes('GB')) selectableInGB++;
      if (option.markets.includes('US')) selectableInUS++;

      // Check prices for enabled markets of option
      if (option.markets.includes("GB") && !option.prices["GBP"]) {
        errors.push({
          type: "error",
          code: "MISSING_PRICE_ROW",
          message: `Option '${option.label}' in group '${group.label}' is available in market GB but missing price row for currency GBP.`,
          groupKey: group.key,
          optionKey: option.key,
        });
      }

      if (option.markets.includes("US") && !option.prices["USD"]) {
        errors.push({
          type: "error",
          code: "MISSING_PRICE_ROW",
          message: `Option '${option.label}' in group '${group.label}' is available in market US but missing price row for currency USD.`,
          groupKey: group.key,
          optionKey: option.key,
        });
      }

      // Check affects_visual layer media
      if (group.affects_visual && !option.layer_media_id) {
        errors.push({
          type: 'error',
          code: 'MISSING_LAYER_MEDIA',
          message: `Group '${group.label}' has affects_visual = true, but option '${option.label}' is missing layer_media_id.`,
          groupKey: group.key,
          optionKey: option.key,
        });
      }

      // Warnings: weight source estimated/unknown
      if (option.weight_source === 'estimated' || option.weight_source === 'unknown') {
        warnings.push({
          type: 'warning',
          code: 'UNVERIFIED_WEIGHT_SOURCE',
          message: `Option '${option.label}' (${group.label}) has weight_source '${option.weight_source}'. Build total weight will be hidden when selected.`,
          groupKey: group.key,
          optionKey: option.key,
        });
      }

      // Warnings: missing thumbnail media
      if (!option.media_id) {
        warnings.push({
          type: 'warning',
          code: 'MISSING_OPTION_MEDIA',
          message: `Option '${option.label}' (${group.label}) has no thumbnail media_id assigned.`,
          groupKey: group.key,
          optionKey: option.key,
        });
      }

      if (option.prices['GBP']) deltasGB.push(option.prices['GBP'].delta_minor);
      if (option.prices['USD']) deltasUS.push(option.prices['USD'].delta_minor);
    }

    // Check required group has options in enabled market
    if (group.is_required) {
      if (snapshot.markets.includes('GB') && selectableInGB === 0) {
        errors.push({
          type: 'error',
          code: 'REQUIRED_GROUP_EMPTY',
          message: `Required group '${group.label}' has 0 selectable options in market GB.`,
          groupKey: group.key,
        });
      }
      if (snapshot.markets.includes('US') && selectableInUS === 0) {
        errors.push({
          type: 'error',
          code: 'REQUIRED_GROUP_EMPTY',
          message: `Required group '${group.label}' has 0 selectable options in market US.`,
          groupKey: group.key,
        });
      }
    }

    // Check zero price deltas on non-zero group
    const nonZeroDeltasGB = deltasGB.filter((d) => d !== 0);
    if (nonZeroDeltasGB.length > 0 && deltasGB.includes(0)) {
      const zeroPriceOpts = group.options.filter((o) => o.prices['GBP']?.delta_minor === 0);
      for (const zOpt of zeroPriceOpts) {
        warnings.push({
          type: 'warning',
          code: 'ZERO_PRICE_DELTA',
          message: `Option '${zOpt.label}' in group '${group.label}' has £0 price delta while other options in group carry deltas.`,
          groupKey: group.key,
          optionKey: zOpt.key,
        });
      }
    }
  }

  // 4. Calculate total valid combinations count
  const combinationCount = computeTotalCombinations(snapshot);

  return {
    isValidForPublish: errors.length === 0,
    errors,
    warnings,
    combinationCount,
  };
}

/**
 * Computes raw Cartesian product combination count of active options across groups.
 */
export function computeTotalCombinations(snapshot: ConfiguratorVersionSnapshot): number {
  let count = 1;
  for (const group of snapshot.groups) {
    if (!group.is_active) continue;
    const activeOpts = group.options.filter((o) => o.is_active);
    if (activeOpts.length > 0) {
      count *= activeOpts.length;
    }
  }
  return count;
}
