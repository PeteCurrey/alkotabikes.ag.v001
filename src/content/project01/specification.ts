/**
 * ALKOTA PROJECT 01 — CONTROLLED SPECIFICATION SYSTEM
 * 
 * Central Source of Truth for Project 01 Engineering Specification,
 * Platform Status, Geometry, and Programme Milestones.
 */

export type EngineeringStatus =
  | "DEVELOPMENT_BASELINE"
  | "UNDER_REVIEW"
  | "APPROVED_FOR_PROTOTYPE"
  | "VALIDATION_PENDING"
  | "VALIDATED"
  | "PRODUCTION_RELEASED"
  | "OPTION"
  | "SUPERSEDED";

export interface SpecificationItem<T = string> {
  value: T;
  label: string;
  status: EngineeringStatus;
  statusText: string;
  notes?: string;
  revisionAdded?: string;
}

export interface GeometryValues {
  reachMm: number;
  stackMm: number;
  headAngleDeg: number;
  effectiveSeatAngleDeg: number;
  rearCentreMm: number;
  wheelbaseMm: number;
  bbDropMm?: number;
  seatTubeLengthMm?: number;
}

export interface GeometrySizeSpec {
  size: "S" | "M" | "L" | "XL";
  name: string;
  values: GeometryValues | null;
  status: EngineeringStatus;
  statusText: string;
  notes?: string;
}

export const PROJECT_01_SPECIFICATION = {
  project: "Project 01",
  codeName: "P01-R00",
  currentRevision: "R00",
  programmeStatus: "PRE-PRODUCTION DEVELOPMENT" as const,
  intendedUse: "Aggressive all-mountain / lightweight enduro",
  
  frontTravel: {
    value: "160 mm",
    label: "160 mm Front Travel",
    status: "DEVELOPMENT_BASELINE" as EngineeringStatus,
    statusText: "DEVELOPMENT BASELINE",
    notes: "Targeted balance of chassis compliance and support in high-speed technical alpine terrain.",
    revisionAdded: "R00",
  },

  rearTravel: {
    value: "150 mm",
    label: "150 mm Rear Travel",
    status: "DEVELOPMENT_BASELINE" as EngineeringStatus,
    statusText: "DEVELOPMENT BASELINE",
    notes: "Low-pivot four-bar kinematics family calibrated for mid-stroke support.",
    revisionAdded: "R00",
  },

  primaryWheelFormat: {
    value: "29 / 29",
    label: "29\" Front / 29\" Rear",
    status: "DEVELOPMENT_BASELINE" as EngineeringStatus,
    statusText: "DEVELOPMENT BASELINE",
    notes: "Primary wheel platform. MX (29F / 27.5R) remains under secondary engineering study.",
    revisionAdded: "R00",
  },

  frameMaterialIntent: {
    value: "Full Carbon Chassis",
    label: "Full Carbon Chassis Intent",
    status: "DEVELOPMENT_BASELINE" as EngineeringStatus,
    statusText: "DEVELOPMENT BASELINE",
    notes: "Custom structural carbon layup architecture undergoing FEA stress simulation.",
    revisionAdded: "R00",
  },

  suspensionArchitecture: {
    value: "Low-pivot four-bar / Horst-style development family",
    label: "Low-pivot Four-bar / Horst-style",
    status: "DEVELOPMENT_BASELINE" as EngineeringStatus,
    statusText: "DEVELOPMENT BASELINE",
    notes: "Kinematic hard points subject to physical prototype validation.",
    revisionAdded: "R00",
  },

  raceProgramme: {
    year: "2027",
    label: "Planned Race-Development Programme 2027",
    status: "APPROVED_FOR_PROTOTYPE" as EngineeringStatus,
    statusText: "PLANNED PROGRAMME 2027",
    notes: "Prototype competition validation prior to production lock.",
    revisionAdded: "R00",
  },

  productionLaunch: {
    year: "2028",
    label: "Planned Production Launch 2028",
    status: "APPROVED_FOR_PROTOTYPE" as EngineeringStatus,
    statusText: "PLANNED LAUNCH 2028",
    notes: "Production reservation pipeline opens following race development.",
    revisionAdded: "R00",
  },
};

// ──────────────────────────────────────────────────────
// CONTROLLED GEOMETRY MODEL
// ──────────────────────────────────────────────────────

export const PROJECT_01_GEOMETRY = {
  revision: "R00",
  status: "R00 DEVELOPMENT GEOMETRY" as const,
  disclaimer: "R00 LARGE MASTER DEVELOPMENT GEOMETRY — SUBJECT TO PROTOTYPE VALIDATION",
  sizes: {
    small: {
      size: "S",
      name: "Small (Development Pending)",
      values: null,
      status: "UNDER_REVIEW" as EngineeringStatus,
      statusText: "UNDER ENGINEERING REVIEW",
      notes: "Small size geometry will be derived after Large master physical validation.",
    },
    medium: {
      size: "M",
      name: "Medium (Development Pending)",
      values: null,
      status: "UNDER_REVIEW" as EngineeringStatus,
      statusText: "UNDER ENGINEERING REVIEW",
      notes: "Medium size geometry will be derived after Large master physical validation.",
    },
    large: {
      size: "L",
      name: "Large R00 Master",
      values: {
        reachMm: 485,
        stackMm: 640.7,
        headAngleDeg: 63.8,
        effectiveSeatAngleDeg: 78.1,
        rearCentreMm: 444,
        wheelbaseMm: 1278.4,
        bbDropMm: 28,
        seatTubeLengthMm: 430,
      },
      status: "DEVELOPMENT_BASELINE" as EngineeringStatus,
      statusText: "R00 LARGE MASTER",
      notes: "Controlled engineering baseline for physical prototype development.",
    },
    xlarge: {
      size: "XL",
      name: "X-Large (Development Pending)",
      values: null,
      status: "UNDER_REVIEW" as EngineeringStatus,
      statusText: "UNDER ENGINEERING REVIEW",
      notes: "X-Large size geometry will be derived after Large master physical validation.",
    },
  } as Record<string, GeometrySizeSpec>,
};

// ──────────────────────────────────────────────────────
// API / SELECTOR HELPERS
// ──────────────────────────────────────────────────────

export function getCurrentProject01Specification() {
  return PROJECT_01_SPECIFICATION;
}

export function getDevelopmentStatus() {
  return {
    programmeStatus: PROJECT_01_SPECIFICATION.programmeStatus,
    currentRevision: PROJECT_01_SPECIFICATION.currentRevision,
    isProductionReleased: false,
    isValidationCompleted: false,
  };
}

export function getGeometry(size: "S" | "M" | "L" | "XL" = "L") {
  const sizeMap: Record<string, keyof typeof PROJECT_01_GEOMETRY.sizes> = {
    S: "small",
    M: "medium",
    L: "large",
    XL: "xlarge",
  };
  return PROJECT_01_GEOMETRY.sizes[sizeMap[size]];
}
