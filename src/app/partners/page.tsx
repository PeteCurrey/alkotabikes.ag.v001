import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Partner Portal | Alkota Cycles",
  description:
    "Alkota Partner Network partner portal. Access reserved for confirmed Alkota Partner Network members.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${siteUrl}/partners`,
  },
};

export default function PartnersPage() {
  return <PartnersClient />;
}
