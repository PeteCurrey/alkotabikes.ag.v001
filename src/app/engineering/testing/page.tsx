import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import TestRecord from "@/components/engineering/TestRecord";
import TerrainBench from "@/components/sections/TerrainBench";

export default function TestingEngineeringPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <TechnicalAnnotation label="ENGINEERING / 04" value="LAB & TERRAIN VALIDATION" variant="signal" />
          <h1 className="font-display font-medium text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            PROVE IT<br />
            <span className="text-alkota-slate">OUTSIDE THE SCREEN.</span>
          </h1>
          <p className="font-sans text-base text-alkota-snow max-w-2xl font-light leading-relaxed">
            FEA simulations guide design, but laboratory stress rigs and sensor-telemetry alpine trail logging reveal the true physical behavior of the chassis.
          </p>
        </div>

        {/* Alpine Riding Terrain Validation Feature */}
        <TerrainBench />

        {/* Test Records Log */}
        <TestRecord />
      </div>
    </div>
  );
}
