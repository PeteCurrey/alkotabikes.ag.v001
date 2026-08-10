import React from "react";
import { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";
import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/glossary",
    title: "Engineering Glossary — Alkota Cycles",
    description:
      "Comprehensive performance engineering glossary covering mountain bike kinematics, carbon structure, telemetry metrics, and suspension terminology.",
  });
}

export default async function GlossaryPage() {
  return <GlossaryClient />;
}
