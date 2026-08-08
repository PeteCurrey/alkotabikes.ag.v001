import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import FounderNote from "@/components/editorial/FounderNote";
import DevelopmentLedger from "@/components/editorial/DevelopmentLedger";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Testing & Validation | Alkota Performance Engineering",
  description:
    "How Alkota turns engineering targets into evidence through structural validation, prototype inspection and real-terrain testing.",
  openGraph: {
    title: "Testing & Validation | Alkota Performance Engineering",
    description:
      "How Alkota turns engineering targets into evidence through structural validation, prototype inspection and real-terrain testing.",
    images: [ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src],
  },
};

/* ─────────────────────────────────────────────────────────
   Validation Matrix Cards Data
───────────────────────────────────────────────────────── */
const VALIDATION_CARDS = [
  {
    num: "01",
    label: "DIMENSIONAL",
    copy: "Does the physical product match the controlled design?",
    world: "LABORATORY",
  },
  {
    num: "02",
    label: "ASSEMBLY",
    copy: "Can it be assembled correctly and repeatedly?",
    world: "WORKSHOP",
  },
  {
    num: "03",
    label: "CLEARANCE",
    copy: "Does every moving system remain clear through travel, tolerance and flex?",
    world: "CAD & BENCH",
  },
  {
    num: "04",
    label: "STRUCTURAL",
    copy: "Does the chassis sustain its required loads and cycles?",
    world: "ISO+ HYDRAULIC",
  },
  {
    num: "05",
    label: "FUNCTIONAL",
    copy: "Do suspension, drivetrain, braking and controls behave as intended?",
    world: "PROTOTYPE",
  },
  {
    num: "06",
    label: "ENVIRONMENTAL",
    copy: "What happens with water, mud, contamination and temperature?",
    world: "FIELD CHAMBER",
  },
  {
    num: "07",
    label: "SERVICE",
    copy: "Can real mechanics access and maintain the machine?",
    world: "WORKSHOP",
  },
  {
    num: "08",
    label: "RIDE",
    copy: "Does the behaviour on terrain match the engineering intent?",
    world: "HAUTE-SAVOIE",
  },
];

/* ─────────────────────────────────────────────────────────
   Development Loop Steps
───────────────────────────────────────────────────────── */
const LOOP_STEPS = [
  { step: "SIMULATE", desc: "CAD, FEA & Kinematic Modelling" },
  { step: "BUILD", desc: "Physical Prototype Assembly" },
  { step: "MEASURE", desc: "Hydraulic Bench & Telemetry" },
  { step: "RIDE", desc: "Alpine Field Testing at 2,400m" },
  { step: "LEARN", desc: "Data & Feedback Synthesis" },
  { step: "CHANGE", desc: "Chassis & Spec Refinement" },
];

export default function TestingPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen">
      <StoryNavigation />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Dark lab -> mountain transition
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="testing-hero">
        <div className="space-y-10">
          <div className="space-y-4">
            <TechnicalAnnotation label="DEVELOPMENT / 04" value="VALIDATION & TESTING" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              THE BIKE HAS<br />
              <span className="text-alkota-signal">THE FINAL WORD.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5 font-sans">
              <p className="text-lg text-alkota-white font-light leading-relaxed">
                A simulation can support an engineering decision.
              </p>
              <p className="text-lg text-alkota-white font-light leading-relaxed">
                A render can communicate it.
              </p>
              <p className="font-mono text-sm font-bold text-alkota-signal uppercase tracking-wider">
                NEITHER PROVES THE BICYCLE.
              </p>
              <p className="text-sm text-alkota-snow/85 font-light leading-relaxed pt-2">
                Validation exists to discover where the model and reality disagree.
              </p>
            </div>

            {/* Dark lab -> mountain transition image pair */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative w-full h-[320px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl space-y-2">
                <Image
                  src={ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src}
                  alt="Laboratory hydraulic fatigue bench"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 font-mono text-[9px] bg-black/80 px-2 py-1 text-alkota-signal uppercase border border-white/10">
                  LABORATORY · HYDRAULIC BENCH
                </div>
              </div>

              <div className="relative w-full h-[320px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl space-y-2">
                <Image
                  src={ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src}
                  alt="Haute-Savoie alpine field testing"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 font-mono text-[9px] bg-black/80 px-2 py-1 text-alkota-signal uppercase border border-white/10">
                  REAL TERRAIN · HAUTE-SAVOIE 2,400M
                </div>
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TESTING HAS VETO POWER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="veto-power">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="OPERATING RULE" value="TESTING AUTHORITY" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                TESTING HAS<br />
                <span className="text-alkota-signal">VETO POWER.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
              <p className="text-base text-alkota-white font-normal">
                Development targets are hypotheses.
              </p>
              <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                TESTING DECIDES WHETHER THEY SURVIVE.
              </p>
              <p>
                When a component, structure or setup fails to behave as expected, the correct response is not to defend the original design.
              </p>
              <div className="p-4 bg-alkota-black border border-alkota-signal/40 font-mono text-xs font-bold text-alkota-white uppercase tracking-widest text-center">
                CHANGE IT.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full h-[400px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
            <Image
              src={ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.src}
              alt="High-frequency telemetry logging during test runs"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1 text-alkota-signal uppercase border border-white/10">
              TELEMETRY DATA DE-BRIEF
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VALIDATION MATRIX
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 bg-alkota-black border-y border-white/10 tech-grid-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="EVIDENCE CRITERIA" value="8-POINT MATRIX" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                VALIDATION<br />
                <span className="text-alkota-signal">MATRIX.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALIDATION_CARDS.map((card) => (
              <div
                key={card.num}
                className="p-6 bg-alkota-carbon border border-white/10 space-y-4 hover:border-alkota-signal transition-all group shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-alkota-signal font-bold">
                    <span>{card.num}</span>
                    <span className="text-[9px] text-alkota-slate uppercase tracking-wider">{card.world}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-alkota-white group-hover:text-alkota-signal transition-colors">
                    {card.label}
                  </h3>
                  <p className="font-sans text-xs text-alkota-snow/80 leading-relaxed font-light">
                    {card.copy}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center gap-2 font-mono text-[9px] text-alkota-slate uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-alkota-signal" />
                  <span>VALIDATION TARGET</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION — LAB
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="lab-testing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="BENCH TESTING" value="ISOLATED VARIABLES" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                CONTROL WHAT CAN<br />
                <span className="text-alkota-slate">BE CONTROLLED.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
              <p className="text-base text-alkota-white font-normal">
                Fixtures, measurement and repeatable loads allow individual variables to be isolated.
              </p>
              <p>
                The purpose of laboratory testing is not to create impressive photographs.
              </p>
              <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                IT IS TO MAKE FAILURE MEASURABLE.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative w-full h-[360px] bg-alkota-black border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src}
                alt="Laboratory stress and fatigue bench testing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <p className="font-mono text-[10px] text-alkota-slate uppercase">
              ISO+ MULTI-AXIS PNEUMATIC HYDRAULIC BENCH TEST RIG
            </p>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION — TERRAIN (Huge mountain/event photography)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="terrain-testing">
        <div className="space-y-12">
          <div className="space-y-3 border-b border-white/10 pb-8">
            <TechnicalAnnotation label="FIELD VALIDATION" value="HAUTE-SAVOIE" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              THEN REMOVE<br />
              <span className="text-alkota-signal">THE CONTROL.</span>
            </h2>
          </div>

          <div className="relative w-full h-[460px] sm:h-[560px] bg-alkota-carbon border border-white/10 overflow-hidden shadow-2xl">
            <Image
              src={ALKOTA_STORY_MEDIA.alpineTrailTestingAction.src}
              alt="High-speed alpine singletrack trail validation in Haute-Savoie"
              fill
              sizes="100vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] bg-black/80 px-3 py-1.5 text-alkota-signal uppercase border border-white/10">
              HAUTE-SAVOIE ALPINE DESCENT · 2,400M ELEVATION · LOOSE ROCK TRAIL
            </div>
          </div>

          <div className="max-w-3xl space-y-4 font-sans text-sm text-alkota-snow/90 leading-relaxed font-light">
            <p className="text-xl text-alkota-white font-light leading-snug">
              Rock does not care about a finite-element model.
            </p>
            <p>Roots do not arrive at the same angle twice.</p>
            <div className="border-l-2 border-alkota-signal/50 pl-4 space-y-1 font-mono text-[11px] uppercase tracking-wide text-alkota-signal">
              <p>Braking points move.</p>
              <p>Grip changes.</p>
              <p>The rider gets tired.</p>
            </div>
            <p>
              Real terrain brings the uncontrolled variables back into the system.
            </p>
            <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
              THAT IS WHY IT REMAINS ESSENTIAL.
            </p>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION — NO FAKE NUMBERS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 bg-alkota-black border-y border-white/10 tech-grid-dark">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
          <TechnicalAnnotation label="TRANSPARENCY POLICY" value="DATA INTEGRITY" variant="signal" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            WE WILL PUBLISH EVIDENCE<br />
            <span className="text-alkota-signal">WHEN IT EXISTS.</span>
          </h2>
          <div className="space-y-4 font-sans text-sm sm:text-base text-alkota-snow/85 font-light leading-relaxed max-w-2xl mx-auto">
            <p>
              Alkota will not invent thousands of test kilometres, laboratory hours or race results because they look good underneath a photograph.
            </p>
            <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
              PROJECT 01 IS IN DEVELOPMENT.
            </p>
            <p>
              As validation progresses, meaningful evidence can be published here. Until then, development targets will remain clearly labelled as development targets.
            </p>
          </div>
          <div className="inline-flex font-mono text-[10px] uppercase tracking-widest text-alkota-signal border border-alkota-signal/40 px-4 py-2 bg-alkota-signal/5">
            DEVELOPMENT INTENT · SUBJECT TO PHYSICAL VALIDATION
          </div>

          <div className="pt-8 text-left max-w-2xl mx-auto space-y-8">
            <FounderNote note="04" />
            <DevelopmentLedger
              question="What is Alkota's policy on performance claims during pre-production?"
              decision="No fake numbers, invented lab hours or assumed race results."
              why="Engineering targets remain clearly labeled as engineering targets until physical prototype testing converts them into verified evidence."
              status="PLANNED VALIDATION"
              statusVariant="planned"
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION — LOOP
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="development-loop">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="DEVELOPMENT METHODOLOGY" value="ITERATIVE LOOP" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE DEVELOPMENT<br />
                <span className="text-alkota-slate">LOOP.</span>
              </h2>
            </div>
          </div>

          {/* Graphical loop steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LOOP_STEPS.map((item, i) => (
              <div
                key={item.step}
                className="p-5 bg-alkota-black border border-white/10 space-y-3 hover:border-alkota-signal transition-colors group relative"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-alkota-signal font-bold">
                  <span>0{i + 1}</span>
                  {i < LOOP_STEPS.length - 1 ? (
                    <span className="text-alkota-slate">→</span>
                  ) : (
                    <RefreshCw className="w-3 h-3 text-alkota-signal animate-spin-slow" />
                  )}
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-alkota-white group-hover:text-alkota-signal transition-colors">
                  {item.step}
                </h3>
                <p className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL — Performance is not claimed. It is earned.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 sm:py-28 bg-alkota-black border-t border-white/10 overflow-hidden tech-grid-dark">
        <Image
          src={ALKOTA_STORY_MEDIA.prototypeBuildValidation.src}
          alt="Prototype validation pass"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-8">
          <TechnicalAnnotation label="NEXT CHAPTER" value="PHILOSOPHY" variant="signal" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            PERFORMANCE IS NOT CLAIMED.<br />
            <span className="text-alkota-signal">IT IS EARNED.</span>
          </h2>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-md font-light leading-relaxed">
            The principles governing Alkota&apos;s approach to geometry, suspension, serviceability, components, testing and complete-bike design.
          </p>
          <Link
            href="/about/philosophy"
            className="inline-flex items-center gap-3 px-8 py-4 bg-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-alkota-black transition-colors shadow-2xl"
          >
            <span>ENGINEERING PHILOSOPHY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ChapterTransition currentSlug="testing" />
    </div>
  );
}
