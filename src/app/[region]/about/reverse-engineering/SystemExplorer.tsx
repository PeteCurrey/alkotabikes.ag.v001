"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SYSTEM_LAYERS = [
  {
    id: "rider",
    label: "RIDER",
    arrow: true,
    copy: "Rider position establishes weight distribution, movement space and the relationship between stability and control. The rider is not passive cargo — they are an active, shifting mass whose movement changes chassis behaviour at every moment.",
  },
  {
    id: "contact",
    label: "CONTACT POINTS",
    arrow: true,
    copy: "Handlebar, saddle and pedals are the only three interfaces between human and machine. Their position, feel and feedback quality define everything the rider perceives as performance or comfort.",
  },
  {
    id: "geometry",
    label: "GEOMETRY",
    arrow: true,
    copy: "Reach, stack, steering geometry, rear centre and bottom-bracket position define the rider's starting relationship with the terrain. Geometry does not describe what the bike looks like. It describes what the bike will do.",
  },
  {
    id: "suspension",
    label: "SUSPENSION",
    arrow: true,
    copy: "Leverage, axle path, anti-squat, anti-rise and shock behaviour decide what happens when the terrain begins moving the bicycle. Suspension is not comfort — it is traction, stability and control under load.",
  },
  {
    id: "structure",
    label: "STRUCTURE",
    arrow: true,
    copy: "A chassis must place stiffness where control requires it without treating maximum stiffness as the objective. Appropriate flex in the right planes can improve grip without compromising directional precision.",
  },
  {
    id: "tyres",
    label: "TYRES",
    arrow: true,
    copy: "The only components deliberately connected to the ground. Tyre width, casing, compound and pressure define the actual grip envelope. Every chassis decision ultimately serves the ability of the tyre to do its job.",
  },
  {
    id: "components",
    label: "COMPONENTS",
    arrow: true,
    copy: "Fork, shock, brakes, wheels, drivetrain and cockpit must reinforce the intended platform rather than fight it. Component selection is not specification — it is an engineering input that alters geometry, weight distribution and system behaviour.",
  },
  {
    id: "terrain",
    label: "TERRAIN",
    arrow: false,
    copy: "The variable no CAD model controls. Terrain provides the final test of every engineering decision. It does not respond to marketing language, tolerates no hidden compromises and always has the last word.",
  },
];

export default function SystemExplorer() {
  const [active, setActive] = useState<string | null>("rider");

  return (
    <div className="w-full space-y-0 border border-white/10">
      {SYSTEM_LAYERS.map((layer, i) => {
        const isOpen = active === layer.id;
        return (
          <div key={layer.id} className="border-b border-white/10 last:border-b-0">
            <button
              onClick={() => setActive(isOpen ? null : layer.id)}
              className={`w-full flex items-center justify-between px-6 py-5 font-mono text-xs font-bold uppercase tracking-widest transition-all group ${
                isOpen
                  ? "bg-alkota-signal text-alkota-white"
                  : "bg-alkota-black text-alkota-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`text-[10px] font-bold tabular-nums ${
                    isOpen ? "text-alkota-white/80" : "text-alkota-signal"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{layer.label}</span>
              </div>
              <div className="flex items-center gap-3">
                {layer.arrow && !isOpen && (
                  <span className="text-alkota-signal/50 font-mono text-[10px]">↓</span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-alkota-black/60" : "text-alkota-slate"
                  }`}
                />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 py-5 bg-alkota-carbon border-t border-white/5">
                <p className="font-sans text-sm text-alkota-snow/90 leading-relaxed font-light max-w-2xl">
                  {layer.copy}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
