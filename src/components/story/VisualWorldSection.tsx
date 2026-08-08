"use client";

import React from "react";
import { VisualWorld } from "@/content/media/alkotaStoryMedia";

interface VisualWorldSectionProps {
  world: VisualWorld;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function VisualWorldSection({
  world,
  children,
  className = "",
  id,
}: VisualWorldSectionProps) {
  const worldStyles = {
    ALPINE_PRECISION:
      "bg-alkota-white text-alkota-black border-b border-black/10 py-24 px-4 sm:px-6 lg:px-8",
    ENGINEERING_LAB:
      "bg-alkota-carbon text-alkota-white tech-grid-dark border-b border-white/10 py-24 px-4 sm:px-6 lg:px-8",
    TERRAIN_HUMAN:
      "bg-alkota-black text-alkota-white tech-grid-dark border-b border-white/10 py-24 px-4 sm:px-6 lg:px-8",
  };

  const worldBadge = {
    ALPINE_PRECISION: { code: "WORLD 01", name: "ALPINE PRECISION", color: "text-alkota-slate border-black/20" },
    ENGINEERING_LAB: { code: "WORLD 02", name: "ENGINEERING LAB", color: "text-alkota-signal border-alkota-signal/40" },
    TERRAIN_HUMAN: { code: "WORLD 03", name: "TERRAIN & HUMAN", color: "text-alkota-snow border-white/20" },
  };

  const badge = worldBadge[world];

  return (
    <section id={id} className={`w-full relative transition-colors duration-500 ${worldStyles[world]} ${className}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest pb-4 border-b border-current opacity-60">
          <span className="font-bold">{badge.code} • {badge.name}</span>
          <span>ALKOTA PERFORMANCE ENGINEERING</span>
        </div>
        {children}
      </div>
    </section>
  );
}
