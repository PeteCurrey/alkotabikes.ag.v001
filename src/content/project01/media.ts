/**
 * ALKOTA PROJECT 01 — VISUAL ASSET MANIFEST
 * 
 * Source of truth for all Project 01 imagery used in the configurator
 * and digital showroom. Only approved master images are tagged here.
 * 
 * STATUS: PRE-PRODUCTION DEVELOPMENT
 * Do not use AI-generated bike concepts that do not accurately represent
 * the current R00 frame geometry, shock position, rocker, or rear triangle.
 */

export type ImageStatus =
  | "APPROVED_MASTER"
  | "APPROVED_SECONDARY"
  | "DEVELOPMENT_USE"
  | "PENDING_APPROVAL"
  | "UNAVAILABLE";

export interface Project01Image {
  src: string;
  alt: string;
  status: ImageStatus;
  view?: string;
  finish?: "GLACIER" | "CARBON" | "BOTH" | "ENVIRONMENT";
  notes?: string;
}

// ──────────────────────────────────────────────────────
// GLACIER WHITE — Master Images
// ──────────────────────────────────────────────────────

export const glacierWhite = {
  /** Primary hero — full side profile, high-key studio environment */
  hero: {
    src: "/images/project01-glacier-white-hero.jpg",
    alt: "Project 01 Glacier White — side profile master",
    status: "APPROVED_MASTER" as ImageStatus,
    view: "SIDE",
    finish: "GLACIER" as const,
    notes: "Primary hero image. Use as default Glacier White view.",
  },

  /** Showroom presentation image */
  showroom: {
    src: "/images/project01-glacier-white.jpg",
    alt: "Project 01 Glacier White — showroom presentation",
    status: "APPROVED_MASTER" as ImageStatus,
    view: "FRONT_3Q",
    finish: "GLACIER" as const,
  },

  /** Standalone white bike — clean background presentation */
  standalone: {
    src: "/images/story/standalone-white-bike-presentation.jpg",
    alt: "Project 01 Glacier White — standalone presentation",
    status: "APPROVED_SECONDARY" as ImageStatus,
    view: "SIDE",
    finish: "GLACIER" as const,
  },

  /** Pete inspecting the Glacier White — detail context */
  inspection: {
    src: "/images/story/pete-currey-glacier-white-presentation.jpg",
    alt: "Pete Currey with Project 01 Glacier White",
    status: "APPROVED_SECONDARY" as ImageStatus,
    view: "DETAIL",
    finish: "GLACIER" as const,
  },

  /** Static PNG version of hero */
  heroPng: {
    src: "/images/project01-glacier-white.jpg",
    alt: "Project 01 Glacier White — hero PNG",
    status: "APPROVED_SECONDARY" as ImageStatus,
    view: "SIDE",
    finish: "GLACIER" as const,
  },
} as const;

// ──────────────────────────────────────────────────────
// NAKED CARBON — Master Images
// ──────────────────────────────────────────────────────

export const nakedCarbon = {
  /** Primary master — full side profile Naked Carbon */
  hero: {
    src: "/images/project01-naked-carbon-hero.jpg",
    alt: "Project 01 Naked Carbon — side profile master",
    status: "APPROVED_MASTER" as ImageStatus,
    view: "SIDE",
    finish: "CARBON" as const,
    notes: "Primary Naked Carbon hero. Use as default Carbon view.",
  },

  /** Studio presentation — dark environment */
  studio: {
    src: "/images/story/project01-naked-carbon-studio.png",
    alt: "Project 01 Naked Carbon — dark studio presentation",
    status: "APPROVED_MASTER" as ImageStatus,
    view: "FRONT_3Q",
    finish: "CARBON" as const,
  },

  /** Standalone dark bike */
  standalone: {
    src: "/images/story/standalone-black-bike-presentation.jpg",
    alt: "Project 01 Naked Carbon — standalone presentation",
    status: "APPROVED_SECONDARY" as ImageStatus,
    view: "SIDE",
    finish: "CARBON" as const,
  },

  /** Pete inspecting the Naked Carbon frame */
  inspection: {
    src: "/images/story/pete-currey-naked-carbon-inspection.jpg",
    alt: "Pete Currey inspecting Naked Carbon frame detail",
    status: "APPROVED_SECONDARY" as ImageStatus,
    view: "DETAIL",
    finish: "CARBON" as const,
  },
} as const;

// ──────────────────────────────────────────────────────
// ENVIRONMENT & CONTEXT IMAGES
// ──────────────────────────────────────────────────────

export const environmentImages = {
  /**
   * Alpine testing context — ASSET PENDING
   * Original file (project01-alpine-testing.png) was byte-identical to
   * engineering-workshop.jpg and has been deleted (defect 4a, 2026-08-09).
   * Genuine field imagery planned for 2027 prototype programme.
   */
  alpineTesting: {
    src: null,
    alt: "Project 01 development — alpine terrain context (asset pending)",
    status: "ASSET_PENDING" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** Lab stress / fatigue bench */
  labFatigue: {
    src: "/images/story/laboratory-stress-fatigue-bench.jpg",
    alt: "Project 01 chassis on laboratory stress fatigue bench",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** CAD / engineering material */
  cadEngineering: {
    src: "/images/story/technical-cad-engineering-material.jpg",
    alt: "Project 01 CAD engineering documentation",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** Kinematic analysis */
  kinematicAnalysis: {
    src: "/images/story/kinematic-dynamics-analysis.jpg",
    alt: "Project 01 kinematic dynamics analysis",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** Reverse engineering telemetry */
  telemetry: {
    src: "/images/story/reverse-engineering-telemetry.jpg",
    alt: "Project 01 reverse engineering telemetry data",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** Workshop chassis assembly */
  workshopAssembly: {
    src: "/images/story/workshop-chassis-assembly.jpg",
    alt: "Project 01 chassis in workshop assembly",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** Carbon fibre layup development */
  carbonLayup: {
    src: "/images/story/carbon-fiber-layup-development.jpg",
    alt: "Carbon fibre layup development process",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** Complete machine integration */
  completeMachine: {
    src: "/images/story/complete-machine-integration.jpg",
    alt: "Project 01 complete machine integration",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },

  /** Component development bench */
  componentBench: {
    src: "/images/story/component-development-bench.jpg",
    alt: "Component development bench testing",
    status: "APPROVED_MASTER" as ImageStatus,
    finish: "BOTH" as const,
  },
} as const;

// ──────────────────────────────────────────────────────
// HELPERS — quick access for configurator
// ──────────────────────────────────────────────────────

/**
 * Returns the primary hero image for a given finish.
 * Always returns the approved master.
 */
export function getFinishHero(finish: "GLACIER" | "CARBON"): Project01Image {
  return finish === "GLACIER" ? glacierWhite.hero : nakedCarbon.hero;
}

/**
 * Returns all available view images for a given finish.
 * Filters to APPROVED_MASTER and APPROVED_SECONDARY only.
 * Only use images that exist — no placeholder inventions.
 */
export function getFinishViews(finish: "GLACIER" | "CARBON"): Project01Image[] {
  const source = finish === "GLACIER" ? glacierWhite : nakedCarbon;
  return Object.values(source).filter(
    (img) =>
      img.status === "APPROVED_MASTER" || img.status === "APPROVED_SECONDARY"
  );
}

// Named export for convenient configurator use
export const PROJECT01_MEDIA = {
  glacierWhite,
  nakedCarbon,
  environment: environmentImages,
  getFinishHero,
  getFinishViews,
} as const;
