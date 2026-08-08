"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Shield, Cpu, Sparkles, Layers } from "lucide-react";

export default function MaterialSwatches() {
  const [activeMaterial, setActiveMaterial] = useState(0);

  const materials = [
    {
      id: "ud-carbon",
      name: "HIGH-MODULUS UD CARBON",
      code: "COMPOSITE / T800-T1000",
      icon: Layers,
      description:
        "Continuous unidirectional carbon fibers oriented along principal stress paths for high tensile strength and tuned flex damping.",
      properties: [
        { label: "Tensile Modulus", value: "294 GPa" },
        { label: "Density", value: "1.78 g/cm³" },
        { label: "Application", value: "Front & Rear Monocoque" },
      ],
    },
    {
      id: "cnc-alloy",
      name: "FORGED 7075-T6 ALUMINIUM",
      code: "METALLURGY / AL7075-T6",
      icon: Cpu,
      description:
        "5-axis CNC machined suspension bellcranks and dropouts providing high shear thread engagement and zero flex under side load.",
      properties: [
        { label: "Yield Strength", value: "505 MPa" },
        { label: "Hardness", value: "150 HB" },
        { label: "Application", value: "Linkages & Dropouts" },
      ],
    },
    {
      id: "titanium-hardware",
      name: "GRADE 5 TITANIUM FASTENERS",
      code: "HARDWARE / Ti-6Al-4V",
      icon: Sparkles,
      description:
        "Custom machined hollow pivot axles and titanium bolts resisting corrosion and galling while paring un-sprung weight.",
      properties: [
        { label: "Tensile Strength", value: "950 MPa" },
        { label: "Weight Savings", value: "-42% vs Steel" },
        { label: "Application", value: "Pivot Axles & Hardware" },
      ],
    },
    {
      id: "co-molded-armor",
      name: "CO-MOLDED POLYURETHANE ARMOR",
      code: "PROTECTION / TPU-95A",
      icon: Shield,
      description:
        "Integrated dual-density downtube and chainstay guards damping rock strikes and dampening chain slap noise.",
      properties: [
        { label: "Durometer", value: "95A / 70A Dual" },
        { label: "Noise Damping", value: "-14 dB" },
        { label: "Application", value: "Downtube & Chainstay" },
      ],
    },
  ];

  const currentMat = materials[activeMaterial];
  const IconComponent = currentMat.icon;

  return (
    <div className="bg-alkota-carbon text-alkota-white p-6 border border-white/10 tech-grid-dark rounded-none space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider">
            MATERIAL EXPLORER
          </div>
          <h3 className="font-display text-xl font-bold text-alkota-white">
            COMPOSITES & METALS
          </h3>
        </div>
        <TechnicalAnnotation label="PHYSICAL SPECIFICATIONS" variant="slate" />
      </div>

      {/* Material Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {materials.map((mat, index) => (
          <button
            key={mat.id}
            onClick={() => setActiveMaterial(index)}
            className={`p-3 border text-left font-mono text-xs transition-all ${
              activeMaterial === index
                ? "border-alkota-signal bg-alkota-signal/10 text-alkota-white font-semibold"
                : "border-white/10 hover:border-white/30 text-alkota-slate hover:text-alkota-white"
            }`}
          >
            <div className="text-[10px] text-alkota-slate uppercase mb-1">
              0{index + 1}
            </div>
            <div className="truncate">{mat.name}</div>
          </button>
        ))}
      </div>

      {/* Selected Material Detail Card */}
      <div className="bg-alkota-black p-6 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-3 flex flex-col items-center justify-center p-6 border border-white/10 bg-alkota-carbon text-center">
          <IconComponent className="w-12 h-12 text-alkota-signal mb-3" />
          <span className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider">
            {currentMat.code}
          </span>
        </div>

        <div className="md:col-span-9 space-y-4">
          <div className="space-y-1">
            <h4 className="font-display text-lg font-bold text-alkota-white">
              {currentMat.name}
            </h4>
            <p className="font-sans text-xs text-alkota-slate leading-relaxed">
              {currentMat.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 font-mono text-xs">
            {currentMat.properties.map((prop) => (
              <div key={prop.label} className="space-y-1">
                <div className="text-[10px] text-alkota-slate uppercase">
                  {prop.label}
                </div>
                <div className="font-bold text-alkota-signal">{prop.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
