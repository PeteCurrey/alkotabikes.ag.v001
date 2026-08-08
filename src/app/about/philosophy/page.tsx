import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, Settings, ShieldCheck, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Philosophy | Complete Machine Architecture",
  description: "Understand why ALKOTA engineers complete integrated machines rather than building isolated frames and bolting third-party components onto them.",
  openGraph: {
    title: "Engineering Philosophy | Complete Machine Architecture",
    description: "Understand why ALKOTA engineers complete integrated machines rather than building isolated frames and bolting third-party components onto them.",
    images: [ALKOTA_STORY_MEDIA.completeMachineIntegration.src],
  },
};

export default function PhilosophyPage() {
  const tenets = [
    {
      code: "TENET 01",
      title: "THE COMPLETE MACHINE",
      desc: "A bicycle is not a frame with parts bolted onto it. It is a single dynamic organism where suspension, brakes, wheels, and frame compliance must work in concert.",
    },
    {
      code: "TENET 02",
      title: "ONE PLATFORM. NO DISTRACTIONS.",
      desc: "Rather than spreading R&D budget across dozens of market segments, we dedicate 100% of our focus to perfecting one all-mountain enduro platform—Project 01.",
    },
    {
      code: "TENET 03",
      title: "TRANSPARENT PRODUCT TRUTH",
      desc: "We disclose development status openly. Pre-production engineering targets are tagged as targets, not overstated as final production facts.",
    },
    {
      code: "TENET 04",
      title: "PROVENANCE & PRIMARY SOURCES",
      desc: "Every partner component—Hope EVO V6Ti calipers, FOX 38 Factory dampers, SRAM XX Eagle AXS Transmission—is sourced directly with official manufacturer documentation.",
    },
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen space-y-0">
      <StoryNavigation />

      {/* Hero Section — WORLD 01 ALPINE PRECISION */}
      <VisualWorldSection world="ALPINE_PRECISION" id="philosophy-hero">
        <div className="space-y-8">
          <div className="space-y-4">
            <TechnicalAnnotation label="CHAPTER 07" value="ENGINEERING PHILOSOPHY" variant="slate" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              ENGINEER THE MACHINE.<br />
              <span className="text-alkota-graphite">NOT JUST THE FRAME.</span>
            </h1>
            <p className="font-mono text-xs text-alkota-graphite uppercase tracking-wider font-semibold">
              COMPLETE MACHINE INTEGRATION • ONE PLATFORM • PRODUCT TRUTH
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-6 space-y-6 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-black font-light leading-snug">
                Most mountain bicycle companies operate as frame fabricators—designing a carbon chassis and then sourcing off-the-shelf components from component catalogs.
              </p>
              <p className="text-sm text-alkota-slate leading-relaxed font-light">
                ALKOTA approaches bicycle creation as a holistic engineering department. We evaluate how the brake caliper mounting stiffness affects front fork stanchion flex, how rear shock damping pairs with tire sidewall compliance, and how handlebar flex dampens arm fatigue.
              </p>
            </div>

            <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] bg-alkota-snow border border-black/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.completeMachineIntegration.src}
                alt={ALKOTA_STORY_MEDIA.completeMachineIntegration.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal border border-white/10 uppercase">
                THE INTEGRATED MACHINE ARCHITECTURE
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* 4 Core Engineering Tenets — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="philosophy-tenets">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="FOUNDATIONAL PRINCIPLES" value="4 TENETS" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                OUR CORE<br />
                <span className="text-alkota-slate">PRINCIPLES.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tenets.map((t) => (
              <div key={t.code} className="p-8 bg-alkota-black border border-white/10 space-y-4 hover:border-alkota-signal transition-all group shadow-xl">
                <div className="font-mono text-xs text-alkota-signal font-bold uppercase">
                  {t.code}
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                  {t.title}
                </h3>
                <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Call to action card to explore Project 01 */}
          <div className="bg-alkota-black border border-alkota-signal p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <span className="font-mono text-xs text-alkota-signal uppercase font-bold tracking-wider">
                FLAGSHIP CHASSIS
              </span>
              <h3 className="font-display text-3xl font-bold uppercase text-alkota-white">
                EXPLORE PROJECT 01
              </h3>
              <p className="font-sans text-xs text-alkota-slate max-w-lg font-light">
                Discover the 16 integrated component systems, verified specifications, and configurator parameters for our launch platform.
              </p>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <Link
                href="/bikes/project-01"
                className="px-8 py-4 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center gap-2"
              >
                <span>MACHINE EXPLORER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/configure"
                className="px-8 py-4 border border-white/20 text-alkota-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                <span>CONFIGURATOR</span>
              </Link>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      <ChapterTransition currentSlug="philosophy" />
    </div>
  );
}
