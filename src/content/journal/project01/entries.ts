import { ALKOTA_STORY_MEDIA } from "@/content/media/alkotaStoryMedia";

export type JournalCategory =
  | "ORIGIN"
  | "RIDE REQUIREMENTS"
  | "GEOMETRY"
  | "KINEMATICS"
  | "FRAME"
  | "CARBON"
  | "COMPONENTS"
  | "PROTOTYPE"
  | "VALIDATION"
  | "RACING"
  | "PRODUCTION"
  | "FOUNDER NOTE";

export type JournalEntryStatus =
  | "CURRENT"
  | "DEVELOPMENT"
  | "SUPERSEDED"
  | "PLANNED"
  | "VALIDATED";

export interface EngineeringDataPoint {
  label: string;
  value: string;
  unit?: string;
  status?: string;
}

export interface JournalEntry {
  id: string;
  slug: string;
  sequence: string; // e.g. "001"
  title: string;
  subtitle: string;
  date: string;
  phase: string;
  revision: string;
  status: JournalEntryStatus;
  category: JournalCategory;
  author: string;
  heroMedia: {
    src: string;
    alt: string;
    caption?: string;
  };
  designArtifacts?: string[]; // IDs matching designJourney (e.g., ALK-SKETCH-001)
  gallery?: { src: string; alt: string; caption?: string }[];
  decisionSummary?: {
    question: string;
    decision: string;
    why: string;
    status: string;
  };
  revisionChange?: {
    fromRev: string;
    toRev: string;
    whatChanged: string;
    why: string;
    effect: string;
  };
  founderNote?: {
    noteNumber: string;
    quote: string;
  };
  body: string[];
  engineeringData?: EngineeringDataPoint[];
  supersedes?: string;
  supersededBy?: string;
  nextEntry?: { slug: string; title: string; sequence: string };
  previousEntry?: { slug: string; title: string; sequence: string };
  relatedEntries?: string[];
}

export const PROJECT_01_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "P01-JNL-001",
    slug: "001-why-one-bike",
    sequence: "001",
    title: "WHY ONE BIKE?",
    subtitle: "The decision to build a single, uncompromising platform.",
    date: "JANUARY 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "ORIGIN",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.peteWorkshopLab.src,
      alt: "Pete Currey in the Alkota workshop reviewing chassis geometry sketches",
      caption: "Pete Currey at the drawing board in Barnoldswick, Lancashire.",
    },
    designArtifacts: ["ALK-SKETCH-001"],
    decisionSummary: {
      question: "Should Alkota build a multi-model range or focus entirely on one machine?",
      decision: "One flagship all-mountain chassis: Project 01.",
      why: "A single platform allows every engineering iteration, carbon layup refinement and telemetry test to improve one master bicycle rather than dividing focus.",
      status: "R00 BASELINE ARCHITECTURE",
    },
    founderNote: {
      noteNumber: "01",
      quote: "The idea for Alkota was never to put another logo on a bicycle. I wanted to take everything I'd learned around bikes and businesses and start again with one machine.",
    },
    body: [
      "Most bicycle companies launch with three models and expand to twelve within three years. Each frame requires separate tooling, separate kinematics, separate testing, and separate inventory.",
      "At Alkota, we took the opposite decision. We decided to focus all of our engineering bandwidth on one machine. A single carbon chassis designed to handle technical alpine terrain, high-speed descents, and long climbing days with equal composure.",
      "This is Project 01. It is not a placeholder for a future range. It is the destination.",
    ],
    engineeringData: [
      { label: "MODEL COUNT", value: "1", unit: "PLATFORM" },
      { label: "DEVELOPMENT SCOPE", value: "FULL CARBON CHASSIS" },
      { label: "LOCATION", value: "BARNOLDSWICK, UK" },
    ],
    nextEntry: { slug: "002-defining-the-ride", title: "DEFINING THE RIDE", sequence: "002" },
  },
  {
    id: "P01-JNL-002",
    slug: "002-defining-the-ride",
    sequence: "002",
    title: "DEFINING THE RIDE",
    subtitle: "Establishing the core dynamic requirements before drawing a line.",
    date: "FEBRUARY 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "RIDE REQUIREMENTS",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.alpineTrailTestingAction.src,
      alt: "Alpine singletrack trail descent",
      caption: "Natural alpine terrain: steep, loose rock, uncompacted singletrack.",
    },
    designArtifacts: ["ALK-SKETCH-001", "ALK-SKETCH-002"],
    decisionSummary: {
      question: "What specific trail feel must Project 01 deliver across varied terrain?",
      decision: "High anti-squat in climbing gear, neutral anti-rise under braking, and linear-progressive leverage curve.",
      why: "Ensures responsive pedaling efficiency on steep climbs while maintaining mid-stroke support without harsh bottom-outs.",
      status: "TARGET SPECIFICATION",
    },
    body: [
      "Before starting CAD modeling, we established three non-negotiable ride traits: stability at speed, intuitive cornering balance, and mid-stroke suspension support.",
      "Many modern long-travel bikes feel plush over small bumps but collapse under heavy cornering loads or G-outs. We wanted a chassis that stays up in its travel, giving the rider a stable platform to push against.",
      "The result is a ride character that rewards active riding without requiring superhuman strength to maneuver.",
    ],
    engineeringData: [
      { label: "LEVERAGE PROFILE", value: "LINEAR-PROGRESSIVE" },
      { label: "PEDALING PLATFORM", value: "105% ANTI-SQUAT AT SAG" },
      { label: "BRAKING ISOLATION", value: "NEUTRAL ANTI-RISE" },
    ],
    previousEntry: { slug: "001-why-one-bike", title: "WHY ONE BIKE?", sequence: "001" },
    nextEntry: { slug: "003-from-benchmark-to-alkota", title: "FROM BENCHMARK TO ALKOTA GEOMETRY", sequence: "003" },
  },
  {
    id: "P01-JNL-003",
    slug: "003-from-benchmark-to-alkota",
    sequence: "003",
    title: "FROM BENCHMARK TO ALKOTA GEOMETRY",
    subtitle: "How geometry controls stability, reach balance, and rider position.",
    date: "FEBRUARY 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "GEOMETRY",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.standaloneWhiteBike.src,
      alt: "Project 01 geometry silhouette study",
      caption: "Geometry envelope: 64° head angle, 77.5° seat tube angle, 480mm reach (Size L).",
    },
    designArtifacts: ["ALK-SKETCH-003"],
    decisionSummary: {
      question: "What head tube and seat tube angles provide optimal weight distribution?",
      decision: "64° head angle / 77.5° effective seat angle.",
      why: "Places the rider centrally between wheels for effortless front wheel traction on flat turns and steep climbs.",
      status: "R00 GEOMETRY BASELINE",
    },
    body: [
      "Geometry is the foundation of bicycle behavior. If the geometry is wrong, no suspension damper tuning can fix it.",
      "We benchmarked every significant chassis on the market. Extreme reach numbers look impressive on spec sheets, but they force the rider to work excessively hard to load the front tyre in flat corners.",
      "Project 01 uses a balanced 480mm reach on Size L, paired with a steep 77.5° effective seat tube angle and a slack 64° head angle.",
    ],
    engineeringData: [
      { label: "HEAD ANGLE", value: "64.0", unit: "DEG" },
      { label: "SEAT ANGLE", value: "77.5", unit: "DEG" },
      { label: "REACH (SIZE L)", value: "480", unit: "MM" },
      { label: "CHAINSTAY LENGTH", value: "440", unit: "MM" },
    ],
    previousEntry: { slug: "002-defining-the-ride", title: "DEFINING THE RIDE", sequence: "002" },
    nextEntry: { slug: "004-why-160-150", title: "WHY 160 / 150?", sequence: "004" },
  },
  {
    id: "P01-JNL-004",
    slug: "004-why-160-150",
    sequence: "004",
    title: "WHY 160 / 150?",
    subtitle: "The engineering rationale behind 160mm front and 150mm rear travel.",
    date: "MARCH 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "KINEMATICS",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src,
      alt: "CAD kinematics simulation showing suspension travel curve",
      caption: "Suspension kinematic analysis: 160mm front / 150mm rear envelope.",
    },
    designArtifacts: ["ALK-SKETCH-005", "ALK-SKETCH-007"],
    decisionSummary: {
      question: "Why 160mm front and 150mm rear travel instead of 170/160mm?",
      decision: "160mm front / 150mm rear target.",
      why: "Provides ample travel for big alpine hits while keeping the chassis dynamic, responsive, and light on its feet.",
      status: "R00 KINEMATIC CONTROL",
    },
    revisionChange: {
      fromRev: "EARLY STUDY",
      toRev: "R00 BASELINE",
      whatChanged: "Settled on 160mm front / 150mm rear travel targets",
      why: "Prevent chassis wallow and preserve mid-stroke trail feedback",
      effect: "Improved cornering response and reduced overall chassis weight target",
    },
    body: [
      "There is a growing trend toward ever-longer travel numbers. But more travel requires higher dynamic sag, changes geometry more under heavy braking, and adds structural weight.",
      "160mm front and 150mm rear travel is the sweet spot. Combined with custom kinematics and a high-volume air or coil shock, it absorbs massive square-edge hits while preserving trail feel.",
    ],
    engineeringData: [
      { label: "FRONT TRAVEL", value: "160", unit: "MM" },
      { label: "REAR TRAVEL", value: "150", unit: "MM" },
      { label: "PROGRESSION RATIO", value: "24%", unit: "TOTAL" },
    ],
    previousEntry: { slug: "003-from-benchmark-to-alkota", title: "FROM BENCHMARK TO ALKOTA GEOMETRY", sequence: "003" },
    nextEntry: { slug: "005-the-large-master", title: "THE LARGE MASTER", sequence: "005" },
  },
  {
    id: "P01-JNL-005",
    slug: "005-the-large-master",
    sequence: "005",
    title: "THE LARGE MASTER",
    subtitle: "Developing the primary Size L master frame geometry before sizing scaling.",
    date: "MARCH 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "GEOMETRY",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.technicalCadMaterial.src,
      alt: "Technical drawing table with Size L chassis master prints",
      caption: "Size Large master CAD model and structural layup plan.",
    },
    designArtifacts: ["ALK-SKETCH-004", "ALK-SKETCH-011"],
    decisionSummary: {
      question: "Which size should be developed first as the engineering master?",
      decision: "Size Large as the master geometry reference.",
      why: "Size L sits at the midpoint of rider height distribution, allowing accurate scaling across S, M, L, and XL.",
      status: "MASTER CAD LOCKED",
    },
    body: [
      "Every multi-size frame range starts with a master CAD model. For Project 01, Size Large is our master frame.",
      "We locked the front triangle geometry, head tube junction, and rocker pivot positions on Size L before generating S, M, and XL variations.",
      "Size-proportional chainstay lengths are being evaluated to ensure riders on Size S get the same balanced handling as riders on Size XL.",
    ],
    engineeringData: [
      { label: "MASTER SIZE", value: "LARGE (L)" },
      { label: "TARGET RIDER HEIGHT", value: "178-188", unit: "CM" },
      { label: "WHEELBASE", value: "1255", unit: "MM" },
    ],
    previousEntry: { slug: "004-why-160-150", title: "WHY 160 / 150?", sequence: "004" },
    nextEntry: { slug: "006-suspension-architecture", title: "SUSPENSION ARCHITECTURE", sequence: "006" },
  },
  {
    id: "P01-JNL-006",
    slug: "006-suspension-architecture",
    sequence: "006",
    title: "SUSPENSION ARCHITECTURE",
    subtitle: "Why low-pivot four-bar Horst linkage remains the benchmark.",
    date: "APRIL 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "KINEMATICS",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.kinematicDynamicsAnalysis.src,
      alt: "Four-bar Horst link kinematic model",
      caption: "Horst-link chainstay pivot placement for brake decoupling.",
    },
    designArtifacts: ["ALK-SKETCH-005", "ALK-SKETCH-006"],
    decisionSummary: {
      question: "Which suspension layout delivers the best balance of reliability and performance?",
      decision: "Low-pivot four-bar Horst link layout.",
      why: "Decouples braking forces from suspension action, uses standard maintenance bearings, and keeps center of gravity extremely low.",
      status: "R00 KINEMATIC BASELINE",
    },
    body: [
      "We tested high-pivot idler concepts and single-pivot flex-stay designs. While high pivots offer rearward axle path gains, they introduce drag, noise, and complex maintenance.",
      "The low-pivot four-bar Horst link layout remains unmatched for reliability, weight, and predictable kinematic response under hard trail use.",
    ],
    engineeringData: [
      { label: "LINKAGE TYPE", value: "FOUR-BAR HORST" },
      { label: "MAIN PIVOT LOCATION", value: "ABOVE BB SHELL" },
      { label: "BEARING SPECIFICATION", value: "ENDURO MAX DOUBLE-SEALED" },
    ],
    previousEntry: { slug: "005-the-large-master", title: "THE LARGE MASTER", sequence: "005" },
    nextEntry: { slug: "007-packaging-project-01", title: "PACKAGING PROJECT 01", sequence: "007" },
  },
  {
    id: "P01-JNL-007",
    slug: "007-packaging-project-01",
    sequence: "007",
    title: "PACKAGING PROJECT 01",
    subtitle: "Fitting bottle clearance, shock space, and clean cable routing into a low standover frame.",
    date: "APRIL 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "FRAME",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.standaloneBlackBike.src,
      alt: "Project 01 downtube and shock packaging detail",
      caption: "Internal shock tunnel and 750ml water bottle clearance study.",
    },
    designArtifacts: ["ALK-SKETCH-006", "ALK-SKETCH-007"],
    decisionSummary: {
      question: "Can full 750ml bottle clearance be achieved alongside piggyback reservoir shocks on all sizes?",
      decision: "Yes — custom lower shock mount layout.",
      why: "No rider should have to choose between carrying water and running their preferred rear shock.",
      status: "PACKAGING VERIFIED",
    },
    body: [
      "Packaging is where engineering meets real-life practicality. A frame can look beautiful in renders, but if it cannot fit a full-size water bottle, a piggyback coil shock, and dropper posts up to 210mm, it fails on the trail.",
      "We re-engineered the down tube curvature and lower shock mount to ensure 750ml bottle clearance across all sizes (S through XL).",
    ],
    engineeringData: [
      { label: "BOTTLE CAPACITY", value: "750", unit: "ML ALL SIZES" },
      { label: "SHOCK COMPATIBILITY", value: "AIR & COIL PIGGYBACK" },
      { label: "DROPPER INSERTION", value: "300", unit: "MM (SIZE L)" },
    ],
    previousEntry: { slug: "006-suspension-architecture", title: "SUSPENSION ARCHITECTURE", sequence: "006" },
    nextEntry: { slug: "008-carbon-structure-before-weight", title: "CARBON: STRUCTURE BEFORE WEIGHT", sequence: "008" },
  },
  {
    id: "P01-JNL-008",
    slug: "008-carbon-structure-before-weight",
    sequence: "008",
    title: "CARBON: STRUCTURE BEFORE WEIGHT",
    subtitle: "Prioritising impact resistance and structural stiffness over racing weight.",
    date: "MAY 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "CARBON",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.carbonLayupDevelopment.src,
      alt: "Torayca UD carbon fiber ply layup process",
      caption: "Hand layup of Torayca T800/T1000 unidirectional carbon plies.",
    },
    designArtifacts: ["ALK-SKETCH-008", "ALK-SKETCH-009"],
    decisionSummary: {
      question: "Should target frame weight be compromised to increase rock-strike impact resistance?",
      decision: "Structure before weight. Reinforced downtube and bottom bracket shell.",
      why: "An ultra-light frame that cracks on a loose rock descent is useless. Reliability comes first.",
      status: "R00 LAYUP SCHEDULE",
    },
    body: [
      "Chasing minimum gram count on an all-mountain bike leads to paper-thin tube walls that puncture easily from flying rocks.",
      "Project 01 uses a multi-axial Torayca T800 and T1000 carbon fiber layup with extra sacrificial plies along the downtube, bottom bracket, and chainstays.",
    ],
    engineeringData: [
      { label: "FIBER SUPPLIER", value: "TORAYCA (JAPAN)" },
      { label: "PRIMARY PLY", value: "T800 / T1000 UNIDIRECTIONAL" },
      { label: "DOWNTUBE ARMOR", value: "INTEGRATED CO-MOLDED TPE" },
    ],
    previousEntry: { slug: "007-packaging-project-01", title: "PACKAGING PROJECT 01", sequence: "007" },
    nextEntry: { slug: "009-the-component-envelope", title: "THE COMPONENT ENVELOPE", sequence: "009" },
  },
  {
    id: "P01-JNL-009",
    slug: "009-the-component-envelope",
    sequence: "009",
    title: "THE COMPONENT ENVELOPE",
    subtitle: "Specifying components that complement the chassis philosophy.",
    date: "MAY 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "COMPONENTS",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.componentDevelopmentBench.src,
      alt: "Hope CNC machined component detail",
      caption: "Component partnership evaluation: Hope Technology CNC brake calipers.",
    },
    designArtifacts: ["ALK-SKETCH-010"],
    decisionSummary: {
      question: "Which component standards will be native to the Project 01 chassis?",
      decision: "UDH derailleur hanger, 73mm BSA threaded BB, 44/56 headtube, Boost 148 spacing.",
      why: "Proven, reliable industry standards that allow easy servicing anywhere in the world.",
      status: "ENVELOPE DEFINED",
    },
    body: [
      "Proprietary standards create headaches for owners. Project 01 avoids custom bottom bracket press-fits and non-standard headset bearings.",
      "We specified BSA 73mm threaded bottom bracket shells, SRAM UDH derailleur hanger compatibility, and standard ISCG-05 mounts.",
    ],
    engineeringData: [
      { label: "BOTTOM BRACKET", value: "BSA 73MM THREADED" },
      { label: "HANGER STANDARD", value: "SRAM UDH NATIVE" },
      { label: "REAR AXLE", value: "BOOST 148 X 12MM" },
    ],
    previousEntry: { slug: "008-carbon-structure-before-weight", title: "CARBON: STRUCTURE BEFORE WEIGHT", sequence: "008" },
    nextEntry: { slug: "010-r00-baseline", title: "R00 BASELINE", sequence: "010" },
  },
  {
    id: "P01-JNL-010",
    slug: "010-r00-baseline",
    sequence: "010",
    title: "R00 ENGINEERING BASELINE",
    subtitle: "Locking the first complete engineering revision before prototype tool manufacture.",
    date: "JUNE 2026",
    phase: "ENGINEERING DEVELOPMENT",
    revision: "R00",
    status: "CURRENT",
    category: "PROTOTYPE",
    author: "Pete Currey",
    heroMedia: {
      src: ALKOTA_STORY_MEDIA.completeMachineIntegration.src,
      alt: "Project 01 R00 baseline complete rendering",
      caption: "Project 01 R00 baseline chassis render in Glacier White finish.",
    },
    designArtifacts: ["ALK-SKETCH-011", "ALK-SKETCH-012"],
    decisionSummary: {
      question: "Is the initial R00 engineering revision ready for prototype tool manufacturing?",
      decision: "R00 baseline frozen for prototype tooling.",
      why: "All CAD, FEA, and kinematic parameters meet target envelopes. Physical prototypes are required for the next stage.",
      status: "R00 FROZEN FOR TOOLING",
    },
    founderNote: {
      noteNumber: "04",
      quote: "We are not trying to pretend the bike is finished. The interesting bit is that it isn't. People can come along while we make it better.",
    },
    body: [
      "R00 is our first complete engineering baseline. Every pivot coordinate, tube profile, and carbon layup schedule for the initial prototype batch is locked.",
      "The next step is physical prototype manufacturing and lab testing. Once physical frames are built, we begin physical validation ahead of our planned 2027 race programme.",
    ],
    engineeringData: [
      { label: "REVISION", value: "R00 BASELINE" },
      { label: "STATUS", value: "FROZEN FOR TOOLING" },
      { label: "NEXT PHASE", value: "PROTOTYPE TESTING" },
    ],
    previousEntry: { slug: "009-the-component-envelope", title: "THE COMPONENT ENVELOPE", sequence: "009" },
  },
];

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return PROJECT_01_JOURNAL_ENTRIES.find((e) => e.slug === slug);
}
