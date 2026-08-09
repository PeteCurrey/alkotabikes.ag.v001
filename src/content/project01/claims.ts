/**
 * ALKOTA PROJECT 01 — ENGINEERING CLAIMS REGISTER
 *
 * Master source of truth for all Project 01 engineering claims.
 * Every claim that may appear publicly MUST originate from this register.
 * Public wording is derived via the Public Language Engine — never rendered directly.
 *
 * R00 AUDIT: 10 claims identified. All classified EVIDENCE_REQUIRED.
 * No R00 claim is currently VALIDATED or PRODUCTION_RELEASED.
 */

export type ClaimType =
  | "TARGET"
  | "DESIGN_INTENT"
  | "CALCULATED"
  | "SIMULATED"
  | "MEASURED"
  | "TESTED"
  | "VALIDATED"
  | "PRODUCTION_SPECIFICATION";

export type ClaimStatus =
  | "DRAFT"
  | "ENGINEERING_REVIEW"
  | "EVIDENCE_REQUIRED"
  | "APPROVED_DEVELOPMENT"
  | "VALIDATION_PENDING"
  | "VALIDATED"
  | "PRODUCTION_RELEASED"
  | "SUPERSEDED";

export type ClaimSourceType =
  | "ENGINEERING_DRAWING"
  | "CAD_MODEL"
  | "CALCULATION"
  | "SIMULATION"
  | "BENCH_TEST"
  | "LAB_TEST"
  | "RIDE_TEST"
  | "SUPPLIER_DOCUMENT"
  | "COMPONENT_MANUFACTURER"
  | "CONTROLLED_SPECIFICATION"
  | "OTHER";

export type ClaimSystem =
  | "GEOMETRY"
  | "KINEMATICS"
  | "MATERIALS"
  | "FIT"
  | "SUSPENSION"
  | "DRIVETRAIN"
  | "COMPONENTS";

export interface EngineeringClaim {
  claimReference: string;         // APC-XXXXXX
  project: string;
  system: ClaimSystem;
  title: string;
  value: string;
  unit?: string;
  claimType: ClaimType;
  status: ClaimStatus;
  engineeringRevision: string;

  // Evidence provenance
  sourceType?: ClaimSourceType;
  sourceReference?: string;
  sourceDocument?: string;
  evidenceSummary?: string;
  evidenceFile?: string;

  // Validation
  validationMethod?: string;
  validatedBy?: string;
  validatedAt?: string;

  // Approval
  approvedBy?: string;
  approvedAt?: string;

  // Public language (set by approved engineer, not auto-generated)
  publicWording?: string;
  internalWording: string;
  publicVisibility: boolean;

  // Lineage
  supersedes?: string;
  supersededBy?: string;

  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// R00 CLAIMS REGISTER — 10 claims audited, all EVIDENCE_REQUIRED
// ─────────────────────────────────────────────────────────────────────────────

export const ENGINEERING_CLAIMS: EngineeringClaim[] = [
  {
    claimReference: "APC-001001",
    project: "PROJECT_01",
    system: "SUSPENSION",
    title: "Front Travel",
    value: "160",
    unit: "mm",
    claimType: "TARGET",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Targeted front travel based on geometry and terrain requirement study. No physical prototype data yet filed.",
    publicWording: "Development Target",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001002",
    project: "PROJECT_01",
    system: "SUSPENSION",
    title: "Rear Travel",
    value: "150",
    unit: "mm",
    claimType: "TARGET",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Targeted rear travel, calibrated for low-pivot four-bar kinematics family. No physical prototype data yet filed.",
    publicWording: "Development Target",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001003",
    project: "PROJECT_01",
    system: "GEOMETRY",
    title: "Primary Wheel Platform",
    value: "29/29",
    unit: "inch",
    claimType: "DESIGN_INTENT",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Primary wheel architecture direction. MX option (29F/27.5R) under secondary engineering study. Not physically validated.",
    publicWording: "Engineering Direction",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001004",
    project: "PROJECT_01",
    system: "MATERIALS",
    title: "Chassis Material Intent",
    value: "Full Carbon",
    claimType: "DESIGN_INTENT",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "High-modulus UD carbon monocoque direction for main chassis. No FEA analysis or structural coupon data filed.",
    publicWording: "Engineering Direction",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001005",
    project: "PROJECT_01",
    system: "KINEMATICS",
    title: "Suspension Architecture",
    value: "Low-pivot four-bar / Horst-style",
    claimType: "DESIGN_INTENT",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Preferred suspension architecture family. Hard points remain an engineering optimisation problem until kinematic curves and physical clearances are validated.",
    publicWording: "Engineering Direction",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001006",
    project: "PROJECT_01",
    system: "FIT",
    title: "Frame Size Family",
    value: "S1 / S2 / S3 / S4",
    claimType: "DESIGN_INTENT",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Four-size fit family. S/M/XL geometry to be derived from Large master after physical prototype validation. Only Large master has defined values.",
    publicWording: "Engineering Direction",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001007",
    project: "PROJECT_01",
    system: "GEOMETRY",
    title: "Large Master Geometry — R00",
    value: "Reach 485 mm / Stack 640.7 mm / HA 63.8° / ESA 78.1° / RC 444 mm / WB 1278.4 mm",
    claimType: "CALCULATED",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "R00 Large master geometry calculated from design brief requirements. CAD values defined in controlled specification. Source drawing not formally filed as evidence.",
    publicWording: "Engineering Baseline",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001008",
    project: "PROJECT_01",
    system: "KINEMATICS",
    title: "Kinematic Curves — R00 Simulation",
    value: "Leverage Ratio / Anti-Squat / Axle Path",
    claimType: "SIMULATED",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Kinematic curves derived from suspension simulation model. Renders live in engineering section. Simulation source document and method not formally filed.",
    publicWording: "Simulation Baseline",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001009",
    project: "PROJECT_01",
    system: "MATERIALS",
    title: "Layup Schedule Direction — R00",
    value: "R00 Direction",
    claimType: "DESIGN_INTENT",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Carbon layup schedule direction established. To be developed alongside structural FEA, physical coupons, prototype testing, and manufacturing process input. No structural data filed.",
    publicWording: "Engineering Direction",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
  {
    claimReference: "APC-001010",
    project: "PROJECT_01",
    system: "FIT",
    title: "Fit Engine Geometry Outputs",
    value: "Stack / Reach / Saddle Height — Algorithm R00",
    claimType: "CALCULATED",
    status: "EVIDENCE_REQUIRED",
    engineeringRevision: "R00",
    internalWording:
      "Fit algorithm (fitModel.ts) generates stack, reach, and saddle height outputs from rider measurements. Algorithm not yet reviewed and approved by engineering lead.",
    publicWording: "Engineering Baseline",
    publicVisibility: false,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-15T00:00:00Z",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM GROUPING FOR RELEASE READINESS DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

export const CLAIM_SYSTEMS: ClaimSystem[] = [
  "GEOMETRY",
  "KINEMATICS",
  "MATERIALS",
  "FIT",
  "SUSPENSION",
  "DRIVETRAIN",
  "COMPONENTS",
];

export const RELEASE_GATES = {
  DEVELOPMENT_RELEASE: ["APPROVED_DEVELOPMENT", "VALIDATION_PENDING", "VALIDATED", "PRODUCTION_RELEASED"] as ClaimStatus[],
  PROTOTYPE_RELEASE:   ["VALIDATION_PENDING", "VALIDATED", "PRODUCTION_RELEASED"] as ClaimStatus[],
  PRODUCTION_RELEASE:  ["PRODUCTION_RELEASED"] as ClaimStatus[],
};
