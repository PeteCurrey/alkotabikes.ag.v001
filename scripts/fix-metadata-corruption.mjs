#!/usr/bin/env node
/**
 * fix-metadata-corruption.mjs
 *
 * Strips three classes of corruption left by convert-all-metadata.ts:
 *  1.  from "@/lib/env";          ← broken import (missing variable name)
 *  2. Duplicate RegionCode imports
 *  3. Orphaned old generateMetadata body fragment (starts with `: {` at top-level)
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const PAGES_DIR = path.join(ROOT, "src", "app", "[region]");

function walkTsx(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkTsx(full));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      results.push(full);
    }
  }
  return results;
}

const files = walkTsx(PAGES_DIR);
let fixed = 0;
let skipped = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let src = original;

  // ── 1. Remove broken ` from "@/lib/env";` import ─────────────────────────
  src = src.replace(/^[ \t]*from ["']@\/lib\/env["'];[ \t]*\n/m, "");

  // ── 2. Remove duplicate RegionCode imports ────────────────────────────────
  const rcRe = /^import\s+(?:type\s+)?\{[^}]*\bRegionCode\b[^}]*\}\s+from\s+["']@\/lib\/regions["'];[ \t]*$/gm;
  const rcMatches = [...src.matchAll(rcRe)];
  if (rcMatches.length > 1) {
    let firstFound = false;
    src = src.replace(rcRe, (match) => {
      if (!firstFound) { firstFound = true; return match; }
      return "";
    });
  }

  // ── 3. Remove orphaned function body fragment ─────────────────────────────
  // The fragment starts with a line that is *only* `: {` (possibly leading spaces)
  // which is syntactically impossible at TypeScript module top-level.
  // We scan the lines, detect `: {`, then skip lines until the outer brace closes.
  const lines = src.split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    // Top-level orphaned `: {` — impossible valid TS at file scope
    if (/^[ \t]*:[ \t]*\{[ \t]*$/.test(line)) {
      // Walk forward counting braces to consume the whole block
      let depth = 0;
      let j = i;
      while (j < lines.length) {
        for (const ch of lines[j]) {
          if (ch === "{") depth++;
          if (ch === "}") depth--;
        }
        j++;
        if (depth <= 0) break;
      }
      // Skip lines[i..j-1] entirely
      i = j;
    } else {
      out.push(line);
      i++;
    }
  }

  src = out.join("\n");

  // ── 4. Collapse 3+ consecutive blank lines to 2 ──────────────────────────
  src = src.replace(/\n{3,}/g, "\n\n");

  if (src !== original) {
    fs.writeFileSync(file, src, "utf8");
    console.log(`✓  ${path.relative(ROOT, file)}`);
    fixed++;
  } else {
    skipped++;
  }
}

console.log(`\nDone. ${fixed} file(s) fixed, ${skipped} file(s) unchanged.`);
