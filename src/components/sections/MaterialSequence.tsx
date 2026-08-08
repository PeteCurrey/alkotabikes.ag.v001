"use client";

import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Layers, Shield, Cpu, Sparkles } from "lucide-react";

export default function MaterialSequence() {
  const details = [
    { title: "UD CARBON WEAVE", icon: Layers, desc: "High-modulus fiber orientation mapped precisely to stress vectors." },
    { title: "5-AXIS CNC HARDWARE", icon: Cpu, desc: "AL7075-T6 alloy linkages machined to sub-millimeter tolerances." },
    { title: "ENDURO MAX BEARINGS", icon: Sparkles, desc: "Full-complement sealed cartridge bearings for maximum static load durability." },
    { title: "CO-MOLDED ARMOR", icon: Shield, desc: "Impact-resistant poly-urethane downtube and chainstay damping guards." },
  ];

  return (
    <section className="w-full bg-alkota-white text-alkota-black py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div className="space-y-3">
            <TechnicalAnnotation label="HARDWARE PRECISION" variant="slate" />
            <h2 className="font-display font-extrabold text-4xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              THE DIFFERENCE<br />
              <span className="text-alkota-slate">LIVES IN DETAILS.</span>
            </h2>
          </div>

          <p className="font-sans text-sm text-alkota-graphite max-w-md leading-relaxed font-light">
            Every fastener, bearing, carbon ply and paint coat is evaluated against function before earning its place on the frame.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 bg-alkota-snow border border-black/10 space-y-4 hover:bg-white hover:border-alkota-black transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-alkota-slate">0{idx + 1}</span>
                  <Icon className="w-5 h-5 text-alkota-graphite group-hover:text-alkota-black transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg text-alkota-black uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-alkota-slate leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
