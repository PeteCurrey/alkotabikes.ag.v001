import { NextResponse } from "next/server";
import * as crypto from "crypto";
import sharp from "sharp";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
function sanitizeSvg(rawSvg: string): string {
  return rawSvg
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+\s*=\s*(["']).*?\1/gi, "")
    .replace(/on\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/href\s*=\s*["']\s*javascript:.*?["']/gi, 'href="#"');
}

// Magic byte definitions
function detectMagicFormat(buf: Buffer): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf.slice(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return "image/gif";
  if (buf.slice(4, 8).toString("ascii") === "ftyp") return "image/avif";
  if (buf.toString("utf-8", 0, 100).includes("<svg")) return "image/svg+xml";
  return null;
}

export async function POST(request: Request) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const pageKey = (formData.get("page_key") as string) || "general";
    const slotKey = (formData.get("slot_key") as string) || "asset";
    const altText = (formData.get("alt_text") as string)?.trim() || null;
    const isDecorative = formData.get("is_decorative") === "true";
    const licence = (formData.get("licence") as string) || "owned";
    const credit = (formData.get("credit") as string) || null;
    const caption = (formData.get("caption") as string) || null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Size gate (25 MB = 26,214,400 bytes)
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds maximum size limit of 25 MB" },
        { status: 400 }
      );
    }

    // Read buffer
    const arrayBuffer = await file.arrayBuffer();
    let buffer = Buffer.from(arrayBuffer as ArrayBuffer);

    // 2. Magic byte format detection
    const mimeType = detectMagicFormat(buffer);
    if (!mimeType) {
      return NextResponse.json(
        { error: "Unsupported image format. File does not match magic byte signatures." },
        { status: 400 }
      );
    }

    // 3. Alt text validation
    if (!isDecorative && (!altText || altText.length < 5)) {
      return NextResponse.json(
        { error: "Meaningful alt_text (minimum 5 characters) is required for non-decorative assets." },
        { status: 400 }
      );
    }

    let width: number | null = null;
    let height: number | null = null;
    let blurDataUrl: string | null = null;

    // 4. SVG vs Raster Processing Path
    if (mimeType === "image/svg+xml") {
      const rawSvg = buffer.toString("utf-8");
      const cleanSvg = sanitizeSvg(rawSvg);
      buffer = Buffer.from(cleanSvg, "utf-8");
    } else {
      // Raster image path with sharp
      const image = sharp(buffer);
      const metadata = await image.metadata();

      width = metadata.width || null;
      height = metadata.height || null;

      // Strip EXIF metadata
      const cleanImageBuffer = await sharp(buffer)
        .withMetadata({ exis: undefined } as unknown as sharp.WriteableMetadata)
        .toBuffer();
      
      buffer = Buffer.from(cleanImageBuffer);

      // Generate LQIP blur base64 placeholder (16px WebP, blur 10)
      const lqipBuffer = await sharp(buffer)
        .resize(16, 16, { fit: "inside" })
        .blur(10)
        .toFormat("webp", { quality: 20 })
        .toBuffer();

      blurDataUrl = `data:image/webp;base64,${lqipBuffer.toString("base64")}`;
    }

    // 5. Content Hash SHA-256 for duplicate detection
    const contentHash = crypto.createHash("sha256").update(buffer).digest("hex");

    const { data: existingHash } = await supabaseAdmin
      .from("media_assets")
      .select("id, filename, storage_path")
      .eq("content_hash", contentHash)
      .maybeSingle();

    if (existingHash) {
      return NextResponse.json(
        {
          error: `Duplicate asset detected (SHA-256: ${contentHash.slice(0, 8)}). Already uploaded as '${existingHash.filename}'.`,
          existingAssetId: existingHash.id,
        },
        { status: 409 }
      );
    }

    // 6. Upload to Supabase Storage 'media' bucket
    const cleanFilename = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_").toLowerCase();
    const storagePath = `${pageKey}/${slotKey}/${Date.now()}_${cleanFilename}`;

    const { error: storageErr } = await supabaseAdmin.storage
      .from("media")
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (storageErr) {
      console.error("[STORAGE UPLOAD ERROR]", storageErr);
      return NextResponse.json(
        { error: `Storage upload failed: ${storageErr.message}` },
        { status: 500 }
      );
    }

    // 7. Insert row into public.media_assets
    const { data: mediaAsset, error: dbErr } = await supabaseAdmin
      .from("media_assets")
      .insert({
        storage_path: storagePath,
        filename: file.name,
        mime_type: mimeType,
        bytes: buffer.length,
        width,
        height,
        blur_data_url: blurDataUrl,
        alt_text: isDecorative ? null : altText,
        is_decorative: isDecorative,
        caption,
        credit,
        licence,
        provenance: (formData.get("provenance") as string) || "unknown",
        claim: formData.get("claim") === "true",
        focal_x: 0.5,
        focal_y: 0.5,
        content_hash: contentHash,
      })
      .select()
      .single();

    if (dbErr || !mediaAsset) {
      console.error("[MEDIA DB INSERT ERROR]", dbErr);
      return NextResponse.json(
        { error: "Failed to create database record for media asset." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      asset: mediaAsset,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Upload processing error";
    console.error("[MEDIA UPLOAD SYSTEM ERROR]", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
