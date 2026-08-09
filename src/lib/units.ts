/**
 * ALKOTA CYCLES — MEASUREMENT UNITS
 * lib/units.ts
 *
 * Canonical storage format: METRIC (cm, kg) regardless of input region.
 * Convert at the boundary. Always label units at the input.
 *
 * A height stored without its unit is a corrupt record and will silently
 * break sizing logic. The boundary functions here are the only place
 * where unit conversion occurs.
 *
 * UK display: cm / kg
 * US display:  ft-in / lb
 */

import type { RegionCode } from "./regions";

// ── Imperial ↔ Metric ────────────────────────────────────────────────────────

/** Convert feet and inches to centimetres. */
export function ftInToCm(feet: number, inches: number): number {
  const totalInches = feet * 12 + inches;
  return Math.round(totalInches * 2.54 * 10) / 10; // 1 dp precision
}

/** Convert pounds to kilograms. */
export function lbToKg(lb: number): number {
  return Math.round(lb * 0.453592 * 10) / 10; // 1 dp precision
}

/** Convert centimetres to feet and inches. */
export function cmToFtIn(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

/** Convert kilograms to pounds. */
export function kgToLb(kg: number): number {
  return Math.round(kg / 0.453592 * 10) / 10; // 1 dp precision
}

// ── Canonical Storage ────────────────────────────────────────────────────────

/**
 * Height input as the user entered it for a given region.
 * UK: cm (single number)
 * US: feet + inches (two numbers)
 */
export type HeightInput =
  | { region: "uk"; cm: number }
  | { region: "us"; feet: number; inches: number };

/**
 * Weight input as the user entered it for a given region.
 * UK: kg
 * US: lb
 */
export type WeightInput =
  | { region: "uk"; kg: number }
  | { region: "us"; lb: number };

/**
 * Convert any HeightInput to canonical metric cm.
 * This is the only place height conversion happens.
 */
export function toCanonicalHeightCm(input: HeightInput): number {
  if (input.region === "uk") return input.cm;
  return ftInToCm(input.feet, input.inches);
}

/**
 * Convert any WeightInput to canonical metric kg.
 * This is the only place weight conversion happens.
 */
export function toCanonicalWeightKg(input: WeightInput): number {
  if (input.region === "uk") return input.kg;
  return lbToKg(input.lb);
}

// ── Display Formatting ───────────────────────────────────────────────────────

/**
 * Format a canonical height (cm) for display in the user's region.
 */
export function formatHeightForRegion(cm: number, region: RegionCode): string {
  if (region === "uk") return `${cm} cm`;
  const { feet, inches } = cmToFtIn(cm);
  return `${feet}'${inches}"`;
}

/**
 * Format a canonical weight (kg) for display in the user's region.
 */
export function formatWeightForRegion(kg: number, region: RegionCode): string {
  if (region === "uk") return `${kg} kg`;
  return `${kgToLb(kg)} lb`;
}

// ── Geometry / Spec Formatting ───────────────────────────────────────────────

/**
 * Format a geometry measurement (always authored in mm) for display.
 * UK: metric (mm or cm depending on magnitude)
 * US: imperial (inches to 1 dp)
 */
export function formatGeometryMm(mm: number, region: RegionCode): string {
  if (region === "uk") {
    if (mm >= 10) return `${(mm / 10).toFixed(1)} cm`;
    return `${mm} mm`;
  }
  const inches = mm / 25.4;
  return `${inches.toFixed(1)}"`;
}

// ── Order Form Field Descriptors ─────────────────────────────────────────────

export interface HeightFieldDescriptor {
  label: string;
  unit: string;
  placeholder: string;
  /** For US: two-part input (feet + inches) */
  parts?: Array<{ name: string; label: string; unit: string; placeholder: string }>;
}

export interface WeightFieldDescriptor {
  label: string;
  unit: string;
  placeholder: string;
}

export function getHeightFieldDescriptor(region: RegionCode): HeightFieldDescriptor {
  if (region === "uk") {
    return {
      label: "Rider Height",
      unit: "cm",
      placeholder: "e.g. 178",
    };
  }
  return {
    label: "Rider Height",
    unit: "ft / in",
    placeholder: "",
    parts: [
      { name: "heightFt", label: "Feet", unit: "ft", placeholder: "e.g. 5" },
      { name: "heightIn", label: "Inches", unit: "in", placeholder: "e.g. 11" },
    ],
  };
}

export function getWeightFieldDescriptor(region: RegionCode): WeightFieldDescriptor {
  if (region === "uk") {
    return { label: "Rider Weight", unit: "kg", placeholder: "e.g. 75" };
  }
  return { label: "Rider Weight", unit: "lb", placeholder: "e.g. 165" };
}
