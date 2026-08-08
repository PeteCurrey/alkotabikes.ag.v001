"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, Wrench, CheckCircle2 } from "lucide-react";
import { brandAssets } from "@/lib/assets";

export default function WorkshopFeature() {
  const workshopPoints = [
    "Precision carbon fiber layup control & telemetry bench",
    "Architectural development laboratory",
    "5-axis CNC machining & titanium hardware assembly",
    "Linear spectral lighting & shock dyno testing",
  ];

  return (
    <section className="w-full bg-alkota-carbon text-alkota-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 tech-grid-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <TechnicalAnnotation label="THE WORKSHOP" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              WHERE IDEAS<br />
              <span className="text-alkota-slate">BECOME HARDWARE.</span>
            </h2>
          </div>

          <Link
            href="/engineering"
            className="px-6 py-3 bg-alkota-signal text-alkota-black hover:bg-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 self-start md:self-end shadow-md"
          >
            <span>ENTER ENGINEERING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Workshop Environment Photographic Showcase */}
        <div className="relative w-full min-h-[520px] bg-alkota-black border border-white/10 flex flex-col justify-between overflow-hidden shadow-2xl group">
          {/* Workshop Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={brandAssets.engineeringWorkshop}
              alt="ALKOTA Project 01 in Performance Engineering workshop"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center opacity-45 group-hover:scale-[1.02] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-alkota-carbon via-alkota-carbon/80 to-transparent w-full md:w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon via-transparent to-alkota-carbon/40" />
          </div>

          {/* Top Annotations */}
          <div className="p-8 md:p-12 flex flex-wrap items-center justify-between gap-4 z-10 font-mono text-xs text-alkota-slate uppercase">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-alkota-signal" />
              <span>FACILITY / PERFORMANCE ENGINEERING LAB</span>
            </div>
            <span>LOCATION: R&D WORKSHOP 01</span>
          </div>

          {/* Center Editorial Copy */}
          <div className="p-8 md:p-12 my-auto max-w-2xl space-y-4 z-10">
            <p className="font-sans text-lg sm:text-xl text-alkota-snow font-light leading-relaxed">
              The workshop is where assumptions are challenged. Frames are measured. Components are stripped down. Set-ups are changed. Ideas are tested.
            </p>

            <p className="font-mono text-xs text-alkota-signal uppercase tracking-wider font-semibold">
              AND EVERY ITERATION EITHER EARNS ITS PLACE OR DISAPPEARS.
            </p>
          </div>

          {/* Bottom Grid Features */}
          <div className="p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/10 z-10 font-mono text-[11px] text-alkota-slate bg-alkota-carbon/80 backdrop-blur-md">
            {workshopPoints.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-alkota-signal flex-shrink-0" />
                <span className="text-alkota-snow/90 uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
