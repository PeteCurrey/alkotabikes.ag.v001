import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { CMS_REGISTRY } from "@/lib/cms/registry";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { pageKey } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en-GB";

    const { data: slots, error } = await supabaseAdmin
      .from("content_slots")
      .select("*, media_assets(*)")
      .eq("page_key", pageKey)
      .eq("locale", locale);

    if (error) throw error;

    return NextResponse.json({ slots: slots || [] });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching content slots";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { pageKey } = await params;
    const body = await request.json();
    const { slot_key, media_id, value_text, value_json, locale = "en-GB" } = body;

    if (!slot_key) {
      return NextResponse.json({ error: "slot_key is required" }, { status: 400 });
    }

    // Verify slot definition exists in registry
    const pageDef = CMS_REGISTRY.find((p) => p.pageKey === pageKey);
    const slotDef = pageDef?.slots.find((s) => s.slotKey === slot_key);

    if (!slotDef) {
      return NextResponse.json(
        { error: `Slot '${slot_key}' is not defined in the CMS registry for page '${pageKey}'.` },
        { status: 400 }
      );
    }

    const { data: updatedSlot, error: upsertErr } = await supabaseAdmin
      .from("content_slots")
      .upsert(
        {
          page_key: pageKey,
          slot_key,
          slot_type: slotDef.type,
          media_id: media_id || null,
          value_text: value_text || null,
          value_json: value_json || null,
          locale,
          is_required: slotDef.required,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "page_key,slot_key,locale" }
      )
      .select("*, media_assets(*)")
      .single();

    if (upsertErr || !updatedSlot) {
      throw upsertErr || new Error("Failed to update slot");
    }

    // Purge CDN / Next.js cache for this page
    revalidateTag(`cms:${pageKey}`);

    return NextResponse.json({
      success: true,
      slot: updatedSlot,
      revalidated: `cms:${pageKey}`,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating slot";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
