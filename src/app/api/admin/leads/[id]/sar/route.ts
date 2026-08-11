import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Fetch lead record
    const { data: lead, error: leadErr } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();

    if (leadErr || !lead) {
      return NextResponse.json({ error: "Lead record not found" }, { status: 404 });
    }

    // Fetch notes
    const { data: notes } = await supabaseAdmin
      .from("lead_notes")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: true });

    // Fetch events
    const { data: events } = await supabaseAdmin
      .from("lead_events")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: true });

    const sarData = {
      subject_access_request: {
        exported_at: new Date().toISOString(),
        data_controller: "Alkota Cycles",
        legal_basis: "UK GDPR Article 15 — Right of Access by the Data Subject",
      },
      lead_profile: lead,
      lead_notes: notes || [],
      lead_audit_events: events || [],
    };

    const filename = `sar-export-${lead.email.replace(/[^a-z0-9]/gi, "_")}-${Date.now()}.json`;

    return new NextResponse(JSON.stringify(sarData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "SAR Export Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
