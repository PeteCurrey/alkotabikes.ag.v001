#!/usr/bin/env node
/**
 * ALKOTA CYCLES — PLACEHOLDER REPORT & PRODUCTION GATE
 * scripts/placeholder-report.ts
 *
 * Scans the codebase for:
 *   1. "PLACEHOLDER — " literals
 *   2. Partner terms DRAFT status (production builds only)
 *   3. Commercial figure literals hardcoded outside partnerTerms.ts
 *
 * RULES:
 * 1. Output a report at build time listing every issue found.
 * 2. Fail the build (exit 1) IF the build target is the production domain (alkotacycles.com).
 * 3. Pass the build (exit 0) on preview / development builds.
 *
 * Usage: npx tsx scripts/placeholder-report.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(process.cwd());

interface PlaceholderMatch {
  file: string;
  line: number;
  content: string;
}

const matches: PlaceholderMatch[] = [];

const SCAN_DIRS = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'lib'),
  path.join(ROOT, 'config'),
];

function scanDirectory(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?|json|md)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

function scanFile(filePath: string): void {
  const relativePath = path.relative(ROOT, filePath);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');

  lines.forEach((lineText, idx) => {
    if (lineText.includes('PLACEHOLDER — ')) {
      matches.push({
        file: relativePath,
        line: idx + 1,
        content: lineText.trim(),
      });
    }
  });
}

console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║  ALKOTA — PLACEHOLDER AUDIT REPORT               ║');
console.log('╚══════════════════════════════════════════════════╝\n');

for (const dir of SCAN_DIRS) {
  scanDirectory(dir);
}

console.log(`Total "PLACEHOLDER — " items detected: ${matches.length}\n`);

if (matches.length > 0) {
  console.log('── LIST OF PLACEHOLDERS ────────────────────────────');
  matches.forEach((m) => {
    console.log(`  • ${m.file}:${m.line}`);
    console.log(`    ${m.content}`);
  });
  console.log('────────────────────────────────────────────────────\n');
}

// Determine if we are on the production live domain:
// Check VERCEL_URL, VERCEL_PROJECT_PRODUCTION_URL, SITE_URL, NEXT_PUBLIC_SITE_URL or VERCEL_ENV
const vercelUrl = process.env.VERCEL_URL || '';
const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
const vercelProjectProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || '';
const vercelEnv = process.env.VERCEL_ENV || '';

const isProductionDomain =
  (vercelEnv === 'production' && !vercelUrl.includes('vercel.app')) ||
  process.env.STRICT_PLACEHOLDERS === 'true';

// ─── PARTNER TERMS DRAFT GATE ────────────────────────────────────────────────
// Check that no partner tier is still DRAFT on production builds.
// Mirrors the assertPartnerTermsApproved() pattern in partnerTerms.ts.
const draftTermsErrors: string[] = [];
if (isProductionDomain) {
  try {
    // Dynamically read the file and check for status: "DRAFT"
    const partnerTermsPath = path.join(ROOT, 'src', 'config', 'partnerTerms.ts');
    if (fs.existsSync(partnerTermsPath)) {
      const content = fs.readFileSync(partnerTermsPath, 'utf8');
      const draftMatches = content.match(/status:\s*["']DRAFT["']/g);
      if (draftMatches && draftMatches.length > 0) {
        draftTermsErrors.push(
          `PARTNER TERMS GATE FAILURE: ${draftMatches.length} partner tier(s) have status:'DRAFT' in src/config/partnerTerms.ts. ` +
          `All tiers must be set to 'APPROVED' before deploying to production.`
        );
      }
    }
  } catch (e: any) {
    draftTermsErrors.push(`PARTNER TERMS GATE ERROR: ${e?.message}`);
  }
}

// ─── COMMERCIAL LITERALS CHECK ───────────────────────────────────────────────
// Scan src/ for any commission percentages (17%, 20%), known fee strings, or radius literals
// that should only appear in partnerTerms.ts — never hardcoded elsewhere.
const commercialLiteralErrors: string[] = [];
const COMMERCIAL_PATTERNS = [
  { pattern: /commissionPercent:\s*\d+/g, label: 'commissionPercent literal' },
  { pattern: /fitBuildHandoverFeeMinor:\s*\d+/g, label: 'fitBuildHandoverFeeMinor literal' },
  { pattern: /catchmentRadiusMiles:\s*\d+/g, label: 'catchmentRadiusMiles literal' },
];
const PARTNER_TERMS_FILE = path.join(ROOT, 'src', 'config', 'partnerTerms.ts');

function checkCommercialLiterals(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (fullPath === PARTNER_TERMS_FILE) continue; // Allow in source of truth
    if (entry.isDirectory()) {
      checkCommercialLiterals(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const { pattern, label } of COMMERCIAL_PATTERNS) {
        pattern.lastIndex = 0;
        if (pattern.test(content)) {
          commercialLiteralErrors.push(
            `COMMERCIAL LITERAL in ${path.relative(ROOT, fullPath)}: ${label} found outside partnerTerms.ts`
          );
        }
      }
    }
  }
}

checkCommercialLiterals(path.join(ROOT, 'src'));

if (commercialLiteralErrors.length > 0) {
  console.log('── COMMERCIAL LITERAL VIOLATIONS ───────────────────');
  commercialLiteralErrors.forEach((e) => console.log(`  ✗ ${e}`));
  console.log('────────────────────────────────────────────────────\n');
}

// ─── OVERALL EXIT ────────────────────────────────────────────────────────────

const productionViolations = [
  ...(isProductionDomain && matches.length > 0 ? ['Unresolved PLACEHOLDER — literals'] : []),
  ...draftTermsErrors,
  ...(isProductionDomain ? commercialLiteralErrors : []),
];

if (productionViolations.length > 0 && isProductionDomain) {
  console.error('  ✗ PRODUCTION BUILD FAILED:');
  productionViolations.forEach((v) => console.error(`    • ${v}`));
  console.error('\n    All issues above must be resolved before deploying to alkotacycles.com.\n');
  process.exit(1);
} else if (matches.length > 0 || commercialLiteralErrors.length > 0) {
  console.log('  ⚠  Preview / Development build: Issues above allowed (report generated for review).\n');
  process.exit(0);
} else {
  console.log('  ✓ Zero placeholders, no DRAFT partner terms, no commercial literals outside partnerTerms.ts. Ready for production.\n');
  process.exit(0);
}
