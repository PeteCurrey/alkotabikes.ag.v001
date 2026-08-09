import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import DealersClient from "./DealersClient";

export const metadata: Metadata = {
  title: "Partner Network",
  description:
    "Alkota Partner Network. Alkota is establishing conversations with specialist retail and service partners ahead of planned production in 2028.",
  alternates: {
    canonical: `${siteUrl}/dealers`,
  },
  openGraph: {
    title: "Partner Network",
    description:
      "Alkota Partner Network. Alkota is establishing conversations with specialist retail and service partners ahead of planned production in 2028.",
    url: `${siteUrl}/dealers`,
  },
};

export default function DealersPage() {
  return <DealersClient />;
}
