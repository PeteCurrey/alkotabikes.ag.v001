import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import OrderClient from "./OrderClient";
import FAQSchema from "@/components/schema/FAQSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Project 01 Registration | Alkota Cycles",
  description:
    "Join the Project 01 interest register with Alkota Cycles. Reserve your build slot for the pre-production development allocation pipeline.",
  alternates: {
    canonical: `${siteUrl}/order`,
  },
  openGraph: {
    title: "Project 01 Registration | Alkota Cycles",
    description:
      "Join the Project 01 interest register with Alkota Cycles. Reserve your build slot for the pre-production development allocation pipeline.",
    url: `${siteUrl}/order`,
  },
};

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
