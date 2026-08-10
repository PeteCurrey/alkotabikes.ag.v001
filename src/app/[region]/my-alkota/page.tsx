import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import MyAlkotaClient from "./MyAlkotaClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/my-alkota",
    title: "My Alkota | Owner Portal",
    description: "Your Alkota development membership. Manage your Project 01 registration, saved build, fit reference and development updates.",
  });
}

export default function MyAlkotaPage() {
  return <MyAlkotaClient />;
}
