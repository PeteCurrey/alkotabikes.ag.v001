"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import { PROJECT_01_GEOMETRY } from "@/content/project01/specification";
import { ArrowRight, Ruler, CheckCircle2, ShieldCheck, Compass, Info } from "lucide-react";

interface FitEngineProps {
  onFitCalculated: (fitResult: {
    recommendedSize: "S" | "M" | "L" | "XL";
    priority: string;
    style: string;
  }) => void;
  onNavigateToBuild: () => void;
}

export default function FitEngine({
  onFitCalculated,
  onNavigateToBuild,
}: FitEngineProps) {
  // Inputs state
  const [heightCm, setHeightCm] = useState<number>(178);
  const [insideLegCm, setInsideLegCm] = useState<number>(82);
  const [armSpanCm, setArmSpanCm] = useState<number>(180);
  const [ridingStyle, setRidingStyle] = useState<string>("All Mountain");
  const [priority, setPriority] = useState<"Agility" | "Balanced" | "Stability">("Balanced");
  const [currentBike, setCurrentBike] = useState<string>("");
  const [currentReach, setCurrentReach] = useState<string>("");
  const [comments, setComments] = useState<string>("");

  // Calculate development fit indication based on height & priority
  const calculateFit = () => {
    let size: "S" | "M" | "L" | "XL" = "L";
    if (heightCm < 168) size = "S";
    else if (heightCm < 176) size = "M";
    else if (heightCm < 186) size = "L";
    else size = "XL";

    // Adjust based on priority if on boundary
    if (priority === "Agility" && heightCm >= 175 && heightCm <= 178) size = "M";
    if (priority === "Stability" && heightCm >= 183 && heightCm <= 186) size = "XL";

    return {
      recommendedSize: size,
      priority,
      style: ridingStyle,
    };
  };

  const currentFit = calculateFit();
  const largeMasterData = PROJECT_01_GEOMETRY.sizes.large.values!;

  const handleApplyFit = () => {
    onFitCalculated(currentFit);
    onNavigateToBuild();
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white min-h-screen p-4 sm:p-6 lg:p-12 space-y-8 tech-grid-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto border-b border-white/10 pb-6 space-y-3">
        <TechnicalAnnotation label="MODE 03" value="PROJECT 01 RIDER FIT" variant="signal" />
        <h2 className="font-display font-medium text-3xl sm:text-5xl uppercase tracking-tight text-white">
          A FRAME SIZE IS THE BEGINNING OF FIT.<br />
          <span className="text-alkota-signal">NOT THE END.</span>
        </h2>
        <p className="font-sans text-sm text-alkota-snow/80 max-w-2xl font-light leading-relaxed">
          Because physical production geometry is not yet locked, we provide a development fit indication based on our Large master baseline.
        </p>
      </div>

      {/* Main Grid: Inputs vs Indication Output */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Progressive Fit Inputs Form */}
        <div className="lg:col-span-6 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-3 space-y-1">
            <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
              01 RIDER DIMENSIONS & PREFERENCES
            </span>
            <h3 className="font-display font-medium text-xl uppercase text-white">
              INPUT RIDER DATA
            </h3>
          </div>

          <div className="space-y-5 font-mono text-xs">
            {/* Height slider */}
            <div className="space-y-2 bg-alkota-carbon p-4 border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-alkota-slate uppercase">RIDER HEIGHT:</span>
                <span className="text-alkota-signal font-bold text-sm">{heightCm} CM ({Math.floor(heightCm / 30.48)}' {Math.round((heightCm % 30.48) / 2.54)}")</span>
              </div>
              <input
                type="range"
                min={160}
                max={200}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-alkota-signal bg-white/10"
              />
            </div>

            {/* Inside leg slider */}
            <div className="space-y-2 bg-alkota-carbon p-4 border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-alkota-slate uppercase">INSIDE LEG (INSEAM):</span>
                <span className="text-white font-bold">{insideLegCm} CM</span>
              </div>
              <input
                type="range"
                min={70}
                max={95}
                value={insideLegCm}
                onChange={(e) => setInsideLegCm(Number(e.target.value))}
                className="w-full accent-alkota-signal bg-white/10"
              />
            </div>

            {/* Arm Span slider */}
            <div className="space-y-2 bg-alkota-carbon p-4 border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-alkota-slate uppercase">ARM SPAN (OPTIONAL):</span>
                <span className="text-white font-bold">{armSpanCm} CM</span>
              </div>
              <input
                type="range"
                min={160}
                max={205}
                value={armSpanCm}
                onChange={(e) => setArmSpanCm(Number(e.target.value))}
                className="w-full accent-alkota-signal bg-white/10"
              />
            </div>

            {/* Riding Style Selector */}
            <div className="space-y-2">
              <span className="text-alkota-slate uppercase text-[10px] block">PRIMARY RIDING STYLE:</span>
              <div className="grid grid-cols-3 gap-2">
                {["Trail", "All Mountain", "Enduro", "Bike Park", "Mixed"].map((style) => (
                  <button
                    key={style}
                    onClick={() => setRidingStyle(style)}
                    className={`py-2 px-3 border uppercase text-[10px] font-bold transition-all ${
                      ridingStyle === style
                        ? "border-alkota-signal bg-alkota-signal text-alkota-black"
                        : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Selector */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-alkota-slate uppercase text-[10px] block">RIDER CHARACTERISTIC PRIORITY:</span>
              <div className="grid grid-cols-3 gap-2">
                {(["Agility", "Balanced", "Stability"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`py-2.5 px-3 border uppercase text-[10px] font-bold transition-all ${
                      priority === p
                        ? "border-alkota-signal bg-alkota-signal text-alkota-black"
                        : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Current Bike Reach */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <input
                type="text"
                placeholder="CURRENT BIKE (OPTIONAL)"
                value={currentBike}
                onChange={(e) => setCurrentBike(e.target.value)}
                className="p-3 bg-alkota-carbon border border-white/15 text-white placeholder:text-alkota-slate text-xs focus:outline-none focus:border-alkota-signal"
              />
              <input
                type="text"
                placeholder="KNOWN REACH MM"
                value={currentReach}
                onChange={(e) => setCurrentReach(e.target.value)}
                className="p-3 bg-alkota-carbon border border-white/15 text-white placeholder:text-alkota-slate text-xs focus:outline-none focus:border-alkota-signal"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Development Fit Output & Master Geometry */}
        <div className="lg:col-span-6 space-y-6">
          {/* Fit Output Indication Box */}
          <div className="bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 space-y-1">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-alkota-signal font-bold uppercase">DEVELOPMENT FIT INDICATION</span>
                <SpecificationStatus status="DEVELOPMENT_BASELINE" label="PROVISIONAL FIT" />
              </div>
              <h3 className="font-display font-medium text-2xl uppercase text-white">
                RECOMMENDED PLATFORM: <span className="text-alkota-signal">SIZE {currentFit.recommendedSize}</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-alkota-carbon p-4 border border-white/10 space-y-1">
                <span className="text-alkota-slate text-[9px] uppercase block">FIT DIRECTION</span>
                <span className="text-white font-bold uppercase">{currentFit.priority} / {currentFit.style}</span>
              </div>
              <div className="bg-alkota-carbon p-4 border border-white/10 space-y-1">
                <span className="text-alkota-slate text-[9px] uppercase block">REACH REGION</span>
                <span className="text-alkota-signal font-bold uppercase">
                  ~{currentFit.recommendedSize === "L" ? "485 mm" : currentFit.recommendedSize === "M" ? "465 mm target" : "505 mm target"}
                </span>
              </div>
            </div>

            <div className="p-4 bg-alkota-signal/10 border border-alkota-signal/30 font-mono text-xs text-alkota-snow space-y-2">
              <span className="text-alkota-signal font-bold uppercase text-[10px] block">
                DEVELOPMENT DISCLAIMER
              </span>
              <p className="text-[11px] leading-relaxed text-alkota-snow/90">
                Final sizing recommendation will be confirmed with each owner before production build lock.
              </p>
            </div>
          </div>

          {/* Controlled R00 Large Master Geometry Reference */}
          <div className="bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-3 space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-alkota-signal font-bold uppercase">CONTROLLED R00 MASTER DATA</span>
                <span className="text-alkota-slate uppercase">LARGE CHASSIS</span>
              </div>
              <h4 className="font-display font-medium text-lg uppercase text-white">
                R00 LARGE MASTER DEVELOPMENT GEOMETRY
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[9px] uppercase block">REACH</span>
                <span className="text-alkota-signal font-bold text-base">{largeMasterData.reachMm} mm</span>
              </div>
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[9px] uppercase block">STACK</span>
                <span className="text-white font-bold text-base">{largeMasterData.stackMm} mm</span>
              </div>
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[9px] uppercase block">HEAD ANGLE</span>
                <span className="text-white font-bold text-base">{largeMasterData.headAngleDeg}°</span>
              </div>
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[9px] uppercase block">SEAT ANGLE</span>
                <span className="text-white font-bold text-base">{largeMasterData.effectiveSeatAngleDeg}°</span>
              </div>
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[9px] uppercase block">REAR CENTRE</span>
                <span className="text-white font-bold text-base">{largeMasterData.rearCentreMm} mm</span>
              </div>
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[9px] uppercase block">WHEELBASE</span>
                <span className="text-white font-bold text-base">{largeMasterData.wheelbaseMm} mm</span>
              </div>
            </div>

            {/* Fit Explanations */}
            <div className="space-y-3 pt-2 border-t border-white/10 font-sans text-xs">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest block font-bold">
                GEOMETRY RATIONALE
              </span>
              <div className="space-y-2 text-alkota-snow/80 leading-relaxed font-light">
                <p>
                  <strong className="text-white font-mono uppercase">REACH ({largeMasterData.reachMm} MM):</strong> Dictates rider standing position stability and weight distribution over the front axle in technical terrain.
                </p>
                <p>
                  <strong className="text-white font-mono uppercase">REAR CENTRE ({largeMasterData.rearCentreMm} MM):</strong> Balanced rear-to-front ratio maintains high-speed traction without sacrificing agility in tight switchbacks.
                </p>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleApplyFit}
              className="w-full py-4 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
              <span>APPLY FIT & PROCEED TO BUILD (MODE 04)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
