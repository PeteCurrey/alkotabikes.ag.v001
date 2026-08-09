"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { PROJECT_01_SYSTEMS, type ProjectComponent } from "@/lib/data/project01";
import { ArrowLeft, ExternalLink, Sun, Moon, Check } from "lucide-react";

export default function ComponentDetailClient({ component }: { component: ProjectComponent }) {
  const [activePhoto, setActivePhoto] = useState<"DARK" | "ALPINE">("DARK");

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back to System Explorer Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/bikes/project-01#system-explorer"
            className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal uppercase hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PROJECT 01 MACHINE EXPLORER</span>
          </Link>

          <TechnicalAnnotation label={`SYSTEM ${component.systemNumber}`} value={component.category} variant="signal" />
        </div>

        {/* Hero Presentation Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-alkota-signal font-bold uppercase">{component.brand}</span>
            <span className="text-alkota-slate">•</span>
            <span className="text-alkota-slate uppercase">{component.systemName}</span>
            <span className="bg-alkota-signal/15 text-alkota-signal px-2.5 py-0.5 text-[10px] uppercase border border-alkota-signal/30">
              {component.status}
            </span>
          </div>

          <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-alkota-white leading-[0.95]">
            {component.brand}<br />
            <span className="text-alkota-signal">{component.model}</span>
          </h1>

          <p className="font-mono text-sm text-alkota-slate uppercase tracking-wider">
            {component.variant}
          </p>

          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-3xl font-light leading-relaxed pt-2">
            {component.summary}
          </p>
        </div>

        {/* Dual-Environment Component Studio Stage */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-8 relative w-full h-[360px] sm:h-[480px] md:h-[560px] bg-black/60 border border-white/10 flex items-center justify-center p-6 overflow-hidden">
            <Image
              src={activePhoto === "DARK" ? component.darkImageKey : component.alpineImageKey}
              alt={`${component.brand} ${component.model}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-contain object-center transition-all duration-500"
            />

            <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/70 px-3 py-1 text-alkota-signal border border-white/15">
              {activePhoto} STUDIO PORTRAIT • {component.brand}
            </div>
          </div>

          {/* Photo Controls & Quick Stats */}
          <div className="lg:col-span-4 space-y-6 font-sans">
            <div className="bg-alkota-carbon p-4 border border-white/10 space-y-4">
              <span className="font-mono text-[10px] text-alkota-signal uppercase font-bold block">
                STUDIO ENVIRONMENT CONTROL
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  onClick={() => setActivePhoto("DARK")}
                  className={`flex items-center justify-center gap-2 py-2 border transition-colors ${
                    activePhoto === "DARK" ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold" : "border-white/15 text-alkota-slate hover:text-white"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>DARK</span>
                </button>
                <button
                  onClick={() => setActivePhoto("ALPINE")}
                  className={`flex items-center justify-center gap-2 py-2 border transition-colors ${
                    activePhoto === "ALPINE" ? "border-white bg-white text-alkota-black font-bold" : "border-white/15 text-alkota-slate hover:text-white"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>ALPINE</span>
                </button>
              </div>
            </div>

            {/* Factual Specs Card */}
            <div className="bg-alkota-carbon p-5 border border-white/10 space-y-4 font-mono text-xs">
              <span className="text-alkota-slate text-[10px] uppercase font-bold block border-b border-white/10 pb-2">
                VERIFIED SPECIFICATION SUMMARY
              </span>
              <div className="space-y-2">
                {component.verifiedSpecifications.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-alkota-slate text-[11px] uppercase">{spec.label}</span>
                    <span className="text-alkota-white font-bold text-[11px] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Provenance Link */}
            <a
              href={component.manufacturerSource}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-alkota-carbon border border-white/10 hover:border-alkota-signal transition-colors font-mono text-xs text-alkota-white group"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] text-alkota-slate block">MANUFACTURER SOURCE</span>
                <span className="font-bold text-alkota-signal group-hover:underline">{component.manufacturer}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-alkota-slate group-hover:text-alkota-signal" />
            </a>
          </div>
        </div>

        {/* ALKOTA Chassis Integration Rationale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
          <div className="lg:col-span-8 bg-alkota-black p-6 sm:p-8 border border-white/10 space-y-4">
            <span className="font-mono text-xs text-alkota-signal uppercase tracking-wider font-bold">
              01 — ALKOTA CHASSIS INTEGRATION RATIONALE
            </span>
            <h3 className="font-display text-2xl font-bold text-alkota-white uppercase">
              WHY THIS COMPONENT EXISTS ON PROJECT 01
            </h3>
            <p className="text-alkota-snow/90 text-sm sm:text-base leading-relaxed font-light">
              {component.engineeringRationale}
            </p>
          </div>

          <div className="lg:col-span-4 bg-alkota-black p-6 sm:p-8 border border-white/10 space-y-4 font-mono text-xs">
            <span className="text-alkota-signal text-[10px] uppercase font-bold block border-b border-white/10 pb-2">
              02 — PROVENANCE & VALIDATION
            </span>
            <div className="space-y-3 text-alkota-slate">
              <div>
                <span className="text-[10px] uppercase block text-alkota-slate">MANUFACTURER:</span>
                <span className="text-alkota-white font-bold">{component.manufacturer}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase block text-alkota-slate">LAST VERIFIED DATE:</span>
                <span className="text-alkota-white font-bold">{component.sourceLastVerified}</span>
              </div>
              <div className="pt-2 flex items-center gap-2 text-alkota-signal">
                <Check className="w-4 h-4" />
                <span className="text-[11px]">OFFICIAL PRIMARY DOCUMENTATION CONFIRMED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
