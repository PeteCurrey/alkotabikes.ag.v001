"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FinishOption } from "@/lib/configurator/types";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Layers } from "lucide-react";
import { brandAssets } from "@/lib/assets";

interface ModelFallbackProps {
  finish: FinishOption;
  wheelFormat: string;
  onFinishChange?: (finish: FinishOption) => void;
}

export default function ModelFallback({
  finish,
  wheelFormat,
  onFinishChange,
}: ModelFallbackProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const isCarbon = finish === "CARBON" || finish === "GRAPHITE" || finish === "LAB";
  const imageSrc = isCarbon ? brandAssets.project01CarbonHero : brandAssets.project01WhiteHero;

  const fallbackHotspots = [
    { id: "fork", title: "FOX 38 Factory GRIP2", x: "74%", y: "45%", desc: "170mm travel, Kashima coating, tuned for high-velocity chatter." },
    { id: "frame", title: "UD Carbon Monocoque", x: "48%", y: "42%", desc: "High-modulus carbon layup schedule providing progressive flex compliance." },
    { id: "shock", title: "FOX Float X2 Factory", x: "40%", y: "50%", desc: "Near-vertical shock mounting with 28% end-stroke progression." },
    { id: "wheels", title: "MAXXIS Tan-Wall Tyres", x: "24%", y: "62%", desc: "Assegai 2.5\" Front / Minion DHR II 2.4\" Rear on Reserve 30|HD Carbon rims." },
  ];

  return (
    <div className="relative w-full h-full min-h-[480px] bg-alkota-carbon text-alkota-white flex flex-col justify-between p-6 tech-grid-dark rounded-none border border-white/10 overflow-hidden">
      {/* Top Header Overlay */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <TechnicalAnnotation label="STUDIO PRODUCT VIEW" value={finish} variant="signal" />
          <span className="font-mono text-[10px] text-alkota-slate uppercase hidden sm:inline">
            PROJECT / 01 CHASSIS PHOTOGRAPHY
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-alkota-slate uppercase">FINISH:</span>
          <span className="font-semibold text-alkota-white uppercase">
            {isCarbon ? "NAKED CARBON" : "GLACIER WHITE"}
          </span>
        </div>
      </div>

      {/* Center High-Resolution Photographic Product Image & Hotspots */}
      <div className="relative my-auto flex items-center justify-center py-6 h-[340px] md:h-[400px]">
        <Image
          src={imageSrc}
          alt={`ALKOTA Project 01 ${isCarbon ? "Naked Carbon" : "Glacier White"} mountain bike with tan-wall Maxxis tyres`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain object-center transition-all duration-500"
        />

        {/* Hotspot Indicators Overlay */}
        {fallbackHotspots.map((spot) => (
          <div
            key={spot.id}
            style={{ top: spot.y, left: spot.x }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-alkota-signal opacity-40" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-alkota-signal border-2 border-alkota-carbon text-[9px] font-mono text-alkota-black font-bold items-center justify-center">
                +
              </span>
            </div>

            {/* Hotspot Popover Card */}
            {activeHotspot === spot.id && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-60 bg-alkota-carbon/95 border border-white/20 p-3 shadow-2xl z-30 font-sans text-xs animate-fadeIn">
                <div className="font-mono text-[10px] text-alkota-signal font-bold uppercase mb-1">
                  {spot.title}
                </div>
                <div className="text-alkota-slate leading-normal">{spot.desc}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Finish Swatch Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-alkota-slate" />
          <span className="font-mono text-xs text-alkota-slate uppercase">FINISH SELECTION:</span>
        </div>

        <div className="flex items-center space-x-3">
          {(["GLACIER", "CARBON"] as FinishOption[]).map((f) => (
            <button
              key={f}
              onClick={() => onFinishChange && onFinishChange(f)}
              className={`flex items-center gap-2 px-3.5 py-1.5 border font-mono text-[11px] uppercase transition-all ${
                (f === "GLACIER" && !isCarbon) || (f === "CARBON" && isCarbon)
                  ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-semibold"
                  : "border-white/10 hover:border-white/30 text-alkota-slate hover:text-alkota-white"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: f === "GLACIER" ? "#F4F6F7" : "#16191C" }}
              />
              <span>{f === "GLACIER" ? "GLACIER WHITE" : "NAKED CARBON"}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
