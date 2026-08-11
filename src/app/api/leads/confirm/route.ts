import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Confirmation token is missing" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // 1. Look up lead by optin_token
    const { data: lead, error: findErr } = await supabaseAdmin
      .from("leads")
      .select("id, email, locale, optin_token_expires_at")
      .eq("optin_token", token)
      .maybeSingle();

    if (findErr || !lead) {
      return NextResponse.json(
        { error: "Invalid or expired confirmation link." },
        { status: 404 }
      );
    }

    // Check expiry
    if (lead.optin_token_expires_at && new Date(lead.optin_token_expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Confirmation link has expired. Please resubscribe." },
        { status: 410 }
      );
    }

    // 2. Set double_optin_at and clear token
    const { error: updateErr } = await supabaseAdmin
      .from("leads")
      .update({
        double_optin_at: now,
        optin_token: null,
        optin_token_expires_at: null,
        updated_at: now,
      })
      .eq("id", lead.id);

    if (updateErr) {
      console.error("[CONFIRMATION UPDATE ERROR]", updateErr);
      return NextResponse.json(
        { error: "Failed to confirm subscription. Please try again." },
        { status: 500 }
      );
    }

    // 3. Insert lead_event
    await supabaseAdmin.from("lead_events").insert({
      lead_id: lead.id,
      event_type: "optin_confirmed",
      payload: { token_used: token, confirmed_at: now },
    });

    // 4. Redirect to regional confirmation page
    const region = (lead.locale || "en-GB").toLowerCase().includes("us") ? "us" : "uk";
    const redirectUrl = new URL(`/${region}?confirmed=true`, request.url);

    return NextResponse.redirect(redirectUrl);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Confirmation error";
    console.error("[OPTIN CONFIRMATION ROUTE ERROR]", errorMessage);
    return NextResponse.json(
      { error: "Internal server error during confirmation." },
      { status: 500 }
    );
  }
}
