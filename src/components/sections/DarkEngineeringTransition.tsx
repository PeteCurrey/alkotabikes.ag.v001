"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ENGINEERING_PILLARS } from "@/lib/data/engineeringData";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight } from "lucide-react";

// Mapping pillars: 1 card features Pete Currey in the development workshop, 3 feature Project 01 technical/engineering visuals
const PILLAR_BACKGROUND_IMAGES: Record<string, string> = {
  chassis: ALKOTA_STORY_MEDIA.peteWorkshopLab.src,
  kinematics: ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src,
  materials: ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src,
  testing: ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src,
};

export default function DarkEngineeringTransition() {
  return (
    <section className="relative w-full bg-alkota-carbon text-alkota-white py-28 px-4 sm:px-6 lg:px-8 tech-grid-dark border-t border-b border-white/10 overflow-hidden">
      {/* Gradient Mask Transition Header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-alkota-white to-transparent pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <TechnicalAnnotation label="ALKOTA / ENGINEERING" variant="signal" />
            <h2 className="font-display font-extrabold text-4xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              NOTHING IS<br />
              <span className="text-alkota-slate">ACCIDENTAL.</span>
            </h2>
          </div>

          <p className="font-sans text-sm md:text-base text-alkota-slate max-w-md leading-relaxed font-light">
            We isolate every parameter that influences bicycle performance. Engineering analysis guides our decisions before hardware goes to physical testing.
          </p>
        </div>

        {/* 4 Pillars Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINEERING_PILLARS.map((pillar) => {
            const bgImage = PILLAR_BACKGROUND_IMAGES[pillar.id];

            return (
              <Link
                key={pillar.id}
                href={pillar.route}
                className="group p-8 bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all duration-500 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-xl"
              >
                {/* Reveal-on-hover Background Image */}
                {bgImage && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <Image
                      src={bgImage}
                      alt={`ALKOTA Project 01 ${pillar.title} engineering visualization`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center opacity-20 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Gradient Overlay for Text Readability & Cinematic Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-alkota-black/80 to-alkota-black/50 group-hover:via-alkota-black/70 group-hover:to-alkota-black/30 transition-colors duration-700" />
                  </div>
                )}

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-alkota-signal">
                      {pillar.number}
                    </span>
                    <ArrowRight className="w-5 h-5 text-alkota-slate group-hover:text-alkota-signal group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-2xl font-bold text-alkota-white tracking-tight uppercase group-hover:text-alkota-signal transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="font-mono text-[11px] text-alkota-slate uppercase">
                      {pillar.subtitle}
                    </div>
                  </div>

                  <p className="font-sans text-xs text-alkota-slate group-hover:text-alkota-snow transition-colors leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                {/* Metrics Footer */}
                <div className="border-t border-white/10 pt-4 space-y-1 font-mono text-[10px] relative z-10">
                  {pillar.metrics.map((m) => (
                    <div key={m.label} className="flex justify-between text-alkota-slate">
                      <span>{m.label}:</span>
                      <span className="text-alkota-white font-semibold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
