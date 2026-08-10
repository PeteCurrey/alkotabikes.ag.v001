import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import JournalClient from "./JournalClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/journal",
    title: "Engineering Journal & Technical Archive",
    description: "Official unified development journal from Alkota Cycles. Technical dispatches, chassis kinematics papers, materials testing notes, and design archive records.",
  });
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  return <JournalClient initialTagParam={params?.tag} />;
}
