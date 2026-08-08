import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, Compass, ShieldCheck, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Validation & Testing | ISO+ & Haute-Savoie Field R&D",
  description: "Discover ALKOTA's multi-tier testing protocol: laboratory hydraulic fatigue stress testing combined with high-altitude alpine terrain validation at 2,400m in Haute-Savoie.",
  openGraph: {
    title: "Validation & Testing | ISO+ & Haute-Savoie Field R&D",
    description: "Discover ALKOTA's multi-tier testing protocol: laboratory hydraulic fatigue stress testing combined with high-altitude alpine terrain validation at 2,400m in Haute-Savoie.",
    images: [ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src],
  },
};

export default function TestingPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen space-y-0">
      <StoryNavigation />

      {/* Hero Section — WORLD 03 TERRAIN & HUMAN */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="testing-hero">
        <div className="space-y-8">
          <div className="space-y-4">
            <TechnicalAnnotation label="CHAPTER 06" value="VALIDATION & TESTING" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              LABORATORY RIGOR.<br />
              <span className="text-alkota-signal">REAL TERRAIN TRUTH.</span>
            </h1>
            <p className="font-mono text-xs text-alkota-slate uppercase tracking-wider font-semibold">
              ISO+ HYDRAULIC FATIGUE RIG • HAUTE-SAVOIE 2,400M FIELD R&D
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-6 space-y-6 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-white font-light leading-snug">
                Computer simulations and finite element analysis are essential tools, but they cannot simulate real mountain unpredictability.
              </p>
              <p className="text-sm text-alkota-snow/80 font-light leading-relaxed">
                ALKOTA subjects every frame revision to a two-tier testing protocol: rigorous multi-axis hydraulic fatigue bench testing in the laboratory, followed by intense high-speed telemetry validation across rock gardens in Haute-Savoie at 2,400m elevation.
              </p>
            </div>

            <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src}
                alt={ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal border border-white/10 uppercase">
                HAUTE-SAVOIE FIELD VALIDATION • 2,400M ELEVATION
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* Tier 1 vs Tier 2 Testing Dual Section — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="testing-tiers">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="TWO-TIER VALIDATION PROTOCOL" value="TEST METHODOLOGY" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                RIGOROUS<br />
                <span className="text-alkota-slate">STRUCTURAL PROOF.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tier 1: Laboratory Fatigue Testing */}
            <div className="bg-alkota-black border border-white/10 p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                <span className="text-alkota-signal font-bold uppercase">TIER 01 • LABORATORY BENCH</span>
                <span className="text-alkota-slate uppercase">ISO+ TARGET STANDARD</span>
              </div>

              <div className="relative w-full h-[300px] bg-alkota-carbon border border-white/10 overflow-hidden">
                <Image
                  src={ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src}
                  alt={ALKOTA_STORY_MEDIA.laboratoryStressFatigue.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                HYDRAULIC FATIGUE RIG
              </h3>
              <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">
                Pneumatic and hydraulic actuators apply cyclic multi-axis loads to the headtube, bottom bracket, and rear dropouts to exceed standard ISO fatigue requirements.
              </p>
              <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider font-semibold border-t border-white/10 pt-3">
                STATUS: ISO+ TARGET FATIGUE BENCHMARKING
              </div>
            </div>

            {/* Tier 2: Real Terrain Telemetry */}
            <div className="bg-alkota-black border border-white/10 p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                <span className="text-alkota-signal font-bold uppercase">TIER 02 • ALPINE FIELD R&D</span>
                <span className="text-alkota-slate uppercase">HAUTE-SAVOIE 2,400M</span>
              </div>

              <div className="relative w-full h-[300px] bg-alkota-carbon border border-white/10 overflow-hidden">
                <Image
                  src={ALKOTA_STORY_MEDIA.alpineTrailTestingAction.src}
                  alt={ALKOTA_STORY_MEDIA.alpineTrailTestingAction.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                TELEMETRY TRAIL RUNS
              </h3>
              <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">
                Sensors attached to shock shafts, front fork stanchions, and hubs log displacement, acceleration, and temperature during high-speed descent runs.
              </p>
              <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider font-semibold border-t border-white/10 pt-3">
                STATUS: ACTIVE REAL TERRAIN FIELD TESTING
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      <ChapterTransition currentSlug="testing" />
    </div>
  );
}
