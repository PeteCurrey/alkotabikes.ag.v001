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
import RoadToProduction from "@/components/editorial/RoadToProduction";
import DevelopmentLedger from "@/components/editorial/DevelopmentLedger";
import DesignArtifact from "@/components/editorial/DesignArtifact";
import { DESIGN_JOURNEY } from "@/content/media/designJourney";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight } from "lucide-react";
import ProcessNav from "./ProcessNav";



/* ─────────────────────────────────────────────────────────
   Reusable helpers
───────────────────────────────────────────────────────── */
function Img({
  src,
  alt,
  label,
  height = "h-[380px]",
  contain = false,
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  height?: string;
  contain?: boolean;
  priority?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div
        className={`relative w-full ${height} overflow-hidden border border-white/10 shadow-2xl bg-alkota-carbon`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 55vw"
          className={`${contain ? "object-contain p-4" : "object-cover object-center"} hover:scale-[1.02] transition-transform duration-700`}
        />
      </div>
      {label && (
        <p className="font-mono text-[10px] uppercase tracking-wider text-alkota-slate">
          {label}
        </p>
      )}
    </div>
  );
}

function StepLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-5xl sm:text-6xl font-bold text-alkota-signal/20 leading-none tabular-nums">
        {num}
      </span>
      <div className="flex-1 h-px bg-white/10" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal font-bold">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Geometry spec cards
───────────────────────────────────────────────────────── */
const GEO_SPECS = [
  { label: "Reach", value: "485 mm" },
  { label: "Stack", value: "640.7 mm" },
  { label: "Head angle", value: "63.8°" },
  { label: "Effective seat angle", value: "78.1°" },
  { label: "Rear centre", value: "444 mm" },
  { label: "Wheelbase", value: "1278.4 mm" },
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
    path: "/about/build-process",
    title: "The Build Process | From Requirement to Alkota Project 01",
    description: "Follow the Alkota development process from rider requirement and geometry through carbon engineering, component integration, prototype assembly and validation.",
  });
}

export default function BuildProcessPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen">
      <StoryNavigation />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="bp-hero">
        <div className="space-y-12">
          <div className="space-y-4">
            <TechnicalAnnotation label="DEVELOPMENT / 02" value="BUILD PROCESS" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              WHERE IDEAS<br />
              <span className="text-alkota-signal">BECOME HARDWARE.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5 font-sans">
              <p className="text-base text-alkota-white font-light leading-relaxed">
                A good bicycle does not appear fully formed from a CAD screen.
              </p>
              <p className="text-base text-alkota-white font-light leading-relaxed">
                It moves through decisions.
              </p>
              <div className="space-y-2 font-mono text-[11px] uppercase tracking-widest text-alkota-signal">
                {[
                  "Requirements become geometry.",
                  "Geometry creates packaging.",
                  "Packaging becomes structure.",
                  "Structure becomes tooling.",
                  "Components become a system.",
                  "A prototype becomes evidence.",
                ].map((line) => (
                  <div key={line} className="border-l-2 border-alkota-signal/50 pl-3 py-0.5">
                    {line}
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs font-bold text-alkota-slate uppercase tracking-wider pt-2">
                THEN THE PROCESS STARTS AGAIN.
              </p>
            </div>

            {/* Image sequence: drawing → carbon → frame → bike */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Img
                  src={ALKOTA_STORY_MEDIA.technicalCadMaterial.src}
                  alt="Technical CAD drawing — first step"
                  label="STEP 01 · CAD · CONCEPT GEOMETRY"
                  height="h-[200px]"
                  priority
                />
              </div>
              <Img
                src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
                alt="Carbon fiber layup"
                label="STEP 06 · CARBON"
                height="h-[160px]"
              />
              <Img
                src={ALKOTA_STORY_MEDIA.frameDevelopmentMould.src}
                alt="Frame development mould"
                label="STEP 07 · FRAME"
                height="h-[160px]"
              />
              <div className="col-span-2">
                <Img
                  src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
                  alt="Complete Project 01 machine"
                  label="RESULT · PROJECT 01 · GLACIER WHITE"
                  height="h-[180px]"
                  contain
                />
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PROCESS SPINE + CONTENT
          Left: sticky ProcessNav  |  Right: step sections
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-0">
        <div className="relative flex gap-12 xl:gap-16 items-start">

          {/* Sticky process nav — desktop only */}
          <div className="hidden xl:block w-52 shrink-0 sticky top-28 self-start py-8">
            <div className="font-mono text-[9px] uppercase tracking-widest text-alkota-slate mb-4 px-4">
              DEVELOPMENT SEQUENCE
            </div>
            <ProcessNav />
          </div>

          {/* Step sections */}
          <div className="flex-1 min-w-0 space-y-0">

            {/* ── 01 DEFINE THE RIDE ─────────────────────── */}
            <section id="step-01" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="01" label="DEFINE THE RIDE" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="REQUIREMENT PHASE" value="BEHAVIOUR BRIEF" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      BEHAVIOUR BEFORE<br />
                      <span className="text-alkota-slate">DIMENSIONS.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p className="text-base text-alkota-white font-normal">
                      Before deciding where a pivot goes, define what the bicycle is supposed to do.
                    </p>
                    <p>For Project 01 the intent is clear:</p>
                    <div className="space-y-1.5 pl-4 border-l-2 border-alkota-signal/50 font-mono text-[10px] uppercase tracking-widest text-alkota-signal">
                      {[
                        "Climb properly,",
                        "Move efficiently across real terrain,",
                        "Remain supported through repeated impacts,",
                        "Carry speed with confidence,",
                        "Retain enough agility to change direction naturally.",
                      ].map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>

                    {/* Design Artifact insert */}
                    <div className="pt-4 space-y-2">
                      {DESIGN_JOURNEY[0] && (
                        <DesignArtifact asset={DESIGN_JOURNEY[0]} theme="blueprint" showCaption />
                      )}
                      <Link
                        href="/project-01/design-archive/alk-sketch-001"
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] text-alkota-signal hover:text-white uppercase font-bold transition-colors"
                      >
                        <span>VIEW ORIGINAL DEVELOPMENT ARTIFACT</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    
                    <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
                      THAT BEHAVIOURAL BRIEF BECOMES THE FILTER FOR EVERYTHING THAT FOLLOWS.
                    </p>
                  </div>
                </div>
                <Img
                  src={ALKOTA_STORY_MEDIA.founderRiderDialogue.src}
                  alt="Founder rider dialogue — defining the ride"
                  label="REQUIREMENT DEFINITION · RIDER DEBRIEF"
                  height="h-[380px]"
                />
              </div>
            </section>

            {/* ── 02 CLOSE THE GEOMETRY ───────────────────── */}
            <section id="step-02" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="02" label="CLOSE THE GEOMETRY" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <Img
                  src={ALKOTA_STORY_MEDIA.technicalCadMaterial.src}
                  alt="Technical CAD geometry baseline"
                  label="LARGE MASTER · R00 · PRE-PRODUCTION ENGINEERING"
                  height="h-[360px]"
                />
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="GEOMETRY PHASE" value="LARGE / R00" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      MAKE THE NUMBERS<br />
                      <span className="text-alkota-slate">AGREE.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p className="text-base text-alkota-white font-normal">
                      Geometry is a connected calculation.
                    </p>
                    <p>
                      Wheel radius, fork length, offset, head angle, bottom-bracket position, reach and stack cannot be selected independently and simply expected to work.
                    </p>
                    <p>
                      Project 01&apos;s R00 programme therefore closes one master Large bicycle first. Once the physical model agrees with itself, scaling can begin.
                    </p>
                  </div>

                  {/* R00 Geometry Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {GEO_SPECS.map(({ label, value }) => (
                      <div key={label} className="p-3 bg-alkota-black border border-white/10 space-y-1">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-alkota-slate">
                          {label}
                        </div>
                        <div className="font-mono text-lg font-bold text-alkota-signal tabular-nums">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-alkota-slate border-l-2 border-alkota-signal/30 pl-3">
                    R00 development controls. Subject to prototype validation.
                  </div>
                </div>
              </div>
            </section>

            {/* ── 03 SOLVE THE SUSPENSION ─────────────────── */}
            <section id="step-03" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="03" label="SOLVE THE SUSPENSION" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="KINEMATIC PHASE" value="REAR SUSPENSION" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      150 MM IS A DISTANCE.<br />
                      <span className="text-alkota-signal">NOT A RIDE CHARACTER.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p>Rear travel tells us how far the wheel can move.</p>
                    <p>It does not tell us how the bicycle will behave while it gets there.</p>
                    <p>That requires:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Leverage progression",
                        "Axle path",
                        "Anti-squat",
                        "Anti-rise",
                        "Chain growth",
                        "Shock behaviour",
                        "Braking interaction",
                        "Clearance",
                      ].map((item) => (
                        <div
                          key={item}
                          className="font-mono text-[9px] uppercase tracking-widest text-alkota-signal border-l border-alkota-signal/40 pl-2 py-0.5"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <p>
                      Project 01 currently uses a low-pivot four-bar / Horst-style architecture as the preferred development family.
                    </p>
                    <p className="font-mono text-[10px] uppercase text-alkota-slate tracking-wider">
                      The hard points remain an engineering optimisation problem until the required curves and physical clearances are validated.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Img
                    src={ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src}
                    alt="Kinematic dynamics analysis"
                    label="KINEMATICS · LEVERAGE CURVES · AXLE PATH"
                    height="h-[280px]"
                  />
                  <Img
                    src={ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.src}
                    alt="Suspension telemetry trace"
                    label="SUSPENSION TELEMETRY · SHOCK VELOCITY · DISPLACEMENT"
                    height="h-[200px]"
                  />
                </div>
              </div>
            </section>

            {/* ── 04 PACKAGE THE MACHINE ──────────────────── */}
            <section id="step-04" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="04" label="PACKAGE THE MACHINE" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Img
                  src={ALKOTA_STORY_MEDIA.chassisEngineeringReview.src}
                  alt="Chassis packaging review"
                  label="PACKAGING REVIEW · COMPETING VOLUMES · CLEARANCES"
                  height="h-[400px]"
                />
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="PACKAGING PHASE" value="VOLUME MANAGEMENT" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      EVERY MILLIMETRE<br />
                      <span className="text-alkota-slate">HAS A JOB.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p>A mountain bike is an exercise in competing volumes.</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Tyre", "Chainring", "Crank",
                        "Shock", "Bottle", "Storage",
                        "Seatpost", "Bearings", "Brake rotor",
                        "Cable paths", "Mud", "Tools",
                      ].map((item) => (
                        <div
                          key={item}
                          className="font-mono text-[9px] uppercase tracking-wide text-alkota-signal border border-alkota-signal/20 px-2 py-1.5 text-center bg-alkota-signal/5"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider pt-2">
                      THEY ALL NEED SPACE.
                    </p>
                    <p className="text-sm text-alkota-snow/85">
                      Packaging work protects real clearances before carbon surfaces are frozen.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 05 ENGINEER THE STRUCTURE ───────────────── */}
            <section
              id="step-05"
              className="py-16 sm:py-24 border-b border-white/10 relative overflow-hidden"
            >
              {/* atmospheric ghost image */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src={ALKOTA_STORY_MEDIA.standaloneBlackBike.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain object-right opacity-[0.06]"
                />
              </div>
              <div className="relative z-10">
                <StepLabel num="05" label="ENGINEER THE STRUCTURE" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <TechnicalAnnotation label="STRUCTURAL PHASE" value="LOAD PATH ANALYSIS" variant="signal" />
                      <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                        SHAPE FOLLOWS<br />
                        <span className="text-alkota-signal">LOAD.</span>
                      </h2>
                    </div>
                    <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                      <p>The visible frame is only the surface.</p>
                      <p>
                        Below it sit the paths through which braking, pedalling, suspension and impact loads move between the rider and wheels.
                      </p>
                      <p>Those load paths decide where material belongs.</p>
                      <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                        INDUSTRIAL DESIGN MUST WORK WITH THEM — NOT CONCEAL THEM.
                      </p>
                    </div>
                  </div>
                  <Img
                    src={ALKOTA_STORY_MEDIA.chassisEngineeringReview.src}
                    alt="Structural load path engineering — FEA"
                    label="FEA · LOAD PATH MAPPING · HEADTUBE JUNCTION"
                    height="h-[360px]"
                  />
                </div>
              </div>
            </section>

            {/* ── 06 DEVELOP THE CARBON ───────────────────── */}
            <section id="step-06" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="06" label="DEVELOP THE CARBON" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="COMPOSITE PHASE" value="LAMINATE DEVELOPMENT" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      CARBON IS NOT A MATERIAL.<br />
                      <span className="text-alkota-slate">IT IS A PROCESS.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p>A carbon chassis is not defined by saying &quot;carbon fibre&quot;.</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {[
                        "Fibre orientation", "Ply type",
                        "Cut shape", "Overlap",
                        "Compaction", "Resin",
                        "Mould pressure", "Cure cycle",
                        "Insert design", "Wall transition",
                        "Quality control",
                      ].map((item) => (
                        <div
                          key={item}
                          className="font-mono text-[9px] uppercase tracking-widest text-alkota-signal border-l border-alkota-signal/40 pl-2 py-0.5"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
                      THE LAMINATE IS THE STRUCTURE.
                    </p>
                    <p>
                      Project 01&apos;s final layup will therefore be developed alongside structural analysis, physical coupons, prototype testing and manufacturing process input.
                    </p>
                  </div>
                  <Link
                    href="/about/materials"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-alkota-signal/40 text-alkota-signal font-mono text-xs font-bold uppercase hover:bg-alkota-signal hover:text-alkota-black transition-colors"
                  >
                    <span>EXPLORE MATERIALS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="space-y-4">
                  <Img
                    src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
                    alt="Carbon fiber ply layup development"
                    label="UNIDIRECTIONAL PLY · LAYUP ORIENTATION · COMPACTION"
                    height="h-[300px]"
                  />
                  <Img
                    src={ALKOTA_STORY_MEDIA.frameDevelopmentMould.src}
                    alt="Frame development mould tooling"
                    label="STEEL MOULD · BLADDER COMPACTION · CURE CYCLE"
                    height="h-[220px]"
                  />
                </div>
              </div>
            </section>

            {/* ── 07 BUILD THE PROTOTYPE ──────────────────── */}
            <section id="step-07" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="07" label="BUILD THE PROTOTYPE" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Img
                  src={ALKOTA_STORY_MEDIA.prototypeBuildValidation.src}
                  alt="Prototype build validation pass"
                  label="REV 001 · PROTOTYPE BUILD · VALIDATION PASS"
                  height="h-[440px]"
                />
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="PROTOTYPE PHASE" value="REV 001" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      THE FIRST<br />
                      <span className="text-alkota-signal">REAL ANSWERS.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p>The prototype is where assumptions acquire weight.</p>
                    <div className="space-y-1.5">
                      {[
                        "Parts have to fit.",
                        "Tools need access.",
                        "Cables need routes.",
                        "Tyres need clearance.",
                        "Bearings need alignment.",
                        "The shock must move through complete travel.",
                        "The rider needs room to move.",
                      ].map((line) => (
                        <div
                          key={line}
                          className="font-mono text-[10px] uppercase tracking-wider text-alkota-signal border-l-2 border-alkota-signal/40 pl-3 py-0.5"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                    <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
                      A PROTOTYPE THAT EXPOSES A PROBLEM IS DOING ITS JOB.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 08 ASSEMBLE THE SYSTEM ──────────────────── */}
            <section id="step-08" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="08" label="ASSEMBLE THE SYSTEM" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="COMPONENT PHASE" value="SYSTEM BUILD" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      SPECIFICATION IS<br />
                      <span className="text-alkota-slate">ENGINEERING.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p>
                      Project 01&apos;s component package is not intended to be a shopping list of premium logos.
                    </p>
                    <p>Each component is selected against the behaviour and packaging of the platform.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Fork", "Shock", "Brakes", "Wheels",
                        "Tyres", "Drivetrain", "Cockpit", "Contact points",
                      ].map((item) => (
                        <div
                          key={item}
                          className="font-mono text-[10px] uppercase tracking-widest text-alkota-white border border-white/10 px-3 py-2 bg-white/3"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <p>The question is always the same:</p>
                    <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                      DOES THIS MAKE THE COMPLETE BICYCLE BETTER?
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Img
                    src={ALKOTA_STORY_MEDIA.workshopChassisAssembly.src}
                    alt="System assembly in workshop"
                    label="SYSTEM ASSEMBLY · COMPONENT INTEGRATION"
                    height="h-[300px]"
                  />
                  <Img
                    src={ALKOTA_STORY_MEDIA.componentDevelopmentBench.src}
                    alt="Component development bench"
                    label="CNC AL7075-T6 · TITANIUM HARDWARE · COMPONENT BENCH"
                    height="h-[200px]"
                  />
                </div>
              </div>
            </section>

            {/* ── 09 VALIDATE ─────────────────────────────── */}
            <section id="step-09" className="py-16 sm:py-24 border-b border-white/10">
              <StepLabel num="09" label="VALIDATE" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <Img
                    src={ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src}
                    alt="Laboratory fatigue and stress bench"
                    label="ISO+ HYDRAULIC BENCH · MULTI-AXIS FATIGUE"
                    height="h-[320px]"
                  />
                  <Img
                    src={ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src}
                    alt="Haute-Savoie alpine field validation"
                    label="ALPINE ENVIRONMENT · PLANNED FIELD VALIDATION TERRAIN"
                    height="h-[220px]"
                  />
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <TechnicalAnnotation label="VALIDATION PHASE" value="EVIDENCE GENERATION" variant="signal" />
                    <h2 className="font-display font-medium text-3xl sm:text-4xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                      <span className="text-alkota-signal">PROVE IT.</span>
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
                    <p>Analysis reduces uncertainty.</p>
                    <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
                      TESTING FINDS WHAT ANALYSIS MISSED.
                    </p>
                    <p>
                      Structural validation, component clearances, fatigue behaviour, assembly inspection and real-terrain testing progressively turn development targets into evidence.
                    </p>
                    <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                      UNTIL THEN, THEY REMAIN TARGETS.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 10 ITERATE ──────────────────────────────── */}
            <section id="step-10" className="py-16 sm:py-24">
              <StepLabel num="10" label="ITERATE" />
              <div className="space-y-12">
                <Img
                  src={ALKOTA_STORY_MEDIA.prototypeBuildValidation.src}
                  alt="Project 01 prototype build validation — iterate"
                  label="PROJECT 01 · PROTOTYPE BUILD VALIDATION · DEVELOPMENT CONTINUES"
                  height="h-[440px] sm:h-[520px]"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <TechnicalAnnotation label="DEVELOPMENT PHILOSOPHY" value="CONTINUOUS IMPROVEMENT" variant="signal" />
                      <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                        DESIGN.<br />
                        BUILD.<br />
                        RIDE.<br />
                        CHANGE.<br />
                        <span className="text-alkota-signal">REPEAT.</span>
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-5 font-sans pt-4">
                    <p className="text-base text-alkota-white font-light leading-relaxed">
                      Development is not a straight line.
                    </p>
                    <p className="text-sm text-alkota-snow/90 font-light leading-relaxed">
                      The objective is not to defend the first idea.
                    </p>
                    <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                      IT IS TO ARRIVE AT THE BETTER MACHINE.
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <DevelopmentLedger
                    question="How does prototype iteration work on Project 01?"
                    decision="Controlled revision cycles with clear engineering metrics for every change."
                    why="A change is only accepted if it improves measurable telemetry or verified rider confidence without compromising structural margins."
                    status="CURRENT PROGRAMME"
                    statusVariant="baseline"
                  />
                </div>
              </div>
            </section>

            {/* Road to production timeline section */}
            <section className="py-16 border-t border-white/10">
              <RoadToProduction />
            </section>

          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 sm:py-28 bg-alkota-black border-t border-white/10 overflow-hidden tech-grid-dark">
        <Image
          src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
          alt="Carbon fibre background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-10 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-8">
          <TechnicalAnnotation label="NEXT CHAPTER" value="MATERIALS" variant="signal" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            MATERIALS +<br />
            <span className="text-alkota-signal">CARBON.</span>
          </h2>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-md font-light leading-relaxed">
            The fibre, resin, aluminium and titanium choices behind Project 01 — and why each material earns its place in the system.
          </p>
          <Link
            href="/about/materials"
            className="inline-flex items-center gap-3 px-8 py-4 bg-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-alkota-black transition-colors shadow-2xl"
          >
            <span>MATERIALS + CARBON</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ChapterTransition currentSlug="build-process" />
    </div>
  );
}
