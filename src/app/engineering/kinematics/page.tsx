import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import KinematicChart from "@/components/engineering/KinematicChart";

export default function KinematicsEngineeringPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <TechnicalAnnotation label="ENGINEERING / 02" value="SUSPENSION KINEMATICS" variant="signal" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            CONTROL<br />
            <span className="text-alkota-slate">THROUGH MOTION.</span>
          </h1>
          <p className="font-sans text-base text-alkota-snow max-w-2xl font-light leading-relaxed">
            Suspension is not simply a travel number. It is the dynamic interaction between leverage ratios, anti-squat percentages, pedal kickback, and rearward axle trajectory.
          </p>
        </div>

        {/* 3 Telemetry Charts */}
        <div className="space-y-8">
          <KinematicChart type="leverage" />
          <KinematicChart type="antiSquat" />
          <KinematicChart type="axlePath" />
        </div>
      </div>
    </div>
  );
}
