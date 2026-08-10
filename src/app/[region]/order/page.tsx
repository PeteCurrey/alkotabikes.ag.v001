import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import OrderClient from "./OrderClient";
import FAQSchema from "@/components/schema/FAQSchema";
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
    path: "/order",
    title: "Project 01 Registration",
    description: "Join the Project 01 interest register with Alkota Cycles. Reserve your build slot for the pre-production development allocation pipeline.",
  });
}

export default function OrderPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Order Register", path: "/order" },
  ];

  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <OrderClient />
    </>
  );
}
