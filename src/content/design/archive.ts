/**
 * ALKOTA PROJECT 01 — DESIGN ARCHIVE
 *
 * Extended source of truth for the public Design Archive.
 * Extends the base DesignJourneyAsset with archive-specific metadata.
 *
 * SINGLE SOURCE PRINCIPLE:
 * This file IS the source of truth for both:
 *   - /project-01/design-archive (public archive)
 *   - /studio/design (Studio management)
 *
 * Pete replaces placeholders by dropping real files at assetPath.
 * IDs are stable — do not change them.
 *
 * Studio Phase 02 will move this to a database-backed store.
 * At that point this file becomes the seed migration.
 */

export type ArtifactType =
  | "CONCEPT SKETCH"
  | "DESIGN STUDY"
  | "PACKAGING STUDY"
  | "GEOMETRY STUDY"
  | "ENGINEERING STUDY"
  | "CONTROLLED DRAWING"
  | "TECHNICAL ILLUSTRATION"
  | "MATERIAL STUDY"
  | "COMPONENT STUDY"
  | "PROTOTYPE RECORD"
  | "PHOTOGRAPH";

export type ArtifactStatus =
  | "PLACEHOLDER"   // No image yet — intentional placeholder renders
  | "INTERNAL"      // Image exists but not for public release
  | "PUBLISHED"     // Image present and publicly visible
  | "SUPERSEDED"    // Replaced by a later document
  | "ARCHIVED"      // Retained for historical record, not primary
  | "CONTROLLED";   // Engineering-controlled document — display only

export type ArtifactVisibility = "PUBLIC" | "STUDIO_ONLY" | "RESTRICTED";

export interface ArtifactAnnotation {
  number: number;
  label: string;
  note?: string;
}

export interface DesignArtifactRecord {
  // ── Identity ──────────────────────────────────────────────────────────────
  id: string;              // Stable: ALK-SKETCH-001 etc.
  slug: string;            // URL slug: alk-sketch-001
  sequence: number;        // Display order

  // ── Classification ───────────────────────────────────────────────────────
  type: ArtifactType;
  phase: string;           // e.g. "PHASE 00 — DEFINITION"
  chapterId: string;       // Which chapter this belongs to (c01–c10)
  revision: string;        // Engineering revision: R00

  // ── Content ──────────────────────────────────────────────────────────────
  title: string;
  subtitle?: string;       // Short editorial label
  caption: string;         // Engineering description
  theQuestion?: string;    // What this study was trying to answer
  theDecision?: string;    // What was decided
  why?: string;            // Why that decision
  whatHappenedNext?: string;

  // ── Founder notes ────────────────────────────────────────────────────────
  founderNote?: string;

  // ── Asset ────────────────────────────────────────────────────────────────
  assetPath: string;       // /story/sketches/alk-sketch-001.webp
  aspectRatio: "4:3" | "3:2" | "1:1" | "16:9" | "3:4";
  status: ArtifactStatus;
  visibility: ArtifactVisibility;
  publicDownload: boolean; // Defaults false — never expose raw source

  // ── Annotations (optional callouts on the image) ─────────────────────────
  annotations?: ArtifactAnnotation[];

  // ── Relationships ────────────────────────────────────────────────────────
  relatedJournalSlug?: string;    // Link to journal entry
  relatedRevision?: string;       // Which P01 revision this belongs to
  supersedes?: string;            // ID this replaces
  supersededBy?: string;          // ID that replaced this
  supersededReason?: string;      // Why replaced

  // ── Image pairs (sketch → real image) ────────────────────────────────────
  pairedImagePath?: string;       // Real-world image to pair with drawing
  pairedImageAlt?: string;

  // ── Development metadata ─────────────────────────────────────────────────
  dateCreated?: string;           // When created (approx)
  dateAdded?: string;             // When added to archive
  optionalNote?: string;          // Internal note (not shown publicly)
  confidential?: boolean;         // Flag — do not expose even in Studio
}

// ── ARCHIVE CHAPTERS ─────────────────────────────────────────────────────────

export interface ArchiveChapter {
  id: string;          // c01–c10
  number: string;      // "01"
  title: string;       // "DEFINE THE RIDE"
  headline: string;    // Large editorial H2
  copy: string;        // Chapter body text
  artifactIds: string[]; // Which artifacts belong here
  linkLabel?: string;
  linkHref?: string;
}

export const ARCHIVE_CHAPTERS: ArchiveChapter[] = [
  {
    id: "c01",
    number: "01",
    title: "DEFINE THE RIDE",
    headline: "BEFORE THE FRAME,\nDEFINE THE BEHAVIOUR.",
    copy: "The first useful drawing is not necessarily a bicycle.\n\nBefore tube shapes and linkage positions, Project 01 needs a behavioural brief.\n\nHow should it climb? How should it carry speed? How much support should the rider feel? How much movement space does the rider need? What kind of terrain should expose the limits of the machine?\n\nThe ride requirements become the filter for everything that follows.",
    artifactIds: ["ALK-SKETCH-001"],
  },
  {
    id: "c02",
    number: "02",
    title: "ESTABLISH THE PROPORTIONS",
    headline: "MAKE IT A BICYCLE\nBEFORE MAKING IT BEAUTIFUL.",
    copy: "Early proportion studies establish the relationship between wheels, rider, suspension, front triangle and rear centre.\n\nAt this stage the objective is not surface refinement.\n\nIt is making the major volumes agree.",
    artifactIds: ["ALK-SKETCH-002"],
  },
  {
    id: "c03",
    number: "03",
    title: "CLOSE THE GEOMETRY",
    headline: "THE NUMBERS\nHAVE TO AGREE.",
    copy: "Geometry is not a collection of independent numbers.\n\nReach changes rider position. Stack changes the front-centre relationship. Head angle interacts with fork length and offset. Rear centre affects weight distribution and wheelbase. Bottom-bracket position changes both stability and clearance.\n\nProject 01 therefore moves from broad envelopes toward a controlled master geometry.",
    artifactIds: ["ALK-SKETCH-003", "ALK-SKETCH-011"],
  },
  {
    id: "c04",
    number: "04",
    title: "SOLVE THE SUSPENSION",
    headline: "TRAVEL IS THE EASY NUMBER.",
    copy: "150 mm tells us how far the rear wheel moves.\n\nIt does not tell us what happens while it moves.\n\nSuspension development needs to resolve leverage, axle path, anti-squat, anti-rise, chain growth, shock packaging, clearance, bearing placement, and structure.",
    artifactIds: ["ALK-SKETCH-005", "ALK-SKETCH-006", "ALK-SKETCH-007"],
  },
  {
    id: "c05",
    number: "05",
    title: "PACKAGE THE MACHINE",
    headline: "EVERYTHING\nWANTS THE SAME SPACE.",
    copy: "Shock. Bottle. Tyre. Chainring. Crank. Seatpost. Cable. Bearing. Frame wall. Rider.\n\nPackaging is where a clean concept begins negotiating with physical reality.",
    artifactIds: ["ALK-SKETCH-006", "ALK-SKETCH-007", "ALK-SKETCH-010"],
  },
  {
    id: "c06",
    number: "06",
    title: "STRUCTURE THE FRAME",
    headline: "THE SURFACE\nIS THE LAST THING YOU SEE.",
    copy: "Below the visible frame sit the load paths created by impact, braking, pedalling, suspension, steering, and the rider.\n\nTube shape cannot be separated from structure.\n\nThe visible chassis should eventually become the consequence of the forces moving through it.",
    artifactIds: ["ALK-SKETCH-008"],
  },
  {
    id: "c07",
    number: "07",
    title: "DEVELOP THE MATERIAL",
    headline: "CARBON\nHAS A DIRECTION.",
    copy: "Carbon development begins long before somebody writes a target frame weight.\n\nFibre direction. Ply boundary. Local reinforcement. Wall transition. Insert design. Compaction. Cure. Inspection.\n\nProject 01's final laminate remains subject to engineering and physical validation.",
    artifactIds: ["ALK-SKETCH-009"],
    linkLabel: "MATERIALS",
    linkHref: "/engineering/materials",
  },
  {
    id: "c08",
    number: "08",
    title: "INTEGRATE THE COMPONENTS",
    headline: "THE FRAME\nDOESN'T EXIST ALONE.",
    copy: "Fork. Shock. Brakes. Wheels. Tyres. Drivetrain. Cockpit. Dropper.\n\nTheir dimensions and loads affect the chassis.\n\nComponent integration therefore begins during engineering, not when the frame arrives for assembly.",
    artifactIds: ["ALK-SKETCH-010"],
    linkLabel: "SYSTEM EXPLORER",
    linkHref: "/about/reverse-engineering",
  },
  {
    id: "c09",
    number: "09",
    title: "CONTROL THE DESIGN",
    headline: "FROM IDEA\nTO INSTRUCTION.",
    copy: "Development eventually reaches a point where the bicycle needs a controlled definition.\n\nDatums. Coordinates. Dimensions. Revisions. Interfaces.\n\nThe objective is simple: the manufacturer should eventually receive the Alkota design to build. Not a request to finish it.",
    artifactIds: ["ALK-SKETCH-011"],
  },
  {
    id: "c10",
    number: "10",
    title: "BUILD THE PROTOTYPE",
    headline: "THE FIRST REAL\nARGUMENT WITH THE DRAWING.",
    copy: "The prototype is where drawings become physical constraints.\n\nThings fit. Or they do not. Clearances work. Or they do not. The suspension moves. The rider climbs on. The design starts answering back.",
    artifactIds: ["ALK-SKETCH-012"],
  },
];

// ── ARTIFACT RECORDS ──────────────────────────────────────────────────────────

export const DESIGN_ARCHIVE: DesignArtifactRecord[] = [
  {
    id: "ALK-SKETCH-001",
    slug: "alk-sketch-001",
    sequence: 1,
    type: "CONCEPT SKETCH",
    phase: "PHASE 00 — DEFINITION",
    chapterId: "c01",
    revision: "R00",
    title: "EARLY RIDE REQUIREMENTS",
    subtitle: "Behavioural brief before the frame",
    caption: "First-principles ride requirement mapping. What does the machine need to do? Where does it need to do it? Who is riding it?",
    theQuestion: "What should this bicycle actually do?",
    theDecision: "Define the ride envelope — climbing character, descent support, terrain type, rider movement space — before specifying travel, geometry or components.",
    why: "A frame built without a ride brief is just engineering optimised against nothing. The ride brief becomes the filter for every subsequent decision.",
    whatHappenedNext: "The behavioural brief directly seeded the geometry envelope study (ALK-SKETCH-003) and travel targets.",
    founderNote: "One thing I want to keep in this archive is the stuff that didn't survive. The finished bike makes more sense when you can see the questions that came before it.",
    assetPath: "/story/sketches/alk-sketch-001.webp",
    aspectRatio: "4:3",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedJournalSlug: "001-why-one-bike",
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
    optionalNote: "Handwritten requirement matrix — scan at 600 DPI min.",
  },
  {
    id: "ALK-SKETCH-002",
    slug: "alk-sketch-002",
    sequence: 2,
    type: "DESIGN STUDY",
    phase: "PHASE 01 — ARCHITECTURE",
    chapterId: "c02",
    revision: "R00",
    title: "INITIAL FRAME PROPORTION STUDIES",
    subtitle: "Major volumes before refinement",
    caption: "Early proportion and silhouette exploration. Front-centre, reach and stack relationships sketched before geometry numbers were set.",
    theQuestion: "Where do the major masses sit relative to each other?",
    theDecision: "Establish the wheelbase, front-centre and rear-centre relationship visually before committing to geometric numbers.",
    why: "Proportion errors are cheapest to fix at the sketch stage. If the bike looks wrong before geometry is calculated, it will be wrong after.",
    assetPath: "/story/sketches/alk-sketch-002.webp",
    aspectRatio: "16:9",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedJournalSlug: "002-defining-the-ride",
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
    optionalNote: "Pencil on A3 — multiple proportions on single sheet.",
  },
  {
    id: "ALK-SKETCH-003",
    slug: "alk-sketch-003",
    sequence: 3,
    type: "GEOMETRY STUDY",
    phase: "PHASE 01 — ARCHITECTURE",
    chapterId: "c03",
    revision: "R00",
    title: "GEOMETRY ENVELOPE",
    subtitle: "R00 Large geometry development",
    caption: "R00 Large geometry envelope. Key angles and lengths with development note annotations.",
    theQuestion: "What are the geometric boundaries that must hold as sizes scale?",
    theDecision: "Define the Large master geometry first — reach, stack, head angle, STA — then scale proportionally for S/M/XL.",
    why: "Scaling from a single master size is more consistent than independently sizing each frame.",
    whatHappenedNext: "Led directly to R00 Controlled Geometry document (ALK-SKETCH-011).",
    assetPath: "/story/sketches/alk-sketch-003.webp",
    aspectRatio: "4:3",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedJournalSlug: "003-from-benchmark-to-alkota",
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
  },
  {
    id: "ALK-SKETCH-004",
    slug: "alk-sketch-004",
    sequence: 4,
    type: "ENGINEERING STUDY",
    phase: "PHASE 02 — STRUCTURAL FORM",
    chapterId: "c06",
    revision: "R00",
    title: "HEADTUBE / DOWNTUBE STUDY",
    subtitle: "Front triangle junction development",
    caption: "Front triangle junction study. Headtube interface geometry and downtube transition section development.",
    theQuestion: "How should the headtube, downtube and toptube junction be structured for maximum stiffness and minimum weight?",
    theDecision: "Integrated monocoque junction with tapered downtube transition. No exposed tube mitre — wall continuity through the junction.",
    why: "The headtube-downtube junction carries the highest combined bending and torsional loads. It is where the fork, handlebar and front wheel inputs converge.",
    assetPath: "/story/sketches/alk-sketch-004.webp",
    aspectRatio: "3:4",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
  },
  {
    id: "ALK-SKETCH-005",
    slug: "alk-sketch-005",
    sequence: 5,
    type: "ENGINEERING STUDY",
    phase: "PHASE 02 — STRUCTURAL FORM",
    chapterId: "c04",
    revision: "R00",
    title: "REAR SUSPENSION ARCHITECTURE",
    subtitle: "Linkage geometry and pivot placement",
    caption: "Linkage geometry and pivot location study. Anti-squat, leverage ratio progression and axle path worked out at the sketch stage before CAD modelling.",
    theQuestion: "What suspension geometry serves the Project 01 ride brief — and where do the pivots need to live to achieve it?",
    theDecision: "Low-pivot four-bar / Horst-style kinematic family. Pivot positions chosen to achieve progressive leverage ratio, appropriate axle path, and controlled anti-squat.",
    why: "The low-pivot family produces a longer, more rearward axle path under compression — better suited to high-speed technical terrain than high-pivot alternatives at this travel range.",
    whatHappenedNext: "Led to detailed linkage packaging study (ALK-SKETCH-006) and shock packaging (ALK-SKETCH-007).",
    assetPath: "/story/sketches/alk-sketch-005.webp",
    aspectRatio: "4:3",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedJournalSlug: "005-suspension-architecture",
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
    optionalNote: "Key document — include with development archive.",
    annotations: [
      { number: 1, label: "MAIN PIVOT", note: "Primary rotation centre for four-bar family" },
      { number: 2, label: "LOWER LINK", note: "Rocker / idler geometry" },
      { number: 3, label: "AXLE PATH", note: "Rearward-and-up path under compression" },
      { number: 4, label: "ANTI-SQUAT ZONE", note: "Leverage ratio at sag point" },
    ],
  },
  {
    id: "ALK-SKETCH-006",
    slug: "alk-sketch-006",
    sequence: 6,
    type: "PACKAGING STUDY",
    phase: "PHASE 02 — STRUCTURAL FORM",
    chapterId: "c04",
    revision: "R00",
    title: "LINKAGE PACKAGING STUDY",
    subtitle: "Mud clearance, bearing housing and interference",
    caption: "Rocker and idler link geometry. Mud clearance, bearing housing and frame interference checked at sketch phase.",
    theQuestion: "Can the linkage fit within the envelope defined by tyre, chainstay, and shock with adequate mud clearance?",
    theDecision: "Rocker geometry positioned above the BB shell with 35 mm minimum mud clearance to 29×2.5\" rear tyre envelope.",
    why: "Packaging failures at this stage are expensive to redesign in CAD. Checking clearances at sketch phase saves iteration.",
    assetPath: "/story/sketches/alk-sketch-006.webp",
    aspectRatio: "3:2",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
  },
  {
    id: "ALK-SKETCH-007",
    slug: "alk-sketch-007",
    sequence: 7,
    type: "PACKAGING STUDY",
    phase: "PHASE 02 — STRUCTURAL FORM",
    chapterId: "c04",
    revision: "R00",
    title: "SHOCK PACKAGING",
    subtitle: "Rear shock envelope and mount geometry",
    caption: "Rear shock envelope and trunnion mount positioning relative to seat tube and top tube junction.",
    theQuestion: "Where does the rear shock live, and does it compromise bottle access, seat tube length, or cable routing?",
    theDecision: "Horizontally oriented shock between seat tube and top tube. Trunnion lower mount allows shorter eye-to-eye for improved packaging.",
    why: "A horizontal shock orientation provides the most predictable interaction with the linkage geometry and maintains internal cable routing access.",
    assetPath: "/story/sketches/alk-sketch-007.webp",
    aspectRatio: "3:4",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
  },
  {
    id: "ALK-SKETCH-008",
    slug: "alk-sketch-008",
    sequence: 8,
    type: "ENGINEERING STUDY",
    phase: "PHASE 03 — CARBON STRUCTURE",
    chapterId: "c06",
    revision: "R00",
    title: "FRAME SECTION DEVELOPMENT",
    subtitle: "Tube cross-section and load path study",
    caption: "Down tube, top tube and chainstay cross-section profiles. Wall thickness and fibre orientation study.",
    theQuestion: "What cross-sectional profile serves the structural requirements of each tube without adding unnecessary mass?",
    theDecision: "Elliptical downtube profile with variable wall thickness. Chainstay flattened vertically near BB for pedal clearance while maintaining lateral stiffness.",
    why: "Carbon allows section profiles impossible in metal — the cross-section can be optimised for the specific load direction rather than manufacturing constraints.",
    assetPath: "/story/sketches/alk-sketch-008.webp",
    aspectRatio: "4:3",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
  },
  {
    id: "ALK-SKETCH-009",
    slug: "alk-sketch-009",
    sequence: 9,
    type: "MATERIAL STUDY",
    phase: "PHASE 03 — CARBON STRUCTURE",
    chapterId: "c07",
    revision: "R00",
    title: "CARBON LAYUP STUDY",
    subtitle: "Ply sequence and fibre orientation",
    caption: "Ply sequence and orientation map for the front triangle monocoque. Bidirectional, unidirectional and woven zones identified.",
    theQuestion: "What fibre orientations and ply sequences provide the required stiffness and impact resistance at minimum mass?",
    theDecision: "Development laminate specification with dominant 0°/90° UD backbone, ±45° torsional plies at high-shear zones, and woven surface layers.",
    why: "Carbon fibre is only effective in the direction of the fibre. Ply orientation is not a manufacturing detail — it is a structural decision.",
    assetPath: "/story/sketches/alk-sketch-009.webp",
    aspectRatio: "16:9",
    status: "PLACEHOLDER",
    visibility: "STUDIO_ONLY", // Confidential layup data
    publicDownload: false,
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
    optionalNote: "Confidential layup data — internal distribution only.",
    confidential: true,
  },
  {
    id: "ALK-SKETCH-010",
    slug: "alk-sketch-010",
    sequence: 10,
    type: "COMPONENT STUDY",
    phase: "PHASE 04 — INTEGRATION",
    chapterId: "c08",
    revision: "R00",
    title: "COMPONENT INTEGRATION",
    subtitle: "Drivetrain, braking and cable routing",
    caption: "Drivetrain, braking and cable routing integration study. Clearances and mud relief checked against wheel size envelopes.",
    theQuestion: "How do the selected components interact with the chassis geometry and each other?",
    theDecision: "Internal full cable routing via integrated ports. Direct mount front derailleur deleted — 1× drivetrain only. ISCG05 tabs integrated for future guide options.",
    why: "Integration failures are expensive to correct post-tooling. Component envelopes must be verified against the frame geometry before mould release.",
    assetPath: "/story/sketches/alk-sketch-010.webp",
    aspectRatio: "4:3",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
  },
  {
    id: "ALK-SKETCH-011",
    slug: "alk-sketch-011",
    sequence: 11,
    type: "CONTROLLED DRAWING",
    phase: "PHASE 04 — INTEGRATION",
    chapterId: "c09",
    revision: "R00",
    title: "R00 CONTROLLED GEOMETRY",
    subtitle: "Master geometry — development baseline",
    caption: "Finalised R00 controlled geometry drawing. All key dimensions, stack, reach, BB drop and axle-to-crown captured for prototype tooling reference.",
    theQuestion: "What is the locked geometric definition for the R00 prototype?",
    theDecision: "R00 Large: 485 mm reach / 640.7 mm stack / 64° head angle / 78° STA / 431 mm rear centre. NOT FOR MANUFACTURE — development baseline.",
    why: "Without a controlled geometry document, each supplier and collaborator works from different numbers. The master geometry is the version that overrules everything else.",
    assetPath: "/story/sketches/alk-sketch-011.webp",
    aspectRatio: "16:9",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedJournalSlug: "003-from-benchmark-to-alkota",
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
    optionalNote: "Master geometry document — approve before tooling release.",
    annotations: [
      { number: 1, label: "REACH 485mm", note: "Large — R00 development baseline" },
      { number: 2, label: "STACK 640.7mm", note: "Large — R00 development baseline" },
      { number: 3, label: "HEAD ANGLE 64°", note: "Development target" },
      { number: 4, label: "STA 78°", note: "Effective seat tube angle" },
    ],
  },
  {
    id: "ALK-SKETCH-012",
    slug: "alk-sketch-012",
    sequence: 12,
    type: "PROTOTYPE RECORD",
    phase: "PHASE 05 — PROTOTYPE",
    chapterId: "c10",
    revision: "R00",
    title: "PROTOTYPE REVISION NOTES",
    subtitle: "First prototype review",
    caption: "First prototype review annotations. What worked, what changed, and why. Development is the product.",
    theQuestion: "What does the physical prototype reveal that the drawing did not?",
    theDecision: "TBD — prototype build and review pending programme milestone.",
    why: "The prototype is the first time the design encounters reality. Revision notes from this stage are among the most valuable engineering documents in the archive.",
    whatHappenedNext: "Prototype review feeds into the R01 engineering revision.",
    assetPath: "/story/sketches/alk-sketch-012.webp",
    aspectRatio: "4:3",
    status: "PLACEHOLDER",
    visibility: "PUBLIC",
    publicDownload: false,
    relatedRevision: "R00",
    dateAdded: "2026-01-15",
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

export function getAllPublicArtifacts(): DesignArtifactRecord[] {
  return DESIGN_ARCHIVE.filter((a) => a.visibility === "PUBLIC");
}

export function getArtifactBySlug(slug: string): DesignArtifactRecord | undefined {
  return DESIGN_ARCHIVE.find((a) => a.slug === slug);
}

export function getArtifactById(id: string): DesignArtifactRecord | undefined {
  return DESIGN_ARCHIVE.find((a) => a.id === id);
}

export function getChapterArtifacts(chapterId: string): DesignArtifactRecord[] {
  const chapter = ARCHIVE_CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) return [];
  // Return in order, deduplicated (artifact may appear in multiple chapters)
  const seen = new Set<string>();
  return chapter.artifactIds
    .map((id) => getArtifactById(id))
    .filter((a): a is DesignArtifactRecord => {
      if (!a || seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
}

/** Legacy compatibility — for components still using the old DesignJourneyAsset shape */
export function toDesignJourneyAsset(a: DesignArtifactRecord) {
  return {
    id: a.id,
    title: a.title,
    phase: a.phase,
    caption: a.caption,
    aspectRatio: a.aspectRatio,
    assetPath: a.assetPath,
    status: a.status === "PUBLISHED" ? ("AVAILABLE" as const) : ("PENDING" as const),
    revision: a.revision,
    optionalNote: a.optionalNote,
  };
}
