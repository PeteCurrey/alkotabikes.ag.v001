"use client";

import React from "react";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Compass } from "lucide-react";
import { brandAssets } from "@/lib/assets";

export default function TerrainBench() {
  return (
    <section className="relative w-full bg-alkota-carbon text-alkota-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 tech-grid-dark overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <TechnicalAnnotation label="REAL TERRAIN VALIDATION" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              THE FINAL<br />
              <span className="text-alkota-slate">TEST BENCH.</span>
            </h2>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs text-alkota-slate">
            <Compass className="w-4 h-4 text-alkota-signal" />
            <span>ALPINE R&D / HAUTE-SAVOIE</span>
          </div>
        </div>

        {/* Alpine Riding Photographic Test Bench Container */}
        <div className="relative w-full min-h-[480px] bg-alkota-black border border-white/10 p-8 md:p-12 flex flex-col justify-between overflow-hidden shadow-2xl group">
          <Image
            src={brandAssets.project01AlpineTesting}
            alt="ALKOTA Project 01 rider testing prototype on alpine terrain"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center opacity-55 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-alkota-carbon via-alkota-carbon/80 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon via-transparent to-alkota-carbon/40" />

          <div className="flex justify-between items-center z-10 font-mono text-xs text-alkota-slate uppercase">
            <span>ALPINE FIELD VALIDATION</span>
            <span>ELEVATION: 2,400M</span>
          </div>

          <div className="my-auto max-w-xl space-y-4 z-10 py-8">
            <p className="font-sans text-xl sm:text-2xl md:text-3xl text-alkota-white font-normal leading-snug">
              Numbers help us understand a bicycle. Terrain tells us whether we understood it correctly.
            </p>

            <p className="font-sans text-sm md:text-base text-alkota-snow/90 leading-relaxed font-light">
              Telemetry collection on high-velocity alpine trails reveals real-world impact forces, chassis resonance, and mud clearances that no computer simulation can replicate.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 z-10 font-mono text-[11px] text-alkota-slate flex items-center justify-between bg-alkota-carbon/60 backdrop-blur-sm -mx-8 -mb-8 md:-mx-12 md:-mb-12 px-8 py-4 md:px-12">
            <span>STATUS: ACTIVE TRAIL TESTING</span>
            <span>PROJECT / 01 VALIDATION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
