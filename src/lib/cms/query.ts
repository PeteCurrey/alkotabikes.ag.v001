/**
 * ALKOTA CYCLES — CMS QUERY HELPER
 * src/lib/cms/query.ts
 *
 * Fetches content slots joined with media_assets.
 * Signed URLs (1 hour TTL) are generated at request time for private Supabase Storage delivery.
 */

import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { CMS_REGISTRY } from "./registry";

export interface ResolvedSlot {
  pageKey: string;
  slotKey: string;
  slotType: string;
  valueText: string | null;
  valueJson: unknown | null;
  media: {
    id: string;
    storagePath: string;
    filename: string;
    mimeType: string;
    width: number | null;
    height: number | null;
    blurDataUrl: string | null;
    altText: string | null;
    isDecorative: boolean;
    focalX: number;
    focalY: number;
    signedUrl: string | null;
  } | null;
}

export async function getSlot(
  pageKey: string,
  slotKey: string,
  locale: string = "en-GB"
): Promise<ResolvedSlot | null> {
  try {
    // 1. Query database for content slot joined with media asset
    const { data: slotRow, error } = await supabaseAdmin
      .from("content_slots")
      .select("*, media_assets(*)")
      .eq("page_key", pageKey)
      .eq("slot_key", slotKey)
      .eq("locale", locale)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error(`[CMS QUERY ERROR] (${pageKey}/${slotKey}):`, error);
    }

    if (slotRow) {
      const ma = slotRow.media_assets;
      let signedUrl: string | null = null;

      if (ma && ma.storage_path) {
        // Generate short-lived signed URL (3600s TTL = 1 hour)
        const { data: signedData } = await supabaseAdmin.storage
          .from("media")
          .createSignedUrl(ma.storage_path, 3600);

        signedUrl = signedData?.signedUrl || null;
      }

      return {
        pageKey: slotRow.page_key,
        slotKey: slotRow.slot_key,
        slotType: slotRow.slot_type,
        valueText: slotRow.value_text,
        valueJson: slotRow.value_json,
        media: ma
          ? {
              id: ma.id,
              storagePath: ma.storage_path,
              filename: ma.filename,
              mimeType: ma.mime_type,
              width: ma.width,
              height: ma.height,
              blurDataUrl: ma.blur_data_url,
              altText: ma.alt_text,
              isDecorative: ma.is_decorative,
              focalX: Number(ma.focal_x ?? 0.5),
              focalY: Number(ma.focal_y ?? 0.5),
              signedUrl,
            }
          : null,
      };
    }

    // Fallback: look up in CMS registry definition for dev / unseeded state
    const pageDef = CMS_REGISTRY.find((p) => p.pageKey === pageKey);
    const slotDef = pageDef?.slots.find((s) => s.slotKey === slotKey);

    if (slotDef) {
      return {
        pageKey,
        slotKey,
        slotType: slotDef.type,
        valueText: slotDef.fallbackText || null,
        valueJson: null,
        media: slotDef.fallbackAssetPath
          ? {
              id: "fallback-id",
              storagePath: slotDef.fallbackAssetPath,
              filename: slotDef.fallbackAssetPath.split("/").pop() || "image.jpg",
              mimeType: "image/jpeg",
              width: 1920,
              height: 1080,
              blurDataUrl: null,
              altText: slotDef.label,
              isDecorative: false,
              focalX: 0.5,
              focalY: 0.5,
              signedUrl: slotDef.fallbackAssetPath, // Direct path fallback
            }
          : null,
      };
    }

    return null;
  } catch (err) {
    console.error(`[CMS QUERY SYSTEM ERROR] (${pageKey}/${slotKey}):`, err);
    return null;
  }
}
