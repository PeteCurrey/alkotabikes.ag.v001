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
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";
    const consent = searchParams.get("consent") || "";
    const locale = searchParams.get("locale") || "";

    let query = supabaseAdmin.from("leads").select("*");

    if (type) query = query.eq("lead_type", type);
    if (status) query = query.eq("status", status);
    if (locale) query = query.eq("locale", locale);
    if (consent === "true") query = query.eq("marketing_consent", true);
    if (consent === "false") query = query.eq("marketing_consent", false);

    query = query.order("created_at", { ascending: false });

    const { data: leads, error } = await query;

    if (error || !leads) {
      throw error || new Error("No data found");
    }

    // Insert exported event into lead_events for compliance tracking
    const eventInserts = leads.map((l) => ({
      lead_id: l.id,
      event_type: "exported" as const,
      payload: { exported_at: new Date().toISOString(), filters: { type, status, consent, locale } },
    }));

    if (eventInserts.length > 0) {
      await supabaseAdmin.from("lead_events").insert(eventInserts);
    }

    // Build CSV content
    const headers = [
      "ID",
      "Email",
      "Full Name",
      "Phone",
      "Lead Type",
      "Status",
      "Marketing Consent",
      "Consent Date",
      "Double Opt-in Date",
      "Source Page",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Locale",
      "Country Code",
      "Created At",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.full_name || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      l.lead_type,
      l.status,
      l.marketing_consent ? "YES" : "NO",
      l.consent_at || "",
      l.double_optin_at || "",
      `"${(l.source_page || "").replace(/"/g, '""')}"`,
      `"${(l.utm_source || "").replace(/"/g, '""')}"`,
      `"${(l.utm_medium || "").replace(/"/g, '""')}"`,
      `"${(l.utm_campaign || "").replace(/"/g, '""')}"`,
      l.locale || "",
      l.country_code || "",
      l.created_at,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const filename = `alkota-leads-export-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "CSV Export Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
