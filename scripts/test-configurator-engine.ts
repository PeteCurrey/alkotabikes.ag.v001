#!/usr/bin/env tsx
/**
 * ALKOTA CYCLES — CONFIGURATOR ENGINE EXHAUSTIVE TEST SUITE
 * scripts/test-configurator-engine.ts
 */

import { evaluateConfiguration, RuleCycleError } from "../src/lib/configurator/engine";
import { ConfiguratorVersionSnapshot } from "../src/lib/configurator/types";
import { validateVersionForPublish } from "../src/lib/configurator/validation";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}${detail ? ` — ${detail}` : ''}`);
    failed++;
  }
}

// ─── Test Fixture Helper ──────────────────────────────────────────────────────

function createMockSnapshot(): ConfiguratorVersionSnapshot {
  return {
    id: "ver-1",
    model_id: "mod-1",
    model_slug: "project-01",
    model_name: "Project 01",
    version: 1,
    base_price_minor: 450000, // £4,500.00
    currency_defaults: { GB: "GBP", US: "USD" },
    markets: ["GB", "US"],
    groups: [
      {
        id: "g-frame",
        key: "frame_size",
        label: "Frame Size",
        group_type: "single_select",
        is_required: true,
        min_select: 1,
        max_select: 1,
        step_position: 1,
        affects_visual: false,
        is_active: true,
        options: [
          {
            id: "opt-s",
            key: "small",
            label: "Small (S1)",
            weight_grams: 3100,
            weight_source: "manufacturer_published",
            is_default: true,
            is_active: true,
            availability: "available",
            markets: ["GB", "US"],
            sort_position: 1,
            prices: {
              GBP: { currency: "GBP", delta_minor: 0, tax_inclusive: true },
              USD: { currency: "USD", delta_minor: 0, tax_inclusive: false },
            },
          },
          {
            id: "opt-m",
            key: "medium",
            label: "Medium (S2)",
            weight_grams: 3200,
            weight_source: "measured",
            is_default: false,
            is_active: true,
            availability: "available",
            markets: ["GB", "US"],
            sort_position: 2,
            prices: {
              GBP: { currency: "GBP", delta_minor: 0, tax_inclusive: true },
              USD: { currency: "USD", delta_minor: 0, tax_inclusive: false },
            },
          },
        ],
      },
      {
        id: "g-fork",
        key: "fork",
        label: "Fork",
        group_type: "single_select",
        is_required: true,
        min_select: 1,
        max_select: 1,
        step_position: 2,
        affects_visual: true,
        media_layer: "fork",
        is_active: true,
        options: [
          {
            id: "opt-fork-std",
            key: "standard_160",
            label: "Standard 160mm Air Fork",
            layer_media_id: "media-fork-std",
            weight_grams: 2050,
            weight_source: "manufacturer_published",
            is_default: true,
            is_active: true,
            availability: "available",
            markets: ["GB", "US"],
            sort_position: 1,
            prices: {
              GBP: { currency: "GBP", delta_minor: 0, tax_inclusive: true },
              USD: { currency: "USD", delta_minor: 0, tax_inclusive: false },
            },
          },
          {
            id: "opt-fork-factory",
            key: "factory_170",
            label: "Factory 170mm Kashima Fork",
            layer_media_id: "media-fork-factory",
            weight_grams: 2180,
            weight_source: "measured",
            is_default: false,
            is_active: true,
            availability: "available",
            markets: ["GB", "US"],
            sort_position: 2,
            prices: {
              GBP: { currency: "GBP", delta_minor: 35000, tax_inclusive: true }, // +£350.00
              USD: { currency: "USD", delta_minor: 40000, tax_inclusive: false }, // +$400.00
            },
          },
          {
            id: "opt-fork-proto",
            key: "proto_coil",
            label: "Prototype Coil Fork",
            layer_media_id: "media-fork-proto",
            weight_grams: 2350,
            weight_source: "estimated", // Fabrication trap: estimated source!
            is_default: false,
            is_active: true,
            availability: "available",
            markets: ["GB"],
            sort_position: 3,
            prices: {
              GBP: { currency: "GBP", delta_minor: -10000, tax_inclusive: true }, // -£100.00 (negative delta!)
            },
          },
        ],
      },
      {
        id: "g-brakes",
        key: "brakes",
        label: "Braking System",
        group_type: "single_select",
        is_required: true,
        min_select: 1,
        max_select: 1,
        step_position: 3,
        affects_visual: false,
        is_active: true,
        options: [
          {
            id: "opt-brakes-4p",
            key: "std_4piston",
            label: "Standard 4-Piston Hydraulic",
            weight_grams: 620,
            weight_source: "measured",
            is_default: true,
            is_active: true,
            availability: "available",
            markets: ["GB", "US"],
            sort_position: 1,
            prices: {
              GBP: { currency: "GBP", delta_minor: 0, tax_inclusive: true },
              USD: { currency: "USD", delta_minor: 0, tax_inclusive: false },
            },
          },
          {
            id: "opt-brakes-dh",
            key: "dh_4piston",
            label: "DH Heavy Duty 4-Piston",
            weight_grams: 740,
            weight_source: "manufacturer_published",
            is_default: false,
            is_active: true,
            availability: "available",
            markets: ["GB", "US"],
            sort_position: 2,
            prices: {
              GBP: { currency: "GBP", delta_minor: 12000, tax_inclusive: true },
              USD: { currency: "USD", delta_minor: 15000, tax_inclusive: false },
            },
          },
        ],
      },
    ],
    rules: [],
    presets: [],
    geometry: [],
    fit_bands: [],
  };
}

// ─── TEST SUITE ───────────────────────────────────────────────────────────────

console.log("\n── ALKOTA CYCLES — CONFIGURATOR ENGINE TEST SUITE ─────────────────────\n");

// 1. Basic Evaluation & Defaults
{
  const snapshot = createMockSnapshot();
  const res = evaluateConfiguration(snapshot, {}, "GB");
  assert(res.isValid, "Default evaluation is valid");
  assert(res.resolvedSelections["frame_size"] === "small", "Default frame_size selected");
  assert(res.resolvedSelections["fork"] === "standard_160", "Default fork selected");
  assert(res.pricing.subtotalMinor === 450000, "Default subtotal matches base price (£4,500.00)");
  assert(res.pricing.taxInclusive === true, "GB market uses tax-inclusive pricing");
}

// 2. Fabrication Trap Protection — Weight Nullability
{
  const snapshot = createMockSnapshot();
  // Evaluate with verified options only
  const resVerified = evaluateConfiguration(snapshot, { fork: "factory_170" }, "GB");
  assert(resVerified.weight.totalGrams === 3100 + 2180 + 620, "Total weight computed when all selected options have verified sources (manufacturer_published/measured)");
  assert(resVerified.weight.reason === null, "Weight reason is null for verified options");

  // Evaluate with estimated option
  const resUnverified = evaluateConfiguration(snapshot, { fork: "proto_coil" }, "GB");
  assert(resUnverified.weight.totalGrams === null, "Total weight is NULL when any option has unverified weight_source ('estimated')");
  assert(typeof resUnverified.weight.reason === "string" && resUnverified.weight.reason.includes("unverified weight source"), "Weight reason explains why weight is hidden");
}

// 3. Pricing Calculation — Positive and Negative Deltas
{
  const snapshot = createMockSnapshot();
  // Factory fork (+£350) + DH brakes (+£120)
  const res1 = evaluateConfiguration(snapshot, { fork: "factory_170", brakes: "dh_4piston" }, "GB");
  assert(res1.pricing.subtotalMinor === 450000 + 35000 + 12000, "Subtotal correctly sums positive price deltas");

  // Proto coil fork (-£100)
  const resNegative = evaluateConfiguration(snapshot, { fork: "proto_coil" }, "GB");
  assert(resNegative.pricing.subtotalMinor === 450000 - 10000, "Subtotal correctly handles negative price deltas (-£100.00)");
}

// 4. Rule Type: Excludes Rule
{
  const snapshot = createMockSnapshot();
  snapshot.rules.push({
    id: "r-ex-1",
    name: "Factory fork excludes small frame",
    rule_type: "excludes",
    trigger: { option_keys: ["fork:factory_170"] },
    effect: { option_keys: ["frame_size:small"] },
    message: "170mm Factory fork requires at least a Medium (S2) chassis due to crown clearance.",
    priority: 10,
    is_active: true,
  });

  const res = evaluateConfiguration(snapshot, { fork: "factory_170" }, "GB");
  assert(res.availability["frame_size:small"] === "disabled", "Excludes rule disables frame_size:small when factory_170 is selected");
  assert(res.resolvedSelections["frame_size"] === "medium", "Engine automatically fell back to medium frame");
}

// 5. Rule Type: Requires Rule
{
  const snapshot = createMockSnapshot();
  snapshot.rules.push({
    id: "r-req-1",
    name: "Factory fork requires DH Brakes",
    rule_type: "requires",
    trigger: { option_keys: ["fork:factory_170"] },
    effect: { option_keys: ["brakes:dh_4piston"] },
    message: "Factory 170mm fork requires DH Heavy Duty brakes.",
    priority: 10,
    is_active: true,
  });

  const resViolation = evaluateConfiguration(snapshot, { fork: "factory_170", brakes: "std_4piston" }, "GB");
  assert(!resViolation.isValid, "Requires rule creates a violation if effect option is not selected");
  assert(resViolation.violations.some((v) => v.ruleId === "r-req-1"), "Violation includes rule id and human-readable message");
}

// 6. User Lock Rule — Conflict Detection (No Silent Overwrites)
{
  const snapshot = createMockSnapshot();
  snapshot.rules.push({
    id: "r-auto-1",
    name: "Auto-select Factory fork on Medium",
    rule_type: "auto_select",
    trigger: { option_keys: ["frame_size:medium"] },
    effect: { group_key: "fork", value: "factory_170" },
    message: "Medium chassis defaults to Factory 170mm fork.",
    priority: 10,
    is_active: true,
  });

  // User has NOT locked fork -> auto-select updates fork
  const resUnlocked = evaluateConfiguration(snapshot, { frame_size: "medium" }, "GB", []);
  assert(resUnlocked.resolvedSelections["fork"] === "factory_170", "Auto-select applies when group is unlocked");

  // User HAS locked fork to proto_coil -> engine flags conflict violation, does NOT silently overwrite
  const resLocked = evaluateConfiguration(snapshot, { frame_size: "medium", fork: "proto_coil" }, "GB", ["fork"]);
  assert(resLocked.resolvedSelections["fork"] === "proto_coil", "User locked selection is preserved");
  assert(resLocked.violations.some((v) => v.lockedConflict === true), "Violation generated for locked selection conflict");
}

// 7. Rule Cycle Detection (Throws RuleCycleError)
{
  const snapshot = createMockSnapshot();
  // Rule A: trigger frame_size:small -> auto_select frame_size:medium
  snapshot.rules.push({
    id: "r-cycle-a",
    name: "Frame Small auto-selects Frame Medium",
    rule_type: "auto_select",
    trigger: { option_keys: ["frame_size:small"] },
    effect: { group_key: "frame_size", value: "medium" },
    message: "Cycle rule A",
    priority: 1,
    is_active: true,
  });
  // Rule B: trigger frame_size:medium -> auto_select frame_size:small
  snapshot.rules.push({
    id: "r-cycle-b",
    name: "Frame Medium auto-selects Frame Small",
    rule_type: "auto_select",
    trigger: { option_keys: ["frame_size:medium"] },
    effect: { group_key: "frame_size", value: "small" },
    message: "Cycle rule B",
    priority: 2,
    is_active: true,
  });

  let cycleCaught = false;
  try {
    evaluateConfiguration(snapshot, { frame_size: "small" }, "GB");
  } catch (err) {
    if (err instanceof RuleCycleError) {
      cycleCaught = true;
    }
  }
  assert(cycleCaught, "RuleCycleError thrown when oscillating rule cycle is detected");
}

// 8. Publish Validation Test
{
  const snapshot = createMockSnapshot();
  const val = validateVersionForPublish(snapshot);
  assert(val.isValidForPublish, "Clean version snapshot passes publish validation");
  assert(val.combinationCount === 2 * 3 * 2, "Combination counter correctly calculates total valid builds (12)");
}

// ─── FINAL REPORT ─────────────────────────────────────────────────────────────

console.log(`\n── TEST RESULTS: ${passed} PASSED, ${failed} FAILED ─────────────────────\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("✅ ALL CONFIGURATOR ENGINE TESTS PASSED CLEANLY.\n");
}
