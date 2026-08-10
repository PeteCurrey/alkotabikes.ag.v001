import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import CookiesClient from "./CookiesClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const isUS = region === "us";
  const title = isUS
    ? "Cookie Notice & Opt-Out Preferences (US)"
    : "Cookie Policy & Privacy Preferences";
  const description = isUS
    ? "US cookie disclosure, opt-out mechanisms, Global Privacy Control (GPC) signal integration, and storage technology register."
    : "Categorisation of storage technologies, PECR consent rules, tag control, and technology register.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${region}/cookies`,
      languages: {
        "en-GB": `${siteUrl}/uk/cookies`,
        "en-US": `${siteUrl}/us/cookies`,
        "x-default": `${siteUrl}/us/cookies`,
      },
    },
    openGraph: {
      title: `${title} | Alkota Cycles`,
      description,
      url: `${siteUrl}/${region}/cookies`,
    },
  };
}

export default async function CookiesPage() {
  return <CookiesClient />;
}
