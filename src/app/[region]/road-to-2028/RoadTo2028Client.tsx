"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Circle, Flame, ShieldCheck, Settings } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import NextStepBanner from "@/components/layout/NextStepBanner";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { brandAssets } from "@/lib/assets";

const STAGES = [
  {
    year: "2026",
    phase: "STAGE 01",
    title: "ENGINEER IT.",
    subtitle: "CURRENT STAGE — PRE-PRODUCTION ENGINEERING",
    status: "IN DEVELOPMENT",
    statusVariant: "signal",
    description:
      "Core engineering development. Geometry, kinematics, carbon structural layups, hydraulic lab testing, and physical prototype assembly.",
    items: [
      "Geometry & kinematics envelope finalisation",
      "Torayca UD carbon layup optimization",
      "Hydraulic bench fatigue testing",
      "Physical prototype R00 assembly",
    ],
    image: ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src,
    primaryLink: { label: "READ DEVELOPMENT JOURNAL", href: "/journal/project-01" },
    secondaryLink: { label: "EXPLORE BASELINE", href: "/bikes/project-01" },
  },
  {
    year: "2027",
    phase: "STAGE 02",
    title: "RACE IT.",
    subtitle: "PLANNED ALKOTA RACING PROGRAMME",
    status: "PLANNED / 2027",
    statusVariant: "slate",
    description:
      "The planned Alkota Racing programme introduces a different kind of validation. Competition compresses decisions. Setup windows get shorter. Terrain deteriorates. Rider load increases. Mechanical weaknesses become expensive.",
    items: [
      "International race paddock validation",
      "Real-time telemetry feedback loop",
      "Paddock setup window refinement",
      "Pre-production specification freeze",
    ],
    image: ALKOTA_STORY_MEDIA.paddockEnvironment.src,
    primaryLink: { label: "ALKOTA RACING 2027", href: "/racing" },
    secondaryLink: { label: "READ RACING PHILOSOPHY", href: "/journal/project-01/010-r00-baseline" },
  },
  {
    year: "2028",
    phase: "STAGE 03",
    title: "BUILD IT.",
    subtitle: "PLANNED PRODUCTION LAUNCH",
    status: "PLANNED PRODUCTION LAUNCH / 2028",
    statusVariant: "slate",
    description:
      "Project 01 is planned to enter production in 2028 once the engineering, prototype and validation programme has reached production release. The final bicycle will not simply be the render we began with. It should be the consequence of everything learned along the way.",
    items: [
      "Final production release freeze",
      "Order priority allocation dispatch",
      "Customer specification confirmation",
      "Hand assembly & trail delivery",
    ],
    image: brandAssets.project01WhiteHero,
    primaryLink: { label: "JOIN PROJECT 01 REGISTER", href: "/order" },
    secondaryLink: { label: "PREVIEW CONFIGURATOR", href: "/configure" },
  },
];

export default function RoadTo2028Client() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 min-h-screen tech-grid-dark space-y-20">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-b border-white/10 pb-16">
        <div className="space-y-4">
          <TechnicalAnnotation label="PROGRAMME ROADMAP" value="2026 — 2028" variant="signal" />
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            ROAD TO<br />
            <span className="text-alkota-signal">2028.</span>
          </h1>
          <p className="font-mono text-sm text-alkota-signal uppercase tracking-widest font-bold">
            ONE BIKE. THREE STAGES. ENGINEER IT. RACE IT. BUILD IT.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-8 font-sans text-base sm:text-lg text-alkota-snow/90 max-w-3xl font-light leading-relaxed">
            Most bicycles appear when the decisions are already hidden. Project 01 is being built publicly. From initial CAD kinematics through physical lab stress testing, race paddock validation in 2027, and production delivery in 2028.
          </p>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-lg"
            >
              <span>JOIN PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Stage Timeline Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {STAGES.map((stage, idx) => {
          const isCurrent = stage.year === "2026";

          return (
            <div
              key={stage.year}
              className={`bg-alkota-black border p-6 sm:p-10 md:p-12 space-y-8 shadow-2xl relative overflow-hidden ${
                isCurrent ? "border-alkota-signal/50" : "border-white/10"
              }`}
            >
              {/* Top Banner Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-alkota-signal">
                    {stage.year}
                  </span>
                  <div className="h-6 w-px bg-white/10" />
                  <div>
                    <span className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest block">
                      {stage.phase}
                    </span>
                    <span className="font-mono text-xs font-bold text-alkota-white uppercase">
                      {stage.subtitle}
                    </span>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 border font-mono text-[10px] font-bold uppercase tracking-widest ${
                    isCurrent
                      ? "border-alkota-signal text-alkota-signal bg-alkota-signal/10"
                      : "border-white/20 text-alkota-slate bg-white/5"
                  }`}
                >
                  {stage.status}
                </div>
              </div>

              {/* Main Stage Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Description + Items */}
                <div className="lg:col-span-7 space-y-6">
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold uppercase text-alkota-white tracking-tight">
                    {stage.title}
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-alkota-snow/85 leading-relaxed font-light">
                    {stage.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <span className="font-mono text-[10px] text-alkota-slate uppercase tracking-widest block font-semibold">
                      KEY DELIVERABLES & MILESTONES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                      {stage.items.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-alkota-snow/90 bg-alkota-carbon p-2.5 border border-white/5">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? "text-alkota-signal" : "text-alkota-slate"}`} />
                          <span className="text-[11px] uppercase tracking-wide">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
                    <Link
                      href={stage.primaryLink.href}
                      className="px-5 py-3 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center gap-2"
                    >
                      <span>{stage.primaryLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={stage.secondaryLink.href}
                      className="px-5 py-3 border border-white/20 text-alkota-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors flex items-center gap-2"
                    >
                      <span>{stage.secondaryLink.label}</span>
                    </Link>
                  </div>
                </div>

                {/* Right Image Feature */}
                <div className="lg:col-span-5">
                  <div className="relative w-full h-[260px] sm:h-[340px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl group">
                    <Image
                      src={stage.image}
                      alt={stage.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-alkota-signal bg-black/80 px-3 py-1.5 border border-white/10">
                      <span>PROJECT 01 / {stage.year}</span>
                      <span>{stage.phase}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-alkota-black border border-white/10 p-8 sm:p-12 text-center space-y-6">
          <TechnicalAnnotation label="JOIN THE PROGRAMME" value="PRE-PRODUCTION REGISTER" variant="signal" />
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-alkota-white tracking-tight">
            BE THERE WHEN THE MACHINE ARRIVES.
          </h2>
          <p className="font-sans text-sm sm:text-base text-alkota-slate max-w-2xl mx-auto font-light leading-relaxed">
            Register your interest to follow engineering progress and gain priority allocation when formal reservations open ahead of the 2028 production run.
          </p>
          <div className="pt-2">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-xl"
            >
              <span>JOIN PROJECT 01 REGISTER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Page Ending Next Step */}
      <NextStepBanner
        stepNumber="FINAL STAGE"
        nextTitle="HOW TO ORDER PROJECT 01"
        nextSubtitle="Understand pre-orders, build priority, specification confirmation, and the route from development register to 2028 delivery."
        href="/order"
        label="PRE-ORDER JOURNEY"
        ctaText="HOW TO ORDER"
      />
    </div>
  );
}

