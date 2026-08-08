"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { PROJECT_01_SYSTEMS, ProjectComponent } from "@/lib/data/project01";
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Moon, Sun, Layers, ShieldCheck, ExternalLink } from "lucide-react";
import { brandAssets } from "@/lib/assets";

export default function HotspotViewer() {
  const [activeMode, setActiveMode] = useState<"MACHINE" | "SYSTEMS">("MACHINE");
  const [selectedSystem, setSelectedSystem] = useState<ProjectComponent>(PROJECT_01_SYSTEMS[0]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [viewTheme, setViewTheme] = useState<"DARK" | "ALPINE">("DARK");
  const [hoveredSystemId, setHoveredSystemId] = useState<string | null>(null);

  const activeIndex = PROJECT_01_SYSTEMS.findIndex((s) => s.id === selectedSystem.id);

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + PROJECT_01_SYSTEMS.length) % PROJECT_01_SYSTEMS.length;
    setSelectedSystem(PROJECT_01_SYSTEMS[nextIdx]);
    setDrawerOpen(true);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % PROJECT_01_SYSTEMS.length;
    setSelectedSystem(PROJECT_01_SYSTEMS[nextIdx]);
    setDrawerOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section className="w-full bg-alkota-carbon text-alkota-white py-24 px-4 sm:px-6 lg:px-8 tech-grid-dark border-b border-white/10" id="system-explorer">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header & Mode Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <TechnicalAnnotation label="FLAGSHIP HARDWARE ARCHITECTURE" value="PROJECT 01" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white">
              SYSTEM EXPLORER.<br />
              <span className="text-alkota-signal">16 INTEGRATED COMPONENTS.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-alkota-snow/80 leading-relaxed font-light">
              Explore how every suspension damper, CNC brake caliper, wireless transmission component, and carbon wheelset interfaces to form one cohesive chassis.
            </p>
          </div>

          {/* Mode Switcher: MACHINE vs SYSTEMS */}
          <div className="flex items-center gap-3">
            <div className="bg-alkota-black border border-white/15 p-1 flex items-center space-x-1">
              <button
                onClick={() => setActiveMode("MACHINE")}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase font-semibold transition-all ${
                  activeMode === "MACHINE"
                    ? "bg-alkota-signal text-alkota-black shadow-md"
                    : "text-alkota-slate hover:text-white"
                }`}
              >
                <span>MACHINE</span>
              </button>

              <button
                onClick={() => setActiveMode("SYSTEMS")}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase font-semibold transition-all ${
                  activeMode === "SYSTEMS"
                    ? "bg-alkota-white text-alkota-black shadow-md"
                    : "text-alkota-slate hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>SYSTEMS THEATRE</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODE 1: MACHINE (Interactive Bike Explorer) */}
        {activeMode === "MACHINE" && (
          <div className="relative w-full bg-alkota-black border border-white/10 p-4 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Top Bar Status Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 z-10 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-alkota-signal uppercase text-[10px] font-bold">SYSTEM {selectedSystem.systemNumber} / 16</span>
                <span className="text-alkota-white font-bold">{selectedSystem.systemName}</span>
                <span className="bg-alkota-signal/15 text-alkota-signal px-2 py-0.5 text-[9px] uppercase border border-alkota-signal/30">
                  {selectedSystem.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-alkota-slate text-[11px]">
                <span>USE ARROW KEYS OR CLICK HOTSPOTS</span>
                <div className="flex items-center gap-1">
                  <button onClick={handlePrev} className="p-1 border border-white/15 hover:border-white text-white" aria-label="Previous system">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={handleNext} className="p-1 border border-white/15 hover:border-white text-white" aria-label="Next system">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Full-Bike Interactive Stage */}
            <div className="relative my-auto w-full aspect-[16/9] max-h-[580px] flex items-center justify-center overflow-hidden">
              <Image
                src={viewTheme === "DARK" ? brandAssets.project01CarbonHero : brandAssets.project01WhiteHero}
                alt="ALKOTA Project 01 full-suspension mountain bike interactive chassis"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain object-center transition-all duration-300"
              />

              {/* 16 Responsive Hotspot Anchors */}
              {PROJECT_01_SYSTEMS.map((sys) => {
                const isSelected = selectedSystem.id === sys.id;
                const isHovered = hoveredSystemId === sys.id;

                return (
                  <div
                    key={sys.id}
                    style={{ top: sys.hotspotDesktop.top, left: sys.hotspotDesktop.left }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => {
                        setSelectedSystem(sys);
                        setDrawerOpen(true);
                      }}
                      onMouseEnter={() => setHoveredSystemId(sys.id)}
                      onMouseLeave={() => setHoveredSystemId(null)}
                      className={`relative flex items-center justify-center transition-all ${
                        isSelected ? "scale-125 z-30" : "hover:scale-110 z-20"
                      }`}
                      aria-label={`Inspect ${sys.systemName}: ${sys.brand} ${sys.model}`}
                    >
                      <span className="relative flex items-center justify-center">
                        <span
                          className={`absolute inline-flex h-8 w-8 rounded-full transition-opacity ${
                            isSelected
                              ? "bg-alkota-signal opacity-40 animate-ping"
                              : isHovered
                              ? "bg-white opacity-30"
                              : "bg-alkota-signal opacity-20"
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-7 w-7 border-2 font-mono text-[10px] font-bold items-center justify-center transition-all ${
                            isSelected
                              ? "bg-alkota-signal text-alkota-black border-alkota-signal shadow-lg scale-110"
                              : "bg-alkota-black text-white border-white/40 hover:border-alkota-signal hover:text-alkota-signal"
                          }`}
                        >
                          {sys.systemNumber}
                        </span>
                      </span>

                      {/* Hover Tooltip Label */}
                      {(isHovered || isSelected) && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap bg-alkota-black border border-white/20 px-2.5 py-1 pointer-events-none shadow-xl z-40">
                          <span className="font-mono text-[9px] text-alkota-signal uppercase font-bold block">{sys.systemName}</span>
                          <span className="font-sans text-xs text-white font-medium">{sys.brand} {sys.model}</span>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Mobile Touch System Scroller */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-3 border-t border-white/10 font-mono text-xs scrollbar-none">
              {PROJECT_01_SYSTEMS.map((sys) => (
                <button
                  key={sys.id}
                  onClick={() => {
                    setSelectedSystem(sys);
                    setDrawerOpen(true);
                  }}
                  className={`px-3 py-1.5 whitespace-nowrap border text-[11px] uppercase transition-all ${
                    selectedSystem.id === sys.id
                      ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold"
                      : "border-white/15 text-alkota-slate hover:text-white"
                  }`}
                >
                  {sys.systemNumber} • {sys.brand} {sys.model}
                </button>
              ))}
            </div>

            {/* Inspection Side Panel / Bottom Sheet */}
            {drawerOpen && (
              <div className="bg-alkota-carbon text-alkota-white p-6 border border-white/15 font-sans space-y-4 animate-fadeIn z-30 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-alkota-signal uppercase font-bold">
                        SYSTEM {selectedSystem.systemNumber} • {selectedSystem.category}
                      </span>
                      <span className="font-mono text-[10px] bg-white/10 text-alkota-snow px-2 py-0.5 uppercase border border-white/15">
                        {selectedSystem.status}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-alkota-white uppercase">
                      {selectedSystem.brand} {selectedSystem.model}
                    </h3>
                    <p className="font-mono text-xs text-alkota-slate uppercase">
                      {selectedSystem.variant}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/bikes/project-01/components/${selectedSystem.slug}`}
                      className="px-4 py-2 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center gap-1.5"
                    >
                      <span>INSPECT COMPONENT DETAILS</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => setDrawerOpen(false)}
                      className="p-2 border border-white/15 hover:border-white text-alkota-slate hover:text-white"
                      aria-label="Close component detail drawer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Editorial Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                  <div className="lg:col-span-4 relative h-48 bg-black/50 border border-white/10 flex items-center justify-center p-3">
                    <Image
                      src={selectedSystem.darkImageKey}
                      alt={selectedSystem.model}
                      fill
                      sizes="320px"
                      className="object-contain object-center"
                    />
                  </div>

                  <div className="lg:col-span-8 space-y-4 font-sans">
                    <div>
                      <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider block mb-1 font-bold">
                        ALKOTA ENGINEERING RATIONALE
                      </span>
                      <p className="text-alkota-snow text-xs sm:text-sm leading-relaxed font-light">
                        {selectedSystem.engineeringRationale}
                      </p>
                    </div>

                    {/* Factual Specifications List */}
                    <div className="border-t border-white/10 pt-3">
                      <span className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider block mb-2 font-bold">
                        R00 ENGINEERING BASELINE
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                        {selectedSystem.verifiedSpecifications.map((spec) => (
                          <div key={spec.label} className="bg-black/40 p-2 border border-white/10 flex items-center justify-between">
                            <span className="text-alkota-slate text-[10px]">{spec.label}:</span>
                            <span className="text-alkota-white text-[11px] font-bold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: SYSTEMS THEATRE (Dark Motorsport Component Gallery) */}
        {activeMode === "SYSTEMS" && (
          <div className="bg-alkota-black border border-white/10 p-6 md:p-10 space-y-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="font-mono text-xs text-alkota-signal uppercase font-bold">
                  DARK MOTORSPORT COMPONENT PRESENTATION
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-semibold text-alkota-white uppercase">
                  COMPONENT GALLERY
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewTheme("DARK")}
                  className={`px-3 py-1.5 font-mono text-xs uppercase border transition-colors ${
                    viewTheme === "DARK" ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold" : "border-white/15 text-alkota-slate"
                  }`}
                >
                  DARK STUDIO
                </button>
                <button
                  onClick={() => setViewTheme("ALPINE")}
                  className={`px-3 py-1.5 font-mono text-xs uppercase border transition-colors ${
                    viewTheme === "ALPINE" ? "border-white bg-white text-alkota-black font-bold" : "border-white/15 text-alkota-slate"
                  }`}
                >
                  ALPINE SHOWROOM
                </button>
              </div>
            </div>

            {/* Grid of 16 Real Component Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROJECT_01_SYSTEMS.map((sys) => (
                <Link
                  key={sys.id}
                  href={`/bikes/project-01/components/${sys.slug}`}
                  className="group bg-alkota-carbon border border-white/10 p-5 hover:border-alkota-signal transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="relative w-full h-48 bg-black/60 border border-white/10 flex items-center justify-center p-4 overflow-hidden">
                    <Image
                      src={viewTheme === "DARK" ? sys.darkImageKey : sys.alpineImageKey}
                      alt={sys.model}
                      fill
                      sizes="300px"
                      className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 font-mono text-[9px] bg-black/70 px-2 py-0.5 text-alkota-signal border border-white/10">
                      {sys.systemNumber} • {sys.category}
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-alkota-signal font-bold">{sys.brand}</span>
                      <ArrowUpRight className="w-4 h-4 text-alkota-slate group-hover:text-alkota-signal transition-colors" />
                    </div>
                    <h4 className="font-display text-base font-bold text-alkota-white uppercase group-hover:text-alkota-signal transition-colors">
                      {sys.model}
                    </h4>
                    <p className="text-alkota-slate text-[11px] truncate uppercase">{sys.variant}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
