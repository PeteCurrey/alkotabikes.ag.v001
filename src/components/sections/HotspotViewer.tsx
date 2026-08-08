"use client";

import React, { useState } from "react";
import Image from "next/image";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { FLAGSHIP_BIKE, Hotspot } from "@/lib/data/bikesData";
import { X } from "lucide-react";
import { brandAssets } from "@/lib/assets";

export default function HotspotViewer() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(
    FLAGSHIP_BIKE.hotspots[0]
  );

  return (
    <section className="w-full bg-alkota-white text-alkota-black py-24 px-4 sm:px-6 lg:px-8 tech-grid-light border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <TechnicalAnnotation label="FLAGSHIP PLATFORM" value="PROJECT 01" variant="slate" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
              ONE MACHINE.<br />
              <span className="text-alkota-slate">NO DISTRACTIONS.</span>
            </h2>
          </div>

          <p className="font-sans text-sm md:text-base text-alkota-graphite max-w-md leading-relaxed font-normal">
            {FLAGSHIP_BIKE.overview}
          </p>
        </div>

        {/* Interactive Photographic Studio Container */}
        <div className="relative w-full min-h-[500px] bg-alkota-snow border border-black/10 p-6 md:p-12 flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Top Info Bar */}
          <div className="flex items-center justify-between z-10 font-mono text-xs text-alkota-slate uppercase">
            <span>INTERACTIVE CHASSIS EXPLORER</span>
            <span>SELECT HOTSPOT TO INSPECT</span>
          </div>

          {/* Center High-Definition Photographic Product Image & Hotspots */}
          <div className="relative my-auto flex items-center justify-center py-6 h-[340px] md:h-[420px]">
            <Image
              src={brandAssets.project01WhiteHero}
              alt="ALKOTA Project 01 Glacier White full-suspension mountain bike with tan-wall Maxxis tyres"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain object-center"
            />

            {/* Hotspots */}
            {FLAGSHIP_BIKE.hotspots.map((spot) => {
              const isSelected = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  style={{ top: spot.top, left: spot.left }}
                  onClick={() => setActiveHotspot(spot)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 group transition-transform ${
                    isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
                  }`}
                  aria-label={`Inspect ${spot.title}`}
                >
                  <span className="relative flex items-center justify-center">
                    <span
                      className={`absolute inline-flex h-8 w-8 rounded-full ${
                        isSelected ? "bg-alkota-black opacity-30 animate-ping" : "bg-alkota-slate opacity-20"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-6 w-6 border-2 font-mono text-[10px] font-bold items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-alkota-black text-alkota-signal border-alkota-black"
                          : "bg-white text-alkota-black border-alkota-black group-hover:bg-alkota-black group-hover:text-white"
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Editorial Drawer */}
          {activeHotspot && (
            <div className="bg-alkota-black text-alkota-white p-6 border border-white/10 mt-6 font-sans space-y-3 animate-fadeIn z-20">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-alkota-signal uppercase font-bold">
                    {activeHotspot.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-alkota-white">
                    {activeHotspot.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-alkota-slate">
                  <span>{activeHotspot.specLabel}</span>
                  <button onClick={() => setActiveHotspot(null)} aria-label="Close hotspot view">
                    <X className="w-4 h-4 hover:text-white" />
                  </button>
                </div>
              </div>

              <p className="text-alkota-slate text-xs sm:text-sm leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
