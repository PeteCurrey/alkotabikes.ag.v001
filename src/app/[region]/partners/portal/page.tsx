import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import type { RegionCode } from "@/lib/regions";
import PortalShell from "@/components/partner/PortalShell";

export const metadata: Metadata = {
  title: "Partner Portal",
  description:
    "Alkota Partner Network portal. Dashboard, commercial terms, demo fleet, lead management, orders, warranty claims, resources, and certification.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${siteUrl}/partners/portal`,
  },
};

export default async function PartnerPortalPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (resolvedParams.region === "uk" ? "uk" : "us") as RegionCode;

  return <PortalShell regionCode={regionCode} />;
}
