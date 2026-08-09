import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import StoreClient from "./StoreClient";

export const metadata: Metadata = {
  title: "Alkota Supply Store",
  description:
    "Alkota Supply — workshop apparel, equipment and accessories developed during the Project 01 mountain bike development programme.",
  alternates: {
    canonical: `${siteUrl}/store`,
  },
  openGraph: {
    title: "Alkota Supply Store",
    description:
      "Alkota Supply — workshop apparel, equipment and accessories developed during the Project 01 mountain bike development programme.",
    url: `${siteUrl}/store`,
  },
};

export default function StorePage() {
  return <StoreClient />;
}
