"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, Settings } from "lucide-react";
import { brandAssets } from "@/lib/assets";

export default function ConfiguratorPreviewSection() {
  const [previewFinish, setPreviewFinish] = useState<"GLACIER" | "CARBON">("CARBON");

  const finishData = {
    CARBON: {
      label: "NAKED CARBON",
      subtitle: "Raw Composite Structure",
      src: brandAssets.project01CarbonHero,
      alt: "ALKOTA Project 01 Naked Carbon finish",
      borderColor: "border-alkota-signal",
      tagColor: "text-alkota-signal",
    },
    GLACIER: {
      label: "GLACIER WHITE",
      subtitle: "Alpine Precision Finish",
      src: brandAssets.project01WhiteHero,
      alt: "ALKOTA Project 01 Glacier White finish",
      borderColor: "border-white/60",
      tagColor: "text-alkota-white",
    },
  };

  const active = finishData[previewFinish];

  return (
    <section className="w-full bg-alkota-carbon text-alkota-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 tech-grid-dark">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <TechnicalAnnotation label="ONLINE CONFIGURATION ENGINE" variant="signal" />
            <h2 className="font-display font-extrabold text-4xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              YOUR MACHINE.<br />
              <span className="text-alkota-slate">YOUR PARAMETERS.</span>
            </h2>
          </div>

          <Link
            href="/configure"
            className="px-8 py-4 bg-alkota-signal text-alkota-black hover:bg-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-3"
          >
            <Settings className="w-4 h-4" />
            <span>ENTER CONFIGURATOR</span>
          </Link>
        </div>

        {/* Studio Preview Card */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          {/* Visual Stage with finish toggle */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Finish toggle tabs */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {(["CARBON", "GLACIER"] as const).map((fin) => (
                <button
                  key={fin}
                  onClick={() => setPreviewFinish(fin)}
                  className={`px-4 py-2 border uppercase font-bold transition-all ${
                    previewFinish === fin
                      ? "border-alkota-signal bg-alkota-signal/15 text-alkota-white"
                      : "border-white/10 text-alkota-slate hover:border-white/30 hover:text-white"
                  }`}
                >
                  {finishData[fin].label}
                </button>
              ))}
            </div>

            {/* Bike Image */}
            <div className={`relative w-full h-[300px] sm:h-[380px] md:h-[420px] bg-black/50 border ${active.borderColor} flex items-center justify-center overflow-hidden transition-all duration-300`}>
              <Image
                src={active.src}
                alt={active.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-center transition-all duration-500 scale-[0.98] hover:scale-100"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/70 px-2.5 py-1 text-alkota-signal border border-white/10 uppercase tracking-widest">
                {active.label} • STUDIO PREVIEW
              </div>
            </div>
          </div>

          {/* Right Build Summary */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            <div className="border-b border-white/10 pb-3 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">PLATFORM</span>
              <span className="font-bold text-alkota-white">PROJECT 01</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-alkota-slate">
                <span>FINISH:</span>
                <span className={`font-bold ${active.tagColor}`}>{active.label}</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>FRAME SIZES:</span>
                <span className="text-alkota-white">M · L · XL</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>WHEEL FORMAT:</span>
                <span className="text-alkota-white">29 / 29 PRIMARY</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>SUSPENSION:</span>
                <span className="text-alkota-white">160mm / 150mm</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>CHASSIS:</span>
                <span className="text-alkota-white">UD CARBON MONOCOQUE</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>PRODUCTION PRICE:</span>
                <span className="text-alkota-signal font-bold">TBC — CONTACT</span>
              </div>
            </div>

            <Link
              href="/configure"
              className="w-full py-3 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 text-xs mt-4"
            >
              <span>BUILD YOUR SPEC</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-4 border-t border-white/10 text-[10px] text-alkota-slate leading-normal">
              R00 engineering baseline. Specification subject to prototype validation. Contact us to register interest.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
