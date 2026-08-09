import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) {
    return {
      title: "Entry Not Found | Alkota Cycles",
    };
  }

  const title = `${entry.title} | Alkota Cycles`;

  return {
    title,
    description: entry.subtitle,
    alternates: {
      canonical: `${siteUrl}/journal/project-01/${slug}`,
    },
    openGraph: {
      title,
      description: entry.subtitle,
      url: `${siteUrl}/journal/project-01/${slug}`,
      images: [entry.heroMedia.src],
    },
  };
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
