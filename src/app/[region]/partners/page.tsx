import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import DealersClient from "../dealers/DealersClient";

export const metadata: Metadata = {
  title: "Partner Network Recruitment",
  description:
    "Alkota Partner Network recruitment. Alkota is establishing conversations with specialist retail and service partners ahead of planned production in 2028.",
  alternates: {
    canonical: `${siteUrl}/partners`,
  },
  openGraph: {
    title: "Partner Network Recruitment",
    description:
      "Alkota Partner Network recruitment. Alkota is establishing conversations with specialist retail and service partners ahead of planned production in 2028.",
    url: `${siteUrl}/partners`,
  },
};

export default function PartnersPage() {
  return <DealersClient />;
}
