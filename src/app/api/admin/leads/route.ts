import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";

export async function GET(request: Request) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const search = searchParams.get("search")?.trim() || "";
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";
    const consent = searchParams.get("consent") || "";
    const locale = searchParams.get("locale") || "";

    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from("leads")
      .select("*", { count: "exact" });

    if (type) query = query.eq("lead_type", type);
    if (status) query = query.eq("status", status);
    if (locale) query = query.eq("locale", locale);
    if (consent === "true") query = query.eq("marketing_consent", true);
    if (consent === "false") query = query.eq("marketing_consent", false);

    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%,message.ilike.%${search}%`);
    }

    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

    const { data: leads, count, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      leads: leads || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error fetching leads";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { leadId, action, status, noteBody } = body;

    if (!leadId) {
      return NextResponse.json({ error: "leadId is required" }, { status: 400 });
    }

    if (action === "update_status") {
      if (!status) {
        return NextResponse.json({ error: "status is required" }, { status: 400 });
      }

      const { error: updateErr } = await supabaseAdmin
        .from("leads")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", leadId);

      if (updateErr) throw updateErr;

      // Append status_changed event
      await supabaseAdmin.from("lead_events").insert({
        lead_id: leadId,
        event_type: "status_changed",
        payload: { new_status: status },
      });

      return NextResponse.json({ success: true });
    }

    if (action === "add_note") {
      if (!noteBody || noteBody.trim() === "") {
        return NextResponse.json({ error: "Note body is required" }, { status: 400 });
      }

      const { data: newNote, error: noteErr } = await supabaseAdmin
        .from("lead_notes")
        .insert({
          lead_id: leadId,
          body: noteBody.trim(),
        })
        .select()
        .single();

      if (noteErr) throw noteErr;

      // Append note_added event
      await supabaseAdmin.from("lead_events").insert({
        lead_id: leadId,
        event_type: "note_added",
        payload: { note_id: newNote.id },
      });

      return NextResponse.json({ success: true, note: newNote });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error updating lead";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
