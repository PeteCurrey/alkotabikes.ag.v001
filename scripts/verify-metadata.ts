#!/usr/bin/env node
/**
 * ALKOTA CYCLES — REGIONAL METADATA VERIFIER & PRODUCTION GATE
 * scripts/verify-metadata.ts
 *
 * RULES:
 * 1. EVERY page.tsx under src/app/[region]/ MUST export `generateMetadata`.
 * 2. NO page.tsx under src/app/[region]/ may export a static `metadata` object
 *    (e.g., `export const metadata`). Static metadata objects cannot access route
 *    params and cause canonical / hreflang region deindexing bugs.
 * 3. All generateMetadata functions must use `buildRegionalMetadata` from `@/lib/metadata`.
 *
 * Usage: npx tsx scripts/verify-metadata.ts
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(process.cwd());
const REGION_APP_DIR = path.join(ROOT, "src", "app", "[region]");

interface MetadataViolation {
  file: string;
  reason: string;
}

const violations: MetadataViolation[] = [];

function scanPageFiles(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanPageFiles(fullPath);
    } else if (entry.isFile() && entry.name === "page.tsx") {
      checkPageFile(fullPath);
    }
  }
}

function checkPageFile(filePath: string): void {
  const relativePath = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, "utf8");

  // Check 1: Static metadata export prohibited
  if (/export\s+(const|let|var)\s+metadata\b/.test(content)) {
    violations.push({
      file: relativePath,
      reason:
        "Exports a static `metadata` object. Must be converted to dynamic `export async function generateMetadata` using `buildRegionalMetadata`.",
    });
  }

  // Check 2: Must export generateMetadata
  if (!/export\s+async\s+function\s+generateMetadata\b/.test(content)) {
    violations.push({
      file: relativePath,
      reason: "Missing dynamic `export async function generateMetadata` export.",
    });
  }

  // Check 3: Must use buildRegionalMetadata
  if (!content.includes("buildRegionalMetadata")) {
    violations.push({
      file: relativePath,
      reason: "Does not import or call `buildRegionalMetadata` from `@/lib/metadata`.",
    });
  }
}

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  ALKOTA — REGIONAL METADATA INTEGRITY VERIFIER   ║");
console.log("╚══════════════════════════════════════════════════╝\n");

scanPageFiles(REGION_APP_DIR);

if (violations.length > 0) {
  console.error(`  ✗ METADATA INTEGRITY FAILURE: ${violations.length} page(s) violated regional metadata rules:\n`);
  violations.forEach((v) => {
    console.error(`  • ${v.file}`);
    console.error(`    ${v.reason}\n`);
  });
  console.error("Build failed. All regional pages must use `buildRegionalMetadata` in `generateMetadata`.\n");
  process.exit(1);
} else {
  console.log("  ✓ All regional page.tsx files use dynamic generateMetadata with buildRegionalMetadata.\n");
  process.exit(0);
}
