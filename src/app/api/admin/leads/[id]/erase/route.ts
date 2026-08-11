import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as crypto from "crypto";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized — Owner role required" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Fetch lead record first to get email for hashing
    const { data: lead, error: fetchErr } = await supabaseAdmin
      .from("leads")
      .select("id, email, lead_type")
      .eq("id", id)
      .single();

    if (fetchErr || !lead) {
      return NextResponse.json({ error: "Lead record not found" }, { status: 404 });
    }

    // Hash the email address with salt for the audit log
    const salt = process.env.IP_HASH_SALT || "alkota_ip_salt_2028";
    const hashedEmail = crypto.createHash("sha256").update(`${lead.email}:${salt}`).digest("hex");

    // Perform hard delete (cascade handles notes and events)
    const { error: deleteErr } = await supabaseAdmin
      .from("leads")
      .delete()
      .eq("id", id);

    if (deleteErr) {
      throw deleteErr;
    }

    // Attempt to log erasure event to admin_audit_log if table exists
    try {
      await supabaseAdmin.from("admin_audit_log").insert({
        actor_id: null,
        actor_role: "OWNER",
        action: "DATA_SUBJECT_ERASURE",
        entity_type: "lead",
        entity_id: id,
        changes: {
          erased_lead_id: id,
          hashed_email: hashedEmail,
          lead_type: lead.lead_type,
          legal_basis: "UK GDPR Article 17 — Right to Erasure",
          erased_at: new Date().toISOString(),
        },
      });
    } catch {
      // Table might not exist prior to Phase 0; ignore non-critical audit log failure
    }

    return NextResponse.json({
      success: true,
      erasedLeadId: id,
      hashedEmail,
      message: "Lead record and all associated data permanently erased.",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Erasure Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
