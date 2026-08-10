import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import type { RegionCode } from "@/lib/regions";
import PartnerRecruitmentClient from "./PartnerRecruitmentClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const isUS = region === "us";
  const title = isUS
    ? "US Partner Network Recruitment & Dealerships"
    : "UK Partner Network Recruitment";
  const description = isUS
    ? "Alkota US Partner Network recruitment. Establishing conversations with US retail, service, and demo partners ahead of 2028."
    : "Alkota UK Partner Network recruitment. Establishing conversations with UK retail and service partners ahead of planned 2028 production.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${region}/partners`,
      languages: {
        "en-GB": `${siteUrl}/uk/partners`,
        "en-US": `${siteUrl}/us/partners`,
        "x-default": `${siteUrl}/us/partners`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${region}/partners`,
    },
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;

  return (
    <>
      {/* SSR Shell for Search Engine Indexing */}
      <div className="sr-only">
        <h2>ALKOTA PARTNER NETWORK CRITERIA ({regionCode.toUpperCase()})</h2>
        <ul>
          <li>APN-01: TECHNICAL COMPETENCE</li>
          <li>APN-02: CUSTOMER PHILOSOPHY</li>
          <li>APN-03: FIT CAPABILITY</li>
          <li>APN-04: BRAND ALIGNMENT</li>
        </ul>
      </div>
      <PartnerRecruitmentClient />
    </>
  );
}
