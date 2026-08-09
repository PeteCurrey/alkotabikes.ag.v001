"use client";

import React, { useState } from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import {
  calculateProject01Fit,
  Project01FitInput,
  Project01FitResult,
  GEOMETRY_EXPLANATIONS,
  RidingStyle,
  PrimaryPriority,
  RiderPosition,
} from "@/content/project01/fitModel";
import { PROJECT_01_GEOMETRY } from "@/content/project01/specification";
import {
  ArrowRight,
  Ruler,
  CheckCircle2,
  BookmarkPlus,
  ShieldCheck,
  Compass,
  Info,
  Sliders,
  Copy,
} from "lucide-react";

export default function FitClient() {
  const [form, setForm] = useState<Project01FitInput>({
    heightCm: 178,
    insideLegCm: 82,
    armSpanCm: 180,
    shoeSizeEu: 43,
    ridingStyle: "All Mountain",
    primaryPriority: "Balanced",
    riderPosition: "Neutral",
    currentBike: "",
    currentSize: "",
    currentReachMm: undefined,
    fitLikesText: "",
    fitDislikesText: "",
  });

  const [savedResult, setSavedResult] = useState<Project01FitResult | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const currentResult = savedResult || calculateProject01Fit(form);

  const handleCalculateAndSave = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateProject01Fit(form);
    setSavedResult(result);
  };

  const handleCopyRef = () => {
    if (currentResult.fitReference) {
      navigator.clipboard.writeText(currentResult.fitReference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 3000);
    }
  };

  const largeMasterData = PROJECT_01_GEOMETRY.sizes.large.values!;

  const configureParams = new URLSearchParams({
    mode: "build",
    size: currentResult.recommendedSizeRegion,
    fitRef: currentResult.fitReference,
  }).toString();

  const registerParams = new URLSearchParams({
    fitRef: currentResult.fitReference,
    size: currentResult.recommendedSizeRegion,
  }).toString();

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <TechnicalAnnotation label="PROJECT 01" value="RIDER FIT ENGINE" variant="signal" />
              <SpecificationStatus status="DEVELOPMENT_BASELINE" label="R00 BASELINE" />
            </div>
            <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.92]">
              THE RIDER<br />
              <span className="text-alkota-signal">IS PART OF THE GEOMETRY.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-2xl font-light leading-relaxed">
              Frame size is the beginning of fit. Not the end. Project 01 Fit uses your dimensions, riding style and priorities to create a development fit direction that can later be confirmed before your production build is locked.
            </p>
          </div>

          <div className="font-mono text-xs text-alkota-slate uppercase text-right space-y-1">
            <div className="text-white font-bold">FIT STATUS: DEVELOPMENT INDICATION</div>
            <div>R00 LARGE MASTER BASELINE</div>
          </div>
        </div>

        {/* Main Grid: Form Inputs vs Fit Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Fit Form */}
          <form
            onSubmit={handleCalculateAndSave}
            className="lg:col-span-6 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl"
          >
            <div className="border-b border-white/10 pb-3 space-y-1">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                01 RIDER DIMENSIONS & PREFERENCES
              </span>
              <h2 className="font-display font-medium text-2xl uppercase text-white">
                RIDER INPUT DATA
              </h2>
            </div>

            <div className="space-y-5 font-mono text-xs">
              {/* Height */}
              <div className="space-y-2 bg-alkota-carbon p-4 border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-alkota-slate uppercase">RIDER HEIGHT * :</span>
                  <span className="text-alkota-signal font-bold text-sm">
                    {form.heightCm} CM ({Math.floor(form.heightCm / 30.48)}' {Math.round((form.heightCm % 30.48) / 2.54)}")
                  </span>
                </div>
                <input
                  type="range"
                  min={160}
                  max={200}
                  value={form.heightCm}
                  onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
                  className="w-full accent-alkota-signal bg-white/10"
                />
              </div>

              {/* Inside Leg */}
              <div className="space-y-2 bg-alkota-carbon p-4 border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-alkota-slate uppercase">INSIDE LEG (INSEAM) * :</span>
                  <span className="text-white font-bold">{form.insideLegCm} CM</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={95}
                  value={form.insideLegCm}
                  onChange={(e) => setForm({ ...form, insideLegCm: Number(e.target.value) })}
                  className="w-full accent-alkota-signal bg-white/10"
                />
              </div>

              {/* Arm Span & Shoe Size */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-alkota-slate text-[10px] uppercase block">ARM SPAN (OPTIONAL):</span>
                  <input
                    type="number"
                    placeholder="e.g. 180 cm"
                    value={form.armSpanCm || ""}
                    onChange={(e) => setForm({ ...form, armSpanCm: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-3 bg-alkota-carbon border border-white/15 text-white text-xs focus:outline-none focus:border-alkota-signal"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-alkota-slate text-[10px] uppercase block">SHOE SIZE EU (OPTIONAL):</span>
                  <input
                    type="number"
                    placeholder="e.g. 43 EU"
                    value={form.shoeSizeEu || ""}
                    onChange={(e) => setForm({ ...form, shoeSizeEu: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-3 bg-alkota-carbon border border-white/15 text-white text-xs focus:outline-none focus:border-alkota-signal"
                  />
                </div>
              </div>

              {/* Riding Style */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-alkota-slate uppercase text-[10px] block">RIDING STYLE * :</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Trail", "All Mountain", "Enduro", "Bike Park", "Mixed"] as RidingStyle[]).map((style) => (
                    <button
                      type="button"
                      key={style}
                      onClick={() => setForm({ ...form, ridingStyle: style })}
                      className={`py-2 px-2.5 border uppercase text-[10px] font-bold transition-all ${
                        form.ridingStyle === style
                          ? "border-alkota-signal bg-alkota-signal text-alkota-black"
                          : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Priority */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-alkota-slate uppercase text-[10px] block">PRIMARY CHARACTERISTIC PRIORITY * :</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Agility", "Balanced", "Stability"] as PrimaryPriority[]).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setForm({ ...form, primaryPriority: p })}
                      className={`py-2.5 px-3 border uppercase text-[10px] font-bold transition-all ${
                        form.primaryPriority === p
                          ? "border-alkota-signal bg-alkota-signal text-alkota-black"
                          : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rider Position */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-alkota-slate uppercase text-[10px] block">PREFERRED RIDER POSITION * :</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["Upright", "Neutral", "Aggressive", "Unsure"] as RiderPosition[]).map((pos) => (
                    <button
                      type="button"
                      key={pos}
                      onClick={() => setForm({ ...form, riderPosition: pos })}
                      className={`py-2 px-2 border uppercase text-[9px] font-bold transition-all ${
                        form.riderPosition === pos
                          ? "border-alkota-signal bg-alkota-signal text-alkota-black"
                          : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea: Likes & Dislikes */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="space-y-1">
                  <span className="text-alkota-slate text-[10px] uppercase block">WHAT DO YOU LIKE ABOUT YOUR CURRENT FIT?</span>
                  <textarea
                    rows={2}
                    placeholder="e.g. Good climbing position, comfortable reach on long days..."
                    value={form.fitLikesText}
                    onChange={(e) => setForm({ ...form, fitLikesText: e.target.value })}
                    className="w-full p-3 bg-alkota-carbon border border-white/15 text-white text-xs focus:outline-none focus:border-alkota-signal"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-alkota-slate text-[10px] uppercase block">WHAT WOULD YOU CHANGE?</span>
                  <textarea
                    rows={2}
                    placeholder="e.g. Too low in front on steep descents, want more stability..."
                    value={form.fitDislikesText}
                    onChange={(e) => setForm({ ...form, fitDislikesText: e.target.value })}
                    className="w-full p-3 bg-alkota-carbon border border-white/15 text-white text-xs focus:outline-none focus:border-alkota-signal"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>GENERATE & SAVE FIT DIRECTION REFERENCE</span>
              </button>
            </div>
          </form>

          {/* Right Column: Development Fit Indication Output & Geometry Explanations */}
          <div className="lg:col-span-6 space-y-6">
            {/* Output Indication Card */}
            <div className="bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-white/10 pb-4 space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-alkota-signal font-bold uppercase">DEVELOPMENT FIT INDICATION</span>
                  <SpecificationStatus status="DEVELOPMENT_BASELINE" label={currentResult.confidence} />
                </div>
                <h3 className="font-display font-medium text-2xl uppercase text-white">
                  LIKELY PROJECT 01 REGION: <span className="text-alkota-signal">SIZE {currentResult.recommendedSizeRegion}</span>
                </h3>
              </div>

              <div className="p-4 bg-alkota-carbon border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-alkota-slate text-[10px] uppercase font-bold">FIT REFERENCE CODE:</span>
                  <span className="text-alkota-signal font-bold">{currentResult.fitReference}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-alkota-slate text-[10px] uppercase">RIDING DIRECTION:</span>
                  <span className="text-white font-bold">{currentResult.fitDirectionLabel}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-alkota-slate text-[10px] uppercase">ESTIMATED REACH REGION:</span>
                  <span className="text-white font-bold">{currentResult.estimatedReachRange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-alkota-slate text-[10px] uppercase">GEOMETRY REVISION:</span>
                  <span className="text-white font-bold">{currentResult.revision}</span>
                </div>
              </div>

              <div className="p-4 bg-alkota-signal/10 border border-alkota-signal/30 font-mono text-xs text-alkota-snow space-y-1">
                <span className="text-alkota-signal font-bold uppercase text-[10px] block">
                  PRE-PRODUCTION SIZING STATEMENT
                </span>
                <p className="text-[11px] font-light leading-relaxed">
                  {currentResult.disclaimer}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2 font-mono text-xs">
                <button
                  onClick={handleCopyRef}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4 text-alkota-signal" />
                  <span>{copiedRef ? "FIT CODE COPIED TO CLIPBOARD" : `COPY FIT REF (${currentResult.fitReference})`}</span>
                </button>

                <Link
                  href={`/configure?${configureParams}`}
                  className="w-full py-4 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>PROCEED TO CONFIGURATOR WITH THIS FIT →</span>
                </Link>

                <Link
                  href={`/order?${registerParams}`}
                  className="w-full py-3 border border-white/20 text-alkota-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>JOIN PROJECT 01 REGISTER WITH THIS FIT</span>
                </Link>
              </div>
            </div>

            {/* Visual Geometry Explanations List */}
            <div className="bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="border-b border-white/10 pb-3 space-y-1">
                <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
                  02 VISUAL GEOMETRY CONCEPTS
                </span>
                <h3 className="font-display font-medium text-xl uppercase text-white">
                  UNDERSTAND THE NUMBERS
                </h3>
              </div>

              <div className="space-y-4">
                {GEOMETRY_EXPLANATIONS.map((geo) => (
                  <div key={geo.key} className="bg-alkota-carbon p-4 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-xs">
                      <span className="text-alkota-signal font-bold uppercase">{geo.title}</span>
                      <span className="text-white font-bold">{geo.value}</span>
                    </div>
                    <span className="text-[10px] font-mono text-alkota-slate uppercase block">{geo.subtitle}</span>
                    <p className="font-sans text-xs text-alkota-snow/80 font-light leading-relaxed">
                      {geo.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
