"use client";

import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Compass, ImageOff } from "lucide-react";

/**
 * ASSET DEFECT RESOLUTION — 2026-08-09
 *
 * The asset previously used here (project01-alpine-testing.png) was byte-identical
 * to public/images/engineering-workshop.png — a workshop photograph, not alpine
 * terrain. It has been deleted. This component renders an explicit awaiting-asset
 * state until a genuine field image is supplied.
 *
 * The "ELEVATION: 2,400M" and "STATUS: ACTIVE TRAIL TESTING" strings have also
 * been removed. Field telemetry testing has NOT commenced (R00 programme status).
 * These claims must be registered in lib/claims.ts before they may be rendered.
 *
 * See CLAUDE.md Non-Negotiable #4 (no duplicate assets) and #1 (no fabricated claims).
 */
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
            <span>ALPINE R&D / PROTOTYPE PROGRAMME</span>
          </div>
        </div>

        {/* Awaiting-asset state — design archive pattern */}
        <div className="relative w-full min-h-[480px] bg-alkota-black border border-white/10 border-dashed flex flex-col items-center justify-center gap-6 p-8">
          <ImageOff className="w-10 h-10 text-alkota-slate/40" strokeWidth={1} />
          <div className="text-center space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-alkota-slate/50">
              ASSET PENDING
            </div>
            <div className="font-mono text-[9px] text-alkota-slate/30 max-w-sm leading-relaxed">
              Field imagery will be sourced from prototype validation programme.
              Planned: 2027 race development phase.
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-alkota-slate/30 uppercase border-t border-white/5 pt-3">
            <span>PROJECT / 01 — PROTOTYPE VALIDATION PLANNED 2027</span>
            <span>ASSET AWAITING</span>
          </div>
        </div>

        <div className="max-w-xl space-y-4">
          <p className="font-sans text-xl sm:text-2xl md:text-3xl text-alkota-white font-normal leading-snug">
            Numbers help us understand a bicycle. Terrain tells us whether we understood it correctly.
          </p>

          <p className="font-sans text-sm md:text-base text-alkota-snow/90 leading-relaxed font-light">
            Telemetry collection on high-velocity alpine trails will reveal real-world impact forces,
            chassis resonance, and mud clearances that no computer simulation can replicate.
            Field validation will begin during the upcoming R00 prototype development phase.
          </p>
        </div>
      </div>
    </section>
  );
}
