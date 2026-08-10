import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import DesignArchiveClient from "./DesignArchiveClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/project-01/design-archive",
    title: "Project 01 Design Archive | Alkota",
    description: "Explore the sketches, geometry studies, suspension development, carbon work and engineering artifacts behind Alkota Project 01. The drawings behind the machine.",
  });
}

export default function DesignArchivePage() {
  return <DesignArchiveClient />;
}
