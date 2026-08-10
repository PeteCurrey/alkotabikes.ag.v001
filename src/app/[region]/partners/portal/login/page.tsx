import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import PortalLoginClient from "./PortalLoginClient";

export const metadata: Metadata = {
  title: "Partner Portal Login",
  description: "Alkota Partner Network passwordless magic-link authentication.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${siteUrl}/partners/portal/login`,
  },
};

export default async function PartnerPortalLoginPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  return <PortalLoginClient region={region} />;
}
