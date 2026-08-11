#!/usr/bin/env tsx
/**
 * ALKOTA CYCLES — CMS SEED SCRIPT
 * scripts/seed-cms.ts
 *
 * 1. Uploads existing public/images/ assets to Supabase Storage 'media' bucket.
 * 2. Populates public.media_assets with EXIF-stripped metadata, LQIP blur base64, and SHA-256 content hashes.
 * 3. Populates public.content_slots based on CMS_REGISTRY with initial media_id bindings and fallback text.
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { CMS_REGISTRY } from "../src/lib/cms/registry";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const ROOT = process.cwd();
const PUBLIC_IMAGES_DIR = path.join(ROOT, "public", "images");

interface LocalImage {
  relPath: string;
  absPath: string;
  filename: string;
  ext: string;
}

function collectImages(dir: string, results: LocalImage[]): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectImages(fullPath, results);
    } else if (entry.isFile() && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(entry.name)) {
      const relPath = path.relative(PUBLIC_IMAGES_DIR, fullPath);
      results.push({
        relPath,
        absPath: fullPath,
        filename: entry.name,
        ext: path.extname(entry.name).toLowerCase(),
      });
    }
  }
}

async function runSeed() {
  console.log("\n🌱 ALKOTA CYCLES — CMS SEEDING SYSTEM\n");

  // 1. Ensure 'media' bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const mediaBucketExists = buckets?.some((b) => b.name === "media");
  if (!mediaBucketExists) {
    console.log("  Creating storage bucket 'media'...");
    const { error: bErr } = await supabase.storage.createBucket("media", {
      public: false,
      fileSizeLimit: 26214400, // 25 MB
    });
    if (bErr) {
      console.error("  ❌ Failed to create bucket 'media':", bErr.message);
    }
  } else {
    console.log("  ✓ Storage bucket 'media' verified.");
  }

  // 2. Collect local image files
  const images: LocalImage[] = [];
  collectImages(PUBLIC_IMAGES_DIR, images);
  console.log(`  Found ${images.length} local images in public/images/`);

  const mediaPathToIdMap = new Map<string, string>();

  for (const img of images) {
    let rawBuf = fs.readFileSync(img.absPath);
    const mimeType =
      img.ext === ".png"
        ? "image/png"
        : img.ext === ".webp"
        ? "image/webp"
        : img.ext === ".svg"
        ? "image/svg+xml"
        : img.ext === ".gif"
        ? "image/gif"
        : "image/jpeg";

    let width: number | null = null;
    let height: number | null = null;
    let blurDataUrl: string | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let cleanBuffer: Buffer = rawBuf as any;

    if (mimeType !== "image/svg+xml") {
      try {
        const meta = await sharp(rawBuf).metadata();
        width = meta.width || null;
        height = meta.height || null;

        cleanBuffer = (await sharp(rawBuf).toBuffer()) as unknown as Buffer;

        const lqipBuf = (await sharp(rawBuf)
          .resize(16, 16, { fit: "inside" })
          .blur(10)
          .toFormat("webp", { quality: 20 })
          .toBuffer()) as unknown as Buffer;
        blurDataUrl = `data:image/webp;base64,${lqipBuf.toString("base64")}`;
      } catch (err) {
        console.warn(`  ⚠️ Could not process image metadata for ${img.relPath}:`, err);
      }
    }

    const contentHash = crypto.createHash("sha256").update(cleanBuffer).digest("hex");
    const storagePath = `seed/${img.relPath.replace(/\\/g, "/")}`;

    // Upload to Storage bucket
    const { error: uploadErr } = await supabase.storage.from("media").upload(storagePath, cleanBuffer, {
      contentType: mimeType,
      upsert: true,
    });

    if (uploadErr) {
      console.error(`  ❌ Failed to upload ${storagePath}:`, uploadErr.message);
    }

    const altText = `Alkota Cycles ${path.basename(img.filename, img.ext).replace(/[-_]/g, " ")}`;

    // Determine provenance and claim based on exact filename audit rules
    const fn = img.filename.toLowerCase();
    const rel = img.relPath.toLowerCase().replace(/\\/g, "/");

    let provenance: "own_alkota" | "own_generic" | "licensed_stock" | "ai_generated" | "unknown" = "unknown";
    let claim = true;

    if (fn.includes("brand-emblem") || fn.includes("development-sheet")) {
      provenance = "own_alkota";
      claim = false;
    } else if (rel.startsWith("components/")) {
      provenance = "unknown";
      claim = false;
    } else {
      provenance = "unknown";
      claim = true;
    }

    // Upsert into media_assets table
    const { data: asset, error: dbErr } = await supabase
      .from("media_assets")
      .upsert(
        {
          storage_path: storagePath,
          filename: img.filename,
          mime_type: mimeType,
          bytes: cleanBuffer.length,
          width,
          height,
          blur_data_url: blurDataUrl,
          alt_text: altText,
          is_decorative: false,
          licence: "owned",
          provenance,
          claim,
          focal_x: 0.5,
          focal_y: 0.5,
          content_hash: contentHash,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "storage_path" }
      )
      .select("id")
      .single();

    if (dbErr || !asset) {
      console.error(`  ❌ Failed to insert media_asset row for ${img.filename}:`, dbErr);
    } else {
      mediaPathToIdMap.set(`/images/${img.relPath.replace(/\\/g, "/")}`, asset.id);
      mediaPathToIdMap.set(`public/images/${img.relPath.replace(/\\/g, "/")}`, asset.id);
    }
  }

  console.log(`  ✓ Seeding media assets completed (${mediaPathToIdMap.size} mapped).`);

  // 3. Seed content_slots from CMS_REGISTRY
  console.log("\n  Seeding content_slots from CMS_REGISTRY...");
  let slotsSeeded = 0;

  for (const pageDef of CMS_REGISTRY) {
    for (const slotDef of pageDef.slots) {
      let mediaId: string | null = null;

      if (slotDef.type === "image" && slotDef.fallbackAssetPath) {
        mediaId = mediaPathToIdMap.get(slotDef.fallbackAssetPath) || null;
      }

      const { error: slotErr } = await supabase.from("content_slots").upsert(
        {
          page_key: pageDef.pageKey,
          slot_key: slotDef.slotKey,
          slot_type: slotDef.type,
          media_id: mediaId,
          value_text: slotDef.fallbackText || null,
          locale: "en-GB",
          is_required: slotDef.required,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "page_key,slot_key,locale" }
      );

      if (slotErr) {
        console.error(`  ❌ Failed to seed slot (${pageDef.pageKey}/${slotDef.slotKey}):`, slotErr.message);
      } else {
        slotsSeeded++;
      }
    }
  }

  console.log(`  ✓ Content slots seeded: ${slotsSeeded} slots across ${CMS_REGISTRY.length} pages.\n`);
  console.log("✅ CMS SEEDING COMPLETE.\n");
}

runSeed().catch((e) => {
  console.error("FATAL SEED ERROR:", e);
  process.exit(1);
});
