"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import NextStepBanner from "@/components/layout/NextStepBanner";
import { ARTICLES } from "@/lib/data/journalData";
import { PROJECT_01_JOURNAL_ENTRIES } from "@/content/journal/project01/entries";
import { DESIGN_ARCHIVE } from "@/content/design/archive";
import { ArrowRight, Tag, Filter } from "lucide-react";

export type JournalTag =
  | "ALL"
  | "Chassis"
  | "Kinematics"
  | "Materials"
  | "Racing"
  | "Design Archive"
  | "Programme";

interface UnifiedFeedItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tag: JournalTag;
  href: string;
  sourceType: "PROJECT_01_ENTRY" | "ARTICLE" | "DESIGN_ARCHIVE";
  readTimeOrRevision?: string;
}

function JournalContent() {
  const searchParams = useSearchParams();
  const rawTagParam = searchParams.get("tag");

  const initialTag: JournalTag = useMemo(() => {
    if (!rawTagParam) return "ALL";
    const normalized = rawTagParam.toLowerCase();
    if (normalized === "chassis") return "Chassis";
    if (normalized === "kinematics") return "Kinematics";
    if (normalized === "materials") return "Materials";
    if (normalized === "racing") return "Racing";
    if (normalized === "design archive" || normalized === "design-archive" || normalized === "archive") return "Design Archive";
    if (normalized === "programme" || normalized === "program") return "Programme";
    return "ALL";
  }, [rawTagParam]);

  const [activeTag, setActiveTag] = useState<JournalTag>(initialTag);

  useEffect(() => {
    setActiveTag(initialTag);
  }, [initialTag]);

  // Transform into unified feed items
  const feedItems: UnifiedFeedItem[] = useMemo(() => {
    const p01Items: UnifiedFeedItem[] = PROJECT_01_JOURNAL_ENTRIES.map((entry) => {
      let tag: JournalTag = "Programme";
      if (entry.category.toLowerCase().includes("chassis")) tag = "Chassis";
      else if (entry.category.toLowerCase().includes("kinematic")) tag = "Kinematics";
      else if (entry.category.toLowerCase().includes("material")) tag = "Materials";
      else if (entry.category.toLowerCase().includes("race") || entry.category.toLowerCase().includes("racing")) tag = "Racing";

      return {
        id: entry.id,
        title: `${entry.sequence} ${entry.title}`,
        subtitle: entry.subtitle,
        date: entry.date,
        tag,
        href: `/journal/project-01/${entry.slug}`,
        sourceType: "PROJECT_01_ENTRY",
        readTimeOrRevision: entry.revision,
      };
    });

    const articleItems: UnifiedFeedItem[] = ARTICLES.map((art) => {
      let tag: JournalTag = "Programme";
      if (art.category.toLowerCase().includes("chassis")) tag = "Chassis";
      else if (art.category.toLowerCase().includes("kinematic")) tag = "Kinematics";
      else if (art.category.toLowerCase().includes("material")) tag = "Materials";
      else if (art.category.toLowerCase().includes("race")) tag = "Racing";

      return {
        id: art.slug,
        title: art.title,
        subtitle: art.excerpt,
        date: art.date,
        tag,
        href: `/journal/${art.slug}`,
        sourceType: "ARTICLE",
        readTimeOrRevision: art.readTime,
      };
    });

    const archiveItems: UnifiedFeedItem[] = DESIGN_ARCHIVE.map((artifact) => {
      return {
        id: artifact.id,
        title: `${artifact.id}: ${artifact.title}`,
        subtitle: artifact.caption,
        date: artifact.dateAdded || "2026-08-01",
        tag: "Design Archive",
        href: `/project-01/design-archive/${artifact.slug}`,
        sourceType: "DESIGN_ARCHIVE",
        readTimeOrRevision: artifact.revision,
      };
    });

    return [...p01Items, ...articleItems, ...archiveItems].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  const filteredItems = useMemo(() => {
    if (activeTag === "ALL") return feedItems;
    return feedItems.filter((item) => item.tag === activeTag);
  }, [feedItems, activeTag]);

  const tags: JournalTag[] = [
    "ALL",
    "Chassis",
    "Kinematics",
    "Materials",
    "Racing",
    "Design Archive",
    "Programme",
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen tech-grid-dark">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="UNIFIED JOURNAL &amp; ARCHIVE" value="DEVELOPMENT FEED" variant="signal" />
          <h1 className="font-display font-medium text-4xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            ENGINEERING JOURNAL &amp;<br />
            <span className="text-alkota-signal">TECHNICAL FEED.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-3xl font-light leading-relaxed">
            The chronological single-stream register for Alkota Cycles. 
            All technical dispatches, chassis design studies, kinematics papers, and programme milestones in one unified feed.
          </p>
        </div>

        {/* Tag Filter Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-alkota-slate uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-alkota-signal" />
            <span>FILTER BY CATEGORY TAXONOMY</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              const count = tag === "ALL" ? feedItems.length : feedItems.filter((i) => i.tag === tag).length;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors border flex items-center gap-2 ${
                    isActive
                      ? "bg-alkota-signal text-alkota-black border-alkota-signal font-bold"
                      : "bg-alkota-black/60 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span>{tag}</span>
                  <span className={`text-[10px] ${isActive ? "text-black/60" : "text-white/40"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unified Chronological Feed Grid */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-alkota-slate uppercase tracking-widest border-b border-white/10 pb-2">
            DISPLAYING {filteredItems.length} RECORD(S)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Link
                key={`${item.sourceType}-${item.id}`}
                href={item.href}
                className="group p-6 bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/15 text-alkota-signal uppercase font-semibold">
                      {item.tag}
                    </span>
                    {item.readTimeOrRevision && (
                      <span className="text-white/50">{item.readTimeOrRevision}</span>
                    )}
                  </div>

                  <h2 className="font-display text-xl font-bold text-alkota-white group-hover:text-alkota-signal transition-colors uppercase tracking-tight leading-snug">
                    {item.title}
                  </h2>

                  <p className="font-sans text-xs text-alkota-slate group-hover:text-alkota-snow/80 transition-colors leading-relaxed font-light line-clamp-3">
                    {item.subtitle}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                  <span>{item.date}</span>
                  <div className="flex items-center gap-1 text-alkota-signal group-hover:translate-x-1 transition-transform">
                    <span className="font-bold uppercase text-[9px]">READ DISPATCH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Page Ending Next Step */}
        <NextStepBanner
          stepNumber="06"
          nextTitle="ROAD TO 2028"
          nextSubtitle="Explore the three-stage timeline from core engineering to 2027 competition validation and 2028 production launch."
          href="/road-to-2028"
          label="DEVELOPMENT TIMELINE"
          ctaText="EXPLORE ROAD TO 2028"
        />
      </div>
    </div>
  );
}

export default function JournalClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-alkota-carbon text-white min-h-screen pt-32 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-alkota-slate">
          LOADING JOURNAL FEED...
        </div>
      }
    >
      <JournalContent />
    </Suspense>
  );
}
