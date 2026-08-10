import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, ShieldCheck, Settings, Cpu, Layers } from "lucide-react";



const PHILOSOPHY_ITEMS = [
  {
    num: "01",
    title: "BEHAVIOUR BEFORE APPEARANCE.",
    subhead: "Define the experience first.",
    questions: [
      "Where should the rider sit?",
      "How should the bicycle load its tyres?",
      "How should it respond to braking?",
      "How much support should exist at sag?",
      "How should stability change with speed?",
    ],
    closing: "Form follows those answers.",
    img: ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src,
    imgAlt: "Kinematic dynamics analysis",
  },
  {
    num: "02",
    title: "THE SYSTEM BEATS THE PART.",
    subhead: "Optimise the machine.",
    bullets: [
      "The best fork cannot correct the wrong chassis.",
      "The lightest wheel is not automatically the fastest wheel.",
      "The most expensive component is not necessarily the correct component.",
    ],
    closing: "Optimise the machine.",
    img: ALKOTA_STORY_MEDIA.completeMachineIntegration.src,
    imgAlt: "Complete machine integration",
  },
  {
    num: "03",
    title: "PRECISION BEATS NOVELTY.",
    subhead: "Engineering over gimmicks.",
    copy: "Being different has no engineering value by itself. A conventional solution executed properly is better than a novel solution whose primary achievement is being novel.",
    img: ALKOTA_STORY_MEDIA.componentDevelopmentBench.src,
    imgAlt: "CNC component precision bench",
  },
  {
    num: "04",
    title: "SERVICEABILITY IS PART OF PERFORMANCE.",
    subhead: "Designed to be maintained.",
    bullets: [
      "Bearings wear.",
      "Brakes need servicing.",
      "Cables are replaced.",
      "Suspension is rebuilt.",
    ],
    closing: "A bicycle designed without considering those moments is unfinished.",
    img: ALKOTA_STORY_MEDIA.workshopChassisAssembly.src,
    imgAlt: "Workshop chassis maintenance and assembly",
  },
  {
    num: "05",
    title: "THE RIDER IS NOT A CONSTANT.",
    subhead: "Human configuration.",
    variables: ["Height", "Proportion", "Strength", "Movement", "Terrain", "Preference"],
    copy: "That is why fit cannot stop at choosing S, M, L or XL. The long-term Alkota system is being designed around meaningful rider configuration rather than cosmetic choice alone.",
    img: ALKOTA_STORY_MEDIA.founderRiderDialogue.src,
    imgAlt: "Rider fit and telemetry debrief",
  },
  {
    num: "06",
    title: "A PREMIUM PRODUCT SHOULD EXPLAIN ITSELF.",
    subhead: "Clarity over adjectives.",
    copy: "Engineering should not be hidden behind adjectives. If a geometry choice matters, explain why. If a component matters, explain why. If a feature exists, explain the problem it solves.",
    closing: "Technical understanding should increase desire — not replace it.",
    img: ALKOTA_STORY_MEDIA.chassisEngineeringReview.src,
    imgAlt: "Chassis technical review",
  },
  {
    num: "07",
    title: "EVIDENCE BEFORE LANGUAGE.",
    subhead: "Build. Test. Prove.",
    steps: ["Build it.", "Test it.", "Then name the benefit."],
    closing: "Never the other way around.",
    img: ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src,
    imgAlt: "Alpine field testing evidence",
  },
];


export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/about/philosophy",
    title: "Engineering Philosophy | Alkota",
    description: "The principles governing Alkota",
  });
}

export default function EngineeringPhilosophyPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen">
      <StoryNavigation />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Powerful bike-only image
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ALPINE_PRECISION" id="philosophy-hero">
        <div className="space-y-10">
          <div className="space-y-4">
            <TechnicalAnnotation label="CHAPTER 07" value="ENGINEERING PHILOSOPHY" variant="slate" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              DESIGN THE RIDE.<br />
              <span className="text-alkota-graphite">THEN DESIGN THE BIKE.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-black font-light leading-snug">
                Every product needs an organising idea.
              </p>
              <p className="font-mono text-sm font-bold text-alkota-black uppercase tracking-wider">
                THIS IS OURS.
              </p>
              <p className="text-sm text-alkota-slate leading-relaxed font-light pt-2">
                Seven foundational tenets governing how Alkota approaches geometry, suspension, structure, serviceability, component integration, testing and complete machine architecture.
              </p>
            </div>

            {/* Powerful bike-only image */}
            <div className="lg:col-span-7 space-y-2">
              <div className="relative w-full h-[420px] sm:h-[500px] bg-alkota-snow border border-black/10 overflow-hidden shadow-2xl">
                <Image
                  src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
                  alt="Alkota Project 01 Glacier White flagship machine"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain object-center p-6 hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="font-mono text-[10px] text-alkota-slate uppercase flex justify-between">
                <span>PROJECT 01 · GLACIER WHITE</span>
                <span>ALPINE PRECISION CHASSIS</span>
              </p>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THE 7 PHILOSOPHY PRINCIPLES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12 space-y-24">
        {PHILOSOPHY_ITEMS.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <section
              key={item.num}
              id={`philosophy-${item.num}`}
              className="py-8 border-b border-white/10 last:border-b-0 space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="font-mono text-4xl sm:text-5xl font-bold text-alkota-signal/30 leading-none tabular-nums">
                  {item.num}
                </span>
                <div className="h-px flex-1 bg-white/10" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal font-bold">
                  {item.subhead}
                </span>
              </div>

              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-2"}`}>
                  <div className="space-y-2">
                    <TechnicalAnnotation label={`PRINCIPLE ${item.num}`} variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      {item.title}
                    </h2>
                  </div>

                  {item.questions && (
                    <div className="space-y-2 font-mono text-[11px] text-alkota-signal uppercase tracking-wide border-l-2 border-alkota-signal/40 pl-4 py-1">
                      {item.questions.map((q) => (
                        <p key={q}>{q}</p>
                      ))}
                    </div>
                  )}

                  {item.bullets && (
                    <div className="space-y-2 border-l-2 border-white/20 pl-4">
                      {item.bullets.map((b) => (
                        <p key={b} className="font-sans text-sm text-alkota-snow/90 font-light">
                          • {b}
                        </p>
                      ))}
                    </div>
                  )}

                  {item.variables && (
                    <div className="grid grid-cols-3 gap-2">
                      {item.variables.map((v) => (
                        <div
                          key={v}
                          className="font-mono text-[9px] uppercase tracking-widest text-alkota-signal border border-alkota-signal/25 px-2 py-1.5 text-center bg-alkota-signal/5"
                        >
                          {v}
                        </div>
                      ))}
                    </div>
                  )}

                  {item.steps && (
                    <div className="flex items-center gap-3 font-mono text-xs text-alkota-signal font-bold uppercase">
                      {item.steps.map((s, i) => (
                        <React.Fragment key={s}>
                          <span>{s}</span>
                          {i < item.steps!.length - 1 && <span className="text-alkota-slate">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {item.copy && (
                    <p className="font-sans text-sm sm:text-base text-alkota-snow/90 font-light leading-relaxed">
                      {item.copy}
                    </p>
                  )}

                  {item.closing && (
                    <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider pt-2 border-t border-white/10">
                      {item.closing}
                    </p>
                  )}
                </div>

                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                  <div className="relative w-full h-[360px] sm:h-[420px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
                    <Image
                      src={item.img}
                      alt={item.imgAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-2 left-2 font-mono text-[9px] bg-black/80 px-2.5 py-1 text-alkota-signal uppercase border border-white/10">
                      {item.num} · {item.title}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL MANIFESTO — Full Viewport
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-screen bg-alkota-black text-alkota-white flex flex-col justify-center items-center text-center p-8 sm:p-12 border-t border-white/10 tech-grid-dark overflow-hidden">
        <Image
          src={ALKOTA_STORY_MEDIA.standaloneBlackBike.src}
          alt="Project 01 Naked Carbon manifesto backdrop"
          fill
          sizes="100vw"
          className="object-contain object-center opacity-15 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-transparent to-alkota-black/80" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-12 py-12">
          <TechnicalAnnotation label="ALKOTA MANIFESTO" value="FINAL STATEMENT" variant="signal" />

          <div className="space-y-6">
            <h2 className="font-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-alkota-white leading-[0.85]">
              PERFORMANCE IS<br />
              <span className="text-alkota-signal">ENGINEERED.</span>
            </h2>

            <div className="space-y-2 font-mono text-sm sm:text-lg text-alkota-slate uppercase tracking-widest pt-4">
              <p className="line-through text-alkota-slate/50">NOT DECORATED.</p>
              <p className="line-through text-alkota-slate/50">NOT IMPLIED BY PRICE.</p>
              <p className="line-through text-alkota-slate/50">NOT CREATED BY A LOGO.</p>
              <p className="text-alkota-white font-bold pt-2 text-xl sm:text-2xl text-alkota-signal">ENGINEERED.</p>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/bikes/project-01"
              className="inline-flex items-center gap-3 px-10 py-5 bg-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-alkota-black transition-colors shadow-2xl"
            >
              <span>EXPLORE PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ChapterTransition currentSlug="philosophy" />
    </div>
  );
}
