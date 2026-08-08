"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Settings, Wrench } from "lucide-react";

export default function ExplodedViewPlaceholder() {
  const [exploded, setExploded] = useState(true);

  const parts = [
    { id: "axle", name: "Grade 5 Titanium Main Pivot Axle", torque: "15 Nm", offset: exploded ? "-120px" : "0px" },
    { id: "bearing-left", name: "Enduro MAX Double-Sealed Cartridge Bearing (Left)", torque: "Press Fit", offset: exploded ? "-60px" : "0px" },
    { id: "collet", name: "Tapered AL7075 Collet Wedge", torque: "8 Nm", offset: "0px" },
    { id: "bearing-right", name: "Enduro MAX Double-Sealed Cartridge Bearing (Right)", torque: "Press Fit", offset: exploded ? "60px" : "0px" },
    { id: "cap", name: "Anodized Dust Cap & O-Ring Seal", torque: "4 Nm", offset: exploded ? "120px" : "0px" },
  ];

  return (
    <div className="bg-alkota-carbon text-alkota-white p-6 border border-white/10 tech-grid-dark rounded-none space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider">
            ASSEMBLY EXPLODED DIAGRAM
          </div>
          <h3 className="font-display text-xl font-bold text-alkota-white">
            MAIN PIVOT HARDWARE PACKAGING
          </h3>
        </div>

        <button
          onClick={() => setExploded(!exploded)}
          className="px-4 py-2 bg-alkota-black border border-alkota-signal text-alkota-signal hover:bg-alkota-signal hover:text-alkota-black transition-all font-mono text-xs uppercase font-semibold flex items-center gap-2"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{exploded ? "ASSEMBLE HARDWARE" : "EXPLODE SCHEMATIC"}</span>
        </button>
      </div>

      {/* Exploded Hardware Diagram View */}
      <div className="relative py-12 flex items-center justify-center min-h-[260px] bg-alkota-black border border-white/10">
        <div className="flex items-center justify-center gap-4 sm:gap-8 transition-all duration-500">
          {parts.map((part) => (
            <div
              key={part.id}
              className="flex flex-col items-center space-y-2 group cursor-pointer transition-transform duration-500"
              style={{ transform: `translateX(${part.offset})` }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-alkota-signal bg-alkota-carbon flex items-center justify-center font-mono text-xs font-bold text-alkota-white group-hover:scale-110 transition-transform">
                {part.id === "axle" ? "AX" : part.id.includes("bearing") ? "BRG" : "CAP"}
              </div>
              <div className="font-mono text-[10px] text-alkota-slate text-center max-w-[100px] uppercase">
                {part.name.split(" ")[0]}
              </div>
              <div className="font-mono text-[9px] text-alkota-signal bg-alkota-signal/10 px-1.5 py-0.5 border border-alkota-signal/30">
                {part.torque}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware Parts Table */}
      <div className="space-y-2">
        <div className="font-mono text-xs text-alkota-slate uppercase tracking-wider">
          BOM HARDWARE SPECIFICATIONS
        </div>
        <div className="grid grid-cols-1 divide-y divide-white/10 border border-white/10 font-mono text-xs">
          {parts.map((part) => (
            <div key={part.id} className="p-3 flex items-center justify-between bg-alkota-carbon/50">
              <span className="text-alkota-white font-medium">{part.name}</span>
              <span className="text-alkota-signal">{part.torque}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
