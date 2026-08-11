import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import ConfiguratorClient from "@/components/configurator/ConfiguratorClient";
import { ConfiguratorVersionSnapshot } from "@/lib/configurator/types";
import { buildRegionalMetadata } from "@/lib/metadata";
import { RegionCode } from "@/lib/regions";

interface PageProps {
  params: Promise<{ region: string; model: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, model } = await params;
  const regionCode = (region === "us" ? "us" : "uk") as RegionCode;

  return buildRegionalMetadata({
    title: `${model.toUpperCase()} Build Configurator | ALKOTA Cycles`,
    description: `Configure your ${model} development platform specification across chassis, suspension, and components.`,
    path: `/${region}/build/${model}`,
    region: regionCode,
  });
}

export default async function ConfiguratorPage({ params }: PageProps) {
  const { region, model } = await params;

  // Fetch published model
  const { data: modelRow } = await supabaseAdmin
    .from("configurator_models")
    .select("id, slug, name")
    .eq("slug", model)
    .single();

  if (!modelRow) {
    notFound();
  }

  // Fetch published version snapshot
  const { data: versionRow } = await supabaseAdmin
    .from("configurator_versions")
    .select("snapshot")
    .eq("model_id", modelRow.id)
    .eq("status", "published")
    .order("version", { ascending: false })
    .limit(1)
    .single();

  if (!versionRow || !versionRow.snapshot) {
    notFound();
  }

  const snapshot = versionRow.snapshot as ConfiguratorVersionSnapshot;

  return <ConfiguratorClient snapshot={snapshot} region={region} />;
}
