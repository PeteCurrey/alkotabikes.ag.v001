import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import PortalLoginClient from "./PortalLoginClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/partners/portal/login",
    title: "Partner Portal Login",
    description: "Alkota Partner Network passwordless magic-link authentication.",
  });
}

export default async function PartnerPortalLoginPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  return <PortalLoginClient region={region} />;
}
