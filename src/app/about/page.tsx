import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, Settings, ShieldCheck, Compass, Layers, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "About Alkota | Performance Engineering for Mountain Bikes",
  description: "Alkota is a performance engineering company building mountain bikes as complete systems. Discover the philosophy behind Project 01.",
  openGraph: {
    title: "About Alkota | Performance Engineering for Mountain Bikes",
    description: "Alkota is a performance engineering company building mountain bikes as complete systems. Discover the philosophy behind Project 01.",
    images: [ALKOTA_STORY_MEDIA.peteGlacierWhite.src],
  },
};

export default function AboutPage() {
  const principles = [
    {
      num: "01",
      title: "RIDE FIRST.",
      desc: "The starting point is the experience on the trail — grip, support, balance, confidence, efficiency and control.",
    },
    {
      num: "02",
      title: "DESIGN THE SYSTEM.",
      desc: "Frame, suspension, drivetrain, wheels, brakes, cockpit and rider are not independent variables.",
    },
    {
      num: "03",
      title: "PRECISION OVER NOVELTY.",
      desc: "A new idea has value only if it produces a better bicycle.",
    },
    {
      num: "04",
      title: "SERVICEABILITY IS PERFORMANCE.",
      desc: "A premium machine should be designed to be ridden, maintained, rebuilt and kept.",
    },
    {
      num: "05",
      title: "TESTING HAS VETO POWER.",
      desc: "The render does not get the final say. Neither does marketing. The bike does.",
    },
  ];

  const mosaicImages = [
    { src: ALKOTA_STORY_MEDIA.engineeringDesignMeeting.src, alt: "Design meeting", label: "01 DESIGN MEETING" },
    { src: ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src, alt: "Carbon fiber work", label: "02 CARBON LAYUP" },
    { src: ALKOTA_STORY_MEDIA.componentDevelopmentBench.src, alt: "CNC components", label: "03 CNC COMPONENTS" },
    { src: ALKOTA_STORY_MEDIA.paddockEnvironment.src, alt: "Event paddock", label: "04 EVENT PADDOCK" },
    { src: ALKOTA_STORY_MEDIA.standaloneWhiteBike.src, alt: "Project 01 bike", label: "05 PROJECT 01" },
    { src: ALKOTA_STORY_MEDIA.peteFounderPortrait.src, alt: "Pete Currey", label: "06 PETE CURREY" },
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen space-y-0">
      <StoryNavigation />

      {/* 1. HERO — Major founder + Project 01 photograph */}
      <VisualWorldSection world="ALPINE_PRECISION" id="hero">
        <div className="space-y-8">
          <div className="space-y-4">
            <TechnicalAnnotation label="ABOUT ALKOTA" value="ORIGIN STATEMENT" variant="slate" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              PERFORMANCE IS<br />
              <span className="text-alkota-graphite">ENGINEERED.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-6 space-y-6 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-black font-light leading-snug">
                Alkota exists to build mountain bikes differently.
              </p>

              <div className="space-y-4 text-sm text-alkota-slate leading-relaxed font-light">
                <p>
                  Not by beginning with a catalogue, a price point or a list of fashionable components, but by beginning with the ride.
                </p>
                <p>
                  Project 01 is the first expression of that thinking: geometry, suspension, structure, materials, serviceability, components and rider contact points developed as parts of one system.
                </p>
                <p className="font-mono text-xs font-bold text-alkota-black uppercase tracking-wider">
                  ONE MACHINE. DEVELOPED PROPERLY.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
                <Link
                  href="/about/story"
                  className="px-8 py-4 bg-alkota-black text-alkota-white hover:bg-alkota-slate font-bold uppercase transition-colors flex items-center gap-3 shadow-lg"
                >
                  <span>DISCOVER THE STORY</span>
                  <ArrowRight className="w-4 h-4 text-alkota-signal" />
                </Link>
                <Link
                  href="/bikes/project-01"
                  className="px-8 py-4 border border-black/20 text-alkota-black hover:border-black font-bold uppercase transition-colors flex items-center gap-2"
                >
                  <span>EXPLORE PROJECT 01</span>
                </Link>
              </div>
            </div>

            {/* Founder Pete with Glacier White Project 01 image */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative w-full h-[480px] sm:h-[560px] bg-alkota-snow border border-black/10 overflow-hidden shadow-2xl">
                <Image
                  src={ALKOTA_STORY_MEDIA.peteGlacierWhite.src}
                  alt={ALKOTA_STORY_MEDIA.peteGlacierWhite.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center scale-[1.01] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="font-mono text-[10px] text-alkota-slate flex items-center justify-between uppercase">
                <span>PETE CURREY • GLACIER WHITE PROJECT 01</span>
                <span>ALPINE ARCHITECTURE R&D</span>
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* 2. SECTION — WHAT ALKOTA IS */}
      <VisualWorldSection world="ALPINE_PRECISION" id="what-is-alkota">
        <div className="space-y-12">
          <div className="space-y-4 max-w-4xl border-b border-black/10 pb-8">
            <TechnicalAnnotation label="COMPANY STATEMENT" variant="slate" />
            <h2 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-alkota-black leading-tight">
              A PERFORMANCE ENGINEERING COMPANY<br />
              <span className="text-alkota-graphite">THAT HAPPENS TO BUILD MOUNTAIN BIKES.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 font-sans text-sm text-alkota-slate leading-relaxed font-light">
              <p className="text-lg text-alkota-black font-normal leading-snug">
                The bicycle is a system.
              </p>
              <p>
                Change the geometry and suspension behaves differently. Change suspension behaviour and tyre load changes. Move a pivot and drivetrain behaviour changes. Alter a carbon section and stiffness, weight, durability and ride feel move with it.
              </p>
              <p>
                That interdependence is where Alkota starts.
              </p>
              <p>
                We are building around the principle that the best mountain bikes are not collections of excellent individual components.
              </p>
              <p className="font-mono text-xs font-bold text-alkota-black uppercase">
                THEY ARE MACHINES WHOSE INDIVIDUAL DECISIONS MAKE SENSE TOGETHER.
              </p>
            </div>

            {/* 3 Complementary Bike & Engineering Images */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative w-full h-[240px] bg-alkota-snow border border-black/10 overflow-hidden shadow-lg col-span-2">
                <Image
                  src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
                  alt="Project 01 Glacier White system"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center p-2"
                />
              </div>
              <div className="relative w-full h-[180px] bg-alkota-snow border border-black/10 overflow-hidden shadow-md">
                <Image
                  src={ALKOTA_STORY_MEDIA.chassisEngineeringReview.src}
                  alt="Chassis stress analysis"
                  fill
                  sizes="300px"
                  className="object-cover object-center"
                />
              </div>
              <div className="relative w-full h-[180px] bg-alkota-snow border border-black/10 overflow-hidden shadow-md">
                <Image
                  src={ALKOTA_STORY_MEDIA.componentDevelopmentBench.src}
                  alt="Component development bench"
                  fill
                  sizes="300px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* 3. SECTION — THE PRINCIPLES */}
      <VisualWorldSection world="ENGINEERING_LAB" id="principles">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="FOUNDATIONAL TENETS" value="5 PRINCIPLES" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE RULES ARE SIMPLE.<br />
                <span className="text-alkota-signal">THE WORK ISN'T.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div
                key={p.num}
                className="p-8 bg-alkota-black border border-white/10 space-y-4 hover:border-alkota-signal transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-alkota-signal font-bold">
                    <span>PRINCIPLE {p.num}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white group-hover:text-alkota-signal transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </VisualWorldSection>

      {/* 4. SECTION — ONE PLATFORM */}
      <VisualWorldSection world="ENGINEERING_LAB" id="one-platform">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="LAUNCH CHASSIS" value="PROJECT 01" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                ONE PLATFORM.<br />
                <span className="text-alkota-slate">NO FILLER MODELS.</span>
              </h2>
            </div>
            <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider font-semibold border border-alkota-signal/40 p-2.5 bg-black/40">
              <div>PRE-PRODUCTION DEVELOPMENT</div>
              <div>FINAL PRODUCTION SPECIFICATION SUBJECT TO VALIDATION</div>
            </div>
          </div>

          {/* Large side-by-side Glacier White & Naked Carbon presentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-alkota-black border border-white/10 p-6 space-y-4 shadow-2xl">
              <div className="relative w-full h-[320px] sm:h-[400px] bg-alkota-carbon overflow-hidden border border-white/10">
                <Image
                  src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
                  alt="Glacier White Project 01"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="font-mono text-xs flex justify-between items-center">
                <span className="text-alkota-signal font-bold uppercase">FINISH 01 • GLACIER WHITE</span>
                <span className="text-alkota-slate uppercase">ALPINE PRECISION</span>
              </div>
            </div>

            <div className="bg-alkota-black border border-white/10 p-6 space-y-4 shadow-2xl">
              <div className="relative w-full h-[320px] sm:h-[400px] bg-alkota-carbon overflow-hidden border border-white/10">
                <Image
                  src={ALKOTA_STORY_MEDIA.standaloneBlackBike.src}
                  alt="Naked Carbon Project 01"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center p-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="font-mono text-xs flex justify-between items-center">
                <span className="text-alkota-signal font-bold uppercase">FINISH 02 • NAKED CARBON</span>
                <span className="text-alkota-slate uppercase">RAW COMPOSITE</span>
              </div>
            </div>
          </div>

          <div className="max-w-3xl space-y-4 font-sans text-sm text-alkota-snow/90 leading-relaxed font-light">
            <p className="text-lg text-alkota-white font-normal">
              Alkota begins deliberately narrow.
            </p>
            <p>
              Project 01 is the launch platform: an aggressive all-mountain / lightweight-enduro machine currently being developed around 160 mm front travel, 150 mm rear travel and a full-carbon chassis.
            </p>
            <p>
              The objective is not to fill a product grid. It is to make one bicycle worth caring about.
            </p>
          </div>
        </div>
      </VisualWorldSection>

      {/* 5. SECTION — HUMAN + ENGINEERING */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="human-engineering">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="FIELD TEST R&D" value="HAUTE-SAVOIE" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE TRAIL REMAINS<br />
                <span className="text-alkota-signal">THE FINAL TEST BENCH.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative w-full h-[360px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl">
                <Image
                  src={ALKOTA_STORY_MEDIA.founderRiderDialogue.src}
                  alt="Pete Currey debriefing with rider at event"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <span className="font-mono text-xs text-alkota-slate uppercase block">HUMAN INSTINCT • PADDOCK DEBRIEF</span>
            </div>

            <div className="space-y-4">
              <div className="relative w-full h-[360px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl">
                <Image
                  src={ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src}
                  alt="Laboratory fatigue stress bench"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <span className="font-mono text-xs text-alkota-slate uppercase block">LABORATORY CALCULATION • HYDRAULIC BENCH</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4 font-sans text-sm text-alkota-snow/90 leading-relaxed font-light">
            <p className="text-xl text-alkota-white font-light leading-snug">
              Engineering gives us the language. Riding provides the answer.
            </p>
            <p>
              Alkota is deliberately built around both: calculations, CAD, materials and controlled testing on one side; weather, terrain, fatigue, instinct and the rider on the other.
            </p>
            <p className="font-mono text-xs text-alkota-signal font-bold uppercase tracking-wider pt-2">
              A MOUNTAIN BIKE ULTIMATELY HAS ONE JOB. DISAPPEAR BENEATH THE RIDER AND MAKE THE MOUNTAIN MORE INTERESTING.
            </p>
          </div>
        </div>
      </VisualWorldSection>

      {/* 6. SECTION — EXPERIENCE (Image Mosaic) */}
      <VisualWorldSection world="ENGINEERING_LAB" id="experience-mosaic">
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-8 space-y-3">
            <TechnicalAnnotation label="BEYOND THE CHASSIS" value="THE EXPERIENCE" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              MORE THAN<br />
              <span className="text-alkota-slate">THE MACHINE.</span>
            </h2>
          </div>

          {/* Image Mosaic */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mosaicImages.map((img) => (
              <div key={img.label} className="relative w-full h-[220px] sm:h-[280px] bg-alkota-black border border-white/10 overflow-hidden group shadow-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 font-mono text-[9px] bg-black/80 px-2 py-0.5 text-alkota-signal uppercase">
                  {img.label}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl space-y-4 font-sans text-sm text-alkota-snow/90 leading-relaxed font-light">
            <p className="text-lg text-alkota-white font-normal">
              The same thinking extends beyond the frame.
            </p>
            <p>
              How a rider learns about the bike. How it is configured. How specification choices are explained. How it is delivered. How it is maintained. How development continues after launch.
            </p>
            <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
              THE PRODUCT IS THE MACHINE AND THE EXPERIENCE AROUND IT.
            </p>
          </div>
        </div>
      </VisualWorldSection>

      {/* 7. FINAL — Full-bleed Naked Carbon image */}
      <section className="relative w-full min-h-[540px] sm:min-h-[640px] bg-alkota-carbon text-alkota-white flex flex-col justify-between p-8 sm:p-12 md:p-16 border-b border-white/10 tech-grid-dark overflow-hidden">
        <Image
          src={ALKOTA_STORY_MEDIA.project01NakedCarbonStudio.src}
          alt="Project 01 Naked Carbon full bleed"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 hover:scale-[1.01] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-carbon via-alkota-carbon/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-carbon via-transparent to-alkota-carbon/50" />

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto space-y-8 py-12">
          <TechnicalAnnotation label="THE DEVELOPMENT CONTINUES" variant="signal" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            THIS IS THE START.<br />
            <span className="text-alkota-signal">NOT THE FINISHED STORY.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-alkota-snow/90 max-w-xl font-light leading-relaxed">
            Project 01 is still being engineered. Follow the process from the first bike shop to the machine taking shape today.
          </p>

          <div className="pt-2">
            <Link
              href="/about/story"
              className="inline-flex items-center gap-3 px-8 py-4 bg-alkota-signal text-alkota-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-white transition-colors shadow-2xl"
            >
              <span>OUR STORY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEXT CHAPTER: OUR STORY */}
      <ChapterTransition currentSlug="about" />
    </div>
  );
}
