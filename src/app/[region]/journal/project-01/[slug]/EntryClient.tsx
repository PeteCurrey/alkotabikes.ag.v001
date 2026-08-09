"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Layers, Settings } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import DevelopmentLedger from "@/components/editorial/DevelopmentLedger";
import FounderNote from "@/components/editorial/FounderNote";
import DesignArtifact from "@/components/editorial/DesignArtifact";
import RevisionChange from "@/components/editorial/RevisionChange";
import { getArtifact } from "@/content/media/designJourney";
import type { JournalEntry } from "@/content/journal/project01/entries";

export default function EntryClient({ entry }: { entry: JournalEntry }) {
  return (
    <article className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark space-y-16">
      {/* Top Breadcrumb & Sequence Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between font-mono text-xs text-alkota-slate">
        <Link
          href="/journal/project-01"
          className="inline-flex items-center gap-2 hover:text-alkota-white uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-alkota-signal" />
          <span>PROJECT 01 JOURNAL INDEX</span>
        </Link>

        <span className="text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
          ENTRY {entry.sequence} · REV {entry.revision}
        </span>
      </div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <TechnicalAnnotation label={entry.category} value={`PHASE: ${entry.phase}`} variant="signal" />
          <span className="text-alkota-slate">·</span>
          <span className="text-alkota-slate uppercase">{entry.date}</span>
          <span className="text-alkota-slate">·</span>
          <span className="px-2 py-0.5 border border-alkota-signal/40 text-alkota-signal text-[9px] uppercase font-bold">
            {entry.status}
          </span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.95]">
          {entry.title}
        </h1>

        <p className="font-sans text-lg sm:text-xl text-alkota-snow/90 font-light leading-relaxed border-l-2 border-alkota-signal/50 pl-5">
          {entry.subtitle}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-xs text-alkota-slate">
          <span>AUTHOR: {entry.author}</span>
          <span>PROJECT 01 REGISTER</span>
        </div>
      </header>

      {/* Hero Media Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[360px] sm:h-[500px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
          <Image
            src={entry.heroMedia.src}
            alt={entry.heroMedia.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover object-center"
          />
          {entry.heroMedia.caption && (
            <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] bg-black/80 px-3 py-2 text-alkota-signal border border-white/10 uppercase">
              {entry.heroMedia.caption}
            </div>
          )}
        </div>
      </div>

      {/* Main Body Content & Editorial Modules */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Decision Summary Ledger */}
        {entry.decisionSummary && (
          <DevelopmentLedger
            question={entry.decisionSummary.question}
            decision={entry.decisionSummary.decision}
            why={entry.decisionSummary.why}
            status={entry.decisionSummary.status}
          />
        )}

        {/* Revision Change Module (if present) */}
        {entry.revisionChange && (
          <RevisionChange
            fromRev={entry.revisionChange.fromRev}
            toRev={entry.revisionChange.toRev}
            whatChanged={entry.revisionChange.whatChanged}
            why={entry.revisionChange.why}
            effect={entry.revisionChange.effect}
          />
        )}

        {/* Article Body Paragraphs */}
        <div className="space-y-6 font-sans text-base sm:text-lg text-alkota-snow/90 font-light leading-relaxed">
          {entry.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Founder Note (if present) */}
        {entry.founderNote && (
          <aside className="border-l-2 border-alkota-signal pl-6 py-2 bg-alkota-black/40 border border-white/10 p-6 space-y-3 font-mono">
            <span className="text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
              PETE / FOUNDER NOTE
            </span>
            <blockquote className="font-sans text-lg text-alkota-white italic font-light">
              &ldquo;{entry.founderNote.quote}&rdquo;
            </blockquote>
          </aside>
        )}

        {/* Design Artifact Placeholder Grid */}
        {entry.designArtifacts && entry.designArtifacts.length > 0 && (
          <div className="space-y-6 border-t border-white/10 pt-8">
            <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold block">
              PRIMARY ENGINEERING ARTIFACTS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entry.designArtifacts.map((artId) => {
                const art = getArtifact(artId);
                if (!art) return null;
                return <DesignArtifact key={artId} asset={art} theme="blueprint" />;
              })}
            </div>
          </div>
        )}

        {/* Engineering Data Strip */}
        {entry.engineeringData && entry.engineeringData.length > 0 && (
          <div className="bg-alkota-black border border-white/10 p-6 font-mono space-y-4">
            <span className="text-[10px] text-alkota-signal uppercase tracking-widest font-bold block border-b border-white/10 pb-2">
              CONTROLLED ENGINEERING DATA
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {entry.engineeringData.map((d) => (
                <div key={d.label} className="space-y-1">
                  <span className="text-alkota-slate uppercase text-[9px] block">{d.label}</span>
                  <span className="text-alkota-white font-bold uppercase">
                    {d.value} {d.unit || ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Footer for Journal Entries */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {entry.previousEntry ? (
            <Link
              href={`/journal/project-01/${entry.previousEntry.slug}`}
              className="inline-flex items-center gap-2 text-alkota-slate hover:text-alkota-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-alkota-signal" />
              <span>{entry.previousEntry.sequence} {entry.previousEntry.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {entry.nextEntry ? (
            <Link
              href={`/journal/project-01/${entry.nextEntry.slug}`}
              className="inline-flex items-center gap-2 text-alkota-signal font-bold hover:text-white transition-colors"
            >
              <span>{entry.nextEntry.sequence} {entry.nextEntry.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-alkota-black border border-white/10 p-8 text-center space-y-6">
          <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
            JOIN PROJECT 01 DEVELOPMENT
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
            BE PART OF THE DEVELOPMENT STORY.
          </h3>
          <p className="font-sans text-sm text-alkota-slate max-w-xl mx-auto font-light leading-relaxed">
            Register your build intent to follow engineering progress and gain priority allocation when 2028 production reservations open.
          </p>
          <div>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-xl"
            >
              <span>JOIN PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
