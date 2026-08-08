"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import { PROJECT01_MEDIA, getFinishViews } from "@/content/project01/media";
import { PROJECT_01_SPECIFICATION } from "@/content/project01/specification";
import { ArrowRight, ZoomIn, Info, RefreshCw, Eye } from "lucide-react";

interface MachineStudioProps {
  finish: "GLACIER" | "CARBON";
  onFinishChange: (finish: "GLACIER" | "CARBON") => void;
  onNavigateToSystems: () => void;
}

export default function MachineStudio({
  finish,
  onFinishChange,
  onNavigateToSystems,
}: MachineStudioProps) {
  const availableViews = getFinishViews(finish);
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const currentView = availableViews[activeViewIndex] || availableViews[0];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white min-h-screen p-4 sm:p-6 lg:p-12 space-y-8 tech-grid-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <TechnicalAnnotation label="MODE 01" value="DIGITAL PRODUCT STUDIO" variant="signal" />
          <h2 className="font-display font-medium text-3xl sm:text-5xl uppercase tracking-tight text-white">
            PROJECT 01 <span className="text-alkota-signal">STUDIO</span>
          </h2>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-xl font-light">
            Minimal presentation of the complete chassis baseline. Select finish and inspect real engineering views.
          </p>
        </div>

        {/* Finish Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onFinishChange("GLACIER");
              setActiveViewIndex(0);
            }}
            className={`px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all ${
              finish === "GLACIER"
                ? "border-alkota-signal bg-alkota-signal/20 text-white font-bold"
                : "border-white/20 text-alkota-slate hover:text-white"
            }`}
          >
            GLACIER WHITE
          </button>
          <button
            onClick={() => {
              onFinishChange("CARBON");
              setActiveViewIndex(0);
            }}
            className={`px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all ${
              finish === "CARBON"
                ? "border-alkota-signal bg-alkota-signal/20 text-white font-bold"
                : "border-white/20 text-alkota-slate hover:text-white"
            }`}
          >
            NAKED CARBON
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Studio Image Box */}
        <div className="lg:col-span-8 bg-alkota-black border border-white/10 p-4 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-alkota-signal font-bold uppercase">{finish === "GLACIER" ? "GLACIER WHITE MASTER" : "NAKED CARBON MASTER"}</span>
              <SpecificationStatus status="APPROVED_MASTER" />
            </div>
            <button
              onClick={() => setZoomed(!zoomed)}
              className="text-alkota-slate hover:text-white flex items-center gap-1 uppercase transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{zoomed ? "RESET ZOOM" : "SUBTLE ZOOM"}</span>
            </button>
          </div>

          {/* Viewport Frame */}
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden">
            <Image
              src={currentView.src}
              alt={currentView.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className={`object-contain object-center transition-all duration-700 ${
                zoomed ? "scale-[1.35] cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
              onClick={() => setZoomed(!zoomed)}
            />
          </div>

          {/* View Selector Thumbnails / Controls */}
          {availableViews.length > 1 && (
            <div className="flex items-center gap-3 pt-2 font-mono text-xs">
              <span className="text-alkota-slate text-[10px] uppercase tracking-widest mr-2">VIEW ANGLE:</span>
              {availableViews.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveViewIndex(idx);
                    setZoomed(false);
                  }}
                  className={`px-3 py-1.5 border uppercase text-[10px] tracking-wider transition-all flex items-center gap-1.5 ${
                    activeViewIndex === idx
                      ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold"
                      : "border-white/20 text-alkota-slate hover:text-white"
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>{v.view || `VIEW 0${idx + 1}`}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Data Panel */}
        <div className="lg:col-span-4 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
              CURRENT DEVELOPMENT BASELINE
            </span>
            <h3 className="font-display font-medium text-2xl uppercase text-white">
              PROJECT 01 SPEC
            </h3>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-alkota-carbon p-3 border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">FRONT TRAVEL:</span>
              <span className="text-white font-bold">{PROJECT_01_SPECIFICATION.frontTravel.value}</span>
            </div>

            <div className="bg-alkota-carbon p-3 border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">REAR TRAVEL:</span>
              <span className="text-white font-bold">{PROJECT_01_SPECIFICATION.rearTravel.value}</span>
            </div>

            <div className="bg-alkota-carbon p-3 border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">WHEEL FORMAT:</span>
              <span className="text-white font-bold">{PROJECT_01_SPECIFICATION.primaryWheelFormat.value}</span>
            </div>

            <div className="bg-alkota-carbon p-3 border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">CHASSIS INTENT:</span>
              <span className="text-white font-bold">{PROJECT_01_SPECIFICATION.frameMaterialIntent.value}</span>
            </div>

            <div className="bg-alkota-carbon p-3 border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">PROGRAMME STATUS:</span>
              <span className="text-alkota-signal font-bold">PRE-PRODUCTION</span>
            </div>
          </div>

          {/* Rationale link */}
          <div className="pt-2 border-t border-white/10 space-y-4">
            <Link
              href="/journal/project-01"
              className="font-mono text-xs text-alkota-signal hover:text-white uppercase flex items-center justify-between group transition-colors"
            >
              <span>WHY THESE NUMBERS?</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={onNavigateToSystems}
              className="w-full py-3.5 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>EXPLORE SYSTEMS (MODE 02)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
