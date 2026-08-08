import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import NextStepBanner from "@/components/layout/NextStepBanner";
import { ARTICLES } from "@/lib/data/journalData";
import { PROJECT_01_JOURNAL_ENTRIES } from "@/content/journal/project01/entries";
import { ArrowRight, BookOpen, Layers, ShieldCheck, Flame, Lock } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16 min-h-screen tech-grid-dark">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="FIELD NOTES & JOURNAL" value="DEVELOPMENT ARCHIVE" variant="signal" />
          <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            FIELD NOTES &<br />
            <span className="text-alkota-signal">DEVELOPMENT JOURNAL.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-2xl font-light leading-relaxed">
            Engineering dispatches, kinematics analysis, materials testing notes, and the chronological record of Project 01.
          </p>
        </div>

        {/* 01 PRIMARY PRIORITY — Project 01 Development Journal Hub */}
        <div className="bg-alkota-black border border-alkota-signal/50 p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] bg-alkota-signal text-alkota-black px-2.5 py-1 uppercase font-bold tracking-widest">
                PRIMARY ARCHIVE
              </span>
              <span className="font-mono text-xs text-alkota-signal font-bold uppercase">
                PROJECT 01 REGISTER
              </span>
            </div>

            <span className="font-mono text-xs text-alkota-slate uppercase">
              10 SEEDED ENTRIES · 2026 BASELINE R00
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                PROJECT 01 DEVELOPMENT JOURNAL
              </h2>
              <p className="font-sans text-base text-alkota-snow/90 font-light leading-relaxed">
                You're early. That's the point. Most bicycles are introduced when the work is finished. Project 01 is different. We are documenting the decisions, wrong turns, drawings, prototypes, and tests that take the bike from an idea to 2028 production launch.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/journal/project-01"
                className="px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-xl flex items-center gap-2"
              >
                <span>OPEN PROJECT 01 JOURNAL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Project 01 Recent Entries Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-alkota-signal font-bold uppercase tracking-widest">
              LATEST PROJECT 01 DISPATCHES
            </span>
            <Link
              href="/journal/project-01"
              className="font-mono text-xs text-alkota-slate hover:text-white uppercase flex items-center gap-1"
            >
              <span>VIEW ALL ENTRIES</span>
              <ArrowRight className="w-3.5 h-3.5 text-alkota-signal" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECT_01_JOURNAL_ENTRIES.slice(0, 3).map((entry) => (
              <Link
                key={entry.id}
                href={`/journal/project-01/${entry.slug}`}
                className="group p-6 bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                    <span className="text-alkota-signal font-bold">{entry.sequence}</span>
                    <span>{entry.category}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-alkota-white group-hover:text-alkota-signal transition-colors uppercase tracking-tight">
                    {entry.title}
                  </h3>

                  <p className="font-sans text-xs text-alkota-slate group-hover:text-alkota-snow/80 transition-colors leading-relaxed font-light">
                    {entry.subtitle}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                  <span>{entry.date}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-alkota-signal group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 02 RACE DISPATCHES PREVIEW */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-alkota-slate font-bold uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4 text-alkota-signal" />
              <span>RACE DISPATCHES (PLANNED 2027)</span>
            </span>
            <Link
              href="/racing"
              className="font-mono text-xs text-alkota-slate hover:text-white uppercase flex items-center gap-1"
            >
              <span>ALKOTA RACING 2027</span>
              <ArrowRight className="w-3.5 h-3.5 text-alkota-signal" />
            </Link>
          </div>

          <div className="bg-alkota-black/40 border border-white/10 p-6 md:p-8 space-y-4 font-mono text-xs text-alkota-slate">
            <div className="flex items-center justify-between">
              <span className="text-alkota-signal font-bold uppercase text-[10px]">PROGRAMME INFRASTRUCTURE</span>
              <span className="px-2 py-0.5 border border-white/15 text-[9px] uppercase">BEGINS 2027</span>
            </div>
            <p className="font-sans text-sm text-alkota-snow/80 max-w-2xl font-light leading-relaxed">
              Competition dispatches will document telemetry logs, setup decisions, rider observations, and physical component changes throughout our planned 2027 international race development programme.
            </p>
          </div>
        </div>

        {/* 03 FIELD NOTES & ARTICLES */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-alkota-slate font-bold uppercase tracking-widest">
              FIELD NOTES & ARTICLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group p-6 bg-alkota-black/60 border border-white/10 hover:border-white/30 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-alkota-white group-hover:text-alkota-snow transition-colors uppercase tracking-tight">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-alkota-slate leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                  <span>{article.date}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-alkota-slate group-hover:translate-x-1 transition-transform" />
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

