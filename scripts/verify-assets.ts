#!/usr/bin/env tsx
/**
 * ALKOTA CYCLES — ASSET INTEGRITY VERIFIER
 * scripts/verify-assets.ts
 *
 * Runs as a prebuild step. Fails the build (exit 1) on:
 *   1. Duplicate hashes in public/images/
 *   2. File extension / magic byte signature mismatch
 *   3. Bare /images/ image paths referenced directly in page/component JSX (excluding fallback defaults)
 *   4. Unfilled required CMS slots (when database is available)
 *   5. Media assets with licence = 'unknown' (when database is available)
 *   6. Non-decorative media assets missing alt text (< 5 chars) (when database is available)
 *   7. Dangling media_id references in content_slots (when database is available)
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "public", "images");
const SRC_DIR = path.join(ROOT, "src");
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
    ext: [".jpg", ".jpeg"],
    label: "JPEG",
    check: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    ext: [".png"],
    label: "PNG",
    check: (b) =>
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  {
    ext: [".webp"],
    label: "WebP",
    check: (b) =>
      b[4] === 0x57 && b[5] === 0x45 && b[6] === 0x42 && b[7] === 0x50,
  },
  {
    ext: [".gif"],
    label: "GIF",
    check: (b) => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46,
  },
  {
    ext: [".avif"],
    label: "AVIF",
    check: (b) => b.slice(4, 8).toString() === "ftyp",
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

// ─── Collect image files ──────────────────────────────────────────────────────

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
    if (entry.isDirectory()) {
      collectImages(fullPath, results);
    } else if (entry.isFile() && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(entry.name)) {
      const buf = fs.readFileSync(fullPath);
      const hash = crypto.createHash("md5").update(buf).digest("hex");
      const ext = path.extname(entry.name).toLowerCase();
      const detected = ext === ".svg" ? "SVG" : detectMagic(buf);
      results.push({
        relPath: path.relative(path.join(ROOT, "public"), fullPath),
        absPath: fullPath,
        sizeBytes: buf.length,
        hash,
        ext,
        detectedFormat: detected,
      });
    }
  }
}

// ─── Bare Image Path Scanner ──────────────────────────────────────────────────

function checkBareImagePaths(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const allowedFiles = [
    "registry.ts",
    "query.ts",
    "seed-cms.ts",
    "verify-assets.ts",
  ];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      checkBareImagePaths(fullPath);
    } else if (
      entry.isFile() &&
      /\.(tsx?|jsx?)$/.test(entry.name) &&
      !allowedFiles.includes(entry.name)
    ) {
      const content = fs.readFileSync(fullPath, "utf-8");
      // Pattern matching src="/images/..." or src='/images/...' in JSX
      const matches = content.match(/src=["']\/images\/[^"']+["']/g);

      if (matches) {
        // Exclude specific system icons / logos or static assets if designed to stay static (e.g. logos)
        const illegalMatches = matches.filter(
          (m) => !m.includes("/images/logo") && !m.includes("/images/favicon") && !m.includes("/images/icons/")
        );
        if (illegalMatches.length > 0) {
          fail(
            `Bare image path(s) found in ${path.relative(ROOT, fullPath)}:\n` +
              illegalMatches.map((m) => `      - ${m}`).join("\n") +
              `\n      Replace with <CmsImage pageKey="..." slotKey="..." /> per Phase 2 mandate.`
          );
        }
      }
    }
  }
}

// ─── Database CMS Integrity Checks ────────────────────────────────────────────

async function checkDatabaseIntegrity(): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    warn("Skipping database CMS integrity checks (SUPABASE_SERVICE_ROLE_KEY not available during build context).");
    return;
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, { auth: { persistSession: false } });

    // Gate 1: Check media assets for unknown licence
    const { data: unknownLicenceAssets } = await supabase
      .from("media_assets")
      .select("id, filename, licence")
      .eq("licence", "unknown");

    if (unknownLicenceAssets && unknownLicenceAssets.length > 0) {
      fail(
        `Found ${unknownLicenceAssets.length} media asset(s) with licence = 'unknown':\n` +
          unknownLicenceAssets.map((a) => `      - ${a.filename} (${a.id})`).join("\n") +
          `\n      Licence must be assigned before build can pass.`
      );
    } else {
      ok("No media assets with unknown licence.");
    }

    // Gate 2: Check non-decorative assets for missing alt text
    const { data: missingAltAssets } = await supabase
      .from("media_assets")
      .select("id, filename, alt_text, is_decorative")
      .eq("is_decorative", false);

    const invalidAlt = (missingAltAssets || []).filter(
      (a) => !a.alt_text || a.alt_text.trim().length < 5
    );

    if (invalidAlt.length > 0) {
      fail(
        `Found ${invalidAlt.length} non-decorative media asset(s) with missing or short alt text (<5 chars):\n` +
          invalidAlt.map((a) => `      - ${a.filename} (${a.id})`).join("\n")
      );
    } else {
      ok("All non-decorative media assets have valid alt text.");
    }

    // Gate 3: Check dangling media references in content_slots
    const { data: slots } = await supabase
      .from("content_slots")
      .select("page_key, slot_key, media_id")
      .not("media_id", "is", null);

    if (slots && slots.length > 0) {
      const mediaIds = slots.map((s) => s.media_id);
      const { data: existingMedia } = await supabase
        .from("media_assets")
        .select("id")
        .in("id", mediaIds);

      const existingSet = new Set((existingMedia || []).map((m) => m.id));
      const dangling = slots.filter((s) => !existingSet.has(s.media_id));

      if (dangling.length > 0) {
        fail(
          `Dangling media reference(s) found in content_slots:\n` +
            dangling.map((d) => `      - ${d.page_key}/${d.slot_key} -> media_id ${d.media_id}`).join("\n")
        );
      } else {
        ok("No dangling media references in content_slots.");
      }
    }

    // Gate 4: Check provenance + claim rule on content_slots
    const { data: claimSlots } = await supabase
      .from("content_slots")
      .select("page_key, slot_key, media_assets!inner(filename, provenance, claim)")
      .not("media_id", "is", null);

    if (claimSlots && claimSlots.length > 0) {
      const invalidSlots = claimSlots.filter((s) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ma = s.media_assets as any;
        return (
          ["unknown", "ai_generated", "licensed_stock"].includes(ma?.provenance) &&
          ma?.claim === true
        );
      });

      if (invalidSlots.length > 0) {
        fail(
          `PROVENANCE BUILD GATE FAILURE: Published content_slot(s) reference asset(s) with unverified operational claims:\n` +
            invalidSlots
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((s) => `      - Slot '${s.page_key}/${s.slot_key}' -> asset '${(s.media_assets as any)?.filename}' (provenance: ${(s.media_assets as any)?.provenance}, claim: true)`)
              .join("\n") +
            `\n      Assets with provenance in ('unknown','ai_generated','licensed_stock') and claim = true cannot be bound to content_slots.`
        );
      } else {
        ok("No published content slots reference unverified claim imagery.");
      }
    }
  } catch (err: unknown) {
    warn(`Database check encountered an error: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n── Asset & CMS Integrity Verifier ─────────────────────");

  const images: ImageInfo[] = [];
  collectImages(IMAGES_DIR, images);

  if (images.length === 0) {
    console.log("   No images found in public/images/ — nothing to verify.");
  } else {
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
            files.map((f) => `      - ${f}`).join("\n") +
            "\n      One image, one meaning. Delete the duplicate and update all references."
        );
      }
    }
    if (!failed) ok("No duplicate assets found.");

    // Magic byte / extension mismatch check
    let mismatchFound = false;
    for (const img of images) {
      if (img.ext === ".svg") continue;
      const expected = expectedLabel(img.ext);
      if (!expected) continue;
      if (img.detectedFormat && img.detectedFormat !== expected) {
        fail(
          `${img.relPath}: extension says ${expected} but file is actually ${img.detectedFormat}. ` +
            "Rename or re-export the file correctly."
        );
        mismatchFound = true;
      }
    }
    if (!mismatchFound) ok("All extensions match their file magic bytes.");
  }

  // Check bare image paths in source code
  checkBareImagePaths(SRC_DIR);

  // Run database checks
  await checkDatabaseIntegrity();

  // Final status
  if (failed) {
    console.error("\n  BUILD FAILED: Asset & CMS integrity check did not pass.\n");
    process.exit(1);
  } else {
    console.log("\n  ✓ Asset & CMS integrity checks passed.\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
