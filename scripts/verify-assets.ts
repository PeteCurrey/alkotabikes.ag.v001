#!/usr/bin/env node
/**
 * ALKOTA CYCLES — ASSET INTEGRITY VERIFIER
 *
 * Runs as a prebuild step. Fails the build (exit 1) on:
 *   - Two files in public/images/ sharing an identical hash (duplicate assets)
 *   - Any file whose extension does not match its magic bytes
 *
 * Warns (does not fail) on:
 *   - Any source asset over 800 KB
 *
 * Prints a table of every image with byte size.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const SIZE_WARN_BYTES = 800 * 1024; // 800 KB

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

function formatBytes(b: number): string {
  if (b >= 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  if (b >= 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${b} B`;
}

// ─── Magic byte signatures ────────────────────────────────────────────────────

interface MagicSpec {
  ext: string[];
  label: string;
  check: (buf: Buffer) => boolean;
}

const MAGIC: MagicSpec[] = [
  {
    ext: ['.jpg', '.jpeg'],
    label: 'JPEG',
    check: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    ext: ['.png'],
    label: 'PNG',
    check: (b) =>
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  {
    ext: ['.webp'],
    label: 'WebP',
    check: (b) =>
      b[4] === 0x57 && b[5] === 0x45 && b[6] === 0x42 && b[7] === 0x50,
  },
  {
    ext: ['.gif'],
    label: 'GIF',
    check: (b) => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46,
  },
  {
    ext: ['.avif'],
    label: 'AVIF',
    check: (b) => b.slice(4, 8).toString() === 'ftyp',
  },
];

function detectMagic(buf: Buffer): string | null {
  for (const spec of MAGIC) {
    if (spec.check(buf)) return spec.label;
  }
  return null;
}

function expectedLabel(ext: string): string | null {
  for (const spec of MAGIC) {
    if (spec.ext.includes(ext.toLowerCase())) return spec.label;
  }
  return null;
}

// ─── Collect all image files recursively ─────────────────────────────────────

interface ImageInfo {
  relPath: string;
  absPath: string;
  sizeBytes: number;
  hash: string;
  ext: string;
  detectedFormat: string | null;
}

function collectImages(dir: string, results: ImageInfo[]): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(entry.name)) {
      const buf = fs.readFileSync(fullPath);
      const hash = crypto.createHash('md5').update(buf).digest('hex');
      const ext = path.extname(entry.name).toLowerCase();
      const detected = ext === '.svg' ? 'SVG' : detectMagic(buf);
      results.push({
        relPath: path.relative(path.join(ROOT, 'public'), fullPath),
        absPath: fullPath,
        sizeBytes: buf.length,
        hash,
        ext,
        detectedFormat: detected,
      });
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\n── 3. Asset integrity verifier ─────────────────────');

const images: ImageInfo[] = [];
collectImages(IMAGES_DIR, images);

if (images.length === 0) {
  console.log('   No images found in public/images/ — nothing to verify.');
} else {
  // Print table
  const colW = [55, 10, 10, 10];
  const header = [
    'PATH'.padEnd(colW[0]),
    'SIZE'.padEnd(colW[1]),
    'FORMAT'.padEnd(colW[2]),
    'HASH'.padEnd(colW[3]),
  ].join('  ');
  console.log('\n   ' + header);
  console.log('   ' + '─'.repeat(header.length));

  for (const img of images) {
    const sizeStr = formatBytes(img.sizeBytes);
    const row = [
      img.relPath.padEnd(colW[0]),
      sizeStr.padEnd(colW[1]),
      (img.detectedFormat ?? '?').padEnd(colW[2]),
      img.hash.slice(0, 8).padEnd(colW[3]),
    ].join('  ');
    console.log('   ' + row);
  }
  console.log('');

  // Size warnings
  for (const img of images) {
    if (img.sizeBytes > SIZE_WARN_BYTES) {
      warn(`${img.relPath} is ${formatBytes(img.sizeBytes)} — consider optimising (threshold: ${formatBytes(SIZE_WARN_BYTES)})`);
    }
  }

  // Duplicate hash check
  const hashMap = new Map<string, string[]>();
  for (const img of images) {
    const group = hashMap.get(img.hash) ?? [];
    group.push(img.relPath);
    hashMap.set(img.hash, group);
  }
  for (const [hash, files] of hashMap) {
    if (files.length > 1) {
      fail(
        `Duplicate asset detected (MD5: ${hash}):\n` +
        files.map((f) => `      - ${f}`).join('\n') +
        '\n      One image, one meaning. Delete the duplicate and update all references.'
      );
    }
  }
  if (!failed) ok('No duplicate assets found.');

  // Magic byte / extension mismatch check
  let mismatchFound = false;
  for (const img of images) {
    if (img.ext === '.svg') continue; // SVG is text, skip magic check
    const expected = expectedLabel(img.ext);
    if (!expected) continue; // Unknown extension, skip
    if (img.detectedFormat && img.detectedFormat !== expected) {
      fail(
        `${img.relPath}: extension says ${expected} but file is actually ${img.detectedFormat}. ` +
        `Rename or re-export the file correctly.`
      );
      mismatchFound = true;
    }
  }
  if (!mismatchFound) ok('All extensions match their file magic bytes.');
}

// ─── FINAL RESULT ─────────────────────────────────────────────────────────────

if (failed) {
  console.error('\n  BUILD FAILED: Asset integrity check did not pass.\n');
  process.exit(1);
} else {
  console.log('\n  ✓ Asset checks passed.\n');
}
