import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, Compass, Wrench, ShieldCheck, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "About ALKOTA | Founder Pete Currey & Origin",
  description: "Learn about ALKOTA Performance Engineering, founder Pete Currey, and our focus on engineering single uncompromising all-mountain mountain bicycles.",
  openGraph: {
    title: "About ALKOTA | Founder Pete Currey & Origin",
    description: "Learn about ALKOTA Performance Engineering, founder Pete Currey, and our focus on engineering single uncompromising all-mountain mountain bicycles.",
    images: [ALKOTA_STORY_MEDIA.peteFounderPortrait.src],
  },
};

export default function AboutPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen space-y-0">
      <StoryNavigation />

      {/* Hero Chapter Section — WORLD 01 ALPINE PRECISION */}
      <VisualWorldSection world="ALPINE_PRECISION" id="hero">
        <div className="space-y-8">
          <div className="space-y-4">
            <TechnicalAnnotation label="CHAPTER 01" value="ABOUT ALKOTA" variant="slate" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              DESIGN THE RIDE.<br />
              <span className="text-alkota-graphite">THEN DESIGN THE BIKE.</span>
            </h1>
            <p className="font-mono text-xs text-alkota-graphite uppercase tracking-wider font-semibold">
              FOUNDED BY PETE CURREY • ALPINE PERFORMANCE ENGINEERING
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-6 space-y-6 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-black font-light leading-snug">
                ALKOTA Performance Engineering exists around one central belief: high-performance mountain bicycles are created through physical discipline, advanced engineering analysis, and continuous trail validation.
              </p>

              <div className="space-y-4 text-sm text-alkota-slate leading-relaxed font-light">
                <p>
                  We do not build dozens of model ranges to satisfy retail shelf planning. We focus entirely on one machine—Project 01—a single, uncompromising full-suspension carbon chassis engineered to excel across extreme alpine terrain.
                </p>
                <p>
                  Founded by engineer and rider Pete Currey, ALKOTA treats mountain bicycle design as a discipline closer to motorsport telemetry and high-end automotive engineering than traditional cycle manufacturing.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
                <Link
                  href="/about/story"
                  className="px-6 py-3 bg-alkota-black text-alkota-white hover:bg-alkota-slate font-bold uppercase transition-colors flex items-center gap-2"
                >
                  <span>OUR STORY & HISTORY</span>
                  <ArrowRight className="w-4 h-4 text-alkota-signal" />
                </Link>
                <Link
                  href="/about/philosophy"
                  className="px-6 py-3 border border-black/20 text-alkota-black hover:border-black font-bold uppercase transition-colors"
                >
                  ENGINEERING PHILOSOPHY
                </Link>
              </div>
            </div>

            {/* Founder Portrait Visual */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative w-full h-[460px] sm:h-[540px] bg-alkota-snow border border-black/10 overflow-hidden shadow-2xl">
                <Image
                  src={ALKOTA_STORY_MEDIA.peteFounderPortrait.src}
                  alt={ALKOTA_STORY_MEDIA.peteFounderPortrait.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center scale-[1.01] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="font-mono text-[10px] text-alkota-slate flex items-center justify-between uppercase">
                <span>PETE CURREY • FOUNDER</span>
                <span>ALPINE R&D BASELINE</span>
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* Section 02 — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="engineering-lab">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="DEVELOPMENT ENVIRONMENT" value="THE WORKSHOP" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                WHERE IDEAS<br />
                <span className="text-alkota-slate">BECOME HARDWARE.</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-alkota-slate uppercase space-y-1">
              <div>STATUS: PRE-PRODUCTION DEVELOPMENT</div>
              <div>SPECIFICATION: REV 001 BASELINE</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative w-full h-[400px] sm:h-[500px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.peteWorkshopLab.src}
                alt={ALKOTA_STORY_MEDIA.peteWorkshopLab.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/70 px-3 py-1 text-alkota-signal border border-white/10 uppercase">
                LABORATORY WORKSHOP • PETE CURREY
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 font-sans">
              <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                NOTHING IS ACCIDENTAL.
              </h3>
              <p className="text-sm text-alkota-snow/90 font-light leading-relaxed">
                The workshop is where assumptions are challenged. Frames are measured. Components are stripped down. Set-ups are changed. Ideas are tested on calibrated rigs.
              </p>
              <p className="text-sm text-alkota-snow/90 font-light leading-relaxed">
                Every fastener, bearing, carbon ply, and paint coat is evaluated against function before earning its place on the chassis.
              </p>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-alkota-slate text-[10px] uppercase block">FRAME MATERIAL</span>
                  <span className="text-alkota-white font-bold">UD CARBON MONOCOQUE</span>
                </div>
                <div className="space-y-1">
                  <span className="text-alkota-slate text-[10px] uppercase block">LINKAGE HARDWARE</span>
                  <span className="text-alkota-white font-bold">AL7075-T6 5-AXIS CNC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* Section 03 — WORLD 03 TERRAIN & HUMAN */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="terrain-human">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="REAL TERRAIN VALIDATION" value="HAUTE-SAVOIE" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE FINAL<br />
                <span className="text-alkota-slate">TEST BENCH.</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-alkota-slate uppercase">
              <span>ELEVATION: 2,400M • ALPINE R&D</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6 font-sans">
              <p className="text-xl text-alkota-white font-light leading-snug">
                Numbers help us understand a bicycle. Terrain tells us whether we understood it correctly.
              </p>
              <p className="text-sm text-alkota-snow/80 font-light leading-relaxed">
                Telemetry collection on high-velocity alpine trails reveals real-world impact forces, chassis resonance, and mud clearances that no computer simulation can replicate.
              </p>
              <div className="pt-2">
                <Link
                  href="/about/testing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors"
                >
                  <span>EXPLORE TESTING PROGRAMME</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 relative w-full h-[400px] sm:h-[480px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src}
                alt={ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal border border-white/10 uppercase">
                HAUTE-SAVOIE FIELD TEST • 2,400M ELEVATION
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      <ChapterTransition currentSlug="about" />
    </div>
  );
}
