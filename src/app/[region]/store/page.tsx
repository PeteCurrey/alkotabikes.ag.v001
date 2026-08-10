import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import StoreClient from "./StoreClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/store",
    title: "Alkota Supply Store",
    description: "Alkota Supply — workshop apparel, equipment and accessories developed during the Project 01 mountain bike development programme.",
  });
}

export default function StorePage() {
  return <StoreClient />;
}
