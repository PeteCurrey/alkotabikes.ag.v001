"use client";

import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { PROCESS_STAGES } from "@/lib/data/engineeringData";

export default function ProcessTimeline() {
  return (
    <section className="w-full bg-alkota-white text-alkota-black py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div className="space-y-3">
            <TechnicalAnnotation label="DEVELOPMENT METHODOLOGY" variant="slate" />
            <h2 className="font-display font-extrabold text-4xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              OBSESSION,<br />
              <span className="text-alkota-slate">STRUCTURED.</span>
            </h2>
          </div>

          <p className="font-sans text-sm text-alkota-graphite max-w-md leading-relaxed font-light">
            Performance is not a styling exercise. It is the cumulative result of hundreds of decisions, measured against one objective: a better ride.
          </p>
        </div>

        {/* 8-Stage Process Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="p-6 bg-alkota-snow border border-black/10 space-y-4 hover:bg-white hover:border-alkota-black transition-all group"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="font-mono text-xs font-bold text-alkota-slate group-hover:text-alkota-black">
                  STEP / {stage.step}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-alkota-slate group-hover:bg-alkota-black" />
              </div>

              <h3 className="font-display text-xl font-bold text-alkota-black uppercase tracking-tight">
                {stage.title}
              </h3>

              <p className="font-sans text-xs text-alkota-graphite leading-relaxed font-light">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
