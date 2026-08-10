#!/usr/bin/env node
/**
 * ALKOTA CYCLES — PLACEHOLDER REPORT & PRODUCTION GATE
 * scripts/placeholder-report.ts
 *
 * Scans the codebase for "PLACEHOLDER — " literals.
 *
 * RULES:
 * 1. Output a report at build time listing every placeholder found.
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

if (matches.length > 0 && isProductionDomain) {
  console.error('  ✗ PRODUCTION BUILD FAILED: Unresolved placeholders present on production domain alkotacycles.com.');
  console.error('    All "PLACEHOLDER — " literals must be resolved before deploying to production.\n');
  process.exit(1);
} else if (matches.length > 0) {
  console.log('  ⚠  Preview / Development build: Placeholders allowed (report generated above).\n');
  process.exit(0);
} else {
  console.log('  ✓ Zero placeholders found. Ready for production.\n');
  process.exit(0);
}
