import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import { getRegion, isValidRegion, RegionCode, VALID_REGIONS } from "@/lib/regions";
import { RegionProvider } from "@/components/region/RegionProvider";
import RegionBanner from "@/components/region/RegionBanner";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return VALID_REGIONS.map((region) => ({ region }));
}

interface RegionalLayoutProps {
  children: React.ReactNode;
  params: Promise<{ region: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  if (!isValidRegion(region)) {
    return {};
  }

  const currentRegion = getRegion(region);
  const currentUrl = `${siteUrl}/${region}`;

  return {
    alternates: {
      canonical: currentUrl,
      languages: {
        "en-GB": `${siteUrl}/uk`,
        "en-US": `${siteUrl}/us`,
        "x-default": `${siteUrl}/us`,
      },
    },
  };
}

export default async function RegionalLayout({
  children,
  params,
}: RegionalLayoutProps) {
  const { region } = await params;

  if (!isValidRegion(region)) {
    notFound();
  }

  const regionCode = region as RegionCode;

  return (
    <RegionProvider regionCode={regionCode}>
      <RegionBanner />
      {children}
    </RegionProvider>
  );
}
