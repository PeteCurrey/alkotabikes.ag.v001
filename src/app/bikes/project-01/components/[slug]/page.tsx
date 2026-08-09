import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import { PROJECT_01_SYSTEMS } from "@/lib/data/project01";
import { notFound } from "next/navigation";
import ComponentDetailClient from "./ComponentDetailClient";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export async function generateStaticParams() {
  return PROJECT_01_SYSTEMS.map((sys) => ({ slug: sys.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = PROJECT_01_SYSTEMS.find((s) => s.slug === slug);

  if (!component) {
    return {
      title: "Component Not Found | Alkota Cycles",
    };
  }

  const title = `${component.brand} ${component.model} | Alkota Cycles`;
  const description = `Technical integration details for the ${component.brand} ${component.model} on the Alkota Cycles Project 01 chassis baseline.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/bikes/project-01/components/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/bikes/project-01/components/${slug}`,
    },
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = PROJECT_01_SYSTEMS.find((s) => s.slug === slug);

  if (!component) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Bikes", path: "/bikes" },
    { name: "Project 01", path: "/bikes/project-01" },
    { name: component.model, path: `/bikes/project-01/components/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ComponentDetailClient component={component} />
    </>
  );
}
