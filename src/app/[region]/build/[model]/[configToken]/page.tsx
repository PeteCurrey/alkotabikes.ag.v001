import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import ConfiguratorClient from "@/components/configurator/ConfiguratorClient";
import { ConfiguratorVersionSnapshot } from "@/lib/configurator/types";
import { buildRegionalMetadata } from "@/lib/metadata";
import { RegionCode } from "@/lib/regions";

interface PageProps {
  params: Promise<{ region: string; model: string; configToken: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, model, configToken } = await params;
  const regionCode = (region === "us" ? "us" : "uk") as RegionCode;

  const baseMeta = buildRegionalMetadata({
    title: `Saved ${model.toUpperCase()} Specification (${configToken}) | ALKOTA Cycles`,
    description: `Restored custom build specification for Alkota ${model}.`,
    path: `/${region}/build/${model}`,
    region: regionCode,
  });

  return {
    ...baseMeta,
    alternates: {
      canonical: `https://alkotacycles.com/${region}/build/${model}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function RestoredConfiguratorPage({ params }: PageProps) {
  const { region, model, configToken } = await params;

  // 1. Fetch saved build by token
  const { data: savedBuild } = await supabaseAdmin
    .from("saved_builds")
    .select("selections, version_id, view_count")
    .eq("token", configToken)
    .single();

  if (!savedBuild) {
    notFound();
  }

  // Increment view count
  await supabaseAdmin
    .from("saved_builds")
    .update({ view_count: (savedBuild.view_count || 0) + 1 })
    .eq("token", configToken);

  // 2. Fetch specific version snapshot referenced by saved build
  const { data: versionRow } = await supabaseAdmin
    .from("configurator_versions")
    .select("snapshot")
    .eq("id", savedBuild.version_id)
    .single();

  if (!versionRow || !versionRow.snapshot) {
    notFound();
  }

  const snapshot = versionRow.snapshot as ConfiguratorVersionSnapshot;
  const selections = (savedBuild.selections as Record<string, string>) || {};

  return (
    <ConfiguratorClient
      snapshot={snapshot}
      restoredSelections={selections}
      restoredToken={configToken}
      region={region}
    />
  );
}
