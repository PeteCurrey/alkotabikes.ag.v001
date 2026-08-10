import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import JournalHubClient from "./JournalHubClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/journal/project-01",
    title: "Project 01 Development Journal | Alkota",
    description: "You",
  });
}

export default function JournalHubPage() {
  return <JournalHubClient />;
}
