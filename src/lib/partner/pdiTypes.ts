/**
 * ALKOTA PARTNER NETWORK — PDI + SETUP RECORD TYPES
 *
 * Pre-Delivery Inspection and customer setup records.
 *
 * NOTE: Final PDI requirements to be defined and approved by operations.
 * The stage list and checklist here are architectural placeholders.
 *
 * Delivery stages:
 * BIKE RECEIVED → VISUAL INSPECTION → BUILD VERIFIED → RIDER FIT REVIEW
 * → SUSPENSION SETUP → CONTROLS → CUSTOMER HANDOVER → OWNER ACTIVATION
 */

export type PDIStageId =
  | "BIKE_RECEIVED"
  | "VISUAL_INSPECTION"
  | "BUILD_VERIFIED"
  | "RIDER_FIT_REVIEW"
  | "SUSPENSION_SETUP"
  | "CONTROLS"
  | "CUSTOMER_HANDOVER"
  | "OWNER_ACTIVATION";

export type PDIStageStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "FLAGGED";

export const PDI_STAGE_LABELS: Record<PDIStageId, string> = {
  BIKE_RECEIVED: "Bike Received",
  VISUAL_INSPECTION: "Visual Inspection",
  BUILD_VERIFIED: "Build Verified",
  RIDER_FIT_REVIEW: "Rider Fit Review",
  SUSPENSION_SETUP: "Suspension Setup",
  CONTROLS: "Controls",
  CUSTOMER_HANDOVER: "Customer Handover",
  OWNER_ACTIVATION: "Owner Activation",
};

export const PDI_STAGE_ORDER: PDIStageId[] = [
  "BIKE_RECEIVED",
  "VISUAL_INSPECTION",
  "BUILD_VERIFIED",
  "RIDER_FIT_REVIEW",
  "SUSPENSION_SETUP",
  "CONTROLS",
  "CUSTOMER_HANDOVER",
  "OWNER_ACTIVATION",
];

/**
 * Setup record — suspension and contact point settings.
 * All values null until recorded during PDI.
 * Only appropriate actual component settings should appear dynamically.
 */
export interface SetupRecord {
  // Fork
  forkPressurePsi: number | null;
  forkReboundClicks: number | null;
  forkCompressionClicks: number | null;
  forkTokenCount: number | null;
  // Shock
  shockPressurePsi: number | null;
  shockReboundClicks: number | null;
  shockCompressionClicks: number | null;
  // Tyres
  tyrePressureFrontPsi: number | null;
  tyrePressureRearPsi: number | null;
  // Contact points
  barPositionNotes: string | null;
  leverAngleDeg: number | null;
  leverReachNotes: string | null;
  saddleHeightMm: number | null;
  otherNotes: string | null;
}

export interface PDIRecord {
  id: string;
  allocationId: string;
  dealerId: string;
  technicianId: string | null;
  stages: Record<PDIStageId, PDIStageStatus>;
  setupRecord: SetupRecord | null;
  startedAt: string | null;
  completedAt: string | null;
  handoverSignedAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export function createEmptyPDIStages(): Record<PDIStageId, PDIStageStatus> {
  return {
    BIKE_RECEIVED: "NOT_STARTED",
    VISUAL_INSPECTION: "NOT_STARTED",
    BUILD_VERIFIED: "NOT_STARTED",
    RIDER_FIT_REVIEW: "NOT_STARTED",
    SUSPENSION_SETUP: "NOT_STARTED",
    CONTROLS: "NOT_STARTED",
    CUSTOMER_HANDOVER: "NOT_STARTED",
    OWNER_ACTIVATION: "NOT_STARTED",
  };
}
