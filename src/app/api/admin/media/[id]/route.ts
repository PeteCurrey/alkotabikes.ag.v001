import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const updates: Record<string, unknown> = {};

    if ("alt_text" in body) updates.alt_text = body.alt_text?.trim() || null;
    if ("is_decorative" in body) updates.is_decorative = Boolean(body.is_decorative);
    if ("focal_x" in body) updates.focal_x = Number(body.focal_x);
    if ("focal_y" in body) updates.focal_y = Number(body.focal_y);
    if ("caption" in body) updates.caption = body.caption?.trim() || null;
    if ("credit" in body) updates.credit = body.credit?.trim() || null;
    if ("licence" in body) updates.licence = body.licence;

    // Validate alt_text constraint
    const isDec = updates.is_decorative ?? false;
    const alt = (updates.alt_text as string) ?? null;

    if (!isDec && (!alt || alt.length < 5)) {
      return NextResponse.json(
        { error: "Meaningful alt_text (at least 5 characters) is required for non-decorative assets." },
        { status: 400 }
      );
    }

    const { data: updatedAsset, error } = await supabaseAdmin
      .from("media_assets")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error || !updatedAsset) {
      throw error || new Error("Asset not found");
    }

    return NextResponse.json({ success: true, asset: updatedAsset });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating media asset";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Check if asset is referenced in content_slots
    const { data: slots } = await supabaseAdmin
      .from("content_slots")
      .select("page_key, slot_key")
      .eq("media_id", id);

    if (slots && slots.length > 0) {
      const slotsList = slots.map((s) => `${s.page_key}/${s.slot_key}`).join(", ");
      return NextResponse.json(
        {
          error: `Cannot delete asset. It is currently in use on the following content slots: ${slotsList}`,
          referencingSlots: slots,
        },
        { status: 409 }
      );
    }

    // Get storage path to delete file from storage
    const { data: asset } = await supabaseAdmin
      .from("media_assets")
      .select("storage_path")
      .eq("id", id)
      .single();

    if (asset?.storage_path) {
      await supabaseAdmin.storage.from("media").remove([asset.storage_path]);
    }

    const { error: deleteErr } = await supabaseAdmin
      .from("media_assets")
      .delete()
      .eq("id", id);

    if (deleteErr) {
      throw deleteErr;
    }

    return NextResponse.json({ success: true, message: "Asset deleted successfully." });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error deleting asset";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
