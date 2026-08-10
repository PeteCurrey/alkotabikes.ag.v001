import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import RoadTo2028Client from "./RoadTo2028Client";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/road-to-2028",
    title: "Road to 2028 | Alkota Project 01 Development",
    description: "One bike. Three stages. Engineer it. Race it. Build it. Follow the development timeline of Alkota Project 01 from engineering to 2028 production launch.",
  });
}

export default function RoadTo2028Page() {
  return <RoadTo2028Client />;
}
