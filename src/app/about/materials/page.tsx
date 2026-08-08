import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, Layers, Cpu, Shield, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Materials & Composites | Carbon & Titanium Science",
  description: "Explore the materials science behind ALKOTA Project 01—unidirectional carbon layups, 5-axis CNC 7075-T6 aluminum linkages, Grade 5 titanium hardware, and co-molded frame protection.",
  openGraph: {
    title: "Materials & Composites | Carbon & Titanium Science",
    description: "Explore the materials science behind ALKOTA Project 01—unidirectional carbon layups, 5-axis CNC 7075-T6 aluminum linkages, Grade 5 titanium hardware, and co-molded frame protection.",
    images: [ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src],
  },
};

export default function MaterialsPage() {
  const materialsList = [
    {
      icon: Layers,
      title: "UNIDIRECTIONAL CARBON COMPOSITE",
      subtitle: "High-Modulus Toray Fiber",
      desc: "Each carbon ply is manually oriented along calculated load vectors. T700 and T800 fibers provide impact resistance in the downtube, while high-modulus fibers reinforce the headtube and bottom bracket for lateral stiffness.",
    },
    {
      icon: Cpu,
      title: "5-AXIS CNC AL7075-T6 LINKAGES",
      subtitle: "Billet Aircraft Aluminum",
      desc: "Linkage rocker arms are CNC machined from solid billets of 7075-T6 aircraft-grade aluminum to achieve minimal deflection under heavy G-force compression turns.",
    },
    {
      icon: Sparkles,
      title: "GRADE 5 TITANIUM HARDWARE",
      subtitle: "Ti-6Al-4V Alloy Axles",
      desc: "Main pivot axles and brake caliper bolts are precision turned from Grade 5 titanium, reducing unsprung mass while offering superior corrosion resistance and high shear strength.",
    },
    {
      icon: Shield,
      title: "CO-MOLDED POLYURETHANE ARMOR",
      subtitle: "Impact & Sound Damping Guards",
      desc: "Integrated downtube and chainstay protectors are co-molded into the carbon structure, absorbing flying rock strikes and dampening chain slap noise on high-speed descents.",
    },
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen space-y-0">
      <StoryNavigation />

      {/* Hero Section — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="materials-hero">
        <div className="space-y-8">
          <div className="space-y-4">
            <TechnicalAnnotation label="CHAPTER 05" value="MATERIALS & COMPOSITES" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              COMPOSITE SCIENCE.<br />
              <span className="text-alkota-signal">ZERO COMPROMISE.</span>
            </h1>
            <p className="font-mono text-xs text-alkota-slate uppercase tracking-wider font-semibold">
              TORAY UD CARBON • AL7075-T6 CNC • GRADE 5 TITANIUM • ENDURO MAX
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-6 space-y-6 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-white font-light leading-snug">
                Material selection dictates how a chassis responds to high-frequency trail chatter, heavy compressions, and extreme rock strikes.
              </p>
              <p className="text-sm text-alkota-snow/80 font-light leading-relaxed">
                By combining unidirectional carbon fiber layups with 5-axis CNC machined 7075-T6 aluminum linkages and turned Grade 5 titanium hardware, Project 01 delivers optimal strength-to-weight ratio and structural longevity.
              </p>
            </div>

            <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
                alt={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal border border-white/10 uppercase">
                CARBON PLY LAYUP DEVELOPMENT
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* Materials Grid — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="materials-grid">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="MATERIAL SPECIFICATION" value="4 HARDWARE PILLARS" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                ENGINEERED FOR THE<br />
                <span className="text-alkota-slate">EXTREME DEMANDS.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materialsList.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-8 bg-alkota-black border border-white/10 space-y-4 hover:border-alkota-signal transition-all group shadow-xl">
                  <div className="flex items-center justify-between font-mono text-xs text-alkota-signal">
                    <span className="font-bold">{item.subtitle}</span>
                    <Icon className="w-5 h-5 text-alkota-slate group-hover:text-alkota-signal transition-colors" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CNC Bench Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-white/10">
            <div className="lg:col-span-6 relative w-full h-[360px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.componentDevelopmentBench.src}
                alt={ALKOTA_STORY_MEDIA.componentDevelopmentBench.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            <div className="lg:col-span-6 space-y-4 font-sans">
              <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                5-AXIS CNC LINKAGE PRECISION
              </h3>
              <p className="text-xs text-alkota-snow/80 leading-relaxed font-light">
                Sub-millimeter machining tolerances ensure zero bearing misalignment, eliminating unwanted frame flex and extending bearing life under severe side-load conditions.
              </p>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      <ChapterTransition currentSlug="materials" />
    </div>
  );
}
