import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import JournalClient from "./JournalClient";

export const metadata: Metadata = {
  title: "Engineering Journal & Technical Archive | Alkota Cycles",
  description:
    "Official unified development journal from Alkota Cycles. Technical dispatches, chassis kinematics papers, materials testing notes, and design archive records.",
  alternates: {
    canonical: `${siteUrl}/journal`,
  },
  openGraph: {
    title: "Engineering Journal & Technical Archive | Alkota Cycles",
    description:
      "Official unified development journal from Alkota Cycles. Technical dispatches, chassis kinematics papers, materials testing notes, and design archive records.",
    url: `${siteUrl}/journal`,
  },
};

export default function JournalPage() {
  return <JournalClient />;
}
