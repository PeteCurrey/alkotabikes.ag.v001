"use client";

import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, Settings } from "lucide-react";

export default function ConfiguratorPreviewSection() {
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
        <div className="bg-alkota-black border border-white/10 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Silhouette Left */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center py-12 bg-alkota-carbon border border-white/10 relative overflow-hidden">
            <div className="font-mono text-[10px] text-alkota-slate uppercase absolute top-4 left-4">
              STUDIO PREVIEW
            </div>

            <svg viewBox="0 0 800 400" className="w-full max-w-xl h-auto drop-shadow-2xl">
              <circle cx="180" cy="280" r="100" stroke="#737C84" strokeWidth="6" fill="none" />
              <circle cx="620" cy="280" r="100" stroke="#737C84" strokeWidth="6" fill="none" />
              <polygon points="560,110 380,140 340,290 380,140" fill="none" stroke="#F4F6F7" strokeWidth="18" strokeLinejoin="round" />
              <line x1="560" y1="110" x2="340" y2="290" stroke="#F4F6F7" strokeWidth="22" strokeLinecap="round" />
              <line x1="340" y1="290" x2="180" y2="280" stroke="#737C84" strokeWidth="12" strokeLinecap="round" />
            </svg>
          </div>

          {/* Right Build Summary */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            <div className="border-b border-white/10 pb-3 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">PLATFORM</span>
              <span className="font-bold text-alkota-white">PROJECT 01</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-alkota-slate">
                <span>FRAME SIZE:</span>
                <span className="text-alkota-white">LARGE (L)</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>WHEEL FORMAT:</span>
                <span className="text-alkota-white">MX (29 / 27.5)</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>FINISH:</span>
                <span className="text-alkota-white">GRAPHITE ANODIZED</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>SUSPENSION:</span>
                <span className="text-alkota-white">DEVELOPMENT SPEC</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>ESTIMATED WEIGHT:</span>
                <span className="text-alkota-signal font-bold">— KG</span>
              </div>
              <div className="flex justify-between text-alkota-slate">
                <span>ESTIMATED PRICE:</span>
                <span className="text-alkota-signal font-bold">£—</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[10px] text-alkota-slate leading-normal">
              * Production specification and pricing to be confirmed upon final engineering validation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
