"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import { PROJECT01_MEDIA } from "@/content/project01/media";
import { PROJECT01_COMPONENTS, Project01Component } from "@/content/project01/components";
import { ArrowRight, Info, Layers, Eye, ShieldAlert, Sparkles } from "lucide-react";

interface SystemsExplorerProps {
  finish: "GLACIER" | "CARBON";
  onSelectComponentForTheatre: (component: Project01Component) => void;
  onNavigateToFit: () => void;
}

export interface HotspotSystem {
  id: string;
  systemNumber: string;
  name: string;
  categoryKey: string;
  topPct: number;
  leftPct: number;
  whatItDoes: string;
  whyItMatters: string;
  projectDirection: string;
  statusText: string;
  engineeringLink: string;
  componentId: string;
}

export const HOTSPOT_SYSTEMS: HotspotSystem[] = [
  {
    id: "chassis",
    systemNumber: "01",
    name: "FRAME / CHASSIS",
    categoryKey: "CHASSIS",
    topPct: 45,
    leftPct: 46,
    whatItDoes: "Carries structural loads, maintains suspension pivot hard points, and defines geometry under heavy terrain impact.",
    whyItMatters: "Frame stiffness directly dictates line precision and rider confidence in technical off-camber sections.",
    projectDirection: "Full carbon development chassis with custom structural layups undergoing finite-element stress analysis.",
    statusText: "DEVELOPMENT BASELINE — R00",
    engineeringLink: "/engineering/chassis",
    componentId: "chassis-p01-carbon",
  },
  {
    id: "fork",
    systemNumber: "02",
    name: "FORK / FRONT SUSPENSION",
    categoryKey: "FORK",
    topPct: 35,
    leftPct: 76,
    whatItDoes: "Absorbs front wheel impacts, maintains steering geometry, and transmits traction feedback to the cockpit.",
    whyItMatters: "Correct damper tuning allows high-speed tracking without harshness in continuous rock gardens.",
    projectDirection: "160 mm front travel target specified around FOX 38 Factory GRIP X2 architecture.",
    statusText: "DEVELOPMENT BASELINE — 160 MM TARGET",
    engineeringLink: "/engineering/testing",
    componentId: "fork-fox38-factory",
  },
  {
    id: "rear-shock",
    systemNumber: "03",
    name: "REAR SUSPENSION",
    categoryKey: "REAR_SHOCK",
    topPct: 42,
    leftPct: 42,
    whatItDoes: "Controls rear wheel displacement, axle path, and chassis dynamic height under compression and rebound.",
    whyItMatters: "Mid-stroke support prevents wallowing during hard cornering while keeping the rear wheel glued under braking.",
    projectDirection: "150 mm rear travel target developed around low-pivot four-bar / Horst-style kinematics with FOX FLOAT X2 Factory.",
    statusText: "DEVELOPMENT BASELINE — 150 MM TARGET",
    engineeringLink: "/engineering/kinematics",
    componentId: "shock-fox-floatx2-factory",
  },
  {
    id: "brakes-front",
    systemNumber: "04",
    name: "FRONT BRAKE",
    categoryKey: "BRAKES",
    topPct: 62,
    leftPct: 84,
    whatItDoes: "Provides primary stopping power and front-wheel deceleration control on steep technical descents.",
    whyItMatters: "Front braking supplies 70%+ of maximum stopping force; zero lever fade is essential on long alpine descents.",
    projectDirection: "Hope EVO V6Ti 6-piston titanium hardware CNC brake paired with asymmetric rear.",
    statusText: "DEVELOPMENT BASELINE — UK CNC",
    engineeringLink: "/engineering",
    componentId: "brake-front-hope-evov6ti",
  },
  {
    id: "brakes-rear",
    systemNumber: "05",
    name: "REAR BRAKE",
    categoryKey: "BRAKES",
    topPct: 60,
    leftPct: 18,
    whatItDoes: "Controls rear wheel traction, speed modulation, and chassis attitude control into turns.",
    whyItMatters: "Rear modulation needs fine feedback so the rider can drag speed without locking the wheel unexpectedly.",
    projectDirection: "Hope TR4 4-piston CNC rear brake completing the asymmetric braking strategy.",
    statusText: "DEVELOPMENT BASELINE — ASYMMETRIC STRATEGY",
    engineeringLink: "/engineering",
    componentId: "brake-rear-hope-tr4",
  },
  {
    id: "wheels",
    systemNumber: "06",
    name: "WHEELSET",
    categoryKey: "WHEELS",
    topPct: 68,
    leftPct: 82,
    whatItDoes: "Transmits pedalling torque and ground forces between tyres and chassis axles.",
    whyItMatters: "Rotational mass and rim compliance dictate acceleration feel and radial impact absorption.",
    projectDirection: "DT Swiss EXC 1200 carbon 29\" wheels baseline.",
    statusText: "PRIMARY 29 / 29 ARCHITECTURE",
    engineeringLink: "/engineering/materials",
    componentId: "wheels-dt-swiss-exc1200",
  },
  {
    id: "drivetrain",
    systemNumber: "07",
    name: "DRIVETRAIN",
    categoryKey: "DRIVETRAIN",
    topPct: 64,
    leftPct: 28,
    whatItDoes: "Transmits rider pedal input to rear wheel propulsion across a wide gear range.",
    whyItMatters: "Crisp shifting under load prevents missed pedal strokes in technical climbing or sprint efforts.",
    projectDirection: "SRAM XX Eagle AXS Transmission with hangerless Full Mount dropout interface.",
    statusText: "HANGERLESS FULL MOUNT INTERFACE",
    engineeringLink: "/engineering/chassis",
    componentId: "drivetrain-sram-xx-eagle-axs",
  },
  {
    id: "cockpit",
    systemNumber: "08",
    name: "COCKPIT & HANDLEBAR",
    categoryKey: "HANDLEBAR",
    topPct: 24,
    leftPct: 70,
    whatItDoes: "Main rider interface for steering, lever position, and upper-body mass distribution.",
    whyItMatters: "Bar compliance reduces arm pump while stem length dictates steering response rate.",
    projectDirection: "Renthal Fatbar Carbon 35 mm clamp / 800 mm width baseline.",
    statusText: "DEVELOPMENT BASELINE",
    engineeringLink: "/engineering",
    componentId: "cockpit-renthal-fatbar-carbon",
  },
];

export default function SystemsExplorer({
  finish,
  onSelectComponentForTheatre,
  onNavigateToFit,
}: SystemsExplorerProps) {
  const [selectedSystemId, setSelectedSystemId] = useState<string>("chassis");
  const heroImage = PROJECT01_MEDIA.getFinishHero(finish);

  const activeSystem = HOTSPOT_SYSTEMS.find((s) => s.id === selectedSystemId) || HOTSPOT_SYSTEMS[0];
  const activeComponent = PROJECT01_COMPONENTS.find((c) => c.id === activeSystem.componentId);

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white min-h-screen p-4 sm:p-6 lg:p-12 space-y-8 tech-grid-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <TechnicalAnnotation label="MODE 02" value="INTERACTIVE SYSTEM EXPLORER" variant="signal" />
          <h2 className="font-display font-medium text-3xl sm:text-5xl uppercase tracking-tight text-white">
            CHASSIS <span className="text-alkota-signal">SYSTEMS</span>
          </h2>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-xl font-light">
            Select an engineering hotspot on the bike or choose from the system list to understand the design rationale behind each component.
          </p>
        </div>

        <div className="font-mono text-xs text-alkota-slate uppercase text-right">
          <div className="text-alkota-white font-bold">SYSTEMS AUDITED: 08 KEY ENVELOPES</div>
          <div>DEVELOPMENT BASELINE R00</div>
        </div>
      </div>

      {/* Main Grid Stage */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Hotspot Bicycle Canvas */}
        <div className="lg:col-span-7 bg-alkota-black border border-white/10 p-4 sm:p-6 space-y-4 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
            <span className="text-alkota-signal font-bold uppercase">
              INTERACTIVE HOTSPOT CANVAS ({finish === "GLACIER" ? "GLACIER WHITE" : "NAKED CARBON"})
            </span>
            <span className="text-alkota-slate uppercase text-[10px]">CLICK HOTSPOT TO INSPECT</span>
          </div>

          {/* Canvas Viewport */}
          <div className="relative w-full h-[340px] sm:h-[440px] md:h-[500px] bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-center opacity-85 transition-all duration-500"
            />

            {/* Hotspot Overlay Markers */}
            {HOTSPOT_SYSTEMS.map((sys) => {
              const isSelected = sys.id === selectedSystemId;
              return (
                <button
                  key={sys.id}
                  onClick={() => setSelectedSystemId(sys.id)}
                  style={{ top: `${sys.topPct}%`, left: `${sys.leftPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-alkota-signal text-alkota-black scale-125 z-30 shadow-[0_0_15px_rgba(30,144,255,0.8)] border-2 border-white"
                      : "bg-alkota-black/80 text-alkota-white border border-alkota-signal/60 hover:bg-alkota-signal hover:text-black z-20"
                  }`}
                  aria-label={`Inspect ${sys.name}`}
                >
                  {sys.systemNumber}
                </button>
              );
            })}
          </div>

          {/* Quick Hotspot Horizontal Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 border-t border-white/10 scrollbar-none font-mono text-[10px]">
            {HOTSPOT_SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                onClick={() => setSelectedSystemId(sys.id)}
                className={`px-3 py-1.5 border whitespace-nowrap uppercase transition-all flex items-center gap-1.5 ${
                  sys.id === selectedSystemId
                    ? "border-alkota-signal bg-alkota-signal text-alkota-black font-bold"
                    : "border-white/15 text-alkota-slate hover:text-white bg-alkota-carbon"
                }`}
              >
                <span>{sys.systemNumber}</span>
                <span>{sys.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Engineering Information Panel */}
        <div className="lg:col-span-5 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-alkota-signal font-bold uppercase">SYSTEM {activeSystem.systemNumber}</span>
              <SpecificationStatus status="DEVELOPMENT_BASELINE" label={activeSystem.statusText} />
            </div>
            <h3 className="font-display font-medium text-2xl sm:text-3xl uppercase text-white">
              {activeSystem.name}
            </h3>
          </div>

          {/* Content Breakdown */}
          <div className="space-y-5 font-sans text-xs">
            <div className="space-y-1 bg-alkota-carbon p-4 border border-white/10">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest block font-bold">
                WHAT IT DOES
              </span>
              <p className="text-alkota-snow/90 font-light leading-relaxed">
                {activeSystem.whatItDoes}
              </p>
            </div>

            <div className="space-y-1 bg-alkota-carbon p-4 border border-white/10">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest block font-bold">
                WHY IT MATTERS
              </span>
              <p className="text-alkota-snow/90 font-light leading-relaxed">
                {activeSystem.whyItMatters}
              </p>
            </div>

            <div className="space-y-1 bg-alkota-carbon p-4 border border-white/10">
              <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest block font-bold">
                PROJECT 01 DIRECTION
              </span>
              <p className="text-alkota-snow/90 font-light leading-relaxed">
                {activeSystem.projectDirection}
              </p>
            </div>
          </div>

          {/* Component Action Buttons */}
          <div className="space-y-3 pt-2 border-t border-white/10 font-mono text-xs">
            {activeComponent && (
              <button
                onClick={() => onSelectComponentForTheatre(activeComponent)}
                className="w-full py-3.5 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>SEE COMPONENT ({activeComponent.manufacturer} {activeComponent.product})</span>
              </button>
            )}

            <Link
              href={activeSystem.engineeringLink}
              className="w-full py-3 border border-white/20 text-alkota-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors flex items-center justify-center gap-2"
            >
              <span>EXPLORE ENGINEERING DEEP DIVE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onNavigateToFit}
              className="w-full py-3 bg-alkota-carbon text-alkota-slate hover:text-white border border-white/10 font-bold uppercase transition-colors text-[11px] flex items-center justify-center gap-2"
            >
              <span>PROCEED TO RIDER FIT (MODE 03) →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
