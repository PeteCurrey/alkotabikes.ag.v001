import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECT_01_JOURNAL_ENTRIES, getJournalEntryBySlug } from "@/content/journal/project01/entries";
import EntryClient from "./EntryClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECT_01_JOURNAL_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);
  if (!entry) return { title: "Entry Not Found | Alkota Journal" };
  return {
    title: `${entry.sequence} ${entry.title} | Project 01 Journal`,
    description: entry.subtitle,
    openGraph: {
      title: `${entry.sequence} ${entry.title} | Project 01 Journal`,
      description: entry.subtitle,
      images: [entry.heroMedia.src],
    },
  };
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);
  if (!entry) notFound();
  return <EntryClient entry={entry} />;
}
