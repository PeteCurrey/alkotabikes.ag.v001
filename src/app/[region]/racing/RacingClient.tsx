"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import RoadToProduction from "@/components/editorial/RoadToProduction";
import NextStepBanner from "@/components/layout/NextStepBanner";
import DevelopmentStatusTicker from "@/components/ui/DevelopmentStatusTicker";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, ChevronDown, Check, Flag, Settings, Wrench, Activity, Clock } from "lucide-react";
import { captureLead } from "@/lib/leads/capture";

export default function RacingClient() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hp, setHp] = useState("");
  const [renderTime, setRenderTime] = useState<number>(0);

  React.useEffect(() => {
    setRenderTime(Date.now());
  }, []);

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Race Paddock Backdrop
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-between pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-alkota-black border-b border-white/10 tech-grid-dark">
        {/* Race Action Hero Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src={ALKOTA_STORY_MEDIA.racingHeroAction.src}
            alt="ALKOTA Project 01 high-speed alpine descent during race validation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55 scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-alkota-carbon via-alkota-carbon/80 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon via-transparent to-alkota-carbon/60" />
        </div>

        {/* Top Status Bar */}
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 z-10">
          <TechnicalAnnotation label="ALKOTA RACING" value="DEVELOPMENT PROGRAMME / 2027" variant="signal" />
          <div className="font-mono text-[10px] uppercase tracking-widest text-alkota-slate border border-white/10 px-3 py-1 bg-black/60 backdrop-blur-sm">
            STATUS: PLANNED PROGRAMME · 2027
          </div>
        </div>

        {/* Hero Narrative Content */}
        <div className="max-w-7xl mx-auto w-full my-auto py-12 md:py-20 z-10 space-y-8">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal tracking-ultra uppercase font-bold border border-alkota-signal/40 px-3 py-1 bg-alkota-signal/10 backdrop-blur-sm">
              <Flag className="w-3.5 h-3.5" />
              <span>PLANNED PROGRAMME / 2027</span>
            </div>
            <h1 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] text-alkota-white">
              THE NEXT TEST BENCH<br />
              <span className="text-alkota-signal">HAS A START LINE.</span>
            </h1>
          </div>

          <div className="space-y-4 max-w-2xl font-sans text-sm sm:text-base text-alkota-snow/90 font-light leading-relaxed">
            <p className="text-base sm:text-lg text-white font-normal">
              Project 01 is being built for real terrain.
            </p>
            <p>
              In 2027, the plan is to add something less forgiving: <strong className="text-white font-semibold">competition</strong>.
            </p>
            <p>
              Alkota Racing will become an extension of the development programme — putting prototype machines, component decisions, setup and riders into an environment where weaknesses become obvious very quickly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#follow-programme"
              className="px-8 py-4 bg-alkota-signal text-alkota-white hover:bg-white hover:text-alkota-black font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-3 shadow-2xl"
            >
              <span>FOLLOW THE PROGRAMME</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/bikes/project-01"
              className="px-8 py-4 border border-white/20 hover:border-alkota-signal text-alkota-white hover:text-alkota-signal font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-3 bg-alkota-black/40 backdrop-blur-sm"
            >
              <span>PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 z-10 font-mono text-xs text-alkota-slate">
          <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
            PROTOTYPE COMPETITION VALIDATION · TARGET LAUNCH 2027
          </span>
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider ml-auto">
            <span>SCROLL TO EXPLORE PROGRAMME</span>
            <ChevronDown className="w-4 h-4 text-alkota-signal animate-bounce" />
          </div>
        </div>
      </section>

      {/* Development Status Ticker — Programme State */}
      <DevelopmentStatusTicker variant="banner" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 — RACING COMPRESSES THE LEARNING CURVE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-alkota-carbon border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <TechnicalAnnotation label="PROGRAMME LOGIC" value="COMPETITION AUDIT" variant="signal" />
                <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                  RACING COMPRESSES<br />
                  <span className="text-alkota-signal">THE LEARNING CURVE.</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-alkota-snow/90 font-light leading-relaxed font-sans">
                <p className="text-base sm:text-lg text-white font-normal">
                  A normal test session lets you control the programme. A race does not.
                </p>
                <div className="space-y-2 border-l-2 border-alkota-signal/50 pl-4 font-mono text-xs text-alkota-signal uppercase tracking-wider">
                  <p>The track changes.</p>
                  <p>Weather changes.</p>
                  <p>Lines deteriorate.</p>
                  <p>Setup time disappears.</p>
                  <p>The rider is under pressure.</p>
                </div>
                <p className="font-mono text-xs font-bold text-white uppercase tracking-wider pt-2">
                  THAT IS USEFUL.
                </p>
                <p>
                  Competition turns hundreds of small engineering decisions into one very simple question: <strong className="text-white font-semibold">does the complete machine allow the rider to go faster with greater control?</strong>
                </p>
              </div>
            </div>

            {/* Photo Mosaic — Paddock & Rider Debrief */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden border border-white/10 bg-alkota-black shadow-2xl">
                <Image
                  src={ALKOTA_STORY_MEDIA.founderRiderDialogue.src}
                  alt="Pete Currey in rider dialogue session post-run in paddock"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full h-[180px] overflow-hidden border border-white/10 bg-alkota-black">
                  <Image
                    src={ALKOTA_STORY_MEDIA.tradeShowPresentation.src}
                    alt="Technical paddock presentation"
                    fill
                    sizes="25vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider text-alkota-signal bg-black/80 px-2 py-0.5 border border-white/10">
                    PADDOCK BENCH
                  </div>
                </div>
                <div className="relative w-full h-[180px] overflow-hidden border border-white/10 bg-alkota-black">
                  <Image
                    src={ALKOTA_STORY_MEDIA.prototypeBuildValidation.src}
                    alt="Prototype inspection pass"
                    fill
                    sizes="25vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider text-alkota-signal bg-black/80 px-2 py-0.5 border border-white/10">
                    TELEMETRY DEBRIEF
                  </div>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-alkota-slate">
                RACE DEBRIEF · REAL-TIME SETUP FEEDBACK & TELEMETRY REGISTRATION
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 — WHY RACE? 4 ENGINEERING MODULES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-alkota-black border-b border-white/10 tech-grid-dark">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <TechnicalAnnotation label="WHY RACE?" value="4 ENGINEERING MODULES" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              DEVELOPMENT.<br />
              <span className="text-alkota-signal">NOT DECORATION.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module 1: SETUP */}
            <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-alkota-signal transition-colors group">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-widest flex items-center gap-2">
                    <Settings className="w-4 h-4 text-alkota-signal" />
                    <span>01 / SETUP</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate border border-white/10 px-2 py-0.5">
                    PRECISION
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs text-alkota-white uppercase tracking-wider">
                  <p>Fork pressure.</p>
                  <p>Shock settings.</p>
                  <p>Tyre pressure.</p>
                  <p>Cockpit position.</p>
                  <p>Brake feel.</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wide">
                  Racing forces setup decisions to become precise.
                </p>
              </div>
            </div>

            {/* Module 2: DURABILITY */}
            <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-alkota-signal transition-colors group">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-widest flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-alkota-signal" />
                    <span>02 / DURABILITY</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate border border-white/10 px-2 py-0.5">
                    ABUSE MATRIX
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs text-alkota-white uppercase tracking-wider">
                  <p>Repeated impacts.</p>
                  <p>Contamination.</p>
                  <p>Transport.</p>
                  <p>Practice.</p>
                  <p>Race runs.</p>
                  <p>Maintenance.</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wide">
                  Components experience real operational abuse.
                </p>
              </div>
            </div>

            {/* Module 3: RIDER FEEDBACK */}
            <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-alkota-signal transition-colors group">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-alkota-signal" />
                    <span>03 / RIDER FEEDBACK</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate border border-white/10 px-2 py-0.5">
                    HUMAN SENSOR
                  </span>
                </div>
                <p className="font-sans text-base text-alkota-snow font-light leading-relaxed">
                  The rider becomes another sensor.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wide">
                  Feedback is recorded alongside setup and hardware changes.
                </p>
              </div>
            </div>

            {/* Module 4: ITERATION */}
            <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6 flex flex-col justify-between hover:border-alkota-signal transition-colors group">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4 text-alkota-signal" />
                    <span>04 / ITERATION</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate border border-white/10 px-2 py-0.5">
                    LOOP
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs text-alkota-white uppercase tracking-wider">
                  <p>Race.</p>
                  <p>Debrief.</p>
                  <p>Change.</p>
                  <p>Repeat.</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wide">
                  Every event becomes another development loop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 — ROAD TO 2028
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-alkota-carbon border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <RoadToProduction />

          <div className="p-6 bg-alkota-black border border-white/10 border-l-2 border-l-alkota-signal max-w-2xl font-mono text-xs text-alkota-snow leading-relaxed">
            <span className="text-alkota-signal font-bold uppercase block mb-1">PROGRAMME OBJECTIVE:</span>
            <p>2027 is intended to bridge prototype engineering and production validation.</p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 — TEAM SECTION (ELEGANT PLACEHOLDERS)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-alkota-black border-b border-white/10 tech-grid-dark">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <TechnicalAnnotation label="PROGRAMME STRUCTURE" value="ROSTER & CREW" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE TEAM<br />
                <span className="text-alkota-signal">COMES NEXT.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 font-sans text-sm sm:text-base text-alkota-snow/90 font-light leading-relaxed">
              <div className="font-mono text-xs text-alkota-signal uppercase tracking-wider space-y-1">
                <p>Rider roster.</p>
                <p>Race calendar.</p>
                <p>Partners.</p>
                <p>Technical crew.</p>
              </div>
              <p className="text-base text-white font-normal pt-2">
                Those announcements come when they are real.
              </p>
              <p>
                For now, the objective is more important than the names: <strong className="text-white font-semibold">build a race environment around Project 01 that produces useful information.</strong>
              </p>
            </div>
          </div>

          {/* 3 Elegant Placeholders — NO FABRICATED RIDERS OR SPONSORS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-3 font-mono">
                <span className="text-[10px] text-alkota-slate uppercase tracking-widest block">RIDER 01</span>
                <p className="font-display text-2xl font-bold uppercase text-alkota-white">TO BE ANNOUNCED</p>
              </div>
              <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-alkota-slate uppercase flex items-center justify-between">
                <span>STATUS</span>
                <span className="text-alkota-signal font-bold">PLANNED ROSTER</span>
              </div>
            </div>

            <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-3 font-mono">
                <span className="text-[10px] text-alkota-slate uppercase tracking-widest block">RIDER 02</span>
                <p className="font-display text-2xl font-bold uppercase text-alkota-white">TO BE ANNOUNCED</p>
              </div>
              <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-alkota-slate uppercase flex items-center justify-between">
                <span>STATUS</span>
                <span className="text-alkota-signal font-bold">PLANNED ROSTER</span>
              </div>
            </div>

            <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-3 font-mono">
                <span className="text-[10px] text-alkota-slate uppercase tracking-widest block">TECHNICAL PROGRAMME</span>
                <p className="font-display text-2xl font-bold uppercase text-alkota-white">IN DEVELOPMENT</p>
              </div>
              <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-alkota-slate uppercase flex items-center justify-between">
                <span>STATUS</span>
                <span className="text-alkota-signal font-bold">CREW & LOGISTICS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 — RACE BIKE (GLACIER WHITE & NAKED CARBON)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-alkota-carbon border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <TechnicalAnnotation label="DEVELOPMENT PLATFORM" value="RACE VARIANTS" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                PROJECT 01<br />
                <span className="text-alkota-signal">BETWEEN THE TAPE.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 font-sans text-sm sm:text-base text-alkota-snow/90 font-light leading-relaxed">
              <p className="text-base text-white font-normal">
                The race programme will use development variants of Project 01.
              </p>
              <p>
                Setup and specification may change throughout the season as the engineering programme evolves. What starts the year may not finish it.
              </p>
              <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                THAT IS THE POINT.
              </p>
              <div className="inline-block font-mono text-[10px] uppercase tracking-widest text-alkota-signal border border-alkota-signal/40 px-3 py-1 bg-alkota-signal/5">
                DEVELOPMENT MACHINE · NOT FINAL PRODUCTION SPECIFICATION
              </div>
            </div>
          </div>

          {/* Glacier White & Naked Carbon Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Glacier White */}
            <div className="bg-alkota-black border border-white/10 p-6 space-y-4 shadow-2xl">
              <div className="relative w-full h-[320px] sm:h-[380px] bg-alkota-carbon overflow-hidden border border-white/10">
                <Image
                  src={ALKOTA_STORY_MEDIA.peteGlacierWhite.src}
                  alt="Project 01 Glacier White Race Variant"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] text-alkota-signal font-bold uppercase">FINISH 01 · GLACIER WHITE</span>
                <p className="text-xs text-alkota-slate">RACE SPECIFICATION TEST BED · ALPINE SHOWROOM CHASSIS</p>
              </div>
            </div>

            {/* Naked Carbon */}
            <div className="bg-alkota-black border border-white/10 p-6 space-y-4 shadow-2xl">
              <div className="relative w-full h-[320px] sm:h-[380px] bg-alkota-carbon overflow-hidden border border-white/10">
                <Image
                  src={ALKOTA_STORY_MEDIA.peteNakedCarbon.src}
                  alt="Project 01 Naked Carbon Race Variant"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] text-alkota-signal font-bold uppercase">FINISH 02 · NAKED CARBON</span>
                <p className="text-xs text-alkota-slate">RAW COMPOSITE LAYUP CHASSIS · STRESS TESTING BASELINE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 — RACE NOTES / DISPATCHES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-alkota-black border-b border-white/10 tech-grid-dark">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="PADDOCK DISPATCHES" value="RACE DISPATCH SCHEMA" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                FROM THE<br />
                <span className="text-alkota-signal">PADDOCK.</span>
              </h2>
            </div>

            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-alkota-signal text-alkota-white hover:text-alkota-signal font-mono text-xs font-bold uppercase transition-colors"
            >
              <span>FIELD NOTES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dispatch Schema Structure Card */}
          <div className="bg-alkota-carbon border border-white/10 p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
              <span className="text-alkota-signal font-bold uppercase">RACE DISPATCH DATA SCHEMA</span>
              <span className="text-alkota-slate text-[10px] uppercase">RACE DISPATCHES BEGIN 2027</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 font-mono text-[11px] text-alkota-slate">
              {[
                { label: "EVENT", val: "TBA (2027)" },
                { label: "LOCATION", val: "TBA (2027)" },
                { label: "RIDER", val: "TBA" },
                { label: "REVISION", val: "R00 PROTOTYPE" },
                { label: "STATUS", val: "PLANNED" },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-alkota-black border border-white/10 space-y-1">
                  <span className="text-[9px] uppercase text-alkota-slate block">{item.label}:</span>
                  <span className="text-white font-bold block">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-alkota-black border border-white/10 text-center space-y-3 font-mono">
              <p className="text-sm font-bold text-alkota-signal uppercase tracking-widest">
                RACE DISPATCHES BEGIN 2027.
              </p>
              <p className="text-xs text-alkota-slate max-w-lg mx-auto font-sans font-light">
                During the 2027 race season, this dispatch system will publish live telemetry, setup adjustments, component findings, and post-race telemetry notes directly from the paddock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7 — FINAL HERO & NEWSLETTER CAPTURE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="follow-programme" className="relative w-full min-h-[70vh] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 bg-alkota-black border-t border-white/10 overflow-hidden tech-grid-dark">
        <Image
          src={ALKOTA_STORY_MEDIA.paddockEnvironment.src}
          alt="Alkota paddock full bleed background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/90 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center sm:text-left">
          <TechnicalAnnotation label="JOIN THE PROGRAMME" value="2027 PREPARATION" variant="signal" />
          
          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            BUILD IT.<br />
            RACE IT.<br />
            LEARN.<br />
            <span className="text-alkota-signal">CHANGE IT.</span>
          </h2>

          <div className="space-y-4 font-sans text-sm sm:text-base text-alkota-snow/90 font-light leading-relaxed max-w-2xl">
            <p>
              Project 01 is scheduled to reach production in 2028.
            </p>
            <p className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              2027 IS WHERE WE INTEND TO MAKE IT EARN THAT RIGHT.
            </p>
          </div>

          {/* Email Capture Form */}
          <div className="pt-4 max-w-xl">
            {emailSubmitted ? (
              <div className="p-4 bg-alkota-signal/10 border border-alkota-signal text-alkota-signal font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>CONFIRMED. CHECK YOUR INBOX TO VERIFY YOUR RACING DISPATCH SUBSCRIPTION.</span>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!marketingConsent) {
                    setError("Marketing consent is required to subscribe.");
                    return;
                  }
                  setLoading(true);
                  setError("");
                  const consentText = "I agree to receive Alkota Racing 2027 development dispatches and engineering notes.";
                  const res = await captureLead({
                    email: emailInput,
                    lead_type: "newsletter",
                    marketing_consent: marketingConsent,
                    consent_text: consentText,
                    source_page: "/racing",
                    _hp: hp,
                    _t: renderTime,
                  });
                  setLoading(false);
                  if (res.success) {
                    setEmailSubmitted(true);
                    setEmailInput("");
                  } else {
                    setError(res.error || "Failed to register for dispatches.");
                  }
                }}
                className="space-y-3 text-left"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="sr-only"
                  aria-hidden="true"
                />

                <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-slate block">
                  SUBSCRIBE TO RACE DEVELOPMENT DISPATCHES:
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="flex-1 px-4 py-3.5 bg-alkota-carbon border border-white/20 text-white font-mono text-xs placeholder:text-alkota-slate focus:outline-none focus:border-alkota-signal"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    {loading ? "REGISTERING..." : "FOLLOW ALKOTA RACING"}
                  </button>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2 pt-1 text-[11px] font-sans text-alkota-slate">
                  <input
                    id="racing-newsletter-consent"
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 bg-black border-white/30 text-alkota-signal rounded-none cursor-pointer"
                  />
                  <label htmlFor="racing-newsletter-consent" className="cursor-pointer leading-tight">
                    I agree to receive Alkota Racing 2027 development dispatches and engineering notes. (Optional)
                  </label>
                </div>

                {error && (
                  <div className="text-red-400 font-mono text-xs pt-1">
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Page Ending Next Step */}
      <NextStepBanner
        stepNumber="NEXT"
        nextTitle="ROAD TO 2028"
        nextSubtitle="Explore how competition fits between physical prototype validation and planned 2028 production launch."
        href="/road-to-2028"
        label="DEVELOPMENT ROADMAP"
        ctaText="EXPLORE ROAD TO 2028"
      />
    </div>
  );
}

