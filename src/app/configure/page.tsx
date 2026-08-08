"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { PROJECT_01_SYSTEMS, CANONICAL_FINISHES } from "@/lib/data/project01";
import { brandAssets } from "@/lib/assets";
import { Check, ShieldCheck, Download, Settings, RefreshCw, ArrowRight } from "lucide-react";

export default function ConfiguratorPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<"MEDIUM" | "LARGE" | "XLARGE">("LARGE");
  const [selectedFinish, setSelectedFinish] = useState<"GLACIER" | "CARBON">("CARBON");
  const [selectedWheelFormat, setSelectedWheelFormat] = useState<"29" | "MX">("29");
  const [savedBuildId, setSavedBuildId] = useState<string | null>(null);

  const activeFinishObj = CANONICAL_FINISHES.find((f) => f.id === selectedFinish) || CANONICAL_FINISHES[1];
  const activeHeroImage = selectedFinish === "CARBON" ? brandAssets.project01CarbonHero : brandAssets.project01WhiteHero;

  const handleSaveBuild = () => {
    const randomHex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, "0");
    const buildRef = `ALKOTA-BUILD-REV001-${selectedSize.charAt(0)}-${selectedFinish.charAt(0)}-${randomHex}`;
    setSavedBuildId(buildRef);
  };

  const steps = [
    { num: 1, name: "01 SIZE & FORMAT" },
    { num: 2, name: "02 FINISH" },
    { num: 3, name: "03 SUSPENSION" },
    { num: 4, name: "04 DRIVETRAIN & BRAKES" },
    { num: 5, name: "05 REVIEW BUILD" },
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <TechnicalAnnotation label="VEHICLE CONFIGURATOR" value="PROJECT 01" variant="signal" />
            <h1 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white">
              BUILD CONFIGURATOR.<br />
              <span className="text-alkota-signal">SPECIFY YOUR CHASSIS.</span>
            </h1>
          </div>

          <div className="font-mono text-xs text-alkota-slate uppercase text-right space-y-1">
            <div className="text-alkota-white font-bold">STATUS: PRODUCTION DEVELOPMENT</div>
            <div>SPECIFICATION: REV 001 FACTORY APPROVED</div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          {steps.map((step) => (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`p-3 text-left border uppercase transition-all ${
                currentStep === step.num
                  ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold"
                  : currentStep > step.num
                  ? "border-white/30 bg-white/10 text-alkota-white"
                  : "border-white/10 text-alkota-slate hover:text-white"
              }`}
            >
              {step.name}
            </button>
          ))}
        </div>

        {/* Main Configurator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Product Visual Stage */}
          <div className="lg:col-span-7 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
              <span className="text-alkota-signal font-bold uppercase">{activeFinishObj.name}</span>
              <span className="text-alkota-slate uppercase">{selectedSize} • {selectedWheelFormat} FORMAT</span>
            </div>

            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] bg-black/50 border border-white/10 flex items-center justify-center p-4">
              <Image
                src={activeHeroImage}
                alt="ALKOTA Project 01 configured bike"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-center transition-all duration-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[10px] uppercase block">PRODUCTION PRICE:</span>
                <span className="text-alkota-white font-bold">Production pricing to be confirmed</span>
              </div>
              <div className="bg-alkota-carbon p-3 border border-white/10">
                <span className="text-alkota-slate text-[10px] uppercase block">TARGET WEIGHT:</span>
                <span className="text-alkota-white font-bold">Final production weight pending validation</span>
              </div>
            </div>
          </div>

          {/* Right: Step Options Panel */}
          <div className="lg:col-span-5 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 font-sans">
            {/* Step 1: Size & Format */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-alkota-signal uppercase font-bold">STEP 01</span>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">CHASSIS SIZE & WHEEL FORMAT</h3>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <span className="text-alkota-slate uppercase text-[10px] block">SELECT FRAME SIZE:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["MEDIUM", "LARGE", "XLARGE"] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-3 border uppercase font-bold transition-all ${
                          selectedSize === sz ? "border-alkota-signal bg-alkota-signal text-alkota-black" : "border-white/15 text-alkota-slate hover:text-white"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs pt-4 border-t border-white/10">
                  <span className="text-alkota-slate uppercase text-[10px] block">SELECT REAR WHEEL FORMAT:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedWheelFormat("29")}
                      className={`p-3 border uppercase font-bold text-left transition-all ${
                        selectedWheelFormat === "29" ? "border-alkota-signal bg-alkota-signal text-alkota-black" : "border-white/15 text-alkota-slate hover:text-white"
                      }`}
                    >
                      <span>29" FULL 29ER</span>
                    </button>
                    <button
                      onClick={() => setSelectedWheelFormat("MX")}
                      className={`p-3 border uppercase font-bold text-left transition-all ${
                        selectedWheelFormat === "MX" ? "border-alkota-signal bg-alkota-signal text-alkota-black" : "border-white/15 text-alkota-slate hover:text-white"
                      }`}
                    >
                      <span>MX (29F / 27.5R)</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  <span>NEXT: CHOOSE FINISH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Finish */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-alkota-signal uppercase font-bold">STEP 02</span>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">SELECT LAUNCH FINISH</h3>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {CANONICAL_FINISHES.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish.id)}
                      className={`w-full p-4 border text-left space-y-2 transition-all ${
                        selectedFinish === finish.id ? "border-alkota-signal bg-alkota-signal/15 text-white" : "border-white/15 text-alkota-slate hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-alkota-signal uppercase">{finish.name}</span>
                        <span className="text-[10px] uppercase">{finish.subtitle}</span>
                      </div>
                      <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">{finish.description}</p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-1/3 py-3 border border-white/20 text-alkota-white font-mono text-xs uppercase hover:border-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-2/3 py-3 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span>NEXT: SUSPENSION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Suspension */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-alkota-signal uppercase font-bold">STEP 03</span>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">CONFIRMED FACTORY SUSPENSION</h3>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 bg-alkota-carbon border border-white/15 space-y-2">
                    <span className="text-alkota-signal text-[10px] uppercase font-bold block">FRONT SUSPENSION:</span>
                    <p className="font-display text-lg text-white font-bold">FOX 38 FACTORY (170MM)</p>
                    <p className="text-alkota-slate text-[11px]">GRIP X2 Damper / Genuine Kashima Coat / 44mm Offset</p>
                  </div>

                  <div className="p-4 bg-alkota-carbon border border-white/15 space-y-2">
                    <span className="text-alkota-signal text-[10px] uppercase font-bold block">REAR SUSPENSION:</span>
                    <p className="font-display text-lg text-white font-bold">FOX FLOAT X2 FACTORY (205x65MM)</p>
                    <p className="text-alkota-slate text-[11px]">Trunnion Mount / VVC Rebound & Compression / EVOL Air Sleeve</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-1/3 py-3 border border-white/20 text-alkota-white font-mono text-xs uppercase hover:border-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="w-2/3 py-3 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span>NEXT: DRIVETRAIN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Drivetrain & Brakes */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-alkota-signal uppercase font-bold">STEP 04</span>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">TRANSMISSION & BRAKING</h3>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 bg-alkota-carbon border border-white/15 space-y-1">
                    <span className="text-alkota-signal text-[10px] uppercase font-bold block">DRIVETRAIN:</span>
                    <p className="font-display text-base text-white font-bold">SRAM XX EAGLE AXS TRANSMISSION</p>
                    <p className="text-alkota-slate text-[11px]">Hangerless Full Mount / Wireless 12-Speed</p>
                  </div>

                  <div className="p-4 bg-alkota-carbon border border-white/15 space-y-1">
                    <span className="text-alkota-signal text-[10px] uppercase font-bold block">BRAKING (ASYMMETRIC):</span>
                    <p className="font-display text-base text-white font-bold">HOPE EVO V6Ti FRONT / TR4 REAR</p>
                    <p className="text-alkota-slate text-[11px]">6-Piston Titanium Front / 4-Piston CNC Rear (UK)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-1/3 py-3 border border-white/20 text-alkota-white font-mono text-xs uppercase hover:border-white"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="w-2/3 py-3 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span>REVIEW FULL BUILD</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Review & Save */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-alkota-signal uppercase font-bold">STEP 05</span>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">REVIEW BUILD SPECIFICATION</h3>
                </div>

                <div className="bg-alkota-carbon p-4 border border-white/15 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-alkota-slate">FRAME SIZE:</span>
                    <span className="text-white font-bold">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-alkota-slate">LAUNCH FINISH:</span>
                    <span className="text-alkota-signal font-bold">{activeFinishObj.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-alkota-slate">WHEEL FORMAT:</span>
                    <span className="text-white font-bold">{selectedWheelFormat} FORMAT</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-alkota-slate">SUSPENSION:</span>
                    <span className="text-white font-bold">FOX 38 / FLOAT X2 FACTORY</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-alkota-slate">DRIVETRAIN:</span>
                    <span className="text-white font-bold">SRAM XX EAGLE AXS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-alkota-slate">BRAKES:</span>
                    <span className="text-white font-bold">HOPE V6Ti / TR4 CNC</span>
                  </div>
                </div>

                {savedBuildId ? (
                  <div className="p-4 bg-alkota-signal/15 border border-alkota-signal text-alkota-white font-mono text-xs space-y-2">
                    <span className="text-alkota-signal font-bold uppercase text-[10px] block">BUILD REFERENCE SAVED:</span>
                    <p className="text-lg font-bold tracking-wider">{savedBuildId}</p>
                    <p className="text-[11px] text-alkota-slate">Your configuration has been recorded. Quote this reference code when discussing chassis availability.</p>
                  </div>
                ) : (
                  <button
                    onClick={handleSaveBuild}
                    className="w-full py-4 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>SAVE & GENERATE BUILD REFERENCE</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
