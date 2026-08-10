import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECT_01_JOURNAL_ENTRIES, getJournalEntryBySlug } from "@/content/journal/project01/entries";
import EntryClient from "./EntryClient";
import ArticleSchema from "@/components/schema/ArticleSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECT_01_JOURNAL_ENTRIES.map((e) => ({ slug: e.slug }));
}




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; slug?: string }>;
}): Promise<Metadata> {
  const { region, slug } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const pageSlug = slug ?? "";
  const displayTitle = pageSlug ? `Entry Not Found — ${pageSlug.replace(/-/g, " ").toUpperCase()}` : "Entry Not Found";
  return buildRegionalMetadata({
    region: regionCode,
    path: `/journal/project-01/${pageSlug}`,
    title: displayTitle,
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: "Project 01", path: "/journal/project-01" },
    { name: entry.title, path: `/journal/project-01/${slug}` },
  ];

  return (
    <>
      <ArticleSchema
        headline={entry.title}
        description={entry.subtitle}
        datePublished={entry.date}
        url={`/journal/project-01/${slug}`}
        image={entry.heroMedia.src}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <EntryClient entry={entry} />
    </>
  );
}
