import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artifact: slug } = await params;
  const artifact = getArtifactBySlug(slug);

  if (!artifact) {
    return { title: "Artifact Not Found" };
  }

  const isPlaceholder = artifact.status === "PLACEHOLDER";
  const title = `${artifact.id}: ${artifact.title} | Alkota Cycles`;

  return {
    title,
    description: artifact.caption,
    alternates: {
      canonical: `${siteUrl}/project-01/design-archive/${slug}`,
    },
    robots: isPlaceholder ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description: artifact.caption,
      url: `${siteUrl}/project-01/design-archive/${slug}`,
    },
  };
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
