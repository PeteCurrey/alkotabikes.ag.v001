import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import { validateVersionForPublish } from "@/lib/configurator/validation";
import { ConfiguratorVersionSnapshot } from "@/lib/configurator/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized. Admin permission required." }, { status: 403 });
    }

    const { model: modelSlug } = await params;

    // 1. Fetch model record
    const { data: modelRow } = await supabaseAdmin
      .from("configurator_models")
      .select("*")
      .eq("slug", modelSlug)
      .single();

    if (!modelRow) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    // 2. Fetch groups, options, prices, rules, presets, geometry, fit bands
    const { data: groups } = await supabaseAdmin
      .from("option_groups")
      .select("*, options(*, option_prices(*))")
      .eq("model_id", modelRow.id)
      .order("step_position", { ascending: true });

    const { data: rules } = await supabaseAdmin
      .from("configurator_rules")
      .select("*")
      .eq("model_id", modelRow.id)
      .order("priority", { ascending: true });

    const { data: presets } = await supabaseAdmin
      .from("configurator_presets")
      .select("*")
      .eq("model_id", modelRow.id)
      .order("sort_position", { ascending: true });

    const { data: geometry } = await supabaseAdmin
      .from("frame_geometry")
      .select("*")
      .eq("model_id", modelRow.id);

    const { data: fitBands } = await supabaseAdmin
      .from("rider_fit_bands")
      .select("*")
      .eq("model_id", modelRow.id);

    // 3. Find latest version number
    const { data: lastVer } = await supabaseAdmin
      .from("configurator_versions")
      .select("version")
      .eq("model_id", modelRow.id)
      .order("version", { ascending: false })
      .limit(1)
      .single();

    const nextVersion = (lastVer?.version || 0) + 1;

    // 4. Transform options into map structure for snapshot
    const formattedGroups = (groups || []).map((g: any) => ({
      ...g,
      options: (g.options || []).map((o: any) => {
        const pricesMap: Record<string, any> = {};
        for (const p of o.option_prices || []) {
          pricesMap[p.currency] = p;
        }
        return {
          ...o,
          prices: pricesMap,
        };
      }),
    }));

    const snapshot: ConfiguratorVersionSnapshot = {
      id: `snapshot-v${nextVersion}`,
      model_id: modelRow.id,
      model_slug: modelRow.slug,
      model_name: modelRow.name,
      version: nextVersion,
      base_price_minor: modelRow.base_price_minor || 450000,
      currency_defaults: modelRow.currency_defaults || { GB: "GBP", US: "USD" },
      markets: modelRow.markets || ["GB", "US"],
      groups: formattedGroups,
      rules: rules || [],
      presets: presets || [],
      geometry: geometry || [],
      fit_bands: fitBands || [],
      published_at: new Date().toISOString(),
    };

    // 5. RUN AUTHORING SAFETY VALIDATION
    const validation = validateVersionForPublish(snapshot);

    if (!validation.isValidForPublish) {
      return NextResponse.json(
        {
          error: "Publish blocked by validation errors.",
          validationErrors: validation.errors,
          validationWarnings: validation.warnings,
        },
        { status: 400 }
      );
    }

    // 6. Mark previous published versions as superseded
    await supabaseAdmin
      .from("configurator_versions")
      .update({ status: "superseded" })
      .eq("model_id", modelRow.id)
      .eq("status", "published");

    // 7. Insert published version record
    const { data: newVersion, error: verErr } = await supabaseAdmin
      .from("configurator_versions")
      .insert({
        model_id: modelRow.id,
        version: nextVersion,
        status: "published",
        snapshot,
        published_at: new Date().toISOString(),
        published_by: null,
        note: `Published version ${nextVersion}`,
      })
      .select("id, version, status, published_at")
      .single();

    if (verErr || !newVersion) {
      return NextResponse.json({ error: "Failed to insert version snapshot" }, { status: 500 });
    }

    // Update model status
    await supabaseAdmin
      .from("configurator_models")
      .update({ status: "published", updated_at: new Date().toISOString() })
      .eq("id", modelRow.id);

    // Revalidate cache tag
    revalidateTag(`configurator:${modelSlug}`);

    return NextResponse.json({
      success: true,
      version: newVersion.version,
      publishedAt: newVersion.published_at,
      warnings: validation.warnings,
    });
  } catch (err: unknown) {
    console.error("Publish configurator version error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
