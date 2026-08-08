import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import StoryNavigation from "@/components/story/StoryNavigation";
import ChapterTransition from "@/components/story/ChapterTransition";
import VisualWorldSection from "@/components/story/VisualWorldSection";
import FounderNote from "@/components/editorial/FounderNote";
import DevelopmentLedger from "@/components/editorial/DevelopmentLedger";
import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | From Bike Shop to Alkota Project 01",
  description:
    "The story behind Alkota: from Pete Currey's first bike-shop job at 15 through racing, retail, industry experience and the development of Project 01.",
  openGraph: {
    title: "Our Story | From Bike Shop to Alkota Project 01",
    description:
      "The story behind Alkota: from Pete Currey's first bike-shop job at 15 through racing, retail, industry experience and the development of Project 01.",
    images: [ALKOTA_STORY_MEDIA.peteRidingHistory.src],
  },
};

/* ─────────────────────────────────────────────────────────
   Small reusable: wide image with label
───────────────────────────────────────────────────────── */
function StoryImage({
  src,
  alt,
  label,
  height = "h-[400px] sm:h-[480px]",
  objectPosition = "object-center",
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  height?: string;
  objectPosition?: string;
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
          sizes="(max-width: 768px) 100vw, 80vw"
          className={`object-cover ${objectPosition} hover:scale-[1.02] transition-transform duration-700`}
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
   Chapter divider strip
───────────────────────────────────────────────────────── */
function ChapterStrip({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-10">
      <span className="font-mono text-4xl sm:text-5xl font-bold text-alkota-signal/30 leading-none">
        {num}
      </span>
      <div className="h-px flex-1 bg-white/10" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal font-bold">
        {label}
      </span>
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-24 min-h-screen">
      <StoryNavigation />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ALPINE_PRECISION" id="story-hero">
        <div className="space-y-10">
          <div className="space-y-4">
            <TechnicalAnnotation label="THE ALKOTA STORY" value="FOUNDER NARRATIVE" variant="slate" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-alkota-black leading-[0.9]">
              THE BIKE<br />
              <span className="text-alkota-graphite">CAME FIRST.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Intro copy */}
            <div className="lg:col-span-5 space-y-5 font-sans">
              <p className="text-xl sm:text-2xl text-alkota-black font-light leading-snug">
                Long before Alkota existed, there were bikes.
              </p>
              <div className="space-y-4 text-sm text-alkota-slate leading-relaxed font-light">
                <p>
                  Pete Currey began working in a bicycle shop at fifteen. What started behind a shop counter became years spent riding, racing, selling, fixing, specifying and eventually building bicycle businesses of his own.
                </p>
                <p>
                  The important part was never simply being around bikes.
                </p>
                <p className="font-mono text-xs font-bold text-alkota-black uppercase tracking-wider">
                  IT WAS LEARNING WHY SOME MACHINES WORKED — AND WHY OTHERS ALMOST DID.
                </p>
              </div>
            </div>

            {/* Hero image — Pete + Project 01 */}
            <div className="lg:col-span-7 space-y-2">
              <div className="relative w-full h-[460px] sm:h-[560px] overflow-hidden border border-black/10 shadow-2xl bg-alkota-snow">
                <Image
                  src={ALKOTA_STORY_MEDIA.peteGlacierWhite.src}
                  alt="Pete Currey with Project 01 Glacier White"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <p className="font-mono text-[10px] text-alkota-slate uppercase flex justify-between">
                <span>PETE CURREY · FOUNDER · ALKOTA PERFORMANCE ENGINEERING</span>
                <span>PROJECT 01 · GLACIER WHITE</span>
              </p>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 01 — AGE FIFTEEN / SHOP FLOOR
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ALPINE_PRECISION" id="chapter-01">
        <ChapterStrip num="01" label="AGE FIFTEEN" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="ORIGIN" value="SHOP FLOOR" variant="slate" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-[0.9]">
                START ON THE<br />
                <span className="text-alkota-graphite">SHOP FLOOR.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-slate leading-relaxed font-light">
              <p className="text-base text-alkota-black font-normal">
                At fifteen, a bike shop is a very good place to learn that bicycles are not abstract products.
              </p>
              <p>They arrive dirty.</p>
              <div className="border-l-2 border-alkota-graphite/30 pl-4 space-y-1 font-mono text-[11px] text-alkota-slate uppercase tracking-wide">
                <p>Things loosen.</p>
                <p>Bearings wear.</p>
                <p>Customers change their minds.</p>
                <p>A setup that looks perfect on paper can feel completely wrong outside.</p>
              </div>
              <p>
                Pete's first education in bikes happened around workshop stands, wheels, tools, customers and people who simply wanted their machines to work.
              </p>
              <p>
                It created a habit that still sits underneath Alkota:
              </p>
              <div className="border-l-2 border-alkota-signal/60 pl-4 space-y-1 font-mono text-[11px] text-alkota-signal uppercase tracking-wide">
                <p>LOOK CLOSELY,</p>
                <p>UNDERSTAND THE PROBLEM,</p>
                <p>THEN MAKE IT BETTER.</p>
              </div>

              <div className="pt-4 border-t border-black/10">
                <FounderNote note="01" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <StoryImage
              src={ALKOTA_STORY_MEDIA.workshopChassisAssembly.src}
              alt="Workshop floor chassis assembly"
              label="WORKSHOP · CHASSIS ASSEMBLY · PROJECT WORKSPACE"
              height="h-[420px] sm:h-[500px]"
            />
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 02 — RACING
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="chapter-02">
        <ChapterStrip num="02" label="RACING" />

        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div className="space-y-6">
              <div className="space-y-3">
                <TechnicalAnnotation label="FIELD EDUCATION" value="RACE CULTURE" variant="signal" />
                <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                  RIDE IT.<br />
                  RACE IT.<br />
                  <span className="text-alkota-signal">LEARN FROM IT.</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm text-alkota-snow/90 leading-relaxed font-light">
                <p className="text-base text-alkota-white font-normal">
                  Selling bikes was only one side of it.
                </p>
                <p>
                  Riding and racing exposed the decisions made behind the product.
                </p>
                <div className="border-l-2 border-alkota-signal/60 pl-4 space-y-1 font-mono text-[11px] text-alkota-signal uppercase tracking-wide">
                  <p>GEOMETRY STOPPED BEING NUMBERS IN A CATALOGUE.</p>
                  <p>TYRES BECAME GRIP RATHER THAN SPECIFICATION.</p>
                  <p>SUSPENSION SETUP BECAME SECONDS, CONFIDENCE AND FATIGUE.</p>
                  <p>BRAKES MATTERED AT THE POINT WHERE THE TRAIL STOPPED BEING THEORETICAL.</p>
                </div>
                <p>
                  The faster the riding became, the clearer something became:
                </p>
                <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider">
                  EVERY DECISION ON A BICYCLE AFFECTS ANOTHER.
                </p>
              </div>
            </div>

            <StoryImage
              src={ALKOTA_STORY_MEDIA.peteRidingHistory.src}
              alt="Pete Currey riding and racing mountain bikes"
              label="FOUNDER RIDING HISTORY · ALPINE TERRAIN"
              height="h-[420px] sm:h-[500px]"
            />
          </div>

          {/* Two-up images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StoryImage
              src={ALKOTA_STORY_MEDIA.paddockEnvironment.src}
              alt="Race paddock environment"
              label="RACE PADDOCK · FIELD DEBRIEF"
              height="h-[280px]"
            />
            <StoryImage
              src={ALKOTA_STORY_MEDIA.founderRiderDialogue.src}
              alt="Founder rider dialogue session"
              label="FOUNDER · RIDER DIALOGUE · POST-RUN TELEMETRY"
              height="h-[280px]"
            />
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 03 — OWN STORES / BIKE BUSINESSES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ALPINE_PRECISION" id="chapter-03">
        <ChapterStrip num="03" label="BUILDING BIKE BUSINESSES" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="RETAIL PHASE" value="PEAK BIKES" variant="slate" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-[0.9]">
                FROM THE WORKSHOP<br />
                <span className="text-alkota-graphite">TO THE BUSINESS.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-slate leading-relaxed font-light">
              <p className="text-base text-alkota-black font-normal">
                Eventually Pete moved from working in bicycle shops to building his own.
              </p>
              <p>
                Peak Bikes became the next stage of the education: buying, selling and maintaining bikes at scale; listening to riders; dealing with manufacturers and distributors; seeing what customers valued after the excitement of the showroom had disappeared.
              </p>
              <p className="text-base text-alkota-black font-normal">
                A good product had to do more than look good under lights.
              </p>
              <div className="border-l-2 border-alkota-graphite/40 pl-4 space-y-1 font-mono text-[11px] text-alkota-slate uppercase tracking-wide">
                <p>IT HAD TO MAKE SENSE TO BUY.</p>
                <p>MAKE SENSE TO RIDE.</p>
                <p>MAKE SENSE TO MAINTAIN.</p>
                <p>AND MAKE SOMEBODY WANT TO COME BACK.</p>
              </div>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-widest text-alkota-slate border border-black/15 inline-flex px-3 py-1.5 bg-alkota-snow/60">
              PEAK BIKES · FOUNDER · 2008–2016
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <StoryImage
              src={ALKOTA_STORY_MEDIA.tradeShowPresentation.src}
              alt="Pete Currey at trade show presentation"
              label="TRADE SHOW · PRODUCT PRESENTATION · INDUSTRY DIALOGUE"
              height="h-[380px]"
            />
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 04 — THE INDUSTRY / AMERICA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="chapter-04">
        <ChapterStrip num="04" label="THE INDUSTRY · AMERICA" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <StoryImage
            src={ALKOTA_STORY_MEDIA.engineeringDesignMeeting.src}
            alt="Engineering design meeting — industry exposure"
            label="INDUSTRY EXPOSURE · ENGINEERING DIALOGUE · USA MARKET"
            height="h-[440px]"
          />

          <div className="space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="BROADER CONTEXT" value="INDUSTRY PHASE" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                LOOK BEYOND<br />
                <span className="text-alkota-slate">CYCLING.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 leading-relaxed font-light">
              <p className="text-base text-alkota-white font-normal">
                The years that followed broadened the picture.
              </p>
              <p>
                Building businesses outside cycling exposed Pete to manufacturing, operations, commercial systems, service networks and American product companies working at a very different scale.
              </p>
              <p className="text-base text-alkota-white font-normal">
                That experience changed the question.
              </p>
              <div className="border-l-2 border-alkota-slate/40 pl-4 space-y-1 font-mono text-[11px] text-alkota-slate uppercase tracking-wide">
                <p>INSTEAD OF ASKING:</p>
                <p className="text-alkota-white">"COULD WE START ANOTHER BIKE BRAND?"</p>
              </div>
              <p>
                The more useful question became:
              </p>
              <div className="border-l-2 border-alkota-signal/60 pl-4 space-y-1 font-mono text-[11px] text-alkota-signal uppercase tracking-wide">
                <p>"IF WE STARTED WITH EVERYTHING WE HAD LEARNED,</p>
                <p>HOW WOULD WE BUILD A BICYCLE COMPANY PROPERLY?"</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <FounderNote note="02" />
              </div>
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 05 — QUESTIONING THE PRODUCT / FIRST PRINCIPLES
          (Dark, full-width editorial treatment)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="chapter-05"
        className="relative w-full py-20 sm:py-28 bg-alkota-black border-y border-white/10 tech-grid-dark overflow-hidden"
      >
        {/* Atmospheric background image */}
        <Image
          src={ALKOTA_STORY_MEDIA.standaloneBlackBike.src}
          alt="Project 01 Naked Carbon — back to first principles"
          fill
          sizes="100vw"
          className="object-contain object-right opacity-[0.07] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-10">
          <ChapterStrip num="05" label="BACK TO FIRST PRINCIPLES" />

          <div className="max-w-3xl space-y-8">
            <div className="space-y-3">
              <TechnicalAnnotation label="DESIGN MANDATE" value="ALKOTA GENESIS" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                START WITH<br />
                <span className="text-alkota-signal">THE MACHINE.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 leading-relaxed font-light">
              <p className="text-base text-alkota-white font-normal">
                The answer was not twenty models.
              </p>
              <div className="border-l-2 border-alkota-slate/40 pl-4 space-y-1 font-mono text-[11px] text-alkota-slate uppercase tracking-wide">
                <p>IT WAS NOT A CATALOGUE.</p>
                <p>AND IT WAS NOT A GENERIC CARBON FRAME WITH A NEW LOGO.</p>
              </div>
              <p className="text-lg text-alkota-white font-light">Start with one machine.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  "STUDY WHAT EXISTS.",
                  "RIDE IT.",
                  "STRIP IT DOWN.",
                  "UNDERSTAND THE DECISIONS.",
                  "QUESTION THE ASSUMPTIONS.",
                  "KEEP WHAT WORKS.",
                  "REJECT WHAT DOESN'T.",
                  "BUILD AGAIN FROM FIRST PRINCIPLES.",
                ].map((item) => (
                  <div
                    key={item}
                    className="font-mono text-[10px] uppercase tracking-wider text-alkota-signal border border-alkota-signal/20 px-3 py-2 bg-alkota-signal/5"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider pt-4">
                THIS BECAME PROJECT 01.
              </p>

              <div className="pt-8">
                <DevelopmentLedger
                  question="Why build one single platform rather than a full product range?"
                  decision="Develop Project 01 as a single full-suspension carbon chassis."
                  why="Spreading engineering bandwidth across ten frame platforms compromises every detail. Developing one machine allows every layup schedule, pivot location and clearance tolerance to be refined without compromise."
                  status="R00 ENGINEERING BASELINE"
                  statusVariant="baseline"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 06 — PROJECT 01
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="chapter-06">
        <ChapterStrip num="06" label="PROJECT 01" />

        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <TechnicalAnnotation label="LAUNCH PLATFORM" value="PRE-PRODUCTION DEVELOPMENT" variant="signal" />
                <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                  PROJECT 01.
                </h2>
                <p className="font-display font-medium text-xl sm:text-2xl uppercase text-alkota-slate leading-tight">
                  THE STARTING POINT,<br />
                  NOT THE SHORTCUT.
                </p>
              </div>

              <div className="space-y-4 text-sm text-alkota-snow/90 leading-relaxed font-light">
                <p className="text-base text-alkota-white font-normal">
                  Project 01 began with a deliberately difficult brief.
                </p>
                <p>
                  Create one serious analogue mountain bike capable of climbing properly, carrying speed through natural terrain and remaining composed when the trail becomes rough — without turning into an oversized enduro sled.
                </p>
                <p>
                  The current engineering baseline targets 160 mm front travel, 150 mm rear travel and a 29-inch primary platform.
                </p>
                <p className="text-base text-alkota-white font-normal">
                  But the numbers are not the story.
                </p>
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                  THE STORY IS HOW EVERY ONE OF THOSE NUMBERS EARNS ITS PLACE.
                </p>
              </div>

              <div className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal border border-alkota-signal/30 inline-flex px-3 py-1.5 bg-alkota-signal/5">
                PRE-PRODUCTION DEVELOPMENT
              </div>
            </div>

            {/* Sequence: sketch → meeting → carbon → frame → complete bike */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <StoryImage
                  src={ALKOTA_STORY_MEDIA.technicalCadMaterial.src}
                  alt="Technical CAD / blueprint sketch"
                  label="01 · CAD LAYOUT · LINKAGE GEOMETRY"
                  height="h-[220px]"
                />
              </div>
              <StoryImage
                src={ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src}
                alt="Kinematic dynamics analysis"
                label="02 · KINEMATICS · LEVERAGE CURVES"
                height="h-[180px]"
              />
              <StoryImage
                src={ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src}
                alt="Carbon fiber layup development"
                label="03 · CARBON LAYUP · PLY ORIENTATION"
                height="h-[180px]"
              />
              <StoryImage
                src={ALKOTA_STORY_MEDIA.frameDevelopmentMould.src}
                alt="Frame development mould tooling"
                label="04 · MOULD TOOLING · FRONT TRIANGLE"
                height="h-[180px]"
              />
              <StoryImage
                src={ALKOTA_STORY_MEDIA.completeMachineIntegration.src}
                alt="Complete machine integration"
                label="05 · COMPLETE MACHINE · INTEGRATION PASS"
                height="h-[180px]"
              />
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 07 — DESIGN THE RIDE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="ENGINEERING_LAB" id="chapter-07">
        <ChapterStrip num="07" label="DESIGN THE RIDE" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <TechnicalAnnotation label="OPERATING PRINCIPLE" value="RIDE FIRST" variant="signal" />
              <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                DESIGN THE RIDE.<br />
                <span className="text-alkota-slate">THEN DESIGN THE BIKE.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm text-alkota-snow/90 leading-relaxed font-light">
              <p className="text-base text-alkota-white font-normal">
                That sentence has become one of Alkota's operating principles.
              </p>
              <p>
                Start by defining how the bike needs to behave.
              </p>
              <p>Then work backwards into:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "GEOMETRY",
                  "KINEMATICS",
                  "STRUCTURE",
                  "MATERIALS",
                  "PACKAGING",
                  "COMPONENTS",
                  "SERVICE ACCESS",
                  "SETUP",
                ].map((item) => (
                  <div
                    key={item}
                    className="font-mono text-[10px] uppercase tracking-wider text-alkota-signal border-l-2 border-alkota-signal/40 pl-2 py-1"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs font-bold text-alkota-white uppercase tracking-wider pt-2">
                THE FINISHED SILHOUETTE SHOULD BE THE CONSEQUENCE OF THOSE DECISIONS — NOT THE STARTING POINT.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <StoryImage
              src={ALKOTA_STORY_MEDIA.chassisEngineeringReview.src}
              alt="Chassis engineering review meeting"
              label="CHASSIS REVIEW · FEA STRESS MAPPING · HEADTUBE JUNCTION"
              height="h-[340px]"
            />
            <StoryImage
              src={ALKOTA_STORY_MEDIA.reverseEngineeringTelemetry.src}
              alt="Reverse engineering telemetry"
              label="TELEMETRY · WHEEL DISPLACEMENT · SHOCK VELOCITY"
              height="h-[220px]"
            />
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAPTER 08 — ALKOTA / CLOSE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisualWorldSection world="TERRAIN_HUMAN" id="chapter-08">
        <ChapterStrip num="08" label="ALKOTA" />

        <div className="space-y-12">
          {/* Wide hero image — Pete + white or black bike */}
          <StoryImage
            src={ALKOTA_STORY_MEDIA.peteNakedCarbon.src}
            alt="Pete Currey with Project 01 Naked Carbon"
            label="PETE CURREY · PROJECT 01 NAKED CARBON · ALKOTA PERFORMANCE ENGINEERING"
            height="h-[460px] sm:h-[540px]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <TechnicalAnnotation label="PROGRAMME STATEMENT" value="DEVELOPMENT CONTINUES" variant="signal" />
                <h2 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-alkota-white leading-[0.9]">
                  ALKOTA IS NOT<br />
                  <span className="text-alkota-signal">THE END OF THE STORY.</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm text-alkota-snow/90 leading-relaxed font-light">
                <p className="text-base text-alkota-white font-normal">
                  It is the name now attached to decades of accumulated experience and a new engineering programme.
                </p>
                <p>
                  The fifteen-year-old in the bike shop could not have drawn Project 01.
                </p>
                <p className="font-mono text-xs font-bold text-alkota-signal uppercase tracking-wider">
                  HE DID NOT NEED TO.<br />
                  HE JUST NEEDED TO START PAYING ATTENTION.
                </p>
              </div>
            </div>

            {/* Final validation imagery */}
            <div className="lg:col-span-6 space-y-4">
              <StoryImage
                src={ALKOTA_STORY_MEDIA.prototypeBuildValidation.src}
                alt="Prototype build validation pass"
                label="REV 001 · PROTOTYPE · VALIDATION PASS"
                height="h-[260px]"
              />
              <StoryImage
                src={ALKOTA_STORY_MEDIA.hauteSavoieAlpineTest.src}
                alt="Haute-Savoie alpine field test"
                label="ALPINE ENVIRONMENT · PLANNED FIELD VALIDATION TERRAIN"
                height="h-[260px]"
              />
            </div>
          </div>
        </div>
      </VisualWorldSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA — REVERSE ENGINEERING THE RIDE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative w-full py-20 sm:py-28 bg-alkota-black border-t border-white/10 tech-grid-dark overflow-hidden">
        <Image
          src={ALKOTA_STORY_MEDIA.alpineTrailTestingAction.src}
          alt="Alpine trail testing action"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-alkota-black via-alkota-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-alkota-black/90 via-transparent to-alkota-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-8">
          <TechnicalAnnotation label="NEXT CHAPTER" value="METHODOLOGY" variant="signal" />
          <h2 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            REVERSE ENGINEERING<br />
            <span className="text-alkota-signal">THE RIDE.</span>
          </h2>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-md font-light leading-relaxed">
            How Alkota works backwards from the rider experience — through dynamics, geometry, structure, materials and components — to build a machine that behaves as required.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/project-01/design-archive"
              className="inline-flex items-center gap-3 px-8 py-4 border border-alkota-signal text-alkota-signal font-mono text-xs font-bold tracking-wider uppercase hover:bg-alkota-signal hover:text-alkota-black transition-colors shadow-2xl"
            >
              <span>THE DRAWINGS BEHIND THE MACHINE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about/reverse-engineering"
              className="inline-flex items-center gap-3 px-8 py-4 bg-alkota-signal text-alkota-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-alkota-black transition-colors shadow-2xl"
            >
              <span>REVERSE ENGINEERING THE RIDE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ChapterTransition currentSlug="story" />
    </div>
  );
}
