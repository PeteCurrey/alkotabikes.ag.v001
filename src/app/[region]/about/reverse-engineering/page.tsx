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
import FounderNote from "@/components/editorial/FounderNote";
import DevelopmentLedger from "@/components/editorial/DevelopmentLedger";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight } from "lucide-react";
import SystemExplorer from "./SystemExplorer";



/* ─────────────────────────────────────────────────────────
   Reusable image block
───────────────────────────────────────────────────────── */
function StoryImg({
  src,
  alt,
  label,
  height = "h-[380px]",
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  height?: string;
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
          className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
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

const KEEP_LIST = [
  "Serviceable routing",
  "Threaded interfaces where appropriate",
  "Proven standards",
  "Real tool access",
  "Component compatibility",
  "Predictable maintenance",
  "Purposeful geometry",
];

const QUESTION_LIST = [
  "Hidden complexity",
  "Fashion-led interfaces",
  "Unnecessary proprietary parts",
  "Design decisions made for catalogue headlines",
  "Features that compromise primary structure",
  "Performance claims without evidence",
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
    path: "/about/reverse-engineering",
    title: "Reverse Engineering the Ride | Alkota Project 01",
    description: "How Alkota studies complete mountain-bike systems, questions assumptions and converts rider behaviour into Project 01 engineering requirements.",
  });
}

export default function ReverseEngineeringPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen">
      <StoryNavigation />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Dark
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="re-hero">
        <div className="space-y-10">
          <div className="space-y-4">
            <TechnicalAnnotation label="DEVELOPMENT / 01" value="METHODOLOGY" variant="signal" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              REVERSE ENGINEER<br />
              <span className="text-alkota-signal">THE RIDE.</span>
            </h1>
            <p className="font-display text-xl sm:text-2xl uppercase text-alkota-slate font-light leading-tight">
              Not somebody else&apos;s bicycle.<br />
              The behaviour we want from ours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
            <div className="lg:col-span-5 space-y-5 font-sans">
              <p className="text-base text-alkota-white font-light leading-relaxed">
                Reverse engineering at Alkota begins with a question:
              </p>
              <p className="font-mono text-sm font-bold text-alkota-signal uppercase tracking-wider">
                WHY DOES A BICYCLE FEEL THE WAY IT DOES?
              </p>
              <div className="space-y-3 text-sm text-alkota-snow/85 font-light leading-relaxed">
                <p>
                  Strip away paint, marketing and component names and a mountain bike becomes a connected system of geometry, mass, structure, leverage, friction, tyre behaviour, rider position and hundreds of smaller decisions.
                </p>
                <p>Understanding those relationships gives us somewhere better to begin.</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <StoryImg
                src={ALKOTA_STORY_MEDIA.standaloneBlackBike.src}
                alt="Project 01 Naked Carbon — reverse engineering baseline"
                label="PROJECT 01 · NAKED CARBON · ENGINEERING BASELINE"
                height="h-[320px]"
                priority
              />
              <div className="grid grid-cols-2 gap-4">
                <StoryImg
                  src={ALKOTA_STORY_MEDIA.componentDevelopmentBench.src}
                  alt="Component development bench"
                  label="COMPONENT TEARDOWN BENCH"
                  height="h-[180px]"
                />
                <StoryImg
                  src={ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.src}
                  alt="Reverse engineering telemetry trace"
                  label="TELEMETRY TRACE ANALYSIS"
                  height="h-[180px]"
                />
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DON'T COPY THE ANSWER — large editorial
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 sm:py-28 bg-alkota-black border-y border-white/10 overflow-hidden tech-grid-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-12">
          <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            DON&apos;T COPY THE ANSWER.<br />
            <span className="text-alkota-signal">UNDERSTAND THE QUESTION.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5 font-sans">
              <p className="text-base text-alkota-white font-normal">Benchmarking matters.</p>
              <p className="text-sm text-alkota-snow/85 font-light leading-relaxed">
                Existing bikes contain decades of accumulated engineering knowledge, but blindly copying dimensions simply copies somebody else&apos;s compromises too.
              </p>
              <p className="text-sm text-alkota-snow/85 font-light leading-relaxed">
                We use comparison to establish context.
              </p>
              <div className="pt-4 border-t border-white/10">
                <FounderNote note="03" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                "What makes one bike calm at speed?",
                "Why does another change direction faster?",
                "Where does support disappear?",
                "Why does one suspension platform climb well but lose composure deeper in its travel?",
                "What becomes difficult to service?",
                "Where is unnecessary complexity hiding?",
              ].map((q) => (
                <div
                  key={q}
                  className="font-mono text-[11px] text-alkota-signal border-l-2 border-alkota-signal/40 pl-4 py-1 uppercase tracking-wide"
                >
                  {q}
                </div>
              ))}
              <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider pt-4">
                THE OBJECTIVE IS TO IDENTIFY CAUSE AND EFFECT.<br />
                NOT DUPLICATE A COMPETITOR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          INTERACTIVE SYSTEM EXPLORER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="system-explorer">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="SYSTEM ARCHITECTURE" value="CONNECTED VARIABLES" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE BICYCLE<br />
                <span className="text-alkota-slate">AS A SYSTEM.</span>
              </h2>
            </div>
            <p className="font-mono text-[10px] text-alkota-slate uppercase tracking-wider max-w-xs">
              Select a layer to reveal its role in the connected machine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <SystemExplorer />
            </div>

            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <StoryImg
                src={ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src}
                alt="Kinematic dynamics analysis"
                label="KINEMATICS · LEVERAGE RATIO · ANTI-SQUAT CURVES"
                height="h-[280px]"
              />
              <StoryImg
                src={ALKOTA_STORY_MEDIA.chassisEngineeringReview.src}
                alt="Chassis engineering review"
                label="CHASSIS · FEA · STRESS DISTRIBUTION"
                height="h-[220px]"
              />
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TEARDOWN
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="teardown">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <StoryImg
            src={ALKOTA_STORY_MEDIA.workshopChassisAssembly.src}
            alt="Workshop teardown and chassis assembly"
            label="WORKSHOP · TEARDOWN PASS · HARDWARE AUDIT"
            height="h-[460px]"
          />

          <div className="space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="PHYSICAL ANALYSIS" value="TEARDOWN" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                TAKE IT<br />
                <span className="text-alkota-signal">APART.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
              <p className="text-base text-alkota-white font-normal">
                Physical products reveal things specification tables do not.
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {[
                  "Access", "Fasteners", "Bearing placement",
                  "Cable routing", "Sealing", "Tolerance",
                  "Tool clearance", "Assembly sequence", "Wear surfaces",
                ].map((item) => (
                  <div
                    key={item}
                    className="font-mono text-[10px] uppercase tracking-wider text-alkota-signal border-l border-alkota-signal/40 pl-2 py-0.5"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p>A development teardown is not simply about seeing what is inside.</p>
              <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
                IT IS ABOUT UNDERSTANDING WHY SOMEBODY MADE EACH DECISION — AND WHETHER WE WOULD MAKE THE SAME ONE.
              </p>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          COMPONENTS AS CHASSIS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="component-chassis">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="INTEGRATION PRINCIPLE" value="SYSTEM ARCHITECTURE" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                THE COMPONENT IS<br />
                <span className="text-alkota-slate">PART OF THE CHASSIS.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5 font-sans">
              <p className="text-base text-alkota-white font-normal">
                A frame cannot be developed in isolation from the parts that make it a bicycle.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Fork length", effect: "alters geometry." },
                  { label: "Shock dimensions", effect: "define packaging and leverage opportunities." },
                  { label: "Brake size", effect: "influences fork, wheel and frame loads." },
                  { label: "Cranks", effect: "affect clearance." },
                  { label: "Tyres", effect: "dictate real rather than theoretical space." },
                ].map(({ label, effect }) => (
                  <div key={label} className="flex gap-3 items-start">
                    <span className="font-mono text-[10px] text-alkota-signal font-bold uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                      {label}
                    </span>
                    <span className="font-sans text-xs text-alkota-snow/80 font-light">{effect}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider pt-2">
                PROJECT 01 THEREFORE TREATS COMPONENT ENVELOPES AS ENGINEERING INPUTS, NOT ACCESSORIES ADDED AT THE END.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <StoryImg
                  src={ALKOTA_STORY_MEDIA.completeMachineIntegration.src}
                  alt="Complete machine integration"
                  label="COMPLETE MACHINE · INTEGRATION PASS"
                  height="h-[240px]"
                />
              </div>
              <StoryImg
                src={ALKOTA_STORY_MEDIA.componentDevelopmentBench.src}
                alt="Component development bench"
                label="CNC AL7075-T6 · HARDWARE"
                height="h-[180px]"
              />
              <StoryImg
                src={ALKOTA_STORY_MEDIA.frameDevelopmentMould.src}
                alt="Frame development mould tooling"
                label="MOULD TOOLING · FRONT TRIANGLE"
                height="h-[180px]"
              />
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CONTROLLED GEOMETRY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="controlled-geometry">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="DESIGN MATURITY" value="R00 / PRELIMINARY BASELINE" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                FROM BENCHMARK<br />
                TO CONTROLLED<br />
                <span className="text-alkota-slate">GEOMETRY.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 font-light leading-relaxed">
              <p className="text-base text-alkota-white font-normal">
                Early development can use reference envelopes.
              </p>
              <p className="font-mono text-xs font-bold text-alkota-signal uppercase">
                PRODUCTION ENGINEERING CANNOT.
              </p>
              <p>
                For Project 01 the programme has moved into a controlled geometry model with a defined datum system and a formal engineering drawing register.
              </p>
              <p>One master size is being solved first before the platform is scaled.</p>
              <p className="text-base text-alkota-white font-normal">That distinction matters.</p>
              <p>
                The manufacturer should eventually receive instructions to build the Alkota design — not a request to complete it.
              </p>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal border border-alkota-signal/30 inline-flex flex-col px-4 py-3 bg-alkota-signal/5 space-y-0.5">
              <span>R00 / PRELIMINARY ENGINEERING BASELINE</span>
              <span className="text-alkota-slate">NOT FOR MANUFACTURE</span>
            </div>
          </div>

          <div className="space-y-4">
            <StoryImg
              src={ALKOTA_STORY_MEDIA.technicalCadMaterial.src}
              alt="Technical CAD drawing — controlled geometry baseline"
              label="CAD · DATUM SYSTEM · DRAWING REGISTER"
              height="h-[320px]"
            />
            <StoryImg
              src={ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src}
              alt="Kinematic analysis"
              label="KINEMATICS · ANTI-SQUAT · PEDAL KICKBACK"
              height="h-[200px]"
            />
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          KEEP / QUESTION — two-column
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 sm:py-28 bg-alkota-black border-y border-white/10 overflow-hidden tech-grid-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-12">
          <div className="space-y-3">
            <TechnicalAnnotation label="DESIGN FILTER" value="AUDIT CRITERIA" variant="signal" />
            <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
              KEEP WHAT<br />
              <span className="text-alkota-signal">EARNS ITS PLACE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
            <div className="border-r border-white/10">
              <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-widest">
                  KEEP
                </span>
              </div>
              <div className="p-6 space-y-3">
                {KEEP_LIST.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-alkota-signal text-sm font-bold mt-0.5">+</span>
                    <span className="font-mono text-[11px] uppercase tracking-wide text-alkota-white font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-alkota-slate uppercase tracking-widest">
                  QUESTION
                </span>
              </div>
              <div className="p-6 space-y-3">
                {QUESTION_LIST.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-alkota-slate text-sm font-bold mt-0.5">?</span>
                    <span className="font-mono text-[11px] uppercase tracking-wide text-alkota-slate font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
            {/* CLAIMS: APC-001001 · APC-001002 — Development targets, correctly qualified as "current development target" */}
            <DevelopmentLedger
              question="How much travel does Project 01 actually need?"
              decision="160 mm front / 150 mm rear is the current development target."
              why="Enough support and control for aggressive natural terrain without turning the platform into an oversized enduro sled."
              status="R00 ENGINEERING BASELINE"
              statusVariant="baseline"
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL — Dark frame → white finished machine
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full min-h-[520px] overflow-hidden bg-alkota-black border-t border-white/10 flex flex-col justify-end">
        <div className="absolute inset-0">
          <Image
            src={ALKOTA_STORY_MEDIA.standaloneBlackBike.src}
            alt="Project 01 Naked Carbon"
            fill
            sizes="100vw"
            className="object-contain object-right opacity-25"
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src={ALKOTA_STORY_MEDIA.standaloneWhiteBike.src}
            alt="Project 01 Glacier White finished machine"
            fill
            sizes="100vw"
            className="object-contain object-right opacity-12"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-black via-transparent to-alkota-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-20 sm:py-28 space-y-8">
          <TechnicalAnnotation label="NEXT STAGE" value="BUILD PROCESS" variant="signal" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            ANALYSIS IS ONLY USEFUL<br />
            <span className="text-alkota-signal">IF IT LEADS TO SOMETHING BETTER.</span>
          </h2>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-md font-light leading-relaxed">
            Reverse engineering gives us understanding. The build process turns that understanding into hardware.
          </p>
          <Link
            href="/about/build-process"
            className="inline-flex items-center gap-3 px-8 py-4 bg-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-alkota-black transition-colors shadow-2xl"
          >
            <span>SEE THE BUILD PROCESS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <ChapterTransition currentSlug="reverse-engineering" />
    </div>
  );
}
