import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, CheckCircle2, Wrench, Layers, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Build Process | Idea to Trail Hardware",
  description: "Follow the physical progression of Project 01 from rider requirement, CAD modeling, and carbon layup to prototype build, laboratory validation, and alpine trail testing.",
  openGraph: {
    title: "Build Process | Idea to Trail Hardware",
    description: "Follow the physical progression of Project 01 from rider requirement, CAD modeling, and carbon layup to prototype build, laboratory validation, and alpine trail testing.",
    images: [ALKOTA_STORY_MEDIA.workshopChassisAssembly.src],
  },
};

export default function BuildProcessPage() {
  const buildPhases = [
    {
      phase: "01",
      title: "REQUIREMENT & CAD MODELING",
      desc: "Surface modeling of monocoque front triangle, pivot hardware axis, and cable routing tunnels in 3D CAD.",
      img: ALKOTA_STORY_MEDIA.technicalCadMaterial.src,
      alt: ALKOTA_STORY_MEDIA.technicalCadMaterial.alt,
    },
    {
      phase: "02",
      title: "TOOLING & MOULD FABRICATION",
      desc: "CNC machining 5-axis hardened steel moulds for internal polyurethane bladder compaction.",
      img: ALKOTA_STORY_MEDIA.frameDevelopmentMould.src,
      alt: ALKOTA_STORY_MEDIA.frameDevelopmentMould.alt,
    },
    {
      phase: "03",
      title: "CARBON FIBER LAYUP",
      desc: "Manual ply placement of high-modulus unidirectional carbon fibers along stress vector maps.",
      img: ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src,
      alt: ALKOTA_STORY_MEDIA.carbonLayupDevelopment.alt,
    },
    {
      phase: "04",
      title: "CNC HARDWARE MACHINING",
      desc: "Precision milling AL7075-T6 alloy linkage plates and turning Grade 5 titanium pivot axles.",
      img: ALKOTA_STORY_MEDIA.componentDevelopmentBench.src,
      alt: ALKOTA_STORY_MEDIA.componentDevelopmentBench.alt,
    },
    {
      phase: "05",
      title: "CHASSIS PROTOTYPE ASSEMBLY",
      desc: "Installing Enduro MAX sealed bearings, torque-testing pivot axles, and alignment inspection.",
      img: ALKOTA_STORY_MEDIA.workshopChassisAssembly.src,
      alt: ALKOTA_STORY_MEDIA.workshopChassisAssembly.alt,
    },
    {
      phase: "06",
      title: "LABORATORY STRESS VALIDATION",
      desc: "Hydraulic multi-axis fatigue testing to verify ISO+ structural strength targets.",
      img: ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src,
      alt: ALKOTA_STORY_MEDIA.laboratoryStressFatigue.alt,
    },
    {
      phase: "07",
      title: "ALPINE TRAIL FIELD TESTING",
      desc: "Real terrain telemetry validation in Haute-Savoie at 2,400m elevation across high-speed rock runs.",
      img: ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src,
      alt: ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.alt,
    },
  ];

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen space-y-0">
      <StoryNavigation />

      {/* Hero Section — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="build-hero">
        <div className="space-y-8">
          <div className="space-y-4">
            <TechnicalAnnotation label="CHAPTER 04" value="BUILD PROCESS" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              IDEA TO HARDWARE.<br />
              <span className="text-alkota-signal">STEP BY STEP.</span>
            </h1>
            <p className="font-mono text-xs text-alkota-slate uppercase tracking-wider font-semibold">
              REQUIREMENT → CAD → TOOLING → LAYUP → HARDWARE → BENCH TEST → TRAIL
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-6 space-y-6 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-white font-light leading-snug">
                Building a mountain bike capable of enduring high-velocity alpine terrain requires rigorous step-by-step physical execution.
              </p>
              <p className="text-sm text-alkota-snow/80 font-light leading-relaxed">
                From initial 3D surface modeling and CNC steel mould fabrication to carbon ply placement, hydraulic fatigue testing, and high-altitude trail telemetry, every phase follows a strict engineering protocol.
              </p>
            </div>

            <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.workshopChassisAssembly.src}
                alt={ALKOTA_STORY_MEDIA.workshopChassisAssembly.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal border border-white/10 uppercase">
                REV 001 PROTOTYPE ASSEMBLY
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* 7 Build Phases Sequence — WORLD 02 ENGINEERING LAB */}
      <VisualWorldSection world="ENGINEERING_LAB" id="build-phases">
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="PHYSICAL PROGRESSION" value="7 DEVELOPMENT PHASES" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE HARDWARE<br />
                <span className="text-alkota-slate">JOURNEY.</span>
              </h2>
            </div>
          </div>

          <div className="space-y-12">
            {buildPhases.map((phase) => (
              <div
                key={phase.phase}
                className="bg-alkota-black border border-white/10 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-alkota-signal transition-all group shadow-xl"
              >
                <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[380px] bg-alkota-carbon overflow-hidden border border-white/10">
                  <Image
                    src={phase.img}
                    alt={phase.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 font-mono text-xs font-bold bg-alkota-signal text-alkota-black px-3 py-1 uppercase">
                    PHASE {phase.phase}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 font-sans">
                  <span className="font-mono text-xs text-alkota-signal uppercase font-bold tracking-wider">
                    DEVELOPMENT STEP {phase.phase}
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-alkota-white">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-alkota-snow/80 leading-relaxed font-light">
                    {phase.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-2 font-mono text-[10px] text-alkota-slate uppercase">
                    <CheckCircle2 className="w-4 h-4 text-alkota-signal" />
                    <span>ENGINEERING PROTOCOL APPROVED</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </VisualWorldSection>

      <ChapterTransition currentSlug="build-process" />
    </div>
  );
}
