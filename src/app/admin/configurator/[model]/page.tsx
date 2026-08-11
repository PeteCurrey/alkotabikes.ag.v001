import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import ModelStudioClient from "./ModelStudioClient";

interface PageProps {
  params: Promise<{ model: string }>;
}

export default async function AdminConfiguratorModelStudioPage({ params }: PageProps) {
  const { model } = await params;

  // Fetch model record
  const { data: modelRow } = await supabaseAdmin
    .from("configurator_models")
    .select("id, slug, name, subtitle, status, base_price_minor, currency_defaults, markets")
    .eq("slug", model)
    .single();

  if (!modelRow) notFound();

  // Fetch option groups with options
  const { data: groups } = await supabaseAdmin
    .from("option_groups")
    .select("*, options(*, option_prices(*))")
    .eq("model_id", modelRow.id)
    .order("step_position", { ascending: true });

  // Fetch rules
  const { data: rules } = await supabaseAdmin
    .from("configurator_rules")
    .select("*")
    .eq("model_id", modelRow.id)
    .order("priority", { ascending: true });

  // Fetch presets
  const { data: presets } = await supabaseAdmin
    .from("configurator_presets")
    .select("*")
    .eq("model_id", modelRow.id)
    .order("sort_position", { ascending: true });

  // Fetch versions
  const { data: versions } = await supabaseAdmin
    .from("configurator_versions")
    .select("id, version, status, published_at, note")
    .eq("model_id", modelRow.id)
    .order("version", { ascending: false });

  return (
    <ModelStudioClient
      model={modelRow}
      groups={groups || []}
      rules={rules || []}
      presets={presets || []}
      versions={versions || []}
    />
  );
}
