import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import ExplodedViewPlaceholder from "@/components/engineering/ExplodedViewPlaceholder";
import { ShieldCheck, Cpu, Layers, Wrench } from "lucide-react";

export default function ChassisEngineeringPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <TechnicalAnnotation label="ENGINEERING / 01" value="CHASSIS ARCHITECTURE" variant="signal" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            STRUCTURE<br />
            <span className="text-alkota-slate">WITH PURPOSE.</span>
          </h1>
          <p className="font-sans text-base text-alkota-snow max-w-2xl font-light leading-relaxed">
            Frame packaging, torsional stiffness targets, guided internal routing tubes, and standardized pivot hardware designed for high-stress alpine conditions.
          </p>
        </div>

        {/* Exploded Hardware Diagram */}
        <ExplodedViewPlaceholder />

        {/* Technical Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 bg-alkota-black border border-white/10 space-y-2">
            <div className="text-alkota-signal font-bold uppercase">GUIDED CABLE ROUTING</div>
            <p className="font-sans text-xs text-alkota-slate leading-relaxed">
              Molded internal carbon tubes ensure rattle-free cable installation with zero fluid disconnect required.
            </p>
          </div>
          <div className="p-6 bg-alkota-black border border-white/10 space-y-2">
            <div className="text-alkota-signal font-bold uppercase">THREADED BSA BOTTOM BRACKET</div>
            <p className="font-sans text-xs text-alkota-slate leading-relaxed">
              73mm threaded shell eliminating press-fit creaking while providing robust thread engagement.
            </p>
          </div>
          <div className="p-6 bg-alkota-black border border-white/10 space-y-2">
            <div className="text-alkota-signal font-bold uppercase">FLIP-CHIP GEOMETRY ADJUST</div>
            <p className="font-sans text-xs text-alkota-slate leading-relaxed">
              Modular chainstay chip supporting full 29er or MX wheel configurations without altering BB height.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
