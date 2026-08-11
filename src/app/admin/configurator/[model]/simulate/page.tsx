import React from "react";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import SimulatorClient from "./SimulatorClient";
import { ConfiguratorVersionSnapshot } from "@/lib/configurator/types";

interface PageProps {
  params: Promise<{ model: string }>;
}

export default async function AdminConfiguratorSimulatorPage({ params }: PageProps) {
  const { model } = await params;

  // Fetch model
  const { data: modelRow } = await supabaseAdmin
    .from("configurator_models")
    .select("id, slug, name")
    .eq("slug", model)
    .single();

  if (!modelRow) notFound();

  // Fetch latest version or construct draft snapshot from live tables
  const { data: versionRow } = await supabaseAdmin
    .from("configurator_versions")
    .select("snapshot")
    .eq("model_id", modelRow.id)
    .order("version", { ascending: false })
    .limit(1)
    .single();

  let snapshot: ConfiguratorVersionSnapshot | null = null;
  if (versionRow) {
    snapshot = versionRow.snapshot as ConfiguratorVersionSnapshot;
  } else {
    // Construct inline snapshot for testing
    snapshot = {
      id: "draft-ver",
      model_id: modelRow.id,
      model_slug: modelRow.slug,
      model_name: modelRow.name,
      version: 1,
      base_price_minor: 450000,
      currency_defaults: { GB: "GBP", US: "USD" },
      markets: ["GB", "US"],
      groups: [],
      rules: [],
      presets: [],
      geometry: [],
      fit_bands: [],
    };
  }

  return <SimulatorClient snapshot={snapshot} modelSlug={model} />;
}
