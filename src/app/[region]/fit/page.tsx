import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import FitClient from "./FitClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/fit",
    title: "Rider Fit Engine | Alkota Project 01",
    description: "The rider is part of the geometry. Use dimensions, riding style and priorities to create a controlled development fit direction for Project 01.",
  });
}

export default function FitPage() {
  return <FitClient />;
}
