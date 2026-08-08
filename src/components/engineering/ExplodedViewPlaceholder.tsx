"use client";

import React, { useState } from "react";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Settings, ShieldCheck } from "lucide-react";
import { componentAssets } from "@/lib/assets";

export default function ExplodedViewPlaceholder() {
  const [exploded, setExploded] = useState(true);

  const parts = [
    { id: "caliper-front", name: "Hope EVO V6Ti CNC Caliper (UK)", spec: "Titanium Pistons", image: componentAssets.hopeEvoAngleDark },
    { id: "caliper-rear", name: "Hope TR4 CNC Rear Caliper", spec: "Billet AL2014-T6", image: componentAssets.hopeTr4SilverAlpine },
    { id: "hardware-pack", name: "Grade 5 Titanium Main Pivot Spindle", spec: "15 Nm Torque", image: componentAssets.hopeEvoDark },
  ];

  return (
    <div className="bg-alkota-carbon text-alkota-white p-6 border border-white/10 tech-grid-dark rounded-none space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider">
            CNC PRECISION HARDWARE ANATOMY
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-alkota-white">
            HOPE EVO CNC BILLET MACHINING & HARDWARE PACKAGING
          </h3>
        </div>

        <button
          onClick={() => setExploded(!exploded)}
          className="px-4 py-2 bg-alkota-black border border-alkota-signal text-alkota-signal hover:bg-alkota-signal hover:text-alkota-black transition-all font-mono text-xs uppercase font-semibold flex items-center gap-2"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{exploded ? "COMPACT VIEW" : "EXPLODE SCHEMATIC"}</span>
        </button>
      </div>

      {/* Exploded Hardware High-Res Image View */}
      <div className="relative py-8 px-4 flex items-center justify-center min-h-[300px] bg-alkota-black border border-white/10">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full transition-all duration-500 ${exploded ? "scale-100" : "scale-95 opacity-90"}`}>
          {parts.map((part) => (
            <div
              key={part.id}
              className="flex flex-col items-center bg-alkota-carbon/60 p-4 border border-white/10 space-y-3 group hover:border-alkota-signal transition-colors"
            >
              <div className="relative w-full h-40 bg-black/40 overflow-hidden flex items-center justify-center">
                <Image
                  src={part.image}
                  alt={part.name}
                  fill
                  sizes="320px"
                  className="object-contain object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="text-center space-y-1 font-mono">
                <p className="text-alkota-white text-xs font-bold">{part.name}</p>
                <p className="text-alkota-signal text-[10px] uppercase bg-alkota-signal/10 px-2 py-0.5 border border-alkota-signal/20 inline-block">
                  {part.spec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

