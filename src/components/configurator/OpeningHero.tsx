"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import { PROJECT01_MEDIA } from "@/content/project01/media";
import { ArrowRight, Settings, Shield, Sliders, ChevronDown } from "lucide-react";

interface OpeningHeroProps {
  finish: "GLACIER" | "CARBON";
  onFinishChange: (finish: "GLACIER" | "CARBON") => void;
  onSelectMode: (mode: "machine" | "systems" | "fit" | "build") => void;
}

export default function OpeningHero({
  finish,
  onFinishChange,
  onSelectMode,
}: OpeningHeroProps) {
  const currentMedia = PROJECT01_MEDIA.getFinishHero(finish);

  return (
    <div className="relative w-full min-h-[90vh] bg-alkota-carbon text-alkota-white flex flex-col justify-between p-4 sm:p-6 lg:p-12 border-b border-white/10 tech-grid-dark overflow-hidden">
      {/* Background Image Stage */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentMedia.src}
          alt={currentMedia.alt}
          fill
          priority
          sizes="100vw"
          className="object-contain object-center opacity-70 transition-all duration-700 scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon via-alkota-carbon/30 to-alkota-carbon/70" />
      </div>

      {/* Top Bar: Labels & Status */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <TechnicalAnnotation label="PROJECT 01" value="DIGITAL SHOWROOM" variant="signal" />
          <SpecificationStatus status="DEVELOPMENT_BASELINE" label="PRE-PRODUCTION / R00" />
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-alkota-slate">
          <span>PROGRAMME STATUS:</span>
          <span className="text-alkota-signal font-bold">PRE-PRODUCTION DEVELOPMENT</span>
        </div>
      </div>

      {/* Main Center Content / Title */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-12 space-y-6">
        <div className="space-y-3">
          <span className="font-mono text-xs text-alkota-signal uppercase tracking-widest font-bold block">
            PROJECT 01 CONTROLLED SPECIFICATION
          </span>
          <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-8xl uppercase tracking-tight text-white leading-[0.9]">
            BUILD THE MACHINE<br />
            <span className="text-alkota-signal">AROUND THE RIDER.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-xl font-light leading-relaxed">
            Project 01 is an analogue mountain bike platform currently in engineering development. Understand the systems before specifying your build.
          </p>
        </div>

        {/* Finish Selector Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onFinishChange("GLACIER")}
            className={`px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all ${
              finish === "GLACIER"
                ? "border-alkota-signal bg-alkota-signal/20 text-white font-bold"
                : "border-white/20 text-alkota-slate hover:text-white"
            }`}
          >
            GLACIER WHITE
          </button>
          <button
            onClick={() => onFinishChange("CARBON")}
            className={`px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all ${
              finish === "CARBON"
                ? "border-alkota-signal bg-alkota-signal/20 text-white font-bold"
                : "border-white/20 text-alkota-slate hover:text-white"
            }`}
          >
            NAKED CARBON
          </button>
        </div>
      </div>

      {/* Bottom Bar: Mode Selection Navigation & CTA */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">
        {/* Modes Sub-Nav */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full md:w-auto font-mono text-xs">
          {[
            { mode: "machine", label: "01 MACHINE", desc: "Studio Explorer" },
            { mode: "systems", label: "02 SYSTEMS", desc: "Engineering Hotspots" },
            { mode: "fit", label: "03 FIT", desc: "Rider Geometry" },
            { mode: "build", label: "04 BUILD", desc: "Configuration" },
          ].map((item) => (
            <button
              key={item.mode}
              onClick={() => onSelectMode(item.mode as any)}
              className="p-3 border border-white/10 bg-alkota-black/60 hover:border-alkota-signal hover:bg-alkota-black text-left transition-all group"
            >
              <div className="font-bold text-alkota-white group-hover:text-alkota-signal transition-colors text-[11px] sm:text-xs">
                {item.label}
              </div>
              <div className="text-[9px] text-alkota-slate font-light hidden sm:block">
                {item.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => onSelectMode("machine")}
          className="w-full md:w-auto px-8 py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
        >
          <span>BEGIN EXPLORATION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
