import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";

export async function GET(request: Request) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const pageSize = Math.min(100, Math.max(10, Number(searchParams.get("pageSize") || "50")));
    const offset = (page - 1) * pageSize;

    let query = supabaseAdmin
      .from("media_assets")
      .select("*, content_slots(page_key, slot_key)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (search) {
      query = query.or(`filename.ilike.%${search}%,alt_text.ilike.%${search}%`);
    }

    const { data: rows, error, count } = await query;
    if (error) throw error;

    // Generate signed URLs in parallel (max 50 at a time)
    const assets = await Promise.all(
      (rows || []).map(async (row) => {
        let signedUrl: string | null = null;

        if (row.storage_path) {
          const { data } = await supabaseAdmin.storage
            .from("media")
            .createSignedUrl(row.storage_path, 3600);
          signedUrl = data?.signedUrl || null;
        }

        // Collect which content slots reference this asset
        const usedIn = (row.content_slots || []).map(
          (s: { page_key: string; slot_key: string }) => `${s.page_key}/${s.slot_key}`
        );

        const { content_slots: _slots, ...asset } = row;
        void _slots;
        return { ...asset, signedUrl, usedIn };
      })
    );

    return NextResponse.json({
      assets,
      total: count ?? 0,
      page,
      pageSize,
      pages: Math.ceil((count ?? 0) / pageSize),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error listing assets";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
