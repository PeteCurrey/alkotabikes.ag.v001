import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import DevelopmentLedger from "@/components/editorial/DevelopmentLedger";
import DesignArtifact from "@/components/editorial/DesignArtifact";
import { DESIGN_JOURNEY } from "@/content/media/designJourney";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Carbon & Materials | Alkota Project 01",
  description:
    "Inside Alkota's approach to carbon structure, materials, hardware and the development of the Project 01 chassis.",
  openGraph: {
    title: "Carbon & Materials | Alkota Project 01",
    description:
      "Inside Alkota's approach to carbon structure, materials, hardware and the development of the Project 01 chassis.",
    images: [ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src],
  },
};

/* ─────────────────────────────────────────────────────────
   Reusable image block
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
          sizes="(max-width: 768px) 100vw, 60vw"
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

/* ─────────────────────────────────────────────────────────
   Carbon process stage tile
───────────────────────────────────────────────────────── */
const PROCESS_STAGES = [
  { num: "01", label: "FIBRE", sub: "Raw UD & woven tow material selection" },
  { num: "02", label: "PLY", sub: "Cut shape, orientation, boundary definition" },
  { num: "03", label: "LAYUP", sub: "Sequential manual ply placement" },
  { num: "04", label: "MOULD", sub: "Internal bladder compaction tooling" },
  { num: "05", label: "CURE", sub: "Autoclave or press cure cycle" },
  { num: "06", label: "MACHINE", sub: "CNC machining of bonding faces & inserts" },
  { num: "07", label: "INSPECT", sub: "Dimensional, visual & NDT inspection" },
  { num: "08", label: "TEST", sub: "Structural and fatigue validation" },
];

/* ─────────────────────────────────────────────────────────
   Critical areas list
───────────────────────────────────────────────────────── */
const CRITICAL_AREAS = [
  "Head tube",
  "Bottom bracket",
  "Pivot locations",
  "Shock mounts",
  "Dropouts",
  "Cable ports",
  "Storage openings",
];

const CRITICAL_DEMANDS = [
  "Structure",
  "Hardware",
  "Manufacturing",
  "Serviceability",
];

export default function MaterialsPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen">
      <StoryNavigation />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="mat-hero">
        <div className="space-y-10">
          <div className="space-y-4">
            <TechnicalAnnotation label="DEVELOPMENT / 03" value="MATERIALS + CARBON" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              ENGINEER THE MATERIAL.<br />
              <span className="text-alkota-signal">NOT THE LABEL.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 font-sans">
              <p className="text-lg text-alkota-white font-light leading-snug">
                &ldquo;Carbon frame&rdquo; tells you surprisingly little.
              </p>
              <div className="space-y-3 text-sm text-alkota-snow/90 font-light leading-relaxed">
                <p>
                  Carbon fibre becomes useful only when fibre direction, laminate architecture, geometry, inserts, resin, compaction, manufacturing control and validation work together.
                </p>
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                  PROJECT 01 IS BEING DEVELOPED AROUND THAT REALITY.
                </p>
              </div>
            </div>

            {/* Carbon development imagery — hero cluster */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Img
                  src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
                  alt="Carbon fiber ply layup development"
                  label="UNIDIRECTIONAL PLY · MANUAL LAYUP · PLY ORIENTATION"
                  height="h-[280px]"
                  priority
                />
              </div>
              <Img
                src={ALKOTA_STORY_MEDIA.frameDevelopmentMould.src}
                alt="Frame development mould tooling"
                label="STEEL MOULD · BLADDER COMPACTION"
                height="h-[180px]"
              />
              <Img
                src={ALKOTA_STORY_MEDIA.chassisEngineeringReview.src}
                alt="Chassis engineering review"
                label="FEA · STRESS DISTRIBUTION"
                height="h-[180px]"
              />
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THE FIBRE FOLLOWS THE LOAD
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="fibre-load">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="MATERIAL PRINCIPLE" value="ANISOTROPIC DESIGN" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE FIBRE FOLLOWS<br />
                <span className="text-alkota-slate">THE LOAD.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
              <p className="text-base text-alkota-white font-normal">
                Carbon is anisotropic.
              </p>
              <p>
                Its strength and stiffness depend on direction.
              </p>
              <p>
                That allows a chassis to be tuned in ways isotropic materials cannot — but it also means material placed without understanding the load path can be expensive decoration.
              </p>
              <div className="border border-white/10 p-5 bg-alkota-black space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-alkota-slate">
                  THE OBJECTIVE
                </p>
                <div className="space-y-2">
                  {[
                    { neg: true,  text: "Maximum carbon" },
                    { neg: false, text: "Material in the correct place" },
                    { neg: false, text: "In the correct direction" },
                    { neg: false, text: "For the correct reason" },
                  ].map(({ neg, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <span className={`font-mono text-sm font-bold ${neg ? "text-alkota-slate line-through" : "text-alkota-signal"}`}>
                        {neg ? "✕" : "→"}
                      </span>
                      <span className={`font-mono text-[11px] uppercase tracking-wide ${neg ? "text-alkota-slate/60 line-through" : "text-alkota-white"}`}>
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Img
              src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
              alt="Carbon fibre anisotropic layup direction"
              label="PLY DIRECTION · ANISOTROPIC STIFFNESS · LAYUP SEQUENCE"
              height="h-[360px]"
            />
            {DESIGN_JOURNEY[8] && (
              <DesignArtifact asset={DESIGN_JOURNEY[8]} theme="blueprint" showCaption />
            )}
          </div>
        </div>

        <div className="pt-10 max-w-7xl mx-auto">
          <DevelopmentLedger
            question="Why monocoque front triangle construction over bonded tube-to-tube?"
            decision="High-modulus UD carbon monocoque for the main chassis."
            why="Monocoque construction eliminates heavy bonded joints at critical high-stress junctions (headtube and bottom bracket) allowing continuous fibers along primary torsional load paths."
            status="R00 ENGINEERING BASELINE"
            statusVariant="baseline"
          />
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PROCESS STAGES — Visual Chapter
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full py-20 sm:py-28 bg-alkota-black border-y border-white/10 tech-grid-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="MANUFACTURING SEQUENCE" value="8 STAGES" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                FIBRE TO<br />
                <span className="text-alkota-signal">STRUCTURE.</span>
              </h2>
            </div>
          </div>

          {/* Stage grid with central carbon image */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROCESS_STAGES.map((stage) => (
              <div
                key={stage.num}
                className="p-5 bg-alkota-carbon border border-white/10 space-y-3 hover:border-alkota-signal transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-alkota-signal font-bold">
                    {stage.num}
                  </span>
                  <div className="w-5 h-px bg-alkota-signal/30 group-hover:bg-alkota-signal transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-alkota-white group-hover:text-alkota-signal transition-colors">
                  {stage.label}
                </h3>
                <p className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate leading-relaxed">
                  {stage.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Full-width carbon image below stage grid */}
          <Img
            src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
            alt="Carbon fibre manufacturing process — layup stage"
            label="STAGE 03 · LAYUP · MANUAL PLY PLACEMENT · UNIDIRECTIONAL CARBON"
            height="h-[340px] sm:h-[420px]"
          />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FROM FLAT SHEET TO LOAD-BEARING STRUCTURE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="flat-to-structure">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <Img
              src={ALKOTA_STORY_MEDIA.frameDevelopmentMould.src}
              alt="Frame development mould tooling — ply sections"
              label="PLY STACK · MOULD TOOLING · SECTION TRANSITIONS"
              height="h-[340px]"
            />
            <Img
              src={ALKOTA_STORY_MEDIA.componentDevelopmentBench.src}
              alt="CNC machined inserts and hardware"
              label="INSERTS · CNC AL7075-T6 · BONDING FACES"
              height="h-[220px]"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="LAMINATE DEVELOPMENT" value="SECTION BY SECTION" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                FROM FLAT SHEET<br />
                TO LOAD-BEARING<br />
                <span className="text-alkota-slate">STRUCTURE.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
              <p>
                Before a frame becomes recognisable, it exists as a sequence of individual plies.
              </p>
              <p>Each section must ultimately define:</p>
              <div className="space-y-2">
                {[
                  "Fibre orientation",
                  "Material type",
                  "Ply boundary",
                  "Overlap",
                  "Local reinforcement",
                  "Insert transition",
                  "Compaction",
                  "Cure",
                  "Inspection criteria",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-alkota-signal/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10 space-y-2">
                <p>
                  The final Project 01 laminate will be determined through engineering analysis, manufacturing development and physical validation.
                </p>
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                  NOT BY A MARKETING WEIGHT TARGET.
                </p>
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THE DIFFICULT PLACES MATTER MOST
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="difficult-places">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="CRITICAL GEOMETRY" value="JUNCTION ENGINEERING" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE DIFFICULT PLACES<br />
                <span className="text-alkota-signal">MATTER MOST.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Critical area list */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                {CRITICAL_AREAS.map((area, i) => (
                  <div
                    key={area}
                    className="flex items-center gap-4 p-3 bg-alkota-black border border-white/10 group hover:border-alkota-signal transition-colors"
                  >
                    <span className="font-mono text-[9px] text-alkota-signal/50 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-alkota-white font-bold group-hover:text-alkota-signal transition-colors">
                      {area}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-sm text-alkota-snow/90 font-light leading-relaxed">
                  These are the places where structure, hardware, manufacturing and serviceability collide.
                </p>

                {/* Four demands that must all survive */}
                <div className="grid grid-cols-2 gap-2">
                  {CRITICAL_DEMANDS.map((demand) => (
                    <div
                      key={demand}
                      className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal border border-alkota-signal/25 px-3 py-2 text-center bg-alkota-signal/5"
                    >
                      {demand}
                    </div>
                  ))}
                </div>

                <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
                  THE CLEANEST VISUAL SOLUTION IS USEFUL ONLY IF IT SURVIVES ALL FOUR.
                </p>
              </div>
            </div>

            {/* Imagery */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Img
                  src={ALKOTA_STORY_MEDIA.chassisEngineeringReview.src}
                  alt="Chassis critical junction engineering review"
                  label="HEADTUBE JUNCTION · STRESS CONCENTRATION · MATERIAL TRANSITION"
                  height="h-[260px]"
                />
              </div>
              <Img
                src={ALKOTA_STORY_MEDIA.componentDevelopmentBench.src}
                alt="CNC machined hardware inserts"
                label="PIVOT HARDWARE · INSERT DESIGN"
                height="h-[200px]"
              />
              <Img
                src={ALKOTA_STORY_MEDIA.technicalCadMaterial.src}
                alt="Technical CAD section detail"
                label="CAD SECTION · WALL DEFINITION"
                height="h-[200px]"
              />
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          NAKED CARBON — full-bleed dark
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-[580px] bg-alkota-black border-y border-white/10 overflow-hidden flex flex-col justify-end">
        <Image
          src={ALKOTA_STORY_MEDIA.standaloneBlackBike.src}
          alt="Project 01 Naked Carbon"
          fill
          sizes="100vw"
          className="object-contain object-center sm:object-right opacity-60 hover:opacity-70 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-transparent to-alkota-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24 space-y-6">
          <TechnicalAnnotation label="FINISH 02" value="NAKED CARBON" variant="signal" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            NAKED CARBON.
          </h2>
          <div className="max-w-lg space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
            <p className="text-base text-alkota-white font-normal">
              Naked Carbon is more than a colour option.
            </p>
            <p>It exposes the material at the centre of the product.</p>
            <div className="space-y-1 font-mono text-[10px] uppercase tracking-widest text-alkota-signal/80">
              <p>No visual noise.</p>
              <p>No unnecessary graphics.</p>
              <p>The structure becomes the surface.</p>
            </div>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-alkota-slate border border-white/10 inline-flex px-3 py-1.5">
            RAW COMPOSITE · 3K WEAVE SURFACE · HIGH-GLOSS CLEAR
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          GLACIER WHITE — full-bleed light
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-[580px] bg-alkota-snow border-b border-black/10 overflow-hidden flex flex-col justify-end">
        <Image
          src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
          alt="Project 01 Glacier White"
          fill
          sizes="100vw"
          className="object-contain object-center sm:object-right opacity-80 hover:opacity-90 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-snow via-alkota-snow/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-snow via-transparent to-alkota-snow/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24 space-y-6">
          <TechnicalAnnotation label="FINISH 01" value="GLACIER WHITE" variant="slate" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
            GLACIER WHITE.
          </h2>
          <div className="max-w-lg space-y-4 text-sm text-alkota-slate leading-relaxed font-light">
            <p className="text-base text-alkota-black font-normal">
              Glacier White takes the same platform in the opposite visual direction.
            </p>
            <div className="space-y-1 font-mono text-[10px] uppercase tracking-widest text-alkota-graphite/80">
              <p>Architectural.</p>
              <p>Precise.</p>
              <p>Clean.</p>
            </div>
          </div>
          <div className="pt-2 border-t border-black/10 max-w-lg">
            <p className="font-mono text-xs font-bold text-alkota-black uppercase tracking-wider">
              TWO FINISHES. ONE CHASSIS PHILOSOPHY.
            </p>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-alkota-graphite border border-black/15 inline-flex px-3 py-1.5">
            ALPINE PRECISION · FULL PAINT SYSTEM · PREMIUM CLEAR
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL — Material is only proven when the machine is
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 sm:py-28 bg-alkota-black border-t border-white/10 overflow-hidden tech-grid-dark">
        <Image
          src={ALKOTA_STORY_MEDIA.laboratoryStressFatigue.src}
          alt="Laboratory stress fatigue"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-10 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-10">
          <div className="space-y-4">
            <TechnicalAnnotation label="CLOSING STATEMENT" value="MATERIALS" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              MATERIAL IS ONLY<br />
              PROVEN WHEN<br />
              <span className="text-alkota-signal">THE MACHINE IS.</span>
            </h2>
          </div>

          <p className="font-sans text-sm text-alkota-snow/80 max-w-md font-light leading-relaxed">
            Carbon, aluminium and titanium are design decisions. Their proof is in controlled testing, prototype validation and real-terrain performance.
          </p>

          <Link
            href="/about/testing"
            className="inline-flex items-center gap-3 px-8 py-4 bg-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-alkota-black transition-colors shadow-2xl"
          >
            <span>TESTING + VALIDATION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ChapterTransition currentSlug="materials" />
    </div>
  );
}
