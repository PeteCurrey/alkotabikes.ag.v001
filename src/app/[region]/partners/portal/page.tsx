import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import PortalShell from "@/components/partner/PortalShell";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/partners/portal",
    title: "Partner Portal",
    description: "Alkota Partner Network portal. Dashboard, commercial terms, demo fleet, lead management, orders, warranty claims, resources, and certification.",
  });
}

export default async function PartnerPortalPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (resolvedParams.region === "uk" ? "uk" : "us") as RegionCode;

  return <PortalShell regionCode={regionCode} />;
}
