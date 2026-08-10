import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import ContactClient from "./ContactClient";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/contact",
    title: "Contact Engineering",
    description: "Get in touch with Alkota Cycles engineering and customer support. Enquire about Project 01 development, technical specifications, or partner network.",
  });
}

export default function ContactPage() {
  return <ContactClient />;
}
