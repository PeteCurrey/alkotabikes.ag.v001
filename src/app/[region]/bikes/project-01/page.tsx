import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import Project01PageClient from "./Project01PageClient";
import ProductSchema from "@/components/schema/ProductSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/bikes/project-01",
    title: "Project 01 Mountain Bike",
    description: "Project 01 is the flagship technical development platform by Alkota Cycles. Aggressive all-mountain engineering with Horst-style four-bar kinematics.",
  });
}

export default function Project01Page() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Bikes", path: "/bikes" },
    { name: "Project 01", path: "/bikes/project-01" },
  ];

  return (
    <>
      <ProductSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <Project01PageClient />
    </>
  );
}
