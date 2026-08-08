/**
 * ALKOTA PROJECT 01 — FIT ENGINE MODEL & LOGIC
 * 
 * Rider-led fit model operating on top of controlled Project 01 specification system.
 * Uses controlled Large R00 Master geometry data to calculate development fit indications
 * without fabricating false exact production specs for S/M/XL.
 */

import { PROJECT_01_GEOMETRY, EngineeringStatus } from "./specification";

export type RidingStyle = "Trail" | "All Mountain" | "Enduro" | "Bike Park" | "Mixed";
export type PrimaryPriority = "Agility" | "Balanced" | "Stability";
export type RiderPosition = "Upright" | "Neutral" | "Aggressive" | "Unsure";

export interface Project01FitInput {
  heightCm: number;
  insideLegCm: number;
  armSpanCm?: number;
  shoeSizeEu?: number;
  ridingStyle: RidingStyle;
  primaryPriority: PrimaryPriority;
  riderPosition: RiderPosition;
  currentBike?: string;
  currentSize?: string;
  currentReachMm?: number;
  fitLikesText?: string;
  fitDislikesText?: string;
}

export interface Project01FitResult {
  fitReference: string;
  timestamp: string;
  revision: string;
  recommendedSizeRegion: "S" | "M" | "L" | "XL";
  sizeDisplayName: string;
  confidence: string;
  fitDirectionLabel: string;
  estimatedReachRange: string;
  controlledBaselineRef: string;
  largeMasterData: typeof PROJECT_01_GEOMETRY.sizes.large.values;
  disclaimer: string;
  input: Project01FitInput;
}

/**
 * Calculates development fit direction based on rider dimensions and priority.
 */
export function calculateProject01Fit(input: Project01FitInput): Project01FitResult {
  const { heightCm, primaryPriority, ridingStyle } = input;

  let region: "S" | "M" | "L" | "XL" = "L";
  if (heightCm < 168) region = "S";
  else if (heightCm < 176) region = "M";
  else if (heightCm < 186) region = "L";
  else region = "XL";

  // Priority adjustment near boundary
  if (primaryPriority === "Agility" && heightCm >= 175 && heightCm <= 178) region = "M";
  if (primaryPriority === "Stability" && heightCm >= 183 && heightCm <= 186) region = "XL";

  const sizeNameMap = {
    S: "Size S (Development Indication)",
    M: "Size M (Development Indication)",
    L: "Size L (R00 Master Baseline)",
    XL: "Size XL (Development Indication)",
  };

  const reachEstimateMap = {
    S: "~445 mm target",
    M: "~465 mm target",
    L: "485 mm (R00 Master Baseline)",
    XL: "~505 mm target",
  };

  const hex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, "0");
  const fitRef = `P01-FIT-${hex}`;

  return {
    fitReference: fitRef,
    timestamp: new Date().toISOString().split("T")[0],
    revision: "R00",
    recommendedSizeRegion: region,
    sizeDisplayName: sizeNameMap[region],
    confidence: "DEVELOPMENT INDICATION",
    fitDirectionLabel: `${primaryPriority.toUpperCase()} / ${ridingStyle.toUpperCase()}`,
    estimatedReachRange: reachEstimateMap[region],
    controlledBaselineRef: "R00-LARGE-MASTER",
    largeMasterData: PROJECT_01_GEOMETRY.sizes.large.values,
    disclaimer: "This fit recommendation represents a pre-production development indication. Final sizing, stem length, and handlebar geometry will be confirmed prior to production build lock.",
    input,
  };
}

/**
 * Visual geometry concepts educational explanations
 */
export const GEOMETRY_EXPLANATIONS = [
  {
    key: "reach",
    title: "REACH",
    subtitle: "Horizontal distance from BB center to head tube top center",
    value: "485 mm (Large Master)",
    explanation: "Dictates standing rider cockpit room when descending. Longer reach increases high-speed stability and prevents pitch-over on steep drops.",
  },
  {
    key: "stack",
    title: "STACK",
    subtitle: "Vertical distance from BB center to head tube top center",
    value: "640.7 mm (Large Master)",
    explanation: "Determines handlebar height relative to feet. Adequate stack maintains upper-body mass balance without exhausting forearms on steep trails.",
  },
  {
    key: "rearCentre",
    title: "REAR CENTRE (CHAINSTAY)",
    subtitle: "Distance from BB center to rear axle center",
    value: "444 mm (Large Master)",
    explanation: "Controls rear wheel traction and front wheel weighting. 444 mm balances high-speed stability with natural cornering agility.",
  },
  {
    key: "headAngle",
    title: "HEAD ANGLE",
    subtitle: "Angle of steering axis relative to ground",
    value: "63.8° (Large Master)",
    explanation: "Slacker head angle keeps the front wheel ahead of the rider on steep technical terrain, reducing deflection from trail obstacles.",
  },
  {
    key: "seatAngle",
    title: "EFFECTIVE SEAT ANGLE",
    subtitle: "Angle of seatpost vector relative to ground at saddle height",
    value: "78.1° (Large Master)",
    explanation: "Steep seat angle positions the rider weight forward over the BB during steep climbs, preventing front-wheel lift and lumbar strain.",
  },
  {
    key: "cockpit",
    title: "COCKPIT & STEM INTERFACE",
    subtitle: "Bar width, stem length, and control sweep",
    value: "35 mm / 800 mm Width",
    explanation: "Stem length and handlebar rise fine-tune reach without altering frame structural hard points.",
  },
  {
    key: "contactPoints",
    title: "CONTACT POINTS RELATIONSHIP",
    subtitle: "Saddle, grip, and pedal triangle",
    value: "Custom Setup Envelope",
    explanation: "Grip angle, brake lever reach, and saddle position adapt the machine to individual rider biomechanics.",
  },
];
