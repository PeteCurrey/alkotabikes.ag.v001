"use client";

import React, { useState } from "react";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { COMPONENT_EXCELLENCE, ComponentDetail } from "@/lib/data/bikesData";
import { componentAssets } from "@/lib/assets";
import { Layers, Sun, Moon, Check } from "lucide-react";

export default function ComponentExcellence() {
  const [viewMode, setViewMode] = useState<"DARK" | "ALPINE">("DARK");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeComponent, setActiveComponent] = useState<ComponentDetail>(COMPONENT_EXCELLENCE[0]);

  const categories = ["ALL", "SUSPENSION", "BRAKES", "DRIVETRAIN", "WHEELS", "TYRES", "COCKPIT", "TOUCHPOINTS"];

  const filteredComponents = selectedCategory === "ALL"
    ? COMPONENT_EXCELLENCE
    : COMPONENT_EXCELLENCE.filter((c) => c.category === selectedCategory);

  return (
    <section className="w-full bg-alkota-carbon text-alkota-white py-24 px-4 sm:px-6 lg:px-8 tech-grid-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <TechnicalAnnotation label="HARDWARE ANATOMY" value="COMPONENT EXCELLENCE" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white">
              ENGINEERED FOR THE<br />
              <span className="text-alkota-signal">EXTREME DEMANDS.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-alkota-snow/80 leading-relaxed font-light">
              Every component on ALKOTA Project 01 is selected or engineered to match the stiffness, heat dissipation, and precision demanded by high-velocity alpine riding.
            </p>
          </div>

          {/* Environment & Studio Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-alkota-black border border-white/15 p-1 flex items-center space-x-1">
              <button
                onClick={() => setViewMode("DARK")}
                className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
                  viewMode === "DARK"
                    ? "bg-alkota-signal text-alkota-black font-bold"
                    : "text-alkota-slate hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>DARK STUDIO</span>
              </button>

              <button
                onClick={() => setViewMode("ALPINE")}
                className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
                  viewMode === "ALPINE"
                    ? "bg-alkota-white text-alkota-black font-bold"
                    : "text-alkota-slate hover:text-white"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>ALPINE SHOWROOM</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 uppercase border whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "border-alkota-signal bg-alkota-signal/15 text-alkota-white font-semibold"
                  : "border-white/10 text-alkota-slate hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Showcase Component Hero */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Image Display */}
          <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[420px] md:h-[480px] bg-alkota-carbon/50 border border-white/10 flex items-center justify-center p-6 overflow-hidden">
            <Image
              src={
                viewMode === "DARK"
                  ? componentAssets[activeComponent.darkImageKey as keyof typeof componentAssets]
                  : componentAssets[activeComponent.alpineImageKey as keyof typeof componentAssets]
              }
              alt={activeComponent.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-center transition-all duration-500 hover:scale-105"
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/60 px-2.5 py-1 text-alkota-signal border border-white/10">
              {viewMode} PORTRAIT • {activeComponent.category}
            </div>
          </div>

          {/* Editorial Specs Details */}
          <div className="lg:col-span-5 space-y-6 font-sans">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-alkota-signal uppercase tracking-wider font-bold">
                {activeComponent.subtitle}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-alkota-white uppercase">
                {activeComponent.name}
              </h3>
              <p className="font-mono text-xs text-alkota-slate uppercase border-l-2 border-alkota-signal pl-2 py-0.5">
                {activeComponent.specs}
              </p>
            </div>

            <p className="text-alkota-snow/90 text-sm leading-relaxed font-light">
              {activeComponent.description}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-alkota-slate">
              <div className="flex items-center gap-2 text-alkota-signal">
                <Check className="w-4 h-4" />
                <span>FACTORY SPECIFICATION APPROVED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Component Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {filteredComponents.map((comp) => {
            const isSelected = activeComponent.id === comp.id;
            const imgSrc =
              viewMode === "DARK"
                ? componentAssets[comp.darkImageKey as keyof typeof componentAssets]
                : componentAssets[comp.alpineImageKey as keyof typeof componentAssets];

            return (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp)}
                className={`group relative flex flex-col items-center p-3 bg-alkota-black border transition-all text-left space-y-2 ${
                  isSelected
                    ? "border-alkota-signal bg-alkota-signal/10 shadow-lg"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="relative w-full h-20 bg-alkota-carbon/40 flex items-center justify-center overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={comp.name}
                    fill
                    sizes="160px"
                    className="object-contain object-center group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="w-full space-y-0.5 font-mono text-[10px] overflow-hidden">
                  <p className="text-alkota-white font-bold truncate group-hover:text-alkota-signal">
                    {comp.name}
                  </p>
                  <p className="text-alkota-slate truncate text-[9px] uppercase">
                    {comp.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Master Hardware Overview Board */}
        <div className="bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-alkota-signal font-mono text-[10px] uppercase">SYSTEM COMPONENT MATRIX</div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-alkota-white">
                PROJECT 01 INTEGRATED HARDWARE BOARD
              </h3>
            </div>
            <TechnicalAnnotation label="FULL SPEC BOARD" value="REV 001" variant="signal" />
          </div>

          <div className="relative w-full h-[320px] sm:h-[450px] md:h-[580px] bg-black/60 border border-white/10 flex items-center justify-center p-4">
            <Image
              src={componentAssets.overviewGrid}
              alt="ALKOTA Project 01 master component hardware board overview"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
