"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, ArrowRight } from "lucide-react";

// ── GLOSSARY DATA ─────────────────────────────────────────────────────────────

const chapters = [
  {
    id: "geometry",
    label: "GEOMETRY",
  },
  {
    id: "suspension",
    label: "SUSPENSION",
  },
  {
    id: "chassis",
    label: "CHASSIS + CARBON",
  },
  {
    id: "components",
    label: "COMPONENTS",
  },
  {
    id: "rider",
    label: "RIDER + TRAIL",
  },
  {
    id: "development",
    label: "DEVELOPMENT LANGUAGE",
  },
];

const terms = [
  // GEOMETRY
  {
    chapter: "geometry",
    term: "REACH",
    plain: "How far forward you sit on the bike.",
    technical:
      "The horizontal distance from the centre of the bottom bracket to the top of the head-tube reference point, measured in the defined geometry condition.",
    why: "Reach is one of the clearest indicators of how much room a rider has when standing on the bike, although it cannot be interpreted without stack, cockpit, and the rest of the geometry.",
    p01: "Reach targets are part of the R00 geometry baseline. Subject to validation.",
    links: [{ label: "FIT ENGINE →", href: "/fit" }],
  },
  {
    chapter: "geometry",
    term: "STACK",
    plain: "The height of the front of the bike.",
    technical:
      "The vertical distance from the centre of the bottom bracket to the head-tube reference point.",
    why: "Stack influences the height of the front of the bike and the rider's relationship with it — particularly in conjunction with stem and spacer configuration.",
    p01: "Measured from the R00 geometry baseline.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "HEAD ANGLE",
    plain: "How far the fork leans forward.",
    technical:
      "The angle of the steering axis relative to the ground under the defined measurement condition.",
    why: "It contributes to steering behaviour, stability and front-wheel position, but must be considered alongside fork offset, wheel size, trail and front-centre.",
    p01: "Part of the controlled geometry development. Not yet production-released.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "EFFECTIVE SEAT ANGLE",
    plain: "How upright your seat position is.",
    technical:
      "A reference angle used to describe the rider's seated position relative to the bottom bracket.",
    why: "It influences climbing position, weight distribution and effective cockpit length when seated.",
    p01: "Development geometry target. Subject to validation.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "REAR CENTRE",
    plain: "How far back the rear wheel sits.",
    technical:
      "The distance from bottom-bracket centre to rear-axle centre. Commonly known as chainstay length.",
    why: "It affects wheelbase, weight distribution and the relationship between the rider and rear wheel.",
    p01: "R00 geometry development target.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "WHEELBASE",
    plain: "The total length of the bike between axles.",
    technical:
      "The distance between front and rear axle centres.",
    why: "Wheelbase contributes to stability but never tells the whole handling story on its own.",
    p01: "Derived from the R00 geometry baseline.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "TRAIL",
    plain: "A measure of how self-correcting the steering is.",
    technical:
      "A steering-geometry measure describing the relationship between the steering-axis intersection with the ground and the tyre's contact region. Travel, tyre size, head angle and fork offset all influence it.",
    why: "Higher trail generally feels more stable. Very low trail can feel nervous. Neither extreme is universally ideal.",
    p01: "Calculated from the controlled head angle, fork offset and wheel size combination.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "BOTTOM-BRACKET DROP",
    plain: "How low the pedal spindle sits relative to the axles.",
    technical:
      "The vertical relationship between bottom-bracket centre and the wheel axle line in the defined geometry condition.",
    why: "Lower BB drop means a lower centre of mass but less pedal clearance.",
    p01: "Part of R00 geometry.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "FRONT CENTRE",
    plain: "The distance from the bottom bracket to the front axle.",
    technical:
      "The horizontal distance from bottom-bracket centre to front-axle centre.",
    why: "Contributes to toe-overlap risk, front wheel placement and handling character.",
    p01: "Derived geometry value from R00 baseline.",
    links: [],
  },
  {
    chapter: "geometry",
    term: "FORK OFFSET",
    plain: "How far the axle is pushed forward from the steering axis.",
    technical:
      "The offset of the front axle from the steering axis created by the fork crown/steerer and dropout geometry.",
    why: "Fork offset directly affects trail. A longer offset reduces trail for a given head angle.",
    p01: "Determined by fork selection in development.",
    links: [],
  },
  // SUSPENSION
  {
    chapter: "suspension",
    term: "TRAVEL",
    plain: "How much the suspension can move.",
    technical:
      "The amount of controlled suspension movement available, measured as the difference between full extension and full compression.",
    why: "More travel does not automatically mean better suspension. Where, how and how quickly travel is used matters more than the number alone.",
    p01: "Project 01 travel targets are part of the R00 development baseline.",
    links: [],
  },
  {
    chapter: "suspension",
    term: "SAG",
    plain: "How much suspension compresses under your weight.",
    technical:
      "The amount suspension compresses from full extension under a defined static rider-and-system load condition.",
    why: "Sag sets the operating position within the travel. Too little and the suspension sits too high; too much and it runs out of travel easily.",
    p01: "Sag settings will be published as part of the owner setup documentation.",
    links: [],
  },
  {
    chapter: "suspension",
    term: "LEVERAGE RATIO",
    plain: "How much the rear wheel moves relative to how much the shock moves.",
    technical:
      "The relationship between rear-wheel movement and shock movement at a given point in travel.",
    why: "Leverage ratio affects the spring rate the rider feels, regardless of the shock spring rate specified.",
    p01: "Controlled through the Project 01 linkage geometry. Part of kinematics development.",
    links: [{ label: "SUSPENSION KINEMATICS →", href: "/engineering/kinematics" }],
  },
  {
    chapter: "suspension",
    term: "PROGRESSION",
    plain: "How the suspension gets stiffer deeper in travel.",
    technical:
      "The way the suspension's mechanical or spring behaviour changes as it moves through travel. A progressive system generally requires proportionally greater force deeper in travel.",
    why: "Progression can help resist bottom-out and tune feel without requiring an excessively stiff beginning-of-travel rate.",
    p01: "Progression is a deliberate design output of the Project 01 kinematics.",
    links: [],
  },
  {
    chapter: "suspension",
    term: "ANTI-SQUAT",
    plain: "How the drivetrain interacts with the rear suspension under power.",
    technical:
      "A kinematic measure used to understand how drivetrain and acceleration forces interact with suspension behaviour.",
    why: "It is not a single universal percentage that defines whether a bike climbs well. The relationship between anti-squat, chain growth, pedal kickback and rider position all matter.",
    p01: "Anti-squat characteristics are part of the Project 01 kinematics development programme.",
    links: [],
  },
  {
    chapter: "suspension",
    term: "DAMPING",
    plain: "The control of how fast the suspension moves.",
    technical:
      "The control of suspension movement by dissipating energy as the suspension compresses or rebounds.",
    why: "Without damping, a spring-only system would bounce uncontrollably.",
    p01: "Damping configuration is part of the suspension development.",
    links: [],
  },
  {
    chapter: "suspension",
    term: "AXLE PATH",
    plain: "The trajectory the rear wheel follows as it compresses.",
    technical:
      "The path followed by the rear axle relative to the frame as suspension moves through its travel.",
    why: "Axle path affects how the bike reacts to bumps and braking, and influences traction and feel.",
    p01: "Axle path is a designed output of the Project 01 linkage system.",
    links: [],
  },
  {
    chapter: "suspension",
    term: "KINEMATICS",
    plain: "The study of how the suspension moves, before forces are applied.",
    technical:
      "The study of motion and geometric relationships without beginning with the forces causing that motion.",
    why: "Understanding kinematics lets an engineer design for a specific behaviour before building and testing.",
    p01: "Project 01 kinematics documentation is published in the Engineering section.",
    links: [{ label: "KINEMATICS →", href: "/engineering/kinematics" }],
  },
  // CHASSIS + CARBON
  {
    chapter: "chassis",
    term: "CARBON FIBRE",
    plain: "A very strong, light fibre used to build the frame.",
    technical:
      "A reinforcement made from carbon filaments. Properties are strongly directional — stiffness and strength vary significantly with fibre orientation.",
    why: "The phrase 'carbon frame' alone says very little about actual structural performance. Layup, fibre type, and manufacturing control all matter.",
    p01: "Project 01 uses carbon fibre for the primary structure. Layup details are part of the engineering documentation.",
    links: [{ label: "MATERIALS →", href: "/engineering/materials" }],
  },
  {
    chapter: "chassis",
    term: "LAYUP",
    plain: "The arrangement of carbon plies that form the structure.",
    technical:
      "The defined arrangement, orientation and placement of composite material used to create a structure.",
    why: "Layup defines where stiffness, strength and compliance live in the frame. It is engineering, not just manufacturing process.",
    p01: "Project 01 layup is designed around the structural requirements of the intended kinematics and ride character.",
    links: [],
  },
  {
    chapter: "chassis",
    term: "PREPREG",
    plain: "Pre-impregnated carbon ready to be laid up.",
    technical:
      "Fibre reinforcement supplied with a controlled amount of resin already incorporated, requiring controlled temperature cure.",
    why: "Prepreg provides more consistent fibre-to-resin ratios than wet layup, which can improve repeatability and part quality.",
    p01: "Manufacturing detail to be confirmed at production release.",
    links: [],
  },
  {
    chapter: "chassis",
    term: "TOLERANCE",
    plain: "The permitted variation in a dimension.",
    technical:
      "The permitted variation from a specified dimension or condition.",
    why: "Tight tolerances matter for fit, function and suspension performance.",
    p01: "Production tolerance standards to be defined before manufacturing release.",
    links: [],
  },
  {
    chapter: "chassis",
    term: "TORQUE",
    plain: "The rotational force applied to a fastener.",
    technical:
      "A rotational moment applied to a fastener or component, specified in Nm (Newton-metres).",
    why: "Under-torqued fasteners can slip or rattle. Over-torqued fasteners can strip threads, crush carbon or damage components.",
    p01: "Always use product-specific torque specifications from the owner manual. Never use generic values from online guides.",
    links: [{ label: "SAFETY →", href: "/safety" }],
  },
  // COMPONENTS
  {
    chapter: "components",
    term: "TUBELESS",
    plain: "A tyre system without an inner tube.",
    technical:
      "A tyre and rim system designed to operate without a conventional inner tube, using an airtight rim-tyre interface and sealant.",
    why: "Tubeless allows lower pressures for better traction, reduces pinch-flat risk, and can self-seal small punctures.",
    p01: "Project 01 wheels are designed for tubeless compatibility. Specific recommendations to be confirmed at production.",
    links: [],
  },
  {
    chapter: "components",
    term: "TYRE CASING",
    plain: "The structural fabric body of the tyre.",
    technical:
      "The structural body of a tyre beneath and around its tread and protective layers.",
    why: "Casing weight, thread count and material affect rolling resistance, puncture resistance and feel.",
    p01: "Tyre selection is part of the components programme. Subject to development.",
    links: [],
  },
  // RIDER + TRAIL
  {
    chapter: "rider",
    term: "CONTACT PATCH",
    plain: "The tyre's footprint on the ground at any moment.",
    technical:
      "The region of a tyre interacting with the ground at a particular moment. Shape, size and pressure distribution are all relevant.",
    why: "Contact patch management affects traction, especially in corners and on loose terrain.",
    p01: null,
    links: [],
  },
  {
    chapter: "rider",
    term: "UNSPRUNG MASS",
    plain: "The weight that moves with the wheel rather than being isolated by the suspension.",
    technical:
      "Mass that moves substantially with the wheel rather than being isolated by the suspension system.",
    why: "Lighter unsprung mass generally improves suspension response and ride quality.",
    p01: "Unsprung mass is a consideration in component selection for Project 01.",
    links: [],
  },
  // DEVELOPMENT LANGUAGE
  {
    chapter: "development",
    term: "R00",
    plain: "The current engineering revision identifier.",
    technical:
      "A development revision identifier used within the Project 01 programme. Does not mean production-ready.",
    why: "A revision number indicates a controlled state of the design, not necessarily a final production specification.",
    p01: "Current Project 01 engineering state.",
    links: [{ label: "DESIGN ARCHIVE →", href: "/project-01/design-archive" }],
  },
  {
    chapter: "development",
    term: "PROTOTYPE",
    plain: "A physical development article built to answer a specific question.",
    technical:
      "A physical or functional development article built to evaluate defined engineering hypotheses or test specific design solutions.",
    why: "A prototype exists to generate evidence — not to be presented as a finished production article.",
    p01: "First physical prototype arrival date to be announced when genuinely controlled.",
    links: [{ label: "PROTOTYPE REGISTRY →", href: "/project-01/design-archive" }],
  },
  {
    chapter: "development",
    term: "VALIDATION",
    plain: "Proving that a requirement or claim is actually met.",
    technical:
      "The process of obtaining evidence that defined requirements, specifications or performance claims are met under appropriate conditions.",
    why: "Without validation, a target or development baseline is not a proven fact.",
    p01: "Project 01 validation programme is ongoing as part of the pre-production phase.",
    links: [],
  },
  {
    chapter: "development",
    term: "BUILD LOCK",
    plain: "The point where your production bike specification is fixed.",
    technical:
      "The stage at which an individual customer's production Build becomes controlled and fixed subject to the governing order terms.",
    why: "Before Build Lock, a saved configuration is not a final production order.",
    p01: null,
    links: [{ label: "FAQ — BUILD LOCK →", href: "/faq" }],
  },
  {
    chapter: "development",
    term: "DEVELOPMENT BASELINE",
    plain: "The current controlled engineering direction.",
    technical:
      "The controlled current direction used to continue engineering development. Stronger than a casual idea but not automatically a validated production specification.",
    why: "Having a controlled baseline allows meaningful development, iteration and communication.",
    p01: "Project 01 operates on a controlled R00 development baseline.",
    links: [],
  },
  {
    chapter: "development",
    term: "PRODUCTION RELEASE",
    plain: "When engineering and commercial systems authorise a configuration for production.",
    technical:
      "The controlled point at which engineering and commercial systems authorise a configuration for production.",
    why: "Before production release, specifications remain subject to controlled change.",
    p01: "Project 01 production release is planned for 2028.",
    links: [],
  },
];

// ── TERM CARD ─────────────────────────────────────────────────────────────────

function TermCard({ term, plain, technical, why, p01, links }: (typeof terms)[number]) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-black/10 ${open ? "bg-alkota-snow" : "bg-white hover:bg-alkota-snow/50"} transition-colors`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        aria-expanded={open}
      >
        <div className="space-y-0.5">
          <div className="font-mono text-sm font-bold uppercase tracking-wider text-alkota-black">{term}</div>
          <div className="text-sm text-alkota-slate font-sans">{plain}</div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-alkota-slate shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-6 space-y-4 font-sans text-sm">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal mb-1">TECHNICAL EXPLANATION</div>
            <p className="text-alkota-black/90 leading-relaxed">{technical}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal mb-1">WHY IT MATTERS</div>
            <p className="text-alkota-black/90 leading-relaxed">{why}</p>
          </div>
          {p01 && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-alkota-signal mb-1">PROJECT 01 CONTEXT</div>
              <p className="text-alkota-black/90 leading-relaxed">{p01}</p>
            </div>
          )}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1 font-mono text-xs text-alkota-signal hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  const [activeChapter, setActiveChapter] = useState("geometry");
  const [search, setSearch] = useState("");

  const filteredTerms = useMemo(() => {
    if (search.trim()) {
      return terms.filter(
        (t) =>
          t.term.toLowerCase().includes(search.toLowerCase()) ||
          t.plain.toLowerCase().includes(search.toLowerCase()) ||
          t.technical.toLowerCase().includes(search.toLowerCase())
      );
    }
    return terms.filter((t) => t.chapter === activeChapter);
  }, [activeChapter, search]);

  return (
    <div className="w-full bg-alkota-white min-h-screen pt-28 pb-24 font-sans">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-black/10">
        <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-4">ENGINEERING REFERENCE</div>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-black leading-none mb-6">
          UNDERSTAND
          <br />
          <span className="text-alkota-slate">THE MACHINE.</span>
        </h1>
        <p className="text-lg text-alkota-slate max-w-2xl leading-relaxed">
          Mountain-bike engineering has a language of its own. This glossary exists to make the decisions behind
          Project 01 easier to understand — not to make simple things sound difficult.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Search */}
        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alkota-slate pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms…"
            className="w-full pl-10 pr-4 py-3 bg-alkota-snow border border-black/10 font-mono text-sm focus:outline-none focus:border-alkota-signal text-alkota-black placeholder:text-alkota-slate"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Chapter nav */}
          {!search && (
            <nav className="lg:col-span-3 space-y-1 font-mono text-xs">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChapter(ch.id)}
                  className={`w-full text-left px-4 py-3 uppercase tracking-wider transition-colors ${
                    activeChapter === ch.id
                      ? "bg-alkota-black text-alkota-white font-bold"
                      : "text-alkota-slate hover:text-alkota-black hover:bg-alkota-snow"
                  }`}
                >
                  {ch.label}
                  <span className="ml-2 text-alkota-slate/50">
                    ({terms.filter((t) => t.chapter === ch.id).length})
                  </span>
                </button>
              ))}
            </nav>
          )}

          {/* Term cards */}
          <div className={`${!search ? "lg:col-span-9" : "lg:col-span-12"} space-y-2`}>
            {search && (
              <div className="font-mono text-xs text-alkota-slate mb-4 uppercase tracking-wider">
                {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""} matching &quot;{search}&quot;
              </div>
            )}
            {filteredTerms.length === 0 ? (
              <div className="py-16 text-center text-alkota-slate font-mono text-sm">
                No terms match your search.
              </div>
            ) : (
              filteredTerms.map((t) => <TermCard key={t.term} {...t} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
