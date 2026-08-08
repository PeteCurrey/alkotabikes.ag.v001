import React from "react";
import { Metadata } from "next";
import DealersClient from "./DealersClient";

export const metadata: Metadata = {
  title: "Alkota Partner Network | Dealer Recruitment",
  description:
    "Project 01 is being engineered around the complete ownership experience. Alkota is beginning conversations with specialist partners ahead of planned production in 2028.",
  openGraph: {
    title: "Alkota Partner Network | Dealer Recruitment",
    description:
      "Ahead of planned production in 2028, Alkota is beginning conversations with specialist partners who understand that side of the bicycle.",
  },
};

export default function DealersPage() {
  return <DealersClient />;
}
