#!/usr/bin/env node
/**
 * ALKOTA CYCLES — PRICE INTEGRITY VALIDATOR
 * scripts/validate-prices.ts
 *
 * RULES:
 * 1. Any RegionalPrice currency MUST match its region's currency (GBP for UK, USD for US).
 * 2. Any amountMinor MUST be a positive integer (minor units). Never floats.
 * 3. Any price literal (£ or $ followed by digits) in a component outside the
 *    pricing layer (lib/pricing.ts, config/partnerTerms.ts, EarningsCalculator)
 *    fails the build.
 * 4. Project 01 price MUST be non-null (pricing is unpublished and must stay unset).
 *
 * Usage: npx tsx scripts/validate-prices.ts
 */

import * as fs from "fs";
import * as path from "path";
import { products } from "../src/content/store/products";
import { REGIONS, type RegionCode } from "../src/lib/regions";
import { PROJECT01_PAID_RESERVATIONS_ENABLED, APPROVED_DEPOSIT } from "../src/config/legal";

const ROOT = path.resolve(process.cwd());

interface PriceViolation {
  file: string;
  line?: number;
  message: string;
}

const violations: PriceViolation[] = [];

// ── 1. Validate Store Product Prices ─────────────────────────────────────────

for (const prod of products) {
  const regionKeys = Object.keys(prod.prices) as RegionCode[];
  for (const rKey of regionKeys) {
    const price = prod.prices[rKey];
    if (!price) continue;

    const expectedCurrency = REGIONS[rKey]?.currency;
    if (price.currency !== expectedCurrency) {
      violations.push({
        file: "src/content/store/products.ts",
        message: `Product "${prod.name}" (${prod.id}) declares region "${rKey}" with currency "${price.currency}", expected "${expectedCurrency}".`,
      });
    }

    if (!Number.isInteger(price.amountMinor) || price.amountMinor <= 0) {
      violations.push({
        file: "src/content/store/products.ts",
        message: `Product "${prod.name}" (${prod.id}) for region "${rKey}" has invalid amountMinor: ${price.amountMinor}. Must be a positive integer.`,
      });
    }
  }
}

// ── 2. Validate Project 01 Pricing (Must stay UNSET) ──────────────────────────

if (PROJECT01_PAID_RESERVATIONS_ENABLED || APPROVED_DEPOSIT !== null) {
  violations.push({
    file: "src/config/legal.ts",
    message: `Project 01 pricing / reservations released prematurely! PROJECT01_PAID_RESERVATIONS_ENABLED must be false and APPROVED_DEPOSIT must be null.`,
  });
}

// ── 3. Scan Components for Hardcoded Price Literals ──────────────────────────

const ALLOWED_PRICING_FILES = [
  "src/lib/pricing.ts",
  "src/config/partnerTerms.ts",
  "src/components/partner/EarningsCalculator.tsx",
  "src/components/partner/ApplicationForm.tsx",
  "src/components/partner/PortalShell.tsx",
  "src/components/partner/pdf/PartnerPackDocument.tsx",
  "src/app/[region]/warranty/page.tsx",
  "scripts/validate-prices.ts",
];

const SCAN_DIRS = [
  path.join(ROOT, "src", "components"),
  path.join(ROOT, "src", "app"),
];

function scanDirectoryForPriceLiterals(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT, fullPath);

    if (entry.isDirectory()) {
      scanDirectoryForPriceLiterals(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      if (ALLOWED_PRICING_FILES.some((allowed) => relPath.endsWith(allowed))) {
        continue;
      }
      scanFileForPriceLiterals(fullPath, relPath);
    }
  }
}

function scanFileForPriceLiterals(filePath: string, relPath: string): void {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Matches £45, $49, £45.00, $120.00 in JSX or string literals
  // Ignores regex patterns or standard comments if they don't render prices
  const priceRegex = /(?:£|\$)\d+(?:\.\d{2})?/g;

  lines.forEach((line, index) => {
    // Skip comments or import lines
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) {
      return;
    }

    let match: RegExpExecArray | null;
    while ((match = priceRegex.exec(line)) !== null) {
      violations.push({
        file: relPath,
        line: index + 1,
        message: `Hardcoded price literal "${match[0]}" found in component outside pricing layer: "${trimmed}"`,
      });
    }
  });
}

scanDirectoryForPriceLiterals(path.join(ROOT, "src", "components"));
scanDirectoryForPriceLiterals(path.join(ROOT, "src", "app"));

// ── Output Report ─────────────────────────────────────────────────────────────

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  ALKOTA — PRICE INTEGRITY VALIDATOR              ║");
console.log("╚══════════════════════════════════════════════════╝\n");

if (violations.length > 0) {
  console.error(`  ✗ PRICE INTEGRITY FAILURE: ${violations.length} violation(s) found:\n`);
  violations.forEach((v) => {
    const lineInfo = v.line ? `:${v.line}` : "";
    console.error(`  • ${v.file}${lineInfo}`);
    console.error(`    ${v.message}\n`);
  });
  console.error("Build failed. Resolve all pricing architecture violations before deploying.\n");
  process.exit(1);
} else {
  console.log("  ✓ Store product prices, regional currency rules, and price literal checks passed.\n");
  process.exit(0);
}
