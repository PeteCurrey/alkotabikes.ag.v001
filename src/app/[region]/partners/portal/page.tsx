import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import PartnersClient from "../PartnersClient";

export const metadata: Metadata = {
  title: "Partner Portal",
  description:
    "Alkota Partner Network portal. Access reserved for confirmed Alkota Partner Network members.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${siteUrl}/partners/portal`,
  },
};

export default function PartnerPortalPage() {
  return <PartnersClient />;
}
