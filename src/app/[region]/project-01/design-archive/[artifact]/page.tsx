import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtifactDetailClient from "./ArtifactDetailClient";
import { getAllPublicArtifacts, getArtifactBySlug } from "@/content/design/archive";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

interface Props {
  params: Promise<{ artifact: string }>;
}

export async function generateStaticParams() {
  const artifacts = getAllPublicArtifacts();
  return artifacts.map((a) => ({ artifact: a.slug }));
}




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; artifact?: string }>;
}): Promise<Metadata> {
  const { region, artifact } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const art = artifact ?? "";
  return buildRegionalMetadata({
    region: regionCode,
    path: `/project-01/design-archive/${art}`,
    title: "Artifact Not Found",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function ArtifactDetailPage({ params }: Props) {
  const { artifact: slug } = await params;
  const artifact = getArtifactBySlug(slug);

  if (!artifact) notFound();

  // Compute prev / next within public archive for navigation
  const allPublic = getAllPublicArtifacts();
  const idx = allPublic.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? allPublic[idx - 1] : null;
  const next = idx < allPublic.length - 1 ? allPublic[idx + 1] : null;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Design Archive", path: "/project-01/design-archive" },
    { name: artifact.id, path: `/project-01/design-archive/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArtifactDetailClient artifact={artifact} prev={prev} next={next} />
    </>
  );
}
