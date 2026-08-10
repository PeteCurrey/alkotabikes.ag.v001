"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import { PROJECT01_MEDIA } from "@/content/project01/media";
import { PROJECT01_COMPONENTS, Project01Component } from "@/content/project01/components";
import { PROJECT_01_BUILD_MATRIX } from "@/content/project01/buildMatrix";
import { ArrowRight, Download, Check, Settings, ShieldCheck, Info, Sparkles, ExternalLink } from "lucide-react";

export const PROJECT01_PRICING_VISIBLE = false;

export interface BuildConfig {
  finish: "GLACIER" | "CARBON";
  size: "S" | "M" | "L" | "XL";
  wheelFormat: "29/29" | "MX";
  forkId: string;
  shockId: string;
  frontBrakeId: string;
  rearBrakeId: string;
  drivetrainId: string;
  wheelsId: string;
  frontTyreId: string;
  rearTyreId: string;
  cockpitId: string;
  gripsId: string;
}

interface BuildStageProps {
  config: BuildConfig;
  onUpdateConfig: (updated: Partial<BuildConfig>) => void;
  onNavigateToSummary: () => void;
  onOpenComponentTheatre: (c: Project01Component) => void;
}

export default function BuildStage({
  config,
  onUpdateConfig,
  onNavigateToSummary,
  onOpenComponentTheatre,
}: BuildStageProps) {
  const [activeTab, setActiveTab] = useState<"FINISH" | "SIZE" | "SUSPENSION" | "BRAKES" | "DRIVETRAIN" | "WHEELS" | "COCKPIT">("FINISH");
  const [activeWhyThisId, setActiveWhyThisId] = useState<string | null>(null);

  const heroImage = PROJECT01_MEDIA.getFinishHero(config.finish);

  const selectedFork = PROJECT01_COMPONENTS.find((c) => c.id === config.forkId);
  const selectedShock = PROJECT01_COMPONENTS.find((c) => c.id === config.shockId);
  const selectedBrakeFront = PROJECT01_COMPONENTS.find((c) => c.id === config.frontBrakeId);
  const selectedDrivetrain = PROJECT01_COMPONENTS.find((c) => c.id === config.drivetrainId);
  const selectedWheels = PROJECT01_COMPONENTS.find((c) => c.id === config.wheelsId);

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white min-h-screen p-4 sm:p-6 lg:p-12 space-y-8 tech-grid-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <TechnicalAnnotation label="MODE 04" value="PROJECT 01 CONFIGURATION" variant="signal" />
          <h2 className="font-display font-medium text-3xl sm:text-5xl uppercase tracking-tight text-white">
            MAKE IT <span className="text-alkota-signal">YOURS</span>
          </h2>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-xl font-light">
            Specify finish, development size, and explore baseline options. Real component assets rendered accurately.
          </p>
        </div>

        <div className="font-mono text-xs text-alkota-slate uppercase text-right">
          <div className="text-alkota-white font-bold">DEVELOPMENT CONFIGURATION</div>
          <div>PRICING STATUS: TO BE CONFIRMED</div>
        </div>
      </div>

      {/* Main Grid: Bike Visual Stage vs Configurator Options */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Bike Visual & Active Selection Asset Panel */}
        <div className="lg:col-span-7 bg-alkota-black border border-white/10 p-4 sm:p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
            <span className="text-alkota-signal font-bold uppercase">
              MASTER CHASSIS: {config.finish === "GLACIER" ? "GLACIER WHITE" : "NAKED CARBON"} ({config.size})
            </span>
            <SpecificationStatus status="DEVELOPMENT_BASELINE" label="BASELINE RENDERING" />
          </div>

          {/* Master Bike Image (Un-faked master image) */}
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden p-4">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-center transition-all duration-500"
            />
          </div>

          {/* Highlighted Selected Component Separate Real Asset Panel */}
          <div className="bg-alkota-carbon p-4 border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-alkota-slate text-[10px] uppercase font-bold">SELECTED COMPONENT REAL ASSET:</span>
              <span className="text-alkota-signal text-[10px] uppercase font-bold">OFFICIAL MANUFACTURER ASSET</span>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="space-y-1">
                <span className="text-white font-bold block">
                  {selectedFork?.manufacturer} {selectedFork?.product}
                </span>
                <span className="text-alkota-slate text-[11px] block">
                  {selectedFork?.variant}
                </span>
                {selectedFork && (
                  <button
                    onClick={() => onOpenComponentTheatre(selectedFork)}
                    className="text-alkota-signal hover:text-white uppercase text-[10px] font-bold inline-flex items-center gap-1 pt-1"
                  >
                    <span>WHY THIS FORK? →</span>
                  </button>
                )}
              </div>

              <div className="relative w-full h-24 bg-black/80 border border-white/10 flex items-center justify-center p-2">
                {selectedFork?.officialImage ? (
                  <Image
                    src={selectedFork.officialImage}
                    alt={selectedFork.product}
                    fill
                    className="object-contain p-1"
                  />
                ) : (
                  <span className="text-alkota-slate text-[9px] text-center">ASSET PENDING</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sequential Stage Option Controls */}
        <div className="lg:col-span-5 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
          {/* Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 font-mono text-[10px]">
            {[
              { id: "FINISH", label: "01 FINISH" },
              { id: "SIZE", label: "02 SIZE" },
              { id: "SUSPENSION", label: "03 SUSPENSION" },
              { id: "BRAKES", label: "04 BRAKES" },
              { id: "DRIVETRAIN", label: "05 TRANSMISSION" },
              { id: "WHEELS", label: "06 WHEELS" },
              { id: "COCKPIT", label: "07 COCKPIT" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-2 border uppercase text-center font-bold transition-all ${
                  activeTab === tab.id
                    ? "border-alkota-signal bg-alkota-signal text-alkota-black"
                    : "border-white/10 text-alkota-slate hover:text-white bg-alkota-carbon"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="space-y-6 pt-2">
            {/* 01 FINISH */}
            {activeTab === "FINISH" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-signal uppercase font-bold text-[10px]">STAGE 01</span>
                  <h3 className="font-display font-medium text-xl text-white uppercase">CHOOSE LAUNCH FINISH</h3>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onUpdateConfig({ finish: "GLACIER" })}
                    className={`w-full p-4 border text-left space-y-1 transition-all ${
                      config.finish === "GLACIER"
                        ? "border-alkota-signal bg-alkota-signal/15 text-white"
                        : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-alkota-signal">GLACIER WHITE</span>
                      <span className="text-[10px]">ARCHITECTURAL PAINTED</span>
                    </div>
                    <p className="font-sans text-xs text-alkota-snow/80 font-light">
                      High-key Alpine architectural white with dark graphite engineering contrast branding.
                    </p>
                  </button>

                  <button
                    onClick={() => onUpdateConfig({ finish: "CARBON" })}
                    className={`w-full p-4 border text-left space-y-1 transition-all ${
                      config.finish === "CARBON"
                        ? "border-alkota-signal bg-alkota-signal/15 text-white"
                        : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-alkota-signal">NAKED CARBON</span>
                      <span className="text-[10px]">RAW STRUCTURAL UD</span>
                    </div>
                    <p className="font-sans text-xs text-alkota-snow/80 font-light">
                      Exposed unidirectional structural carbon fibre weave under matte protective clear coat.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* 02 SIZE */}
            {activeTab === "SIZE" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-signal uppercase font-bold text-[10px]">STAGE 02</span>
                  <h3 className="font-display font-medium text-xl text-white uppercase">DEVELOPMENT SIZE</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {(["S", "M", "L", "XL"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => onUpdateConfig({ size: sz })}
                      className={`p-4 border text-left space-y-1 transition-all ${
                        config.size === sz
                          ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold"
                          : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                      }`}
                    >
                      <div className="text-base uppercase">SIZE {sz}</div>
                      <div className="text-[9px] uppercase opacity-80">
                        {sz === "L" ? "R00 LARGE MASTER" : "DEVELOPMENT INDICATION"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 03 SUSPENSION */}
            {activeTab === "SUSPENSION" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-signal uppercase font-bold text-[10px]">STAGE 03</span>
                  <h3 className="font-display font-medium text-xl text-white uppercase">FACTORY SUSPENSION PACKAGE</h3>
                </div>

                <div className="p-4 bg-alkota-carbon border border-white/15 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-alkota-signal font-bold uppercase text-[10px]">FRONT FORK:</span>
                    <button
                      onClick={() => selectedFork && onOpenComponentTheatre(selectedFork)}
                      className="text-alkota-slate hover:text-white uppercase text-[9px] flex items-center gap-1"
                    >
                      <span>WHY THIS FORK?</span>
                      <Info className="w-3 h-3 text-alkota-signal" />
                    </button>
                  </div>
                  <p className="font-display text-base text-white font-bold">FOX 38 FACTORY (160 MM)</p>
                  <p className="text-alkota-slate text-[11px] font-sans">GRIP X2 Damper / Kashima Coat / 44mm Offset</p>
                </div>

                <div className="p-4 bg-alkota-carbon border border-white/15 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-alkota-signal font-bold uppercase text-[10px]">REAR SHOCK:</span>
                    <button
                      onClick={() => selectedShock && onOpenComponentTheatre(selectedShock)}
                      className="text-alkota-slate hover:text-white uppercase text-[9px] flex items-center gap-1"
                    >
                      <span>WHY THIS SHOCK?</span>
                      <Info className="w-3 h-3 text-alkota-signal" />
                    </button>
                  </div>
                  <p className="font-display text-base text-white font-bold">FOX FLOAT X2 FACTORY (150 MM TARGET)</p>
                  <p className="text-alkota-slate text-[11px] font-sans">Trunnion Mount 205x65 / VVC Rebound & Compression</p>
                </div>
              </div>
            )}

            {/* 04 BRAKES */}
            {activeTab === "BRAKES" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-signal uppercase font-bold text-[10px]">STAGE 04</span>
                  <h3 className="font-display font-medium text-xl text-white uppercase">HOPE CNC BRAKING SYSTEM</h3>
                </div>

                <div className="p-4 bg-alkota-carbon border border-white/15 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-alkota-signal font-bold uppercase text-[10px]">ASYMMETRIC BRAKE SPEC:</span>
                    <button
                      onClick={() => selectedBrakeFront && onOpenComponentTheatre(selectedBrakeFront)}
                      className="text-alkota-slate hover:text-white uppercase text-[9px] flex items-center gap-1"
                    >
                      <span>WHY ASYMMETRIC?</span>
                      <Info className="w-3 h-3 text-alkota-signal" />
                    </button>
                  </div>
                  <p className="font-display text-base text-white font-bold">HOPE EVO V6Ti FRONT / TR4 REAR</p>
                  <p className="text-alkota-slate text-[11px] font-sans">6-Piston Titanium Front / 4-Piston CNC Rear (Skipton, UK)</p>
                </div>
              </div>
            )}

            {/* 05 DRIVETRAIN */}
            {activeTab === "DRIVETRAIN" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-signal uppercase font-bold text-[10px]">STAGE 05</span>
                  <h3 className="font-display font-medium text-xl text-white uppercase">WIRELESS TRANSMISSION</h3>
                </div>

                <div className="p-4 bg-alkota-carbon border border-white/15 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-alkota-signal font-bold uppercase text-[10px]">TRANSMISSION:</span>
                    <button
                      onClick={() => selectedDrivetrain && onOpenComponentTheatre(selectedDrivetrain)}
                      className="text-alkota-slate hover:text-white uppercase text-[9px] flex items-center gap-1"
                    >
                      <span>WHY HANGERLESS?</span>
                      <Info className="w-3 h-3 text-alkota-signal" />
                    </button>
                  </div>
                  <p className="font-display text-base text-white font-bold">SRAM XX EAGLE AXS TRANSMISSION</p>
                  <p className="text-alkota-slate text-[11px] font-sans">Hangerless Full Mount / Wireless 12-Speed</p>
                </div>
              </div>
            )}

            {/* 06 WHEELS */}
            {activeTab === "WHEELS" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-signal uppercase font-bold text-[10px]">STAGE 06</span>
                  <h3 className="font-display font-medium text-xl text-white uppercase">CARBON WHEELSET & TYRES</h3>
                </div>

                <div className="p-4 bg-alkota-carbon border border-white/15 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-alkota-signal font-bold uppercase text-[10px]">WHEELSET:</span>
                    <button
                      onClick={() => selectedWheels && onOpenComponentTheatre(selectedWheels)}
                      className="text-alkota-slate hover:text-white uppercase text-[9px] flex items-center gap-1"
                    >
                      <span>WHY 29/29?</span>
                      <Info className="w-3 h-3 text-alkota-signal" />
                    </button>
                  </div>
                  <p className="font-display text-base text-white font-bold">DT SWISS EXC 1200 CARBON</p>
                  <p className="text-alkota-slate text-[11px] font-sans">29" Carbon Rims / Maxxis Assegai 2.5 Front / Minion DHR II 2.4 Rear Tan Wall</p>
                </div>
              </div>
            )}

            {/* 07 COCKPIT */}
            {activeTab === "COCKPIT" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-signal uppercase font-bold text-[10px]">STAGE 07</span>
                  <h3 className="font-display font-medium text-xl text-white uppercase">COCKPIT & CONTACT POINTS</h3>
                </div>

                <div className="p-4 bg-alkota-carbon border border-white/15 space-y-2">
                  <span className="text-alkota-signal font-bold uppercase text-[10px]">HANDLEBAR & GRIPS:</span>
                  <p className="font-display text-base text-white font-bold">RENTHAL FATBAR CARBON 35 / ERGON GE1 EVO</p>
                  <p className="text-alkota-slate text-[11px] font-sans">800 mm width carbon bar paired with Ergon GE1 Evo grips</p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Banner per rule: Never show zero. Show development configuration / pricing TBC */}
          <div className="p-4 bg-alkota-carbon border border-white/10 font-mono text-xs space-y-1">
            <span className="text-alkota-slate text-[10px] uppercase block font-bold">PRICING STATUS:</span>
            <div className="text-white font-bold text-sm uppercase">
              PRODUCTION PRICING TBC
            </div>
            <p className="text-[10px] text-alkota-slate font-light">
              Formal production pricing will be announced prior to 2028 reservation lock.
            </p>
          </div>

          {/* Review & Proceed to Build Summary */}
          <button
            onClick={onNavigateToSummary}
            className="w-full py-4 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            <span>REVIEW BUILD SUMMARY →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
