import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { evaluateConfiguration } from "@/lib/configurator/engine";
import { ConfiguratorVersionSnapshot } from "@/lib/configurator/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { modelSlug, versionId, selections, market = "GB", sessionId, utm, leadEmail } = body;

    if (!modelSlug || !selections) {
      return NextResponse.json({ error: "Missing modelSlug or selections" }, { status: 400 });
    }

    // 1. Fetch published version snapshot from DB
    let versionSnapshot: ConfiguratorVersionSnapshot | null = null;

    if (versionId) {
      const { data: verRow } = await supabaseAdmin
        .from("configurator_versions")
        .select("snapshot")
        .eq("id", versionId)
        .single();
      if (verRow) versionSnapshot = verRow.snapshot as ConfiguratorVersionSnapshot;
    }

    if (!versionSnapshot) {
      // Fall back to current published version of model
      const { data: modelRow } = await supabaseAdmin
        .from("configurator_models")
        .select("id, slug")
        .eq("slug", modelSlug)
        .single();

      if (!modelRow) {
        return NextResponse.json({ error: "Configurator model not found" }, { status: 404 });
      }

      const { data: verRow } = await supabaseAdmin
        .from("configurator_versions")
        .select("id, snapshot")
        .eq("model_id", modelRow.id)
        .eq("status", "published")
        .order("version", { ascending: false })
        .limit(1)
        .single();

      if (!verRow) {
        return NextResponse.json({ error: "No published version available for model" }, { status: 404 });
      }

      versionSnapshot = verRow.snapshot as ConfiguratorVersionSnapshot;
    }

    // 2. SERVER-SIDE REVALIDATION AUTHORITY
    const engineResult = evaluateConfiguration(versionSnapshot, selections, market);

    // 3. Generate short unguessable token (12 chars base62/hex)
    const token = crypto.randomBytes(6).toString("hex");

    // 4. Optionally link lead if email provided
    let leadId: string | null = null;
    if (leadEmail) {
      const { data: leadRow } = await supabaseAdmin
        .from("leads")
        .select("id")
        .eq("email", leadEmail.toLowerCase())
        .limit(1)
        .single();

      if (leadRow) {
        leadId = leadRow.id;
      }
    }

    // 5. Insert saved build row
    const { data: savedBuild, error: insertErr } = await supabaseAdmin
      .from("saved_builds")
      .insert({
        token,
        model_id: versionSnapshot.model_id,
        version_id: versionSnapshot.id,
        selections: engineResult.resolvedSelections,
        computed_price_minor: engineResult.pricing.subtotalMinor,
        currency: engineResult.pricing.currency,
        market,
        is_valid: engineResult.isValid,
        lead_id: leadId,
        session_id: sessionId || null,
        utm: utm || null,
        status: "saved",
      })
      .select("id, token, computed_price_minor, currency, is_valid, created_at")
      .single();

    if (insertErr || !savedBuild) {
      console.error("Failed to save build:", insertErr);
      return NextResponse.json({ error: "Failed to persist saved build" }, { status: 500 });
    }

    // 6. Log analytics event
    await supabaseAdmin.from("configurator_events").insert({
      session_id: sessionId || null,
      saved_build_id: savedBuild.id,
      model_id: versionSnapshot.model_id,
      event_type: "saved",
      market,
      payload: { token: savedBuild.token, price: engineResult.pricing.subtotalMinor },
    });

    return NextResponse.json({
      success: true,
      token: savedBuild.token,
      shareUrl: `/build/${modelSlug}/${savedBuild.token}`,
      engineResult,
    });
  } catch (err: unknown) {
    console.error("Save build route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
