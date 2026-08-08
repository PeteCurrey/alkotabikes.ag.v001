/**
 * ALKOTA PARTNER NETWORK — TRAINING MODULES
 *
 * Training module registry and completion tracking.
 * Training content does not yet exist. Architecture only.
 */

export type TrainingModuleId =
  | "PROJECT_01"
  | "FIT"
  | "SUSPENSION_SETUP"
  | "PDI"
  | "SERVICE"
  | "WARRANTY";

export interface TrainingModule {
  id: TrainingModuleId;
  title: string;
  description: string;
  estimatedDurationMinutes: number | null;
  requiredFor: string[];           // which partner types / roles
  prerequisiteModuleIds: TrainingModuleId[];
  available: boolean;              // false = content not yet created
}

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "PROJECT_01",
    title: "Project 01 — Product Knowledge",
    description: "Engineering philosophy, specification, development programme, and positioning.",
    estimatedDurationMinutes: null,
    requiredFor: ["RETAIL_PARTNER", "DEMO_PARTNER"],
    prerequisiteModuleIds: [],
    available: false,              // Content not yet created
  },
  {
    id: "FIT",
    title: "Alkota Fit Protocol",
    description: "Rider assessment, size direction, reach/stack/stack-to-reach methodology, contact point optimisation.",
    estimatedDurationMinutes: null,
    requiredFor: ["RETAIL_PARTNER", "SERVICE_PARTNER"],
    prerequisiteModuleIds: ["PROJECT_01"],
    available: false,
  },
  {
    id: "SUSPENSION_SETUP",
    title: "Suspension Setup",
    description: "Fork and shock setup methodology, pressure, rebound, compression, volume spacers.",
    estimatedDurationMinutes: null,
    requiredFor: ["RETAIL_PARTNER", "SERVICE_PARTNER"],
    prerequisiteModuleIds: ["PROJECT_01"],
    available: false,
  },
  {
    id: "PDI",
    title: "Pre-Delivery Inspection",
    description: "PDI workflow, torque specification, setup verification, handover procedure.",
    estimatedDurationMinutes: null,
    requiredFor: ["RETAIL_PARTNER", "SERVICE_PARTNER"],
    prerequisiteModuleIds: ["PROJECT_01", "FIT", "SUSPENSION_SETUP"],
    available: false,
  },
  {
    id: "SERVICE",
    title: "Authorised Service",
    description: "Service intervals, consumable specification, drivetrain service, suspension service.",
    estimatedDurationMinutes: null,
    requiredFor: ["SERVICE_PARTNER"],
    prerequisiteModuleIds: ["PDI"],
    available: false,
  },
  {
    id: "WARRANTY",
    title: "Warranty Process",
    description: "Claim submission, diagnostic requirements, parts ordering, resolution workflow.",
    estimatedDurationMinutes: null,
    requiredFor: ["SERVICE_PARTNER", "RETAIL_PARTNER"],
    prerequisiteModuleIds: ["SERVICE"],
    available: false,
  },
];
