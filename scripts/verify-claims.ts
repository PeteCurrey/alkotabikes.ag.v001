#!/usr/bin/env node
/**
 * ALKOTA CYCLES — CLAIMS INTEGRITY VERIFIER
 *
 * Runs as a prebuild step. Fails the build (exit 1) on:
 *   a) VERIFIED or SUPPLIER_SPEC claim with no non-empty evidence
 *   b) Duplicate claim ids
 *   c) Any claim with reviewedAt older than 180 days
 *   d) Forbidden patterns in app/ or components/ outside lib/claims.ts
 *
 * Usage: node --import tsx/esm scripts/verify-claims.ts
 * (wired via prebuild in package.json)
 */

import * as fs from 'fs';
import * as path from 'path';
import { CLAIMS, type ClaimStatus } from '../lib/claims';

const ROOT = path.resolve(process.cwd());
let failed = false;

function fail(msg: string): void {
  console.error(`\n  ✗ ${msg}`);
  failed = true;
}

function warn(msg: string): void {
  console.warn(`  ⚠  ${msg}`);
}

function ok(msg: string): void {
  console.log(`  ✓ ${msg}`);
}

// ─── SECTION 1: Claims registry checks ──────────────────────────────────────

console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║  ALKOTA — CLAIMS INTEGRITY VERIFIER              ║');
console.log('╚══════════════════════════════════════════════════╝\n');
console.log('── 1. Claims registry ──────────────────────────────');

if (CLAIMS.length === 0) {
  ok('CLAIMS registry is empty — no claims to validate.');
} else {
  console.log(`   ${CLAIMS.length} claim(s) registered.\n`);
}

// a) VERIFIED/SUPPLIER_SPEC must have evidence
const evidenceRequired: ClaimStatus[] = ['VERIFIED', 'SUPPLIER_SPEC'];
for (const c of CLAIMS) {
  if (c.status === 'UNSET') {
    fail(
      `Claim ${c.id} ("${c.text}") has status "UNSET". ` +
      `Owner decision required: explicitly categorise as VERIFIED (with evidence), PLANNED, TARGET, or SUPPLIER_SPEC.`
    );
  }
  if (evidenceRequired.includes(c.status)) {
    if (!c.evidence || c.evidence.trim() === '') {
      fail(
        `Claim ${c.id} has status "${c.status}" but no evidence field. ` +
        `Provide a source URL, document reference, or test report identifier.`
      );
    }
  }
}

// b) Duplicate ids
const ids = CLAIMS.map((c) => c.id);
const seen = new Set<string>();
for (const id of ids) {
  if (seen.has(id)) {
    fail(`Duplicate claim id: "${id}" appears more than once in CLAIMS[].`);
  }
  seen.add(id);
}
if (ids.length > 0 && !failed) ok('No duplicate claim ids.');

// c) Staleness — reviewedAt must not be older than 180 days
const STALE_DAYS = 180;
const now = Date.now();
for (const c of CLAIMS) {
  const reviewed = new Date(c.reviewedAt).getTime();
  if (isNaN(reviewed)) {
    fail(`Claim ${c.id}: reviewedAt "${c.reviewedAt}" is not a valid ISO date.`);
    continue;
  }
  const ageDays = (now - reviewed) / (1000 * 60 * 60 * 24);
  if (ageDays > STALE_DAYS) {
    fail(
      `Claim ${c.id} was last reviewed on ${c.reviewedAt} ` +
      `(${Math.floor(ageDays)} days ago). ` +
      `Claims must be reviewed every ${STALE_DAYS} days.`
    );
  }
}
if (CLAIMS.length > 0 && !failed) ok(`All claims reviewed within ${STALE_DAYS} days.`);

// ─── SECTION 2: Forbidden pattern scan ──────────────────────────────────────

console.log('\n── 2. Forbidden pattern scan ───────────────────────');

interface ForbiddenPattern {
  regex: RegExp;
  description: string;
  scope?: string; // subdirectory restriction
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
];

const SCAN_DIRS = [
  path.join(ROOT, 'src', 'app'),
  path.join(ROOT, 'src', 'components'),
];

const EXCLUDE_FROM_SCAN = [
  path.join(ROOT, 'lib', 'claims.ts'),
  path.join(ROOT, 'src', 'lib', 'claims'),
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
    // Apply scope filter if present
    if (pattern.scope && !relPath.includes(pattern.scope)) continue;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip comment lines (single-line)
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
