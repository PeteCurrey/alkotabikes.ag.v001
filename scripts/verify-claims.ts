#!/usr/bin/env node
/**
 * ALKOTA CYCLES — CLAIMS INTEGRITY VERIFIER
 *
 * Runs as a prebuild step. Fails the build (exit 1) on:
 *   a) Duplicate claim references
 *   b) Stale claims (updatedAt older than 180 days)
 *   c) Forbidden patterns in app/ or components/ outside claims modules
 *
 * Usage: npx tsx scripts/verify-claims.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { ENGINEERING_CLAIMS, type ClaimStatus } from '../src/content/project01/claims';

const ROOT = path.resolve(process.cwd());
let failed = false;

function fail(msg: string): void {
  console.error(`\n  ✗ ${msg}`);
  failed = true;
}

function ok(msg: string): void {
  console.log(`  ✓ ${msg}`);
}

console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║  ALKOTA — CLAIMS INTEGRITY VERIFIER              ║');
console.log('╚══════════════════════════════════════════════════╝\n');
console.log('── 1. Claims registry ──────────────────────────────');

if (!ENGINEERING_CLAIMS || ENGINEERING_CLAIMS.length === 0) {
  ok('ENGINEERING_CLAIMS registry is empty — no claims to validate.');
} else {
  console.log(`   ${ENGINEERING_CLAIMS.length} claim(s) registered.\n`);
}

// a) Duplicate claim references
const refs = ENGINEERING_CLAIMS.map((c) => c.claimReference);
const seen = new Set<string>();
for (const ref of refs) {
  if (seen.has(ref)) {
    fail(`Duplicate claim reference: "${ref}" appears more than once in ENGINEERING_CLAIMS[].`);
  }
  seen.add(ref);
}
if (refs.length > 0 && !failed) ok('No duplicate claim references.');

// b) Staleness — updatedAt must not be older than 180 days
const STALE_DAYS = 180;
const now = Date.now();
for (const c of ENGINEERING_CLAIMS) {
  const dateStr = c.updatedAt || c.createdAt;
  const updatedDate = new Date(dateStr).getTime();
  if (isNaN(updatedDate)) {
    fail(`Claim ${c.claimReference}: updatedAt date "${dateStr}" is not a valid ISO date.`);
    continue;
  }
  const ageDays = (now - updatedDate) / (1000 * 60 * 60 * 24);
  if (ageDays > STALE_DAYS) {
    fail(
      `Claim ${c.claimReference} ("${c.title}") was last updated on ${dateStr} ` +
      `(${Math.floor(ageDays)} days ago). Claims must be reviewed every ${STALE_DAYS} days.`
    );
  }
}
if (ENGINEERING_CLAIMS.length > 0 && !failed) ok(`All claims updated within ${STALE_DAYS} days.`);

// ─── SECTION 2: Forbidden pattern scan ──────────────────────────────────────

console.log('\n── 2. Forbidden pattern scan ───────────────────────');

interface ForbiddenPattern {
  regex: RegExp;
  description: string;
  scope?: string;
}

const FORBIDDEN: ForbiddenPattern[] = [
  {
    regex: /\b\d+(\.\d+)?\s?MB\b/,
    description: 'Invented file size (e.g. "12.4 MB") — omit or supply real size',
  },
  {
    regex: /ELEVATION:\s*[\d,]+\s?M/i,
    description: 'Unverified elevation claim — must be in CLAIMS registry or removed',
  },
  {
    regex: /STATUS:\s*ACTIVE/i,
    description: 'Active-status assertion — programme is pre-production R00',
  },
  {
    regex: /LIFETIME/i,
    description: 'Warranty commitment "LIFETIME" — must be reviewed',
    scope: 'app/support',
  },
  {
    regex: /registered\s+or\s+pending/i,
    description: 'Forbidden trade mark representation "registered or pending" (s.95 TMA 1994 / Lanham Act exposure)',
  },
  {
    regex: /®/,
    description: 'Forbidden registered trade mark symbol ® — must be backed by a REGISTERED entry in company.ts trademark registry',
  },
];

const SCAN_DIRS = [
  path.join(ROOT, 'src', 'app'),
  path.join(ROOT, 'src', 'components'),
];

const EXCLUDE_FROM_SCAN = [
  path.join(ROOT, 'src', 'content', 'project01', 'claims.ts'),
  path.join(ROOT, 'src', 'lib', 'claims'),
  path.join(ROOT, 'src', 'app', 'admin'),
  path.join(ROOT, 'src', 'app', 'api', 'admin'),
  path.join(ROOT, 'scripts'),
];

function scanDir(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (EXCLUDE_FROM_SCAN.some((ex) => fullPath.startsWith(ex))) continue;
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

function scanFile(filePath: string): void {
  const relPath = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  for (const pattern of FORBIDDEN) {
    if (pattern.scope && !relPath.includes(pattern.scope)) continue;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) continue;
      if (pattern.regex.test(line)) {
        fail(`${relPath}:${i + 1}: ${pattern.description}\n      → ${line.trim()}`);
      }
    }
  }
}

for (const dir of SCAN_DIRS) {
  scanDir(dir);
}

if (!failed) ok('No forbidden patterns found in app/ or components/.');

// ─── FINAL RESULT ────────────────────────────────────────────────────────────

console.log('\n────────────────────────────────────────────────────');
if (failed) {
  console.error('\n  BUILD FAILED: Claims integrity check did not pass.\n');
  process.exit(1);
} else {
  console.log('\n  ✓ All claims checks passed.\n');
}
