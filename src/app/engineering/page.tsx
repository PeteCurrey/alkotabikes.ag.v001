import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { EngineeringSubNav } from "@/components/layout/SubNav";
import CADViewerPlaceholder from "@/components/engineering/CADViewerPlaceholder";
import KinematicChart from "@/components/engineering/KinematicChart";
import WorkshopFeature from "@/components/sections/WorkshopFeature";
import NextStepBanner from "@/components/layout/NextStepBanner";
import { ENGINEERING_PILLARS } from "@/lib/data/engineeringData";
import { ArrowRight } from "lucide-react";

export default function EngineeringHubPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 pb-24 space-y-16 min-h-screen tech-grid-dark">
      <EngineeringSubNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Engineering Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <TechnicalAnnotation label="ALKOTA / CHASSIS DEVELOPMENT" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              UNDERSTAND<br />
              <span className="text-alkota-slate">EVERY FORCE.</span>
            </h1>
            <p className="font-sans text-base text-alkota-snow font-light leading-relaxed">
              A mountain bike does not experience the trail as a collection of isolated components. Forces travel through the entire system: Frame, Suspension, Tyres, Wheels, Rider, Terrain. Our process considers how those systems interact before deciding what each component needs to become.
            </p>
          </div>

          <div className="font-mono text-xs text-alkota-slate uppercase space-y-1">
            <div>PROGRAMME: PROJECT WORKSPACE</div>
            <div>STATUS: REV 001 DEVELOPMENT</div>
          </div>
        </div>

        {/* Canonical Workshop Showcase Feature */}
        <WorkshopFeature />

        {/* CAD Interactive Model Viewer */}
        <CADViewerPlaceholder />

        {/* 4 Pillars Navigation Grid */}
        <div className="space-y-6 pt-6">
          <div className="font-mono text-xs text-alkota-signal uppercase tracking-wider">
            ENGINEERING DISCIPLINES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENGINEERING_PILLARS.map((p) => (
              <Link
                key={p.id}
                href={p.route}
                className="group p-6 bg-alkota-black border border-white/10 hover:border-alkota-signal transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-alkota-signal">{p.number}</span>
                    <ArrowRight className="w-4 h-4 text-alkota-slate group-hover:text-alkota-signal group-hover:translate-x-1 transition-all" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-alkota-white uppercase tracking-tight group-hover:text-alkota-signal transition-colors">
                    {p.title}
                  </h2>
                  <p className="font-sans text-xs text-alkota-slate font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 font-mono text-[10px] text-alkota-slate">
                  <span>EXPLORE {p.title} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dynamic Kinematics Preview */}
        <div className="pt-6">
          <KinematicChart type="leverage" />
        </div>

        {/* Page Ending Next Step */}
        <NextStepBanner
          stepNumber="NEXT"
          nextTitle="PROJECT 01 FLAGSHIP PLATFORM"
          nextSubtitle="Discover how our engineering methodology materialises in the Project 01 160mm/150mm all-mountain carbon chassis."
          href="/bikes/project-01"
          label="FLAGSHIP CHASSIS"
          ctaText="EXPLORE PROJECT 01"
        />
      </div>
    </div>
  );
}

