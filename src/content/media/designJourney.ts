/**
 * ALKOTA Design Journey — Media Manifest
 *
 * Defines the 12 canonical design-artifact slots for the development archive.
 * Real drawings replace these slots by dropping matching files at `assetPath`.
 * Until then, <DesignArtifact /> renders a sophisticated technical placeholder.
 */

export interface DesignJourneyAsset {
  id: string;
  title: string;
  phase: string;
  caption: string;
  aspectRatio: "4:3" | "3:2" | "1:1" | "16:9" | "3:4";
  assetPath: string;
  status: "PENDING" | "AVAILABLE";
  revision: string;
  optionalNote?: string;
}

export const DESIGN_JOURNEY: DesignJourneyAsset[] = [
  {
    id: "ALK-SKETCH-001",
    title: "EARLY RIDE REQUIREMENTS",
    phase: "PHASE 00 — DEFINITION",
    caption: "First-principles ride requirement mapping. What does the machine need to do? Where does it need to do it? Who is riding it?",
    aspectRatio: "4:3",
    assetPath: "/story/sketches/alk-sketch-001.webp",
    status: "PENDING",
    revision: "R00",
    optionalNote: "Handwritten requirement matrix — scan at 600 DPI min.",
  },
  {
    id: "ALK-SKETCH-002",
    title: "INITIAL FRAME PROPORTION STUDIES",
    phase: "PHASE 01 — ARCHITECTURE",
    caption: "Early proportion and silhouette exploration. Front-centre, reach and stack relationships sketched before geometry numbers were set.",
    aspectRatio: "16:9",
    assetPath: "/story/sketches/alk-sketch-002.webp",
    status: "PENDING",
    revision: "R00",
    optionalNote: "Pencil on A3 — multiple proportions on single sheet.",
  },
  {
    id: "ALK-SKETCH-003",
    title: "GEOMETRY ENVELOPE",
    phase: "PHASE 01 — ARCHITECTURE",
    caption: "R00 Large geometry envelope. Key angles and lengths with development note annotations.",
    aspectRatio: "4:3",
    assetPath: "/story/sketches/alk-sketch-003.webp",
    status: "PENDING",
    revision: "R00",
  },
  {
    id: "ALK-SKETCH-004",
    title: "HEADTUBE / DOWNTUBE STUDY",
    phase: "PHASE 02 — STRUCTURAL FORM",
    caption: "Front triangle junction study. Headtube interface geometry and downtube transition section development.",
    aspectRatio: "3:4",
    assetPath: "/story/sketches/alk-sketch-004.webp",
    status: "PENDING",
    revision: "R00",
  },
  {
    id: "ALK-SKETCH-005",
    title: "REAR SUSPENSION ARCHITECTURE",
    phase: "PHASE 02 — STRUCTURAL FORM",
    caption: "Linkage geometry and pivot location study. Anti-squat, leverage ratio progression and axle path worked out at the sketch stage before CAD modelling.",
    aspectRatio: "4:3",
    assetPath: "/story/sketches/alk-sketch-005.webp",
    status: "PENDING",
    revision: "R00",
    optionalNote: "Key document — include with development archive.",
  },
  {
    id: "ALK-SKETCH-006",
    title: "LINKAGE PACKAGING STUDY",
    phase: "PHASE 02 — STRUCTURAL FORM",
    caption: "Rocker and idler link geometry. Mud clearance, bearing housing and frame interference checked at sketch phase.",
    aspectRatio: "3:2",
    assetPath: "/story/sketches/alk-sketch-006.webp",
    status: "PENDING",
    revision: "R00",
  },
  {
    id: "ALK-SKETCH-007",
    title: "SHOCK PACKAGING",
    phase: "PHASE 02 — STRUCTURAL FORM",
    caption: "Rear shock envelope and trunnion mount positioning relative to seat tube and top tube junction.",
    aspectRatio: "3:4",
    assetPath: "/story/sketches/alk-sketch-007.webp",
    status: "PENDING",
    revision: "R00",
  },
  {
    id: "ALK-SKETCH-008",
    title: "FRAME SECTION DEVELOPMENT",
    phase: "PHASE 03 — CARBON STRUCTURE",
    caption: "Down tube, top tube and chainstay cross-section profiles. Wall thickness and fibre orientation study.",
    aspectRatio: "4:3",
    assetPath: "/story/sketches/alk-sketch-008.webp",
    status: "PENDING",
    revision: "R00",
  },
  {
    id: "ALK-SKETCH-009",
    title: "CARBON LAYUP STUDY",
    phase: "PHASE 03 — CARBON STRUCTURE",
    caption: "Ply sequence and orientation map for the front triangle monocoque. Bidirectional, unidirectional and woven zones identified.",
    aspectRatio: "16:9",
    assetPath: "/story/sketches/alk-sketch-009.webp",
    status: "PENDING",
    revision: "R00",
    optionalNote: "Confidential layup data — internal distribution only.",
  },
  {
    id: "ALK-SKETCH-010",
    title: "COMPONENT INTEGRATION",
    phase: "PHASE 04 — INTEGRATION",
    caption: "Drivetrain, braking and cable routing integration study. Clearances and mud relief checked against wheel size envelopes.",
    aspectRatio: "4:3",
    assetPath: "/story/sketches/alk-sketch-010.webp",
    status: "PENDING",
    revision: "R00",
  },
  {
    id: "ALK-SKETCH-011",
    title: "R00 CONTROLLED GEOMETRY",
    phase: "PHASE 04 — INTEGRATION",
    caption: "Finalised R00 controlled geometry drawing. All key dimensions, stack, reach, BB drop and axle-to-crown captured for prototype tooling reference.",
    aspectRatio: "16:9",
    assetPath: "/story/sketches/alk-sketch-011.webp",
    status: "PENDING",
    revision: "R00",
    optionalNote: "Master geometry document — approve before tooling release.",
  },
  {
    id: "ALK-SKETCH-012",
    title: "PROTOTYPE REVISION NOTES",
    phase: "PHASE 05 — PROTOTYPE",
    caption: "First prototype review annotations. What worked, what changed, and why. Development is the product.",
    aspectRatio: "4:3",
    assetPath: "/story/sketches/alk-sketch-012.webp",
    status: "PENDING",
    revision: "R00",
  },
];

/** Helper: look up a single artifact by ID */
export function getArtifact(id: string): DesignJourneyAsset | undefined {
  return DESIGN_JOURNEY.find((a) => a.id === id);
}