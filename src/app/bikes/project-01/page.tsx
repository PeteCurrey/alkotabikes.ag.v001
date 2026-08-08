"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { FLAGSHIP_BIKE, FINISH_COLORWAYS } from "@/lib/data/bikesData";
import HotspotViewer from "@/components/sections/HotspotViewer";
import ConfiguratorPreviewSection from "@/components/sections/ConfiguratorPreviewSection";
import ComponentExcellence from "@/components/sections/ComponentExcellence";
import { ArrowRight, Settings, CheckCircle2, ShieldCheck } from "lucide-react";
import { brandAssets } from "@/lib/assets";


export default function Project01Page() {
  const [selectedFinish, setSelectedFinish] = useState<"GLACIER" | "CARBON">("CARBON");

  const currentFinish = FINISH_COLORWAYS.find((f) => f.id === selectedFinish) || FINISH_COLORWAYS[1];
  const activeImageSrc =
    selectedFinish === "CARBON" ? brandAssets.project01CarbonHero : brandAssets.project01WhiteHero;

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Hero Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <TechnicalAnnotation label="FLAGSHIP CHASSIS" value="PROJECT 01" variant="signal" />
          <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            {FLAGSHIP_BIKE.name}
          </h1>
          <p className="font-mono text-xs sm:text-sm text-alkota-signal uppercase tracking-wider">
            {FLAGSHIP_BIKE.descriptor} • {FLAGSHIP_BIKE.status}
          </p>
          <p className="font-sans text-base sm:text-lg text-alkota-snow max-w-2xl font-light leading-relaxed">
            {FLAGSHIP_BIKE.overview}
          </p>
        </div>

        {/* Product Studio & Colourway Selector Module */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                LAUNCH FINISH SELECTION
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-alkota-white uppercase">
                {currentFinish.name}
              </h2>
              <p className="font-mono text-xs text-alkota-slate uppercase mt-1">
                {currentFinish.subtitle}
              </p>
            </div>

            {/* Colourway Selector Buttons */}
            <div className="flex items-center space-x-3">
              {FINISH_COLORWAYS.map((finish) => (
                <button
                  key={finish.id}
                  onClick={() => setSelectedFinish(finish.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 border font-mono text-xs uppercase transition-all ${
                    selectedFinish === finish.id
                      ? "border-alkota-signal bg-alkota-signal/15 text-alkota-white font-semibold shadow-md"
                      : "border-white/15 hover:border-white/40 text-alkota-slate hover:text-white"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: finish.swatchHex }}
                  />
                  <span>{finish.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Image Display */}
          <div className="relative w-full h-[360px] sm:h-[450px] md:h-[520px] flex items-center justify-center py-6">
            <Image
              src={activeImageSrc}
              alt={`ALKOTA Project 01 ${currentFinish.name} mountain bike with tan-wall Maxxis tyres`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain object-center transition-all duration-500"
            />
          </div>

          {/* Finish Description Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-white/10 pt-6 font-sans text-xs">
            <div className="md:col-span-8 space-y-2">
              <span className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
                FINISH SPECIFICATION
              </span>
              <p className="text-alkota-snow/90 leading-relaxed font-light text-sm">
                {currentFinish.description}
              </p>
            </div>

            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-3 font-mono text-xs text-alkota-signal">
              <ShieldCheck className="w-4 h-4" />
              <span>MAXXIS ASSEGAI & MINION DHR II TAN-WALL TYRES</span>
            </div>
          </div>
        </div>

        {/* Specifications Matrix */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-alkota-signal uppercase text-[10px]">PRODUCTION-INTENT BILL OF MATERIALS</div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-alkota-white">TECHNICAL SPECIFICATIONS</h3>
            </div>
            <TechnicalAnnotation label="DEVELOPMENT SPEC" variant="signal" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 font-mono text-xs">
            {FLAGSHIP_BIKE.specifications.map((spec) => (
              <div key={spec.label} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-1">
                <span className="text-alkota-slate text-[11px] uppercase tracking-wider">{spec.label}</span>
                <span className="text-alkota-white font-medium text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Component Excellence Gallery & Hardware Anatomy */}
        <ComponentExcellence />


        {/* Hotspots Interactive Inspection */}
        <HotspotViewer />

        {/* Geometry Table */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-alkota-signal uppercase text-[10px]">CHASSIS DIMENSIONS</div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-alkota-white">GEOMETRY MATRIX</h3>
            </div>
            <TechnicalAnnotation label="DEVELOPMENT REV 001" variant="slate" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-alkota-slate uppercase">
                  <th className="py-3">PARAMETER</th>
                  <th className="py-3">MEDIUM (M)</th>
                  <th className="py-3">LARGE (L)</th>
                  <th className="py-3">XLARGE (XL)</th>
                  <th className="py-3">UNIT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-alkota-snow">
                {FLAGSHIP_BIKE.geometryTable.map((row) => (
                  <tr key={row.parameter}>
                    <td className="py-3 font-semibold text-alkota-white">{row.parameter}</td>
                    <td className="py-3">{row.medium}</td>
                    <td className="py-3 text-alkota-signal font-bold">{row.large}</td>
                    <td className="py-3">{row.extraLarge}</td>
                    <td className="py-3 text-alkota-slate">{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inline Configurator Call to Action */}
        <ConfiguratorPreviewSection />
      </div>
    </div>
  );
}
