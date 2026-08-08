// ALKOTA PROJECT 01 — SINGLE SOURCE OF TRUTH
// Current Development Baseline Controls
// Status: PRE-PRODUCTION DEVELOPMENT
// IMPORTANT: These are DEVELOPMENT controls, not validated production specifications.

export type ControlStatus = "target" | "provisional" | "validated" | "production";

export interface DevelopmentSpecification<T> {
  value: T;
  label: string;
  status: ControlStatus;
  statusText: string;
  note?: string;
}

export const PROJECT_01_BASELINE = {
  project: "Project 01",
  codeName: "P01-R00",
  revision: "R00",
  status: "PRE-PRODUCTION DEVELOPMENT",
  phase: "ENGINEERING DEVELOPMENT",
  platform: "analogue mountain bike",
  intendedUse: "aggressive all-mountain / lightweight enduro",
  
  frontTravel: {
    value: "160mm",
    label: "160 mm",
    status: "target" as ControlStatus,
    statusText: "DEVELOPMENT TARGET",
    note: "Targeted balance of support and compliance for natural technical alpine terrain.",
  },

  rearTravel: {
    value: "150mm",
    label: "150 mm",
    status: "target" as ControlStatus,
    statusText: "DEVELOPMENT TARGET",
    note: "Horst-style four-bar kinematics calibrated for mid-stroke support.",
  },

  primaryWheelFormat: {
    value: "29/29",
    label: "29\" Front / 29\" Rear",
    status: "target" as ControlStatus,
    statusText: "PRIMARY ARCHITECTURE",
    note: "MX (29F / 27.5R) remains under secondary development study.",
  },

  frameIntent: {
    value: "full-carbon",
    label: "Full Carbon Chassis",
    status: "provisional" as ControlStatus,
    statusText: "PROVISIONAL ARCHITECTURE",
    note: "Custom structural layups under finite-element and lab testing.",
  },

  architecture: {
    value: "four-bar-horst",
    label: "Low-pivot four-bar / Horst-style development family",
    status: "target" as ControlStatus,
    statusText: "DEVELOPMENT KINEMATICS",
  },

  productionLaunch: {
    year: "2028",
    status: "planned" as ControlStatus,
    statusText: "PLANNED PRODUCTION 2028",
  },

  raceDevelopment: {
    year: "2027",
    status: "planned" as ControlStatus,
    statusText: "PLANNED PROGRAMME 2027",
  },

  milestones: {
    current: "ENGINEERING DEVELOPMENT",
    next: "PROTOTYPE DEVELOPMENT",
    futureRace: "RACE VALIDATION (PLANNED 2027)",
    futureProduction: "PRODUCTION LAUNCH (PLANNED 2028)",
  }
};
