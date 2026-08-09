"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, CheckCircle2, ChevronRight, Filter } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { PROJECT_01_JOURNAL_ENTRIES } from "@/content/journal/project01/entries";
import type { JournalCategory } from "@/content/journal/project01/entries";

const CATEGORIES: JournalCategory[] = [
  "ORIGIN",
  "RIDE REQUIREMENTS",
  "GEOMETRY",
  "KINEMATICS",
  "FRAME",
  "CARBON",
  "COMPONENTS",
  "PROTOTYPE",
];

const FUTURE_MILESTONES_2027 = [
  {
    code: "M2027-01",
    title: "RACE PROGRAMME INITIATION",
    status: "PLANNED 2027",
    desc: "First competition prototype build & telemetry integration.",
  },
  {
    code: "M2027-02",
    title: "FIRST COMPETITION PROTOTYPE",
    status: "UPCOMING",
    desc: "Initial race paddock chassis setup and structural validation.",
  },
  {
    code: "M2027-03",
    title: "RACE DISPATCH 001",
    status: "AWAITING PROGRAMME",
    desc: "First competitive race telemetry report & feedback synthesis.",
  },
];

const FUTURE_MILESTONES_2028 = [
  {
    code: "M2028-01",
    title: "FINAL SPECIFICATION RELEASE",
    status: "PLANNED 2028",
    desc: "Production freeze sign-off by Pete Currey.",
  },
  {
    code: "M2028-02",
    title: "ALLOCATION DISPATCH",
    status: "PLANNED 2028",
    desc: "Priority order confirmation for registered customers.",
  },
  {
    code: "M2028-03",
    title: "PRODUCTION DELIVERY",
    status: "PLANNED 2028",
    desc: "First customer hand-built bicycle dispatch.",
  },
];

export default function JournalHubClient() {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const filteredEntries = selectedCat === "ALL"
    ? PROJECT_01_JOURNAL_ENTRIES
    : PROJECT_01_JOURNAL_ENTRIES.filter((e) => e.category === selectedCat);

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-b border-white/10 pb-16">
        <div className="space-y-4">
          <TechnicalAnnotation label="PROJECT 01" value="DEVELOPMENT JOURNAL" variant="signal" />
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            YOU'RE EARLY.<br />
            <span className="text-alkota-signal">THAT'S THE POINT.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-8 font-sans text-base sm:text-lg text-alkota-snow/90 max-w-3xl font-light leading-relaxed">
            Most bicycles are introduced when the work is finished. Project 01 is different. We are documenting the decisions, wrong turns, drawings, prototypes, component changes, tests and eventually the racing programme that take the bike from an idea to production. Production is planned for 2028. Until then, this is the record of how we get there.
          </p>

          <div className="lg:col-span-4 flex flex-wrap gap-4 justify-start lg:justify-end">
            <Link
              href="/journal/project-01/001-why-one-bike"
              className="px-6 py-3.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-lg flex items-center gap-2"
            >
              <span>START AT THE BEGINNING</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/order"
              className="px-6 py-3.5 border border-white/20 text-alkota-white font-mono font-bold text-xs tracking-wider uppercase hover:border-alkota-signal hover:text-alkota-signal transition-all flex items-center gap-2"
            >
              <span>JOIN PROJECT 01</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 font-mono text-[11px]">
          <span className="text-alkota-slate uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-alkota-signal" />
            <span>FILTER BY CATEGORY:</span>
          </span>

          <button
            onClick={() => setSelectedCat("ALL")}
            className={`px-3 py-1 border uppercase tracking-wider transition-colors ${
              selectedCat === "ALL"
                ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold"
                : "border-white/10 text-alkota-slate hover:text-white hover:border-white/30"
            }`}
          >
            ALL ENTRIES ({PROJECT_01_JOURNAL_ENTRIES.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 border uppercase tracking-wider transition-colors ${
                selectedCat === cat
                  ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold"
                  : "border-white/10 text-alkota-slate hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Ledger Section 2026: Engineering Development */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-2xl font-bold text-alkota-signal">2026</span>
            <span className="text-xs text-alkota-slate">·</span>
            <span className="text-xs font-bold text-alkota-white uppercase tracking-widest">
              ENGINEERING DEVELOPMENT
            </span>
          </div>
          <span className="font-mono text-[10px] text-alkota-signal bg-alkota-signal/10 border border-alkota-signal/30 px-2.5 py-1 uppercase tracking-widest font-bold">
            CURRENT PHASE
          </span>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/project-01/${entry.slug}`}
              className="group block bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all duration-300 p-6 md:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Sequence + Date + Category */}
                <div className="lg:col-span-3 space-y-1 font-mono">
                  <span className="text-3xl md:text-4xl font-bold text-alkota-signal/80 group-hover:text-alkota-signal transition-colors block">
                    {entry.sequence}
                  </span>
                  <span className="text-[10px] text-alkota-slate uppercase tracking-widest block">
                    {entry.category} · {entry.date}
                  </span>
                  <span className="text-[9px] text-alkota-slate/60 uppercase tracking-widest block">
                    REV {entry.revision}
                  </span>
                </div>

                {/* Title + Subtitle */}
                <div className="lg:col-span-7 space-y-2">
                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-alkota-white group-hover:text-alkota-signal transition-colors uppercase tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="font-sans text-sm text-alkota-slate group-hover:text-alkota-snow/80 transition-colors font-light leading-relaxed">
                    {entry.subtitle}
                  </p>
                </div>

                {/* Status + Arrow */}
                <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3 font-mono text-xs">
                  <span className="text-[9px] text-alkota-signal border border-alkota-signal/40 px-2 py-0.5 uppercase tracking-widest font-bold">
                    {entry.status}
                  </span>
                  <ArrowRight className="w-4 h-4 text-alkota-slate group-hover:text-alkota-signal group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ledger Section 2027: Race Development (Planned) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 opacity-80">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-2xl font-bold text-alkota-slate">2027</span>
            <span className="text-xs text-alkota-slate">·</span>
            <span className="text-xs font-bold text-alkota-slate uppercase tracking-widest">
              RACE DEVELOPMENT
            </span>
          </div>
          <span className="font-mono text-[10px] text-alkota-slate border border-white/15 px-2.5 py-1 uppercase tracking-widest">
            PLANNED PROGRAMME
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {FUTURE_MILESTONES_2027.map((m) => (
            <div
              key={m.code}
              className="bg-alkota-black/40 border border-white/10 p-6 space-y-3 relative opacity-70"
            >
              <div className="flex items-center justify-between text-[10px] text-alkota-slate">
                <span>{m.code}</span>
                <span className="px-2 py-0.5 border border-white/15 text-alkota-slate uppercase tracking-wider">
                  {m.status}
                </span>
              </div>
              <h4 className="font-display font-semibold text-base text-alkota-snow/80 uppercase tracking-tight">
                {m.title}
              </h4>
              <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
                {m.desc}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[9px] text-alkota-slate uppercase tracking-widest">
                <Lock className="w-3 h-3 text-alkota-slate/50" />
                <span>UPCOMING MILESTONE</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ledger Section 2028: Production (Planned) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4 opacity-75">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-2xl font-bold text-alkota-slate">2028</span>
            <span className="text-xs text-alkota-slate">·</span>
            <span className="text-xs font-bold text-alkota-slate uppercase tracking-widest">
              PRODUCTION LAUNCH
            </span>
          </div>
          <span className="font-mono text-[10px] text-alkota-slate border border-white/15 px-2.5 py-1 uppercase tracking-widest">
            PLANNED PRODUCTION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {FUTURE_MILESTONES_2028.map((m) => (
            <div
              key={m.code}
              className="bg-alkota-black/30 border border-white/10 p-6 space-y-3 relative opacity-60"
            >
              <div className="flex items-center justify-between text-[10px] text-alkota-slate">
                <span>{m.code}</span>
                <span className="px-2 py-0.5 border border-white/15 text-alkota-slate uppercase tracking-wider">
                  {m.status}
                </span>
              </div>
              <h4 className="font-display font-semibold text-base text-alkota-snow/80 uppercase tracking-tight">
                {m.title}
              </h4>
              <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
                {m.desc}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[9px] text-alkota-slate uppercase tracking-widest">
                <Lock className="w-3 h-3 text-alkota-slate/50" />
                <span>PLANNED LAUNCH</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Persistent Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-alkota-black border border-white/10 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
              JOIN THE PROGRAMME
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
              FOLLOW DEVELOPMENT. GET PRODUCTION PRIORITY.
            </h3>
          </div>

          <Link
            href="/order"
            className="px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-xl flex-shrink-0 flex items-center gap-2"
          >
            <span>JOIN PROJECT 01</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
