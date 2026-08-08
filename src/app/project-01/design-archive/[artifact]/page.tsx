import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtifactDetailClient from "./ArtifactDetailClient";
import { getAllPublicArtifacts, getArtifactBySlug } from "@/content/design/archive";

interface Props {
  params: Promise<{ artifact: string }>;
}

export async function generateStaticParams() {
  const artifacts = getAllPublicArtifacts();
  // Only pre-render artifacts with real content (not purely placeholder-only)
  // Per brief: "Placeholder-only artifact pages should not be indexed until real asset exists"
  // But we still generate routes — we just noindex them below.
  return artifacts.map((a) => ({ artifact: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artifact: slug } = await params;
  const artifact = getArtifactBySlug(slug);
  if (!artifact) return { title: "Not Found | Alkota" };

  const isPlaceholder = artifact.status === "PLACEHOLDER";

  return {
    title: `${artifact.id}: ${artifact.title} | Project 01 Design Archive | Alkota`,
    description: artifact.caption,
    // Per brief: don't index placeholder-only pages
    robots: isPlaceholder ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: `${artifact.id}: ${artifact.title}`,
      description: artifact.caption,
    },
  };
}

export default async function ArtifactDetailPage({ params }: Props) {
  const { artifact: slug } = await params;
  const artifact = getArtifactBySlug(slug);

  if (!artifact) notFound();
  // Never serve STUDIO_ONLY or RESTRICTED artifacts via public routes
  if (artifact.visibility !== "PUBLIC") notFound();

  // Find prev/next in sequence
  const allPublic = getAllPublicArtifacts();
  const idx = allPublic.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? allPublic[idx - 1] : null;
  const next = idx < allPublic.length - 1 ? allPublic[idx + 1] : null;

  return <ArtifactDetailClient artifact={artifact} prev={prev} next={next} />;
}
