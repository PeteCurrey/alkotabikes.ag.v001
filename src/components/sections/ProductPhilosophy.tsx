"use client";

import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
              <div key={p.label} className="p-3 bg-alkota-snow border border-black/10 space-y-1">
                <div className="font-bold text-alkota-black uppercase">{p.label}</div>
                <div className="font-sans text-[11px] text-alkota-slate">{p.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Close-Up Architectural Visual */}
        <div className="lg:col-span-6">
          <div className="relative w-full h-[450px] bg-alkota-carbon text-alkota-white p-8 border border-white/10 tech-grid-dark flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center z-10">
              <TechnicalAnnotation label="MACRO CHASSIS DETAIL" variant="signal" />
              <span className="font-mono text-[10px] text-alkota-slate uppercase">UD CARBON LAYUP</span>
            </div>

            {/* Graphic Monocoque Node Schematic */}
            <div className="relative my-auto flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto">
                <path
                  d="M 50 250 C 150 150, 250 120, 350 50"
                  fill="none"
                  stroke="#F4F6F7"
                  strokeWidth="28"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 250 L 350 250"
                  fill="none"
                  stroke="#737C84"
                  strokeWidth="16"
                />
                <circle cx="50" cy="250" r="20" fill="#647789" />
                <circle cx="350" cy="50" r="16" fill="#88929A" />
                <text x="80" y="240" fill="#647789" fontSize="10" fontFamily="monospace">
                  BB NODE / BSA 73MM
                </text>
              </svg>
            </div>

            <div className="border-t border-white/10 pt-4 z-10 font-mono text-[11px] text-alkota-slate flex items-center justify-between">
              <span>PROJECT / 01 CHASSIS NODE</span>
              <span>REV 001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
