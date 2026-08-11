"use client";

import React from "react";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { brandAssets } from "@/lib/assets";

export default function ProductPhilosophy() {
  const points = [
    { label: "GEOMETRY", text: "Affects rider weight distribution, traction, and cornering balance." },
    { label: "KINEMATICS", text: "Governs rear wheel travel progression, pedal anti-squat, and brake squat." },
    { label: "FRAME STIFFNESS", text: "Tuned torsional compliance prevents arm fatigue over high-frequency chatter." },
    { label: "INTEGRATION", text: "Clean hardware packaging ensures intuitive workshop serviceability." },
  ];

  return (
    <section className="w-full bg-alkota-white text-alkota-black py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <TechnicalAnnotation label="PHILOSOPHY" value="SYSTEM INTEGRATION" variant="slate" />

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight uppercase text-alkota-black leading-[0.95]">
            DESIGN THE RIDE.<br />
            <span className="text-alkota-slate">THEN DESIGN THE BIKE.</span>
          </h2>

          <p className="font-sans text-base text-alkota-graphite leading-relaxed">
            A mountain bike is a complete system. Geometry affects weight distribution. Suspension affects traction. Frame stiffness affects feedback. Components affect control.
          </p>

          <p className="font-sans text-sm text-alkota-slate leading-relaxed">
            The best result comes when those systems are developed together from the beginning. That is the premise behind ALKOTA Performance Engineering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-xs">
            {points.map((p) => (
              <div
                key={p.label}
                className="relative p-[1px] overflow-hidden group border border-black/10 transition-all duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                {/* Gold Border Beam Glow Animation */}
                <div
                  className="absolute inset-[-200%] animate-border-beam gold-beam-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  aria-hidden="true"
                />
                {/* Card Content */}
                <div className="relative z-10 p-3 bg-alkota-snow space-y-1 h-full">
                  <div className="font-bold text-alkota-black uppercase tracking-wider flex items-center justify-between">
                    <span>{p.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  </div>
                  <div className="font-sans text-[11px] text-alkota-slate">{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Technical Development Blueprint Visual */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative w-full h-[380px] sm:h-[460px] bg-alkota-white border border-black/10 overflow-hidden shadow-2xl group flex items-center justify-center p-2">
            <Image
              src={brandAssets.project01DevelopmentSheet}
              alt="ALKOTA Project 01 Pre-Production Development Sheet Technical Drawing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-1 group-hover:scale-[1.01] transition-transform duration-500 ease-out"
              priority
            />
          </div>
          <div className="font-mono text-[10px] text-alkota-slate flex items-center justify-between uppercase border-t border-black/10 pt-2">
            <span>PROJECT 01 · FRAME DESIGN DEVELOPMENT SHEET</span>
            <span>REV 001</span>
          </div>
        </div>
      </div>
    </section>
  );
}
