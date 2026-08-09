/**
 * ALKOTA PROJECT 01 — SINGLE SOURCE OF TRUTH CONSTANTS
 *
 * All platform size ranges, wheel format baselines, and programme phase states
 * MUST be imported from this file to prevent cross-page drift and contradiction.
 */

export const PROJECT_01_FRAME_SIZES = ["S", "M", "L", "XL"] as const;
export type Project01FrameSize = (typeof PROJECT_01_FRAME_SIZES)[number];

export const PROJECT_01_WHEEL_FORMATS = {
  primary: "29 / 29",
  primaryLabel: '29" Front / 29" Rear (Primary Baseline)',
  evaluation: "29 / 27.5 MX",
  evaluationLabel: '29" Front / 27.5" Rear (MX Secondary Study)',
} as const;

export const PROJECT_01_PROGRAMME_PHASE = {
  currentRevision: "R00",
  currentPhase: "PRE-PRODUCTION DEVELOPMENT",
  prototypeStatus: "NEXT",
  targetProductionYear: "2028",
  raceProgrammeYear: "2027",
} as const;
