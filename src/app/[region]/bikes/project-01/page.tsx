import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import Project01PageClient from "./Project01PageClient";
import ProductSchema from "@/components/schema/ProductSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Project 01 Mountain Bike",
  description:
    "Project 01 is the flagship technical development platform by Alkota Cycles. Aggressive all-mountain engineering with Horst-style four-bar kinematics.",
  alternates: {
    canonical: `${siteUrl}/bikes/project-01`,
  },
  openGraph: {
    title: "Project 01 Mountain Bike",
    description:
      "Project 01 is the flagship technical development platform by Alkota Cycles. Aggressive all-mountain engineering with Horst-style four-bar kinematics.",
    url: `${siteUrl}/bikes/project-01`,
    images: [
      {
        url: `${siteUrl}/images/project01-glacier-white-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Alkota Project 01 Mountain Bike Glacier White",
      },
    ],
  },
};

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
