import React from "react";
import { Metadata } from "next";
import FAQClient from "./FAQClient";
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
    path: "/faq",
    title: "Frequently Asked Questions — Alkota Cycles",
    description:
      "Frequently asked questions regarding Alkota Project 01 development, reservation register, fit methodology, partner network, and ownership.",
  });
}

export default async function FAQPage() {
  return <FAQClient />;
}
