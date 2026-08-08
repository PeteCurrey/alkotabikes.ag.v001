import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, Cpu, Layers, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Reverse Engineering | Riding Experience Analysis",
  description: "Discover how ALKOTA reverse-engineers the riding experience—moving from rider requirement, telemetry logging, and dynamic analysis to geometry and frame stiffness.",
  openGraph: {
    title: "Reverse Engineering | Riding Experience Analysis",
    description: "Discover how ALKOTA reverse-engineers the riding experience—moving from rider requirement, telemetry logging, and dynamic analysis to geometry and frame stiffness.",
    images: [ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.src],
  },
};

export default function ReverseEngineeringPage() {
  const processSteps = [
    {
      num: "01",
      title: "RIDER REQUIREMENT",
      desc: "Defining target trail speed, G-force cornering loads, steep slope braking demands, and impact frequencies.",
    },
    {
      num: "02",
      title: "TELEMETRY LOGGING",
      desc: "High-frequency sensors track shock velocity, fork displacement, chassis acceleration, and braking torque.",
    },
    {
      num: "03",
      title: "DYNAMIC ANALYSIS",
      desc: "Translating raw telemetry into kinematic curves—leverage ratio, anti-squat, anti-rise, and axle path.",
    },
    {
      num: "04",
      title: "GEOMETRY MATRIX",
      desc: "Establishing reach, head angle, seat angle, and chainstay length for balanced rider center of gravity.",
    },
    {
      num: "05",
      title: "FRAME STIFFNESS",
      desc: "Mapping FEA fiber orientation to create lateral stiffness for cornering while preserving radial compliance.",
    },
    {
      num: "06",
      title: "SYSTEM INTEGRATION",
      desc: "Selecting and integration-testing suspension, brakes, transmission, wheels, and contact points as one entity.",
    },
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen space-y-0">
      <StoryNavigation />

      {/* Hero Section — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="reverse-hero">
        <div className="space-y-8">
          <div className="space-y-4">
            <TechnicalAnnotation label="CHAPTER 03" value="REVERSE ENGINEERING" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              ANALYSE THE RIDE.<br />
              <span className="text-alkota-signal">DERIVE THE SYSTEM.</span>
            </h1>
            <p className="font-mono text-xs text-alkota-slate uppercase tracking-wider font-semibold">
              RIDER REQUIREMENT → TELEMETRY → DYNAMICS → GEOMETRY → CHASSIS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-6 space-y-6 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-white font-light leading-snug">
                Traditional bicycle development begins with a frame outline and attempts to fit components around it. ALKOTA inverted this process entirely.
              </p>
              <p className="text-sm text-alkota-snow/80 font-light leading-relaxed">
                We began by reverse-engineering the complete riding experience. By placing sensors on test bikes and measuring exact forces across high-speed rock gardens, G-out compression turns, and heavy alpine braking zones, we derived what a bicycle chassis actually needs to become.
              </p>
            </div>

            <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.src}
                alt={ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal border border-white/10 uppercase">
                TELEMETRY LOGGING ANALYSIS
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* 6 Step Analytical Process — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="analytical-matrix">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="DERIVATION METHODOLOGY" value="6-STEP MATRIX" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                HOW THE RIDE<br />
                <span className="text-alkota-slate">SHAPES THE CHASSIS.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="p-6 bg-alkota-black border border-white/10 space-y-4 hover:border-alkota-signal transition-all group">
                <div className="flex items-center justify-between font-mono text-xs text-alkota-signal font-bold">
                  <span>STEP {step.num}</span>
                  <Activity className="w-4 h-4 text-alkota-slate group-hover:text-alkota-signal transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-alkota-white">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Kinematics Analysis Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-white/10">
            <div className="lg:col-span-6 space-y-4 font-sans">
              <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                KINEMATIC & LEVERAGE DERIVATION
              </h3>
              <p className="text-xs text-alkota-snow/80 leading-relaxed font-light">
                Our leverage ratio curve progresses smoothly from 3.1 to 2.2, providing sensitive small-bump tracking at sag while resisting harsh bottom-outs during high-G compression hits.
              </p>
              <div className="pt-2">
                <Link
                  href="/engineering/kinematics"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-alkota-white font-mono text-xs uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors"
                >
                  <span>VIEW FULL KINEMATICS DATA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative w-full h-[360px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src}
                alt={ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </VisualWorldSection>

      <ChapterTransition currentSlug="reverse-engineering" />
    </div>
  );
}
