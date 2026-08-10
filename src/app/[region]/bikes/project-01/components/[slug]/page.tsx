import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
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
  params: Promise<{ region: string; slug?: string }>;
}): Promise<Metadata> {
  const { region, slug } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const pageSlug = slug ?? "";
  const displayTitle = pageSlug ? `Component Not Found — ${pageSlug.replace(/-/g, " ").toUpperCase()}` : "Component Not Found";
  return buildRegionalMetadata({
    region: regionCode,
    path: `/bikes/project-01/components/${pageSlug}`,
    title: displayTitle,
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
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
