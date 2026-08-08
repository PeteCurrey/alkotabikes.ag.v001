import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import MaterialSwatches from "@/components/engineering/MaterialSwatches";

export default function MaterialsEngineeringPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <TechnicalAnnotation label="ENGINEERING / 03" value="MATERIALS & METALLURGY" variant="signal" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            MATERIAL<br />
            <span className="text-alkota-slate">WHERE IT MATTERS.</span>
          </h1>
          <p className="font-sans text-base text-alkota-snow max-w-2xl font-light leading-relaxed">
            Carbon fiber, forged aluminium alloys, Grade 5 titanium, and dual-density armor selected strictly according to mechanical function.
          </p>
        </div>

        {/* Interactive Material Explorer */}
        <MaterialSwatches />
      </div>
    </div>
  );
}
