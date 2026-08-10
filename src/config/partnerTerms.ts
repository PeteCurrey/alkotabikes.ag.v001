/**
 * ALKOTA CYCLES — PARTNER COMMERCIAL TERMS
 * src/config/partnerTerms.ts
 *
 * SINGLE SOURCE OF TRUTH for all partner commercial figures.
 *
 * RULES:
 *   1. Every commission %, fee, radius, and order value in the entire application
 *      must be derived from PARTNER_TIERS. No literal outside this file.
 *   2. All fees are in GBP minor units (integer pence). Never floats.
 *   3. US terms ship null — do NOT convert GBP values to USD.
 *   4. A tier at status:'DRAFT' may render only with a visible
 *      "indicative, non-contractual" banner. The production build on
 *      alkotacycles.com fails if any live-facing surface uses a DRAFT tier.
 *      Gate is enforced via assertPartnerTermsApproved(), which reuses the
 *      same env-detection pattern as legal-status.ts.
 *   5. No RRP, price, or sale value may appear in this file or anywhere derived
 *      from it. The calculator requires user input.
 */

import type { RegionCode } from "@/lib/regions";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PartnerTier = "FOUNDATION" | "CERTIFIED";

export type PartnerTermsStatus = "DRAFT" | "APPROVED";

export interface PartnerTierTerms {
  tier: PartnerTier;
  label: string;
  /** Commission as a percentage of ex-VAT RRP. */
  commissionPercent: number;
  /** Fit, build, and handover fee per unit — integer minor units (GBP pence). */
  fitBuildHandoverFeeMinor: number;
  /** First service reimbursement per unit — integer minor units (GBP pence). */
  firstServiceReimbursementMinor: number;
  /** Parts margin applied to workshop orders — percentage. */
  partsMarginPercent: number;
  /** Warranty labour reimbursement rate — integer minor units per hour (GBP pence). */
  warrantyLabourRateMinor: number;
  /** Default catchment radius in miles. Overridable per partner in the database. */
  catchmentRadiusMiles: number;
  /** Opening order value — integer minor units (GBP pence). */
  openingOrderValueMinor: number;
  openingOrderPayableAt: "SIGNING" | "FIRST_DELIVERY";
  demoSupply: "ALKOTA_SUPPLIED" | "PURCHASED_AT_COST";
  /**
   * GATE: DRAFT terms display a non-contractual banner everywhere they appear.
   * Production builds on alkotacycles.com fail if this is DRAFT.
   */
  status: PartnerTermsStatus;
}

// ─── UK Commercial Terms ──────────────────────────────────────────────────────
//
// All values are deliberately rounded commercial decisions, not arithmetic.
// Status DRAFT until Alkota commercial director approves.

const UK_FOUNDATION: PartnerTierTerms = {
  tier: "FOUNDATION",
  label: "Foundation Partner",
  commissionPercent: 17,
  fitBuildHandoverFeeMinor: 35000,        // £350.00
  firstServiceReimbursementMinor: 7500,   // £75.00
  partsMarginPercent: 25,
  warrantyLabourRateMinor: 7500,          // £75.00/hr
  catchmentRadiusMiles: 30,
  openingOrderValueMinor: 0,
  openingOrderPayableAt: "SIGNING",
  demoSupply: "ALKOTA_SUPPLIED",
  status: "DRAFT",
};

const UK_CERTIFIED: PartnerTierTerms = {
  tier: "CERTIFIED",
  label: "Certified Partner",
  commissionPercent: 20,
  fitBuildHandoverFeeMinor: 50000,        // £500.00
  firstServiceReimbursementMinor: 10000,  // £100.00
  partsMarginPercent: 30,
  warrantyLabourRateMinor: 8500,          // £85.00/hr
  catchmentRadiusMiles: 40,
  openingOrderValueMinor: 0,
  openingOrderPayableAt: "FIRST_DELIVERY",
  demoSupply: "ALKOTA_SUPPLIED",
  status: "DRAFT",
};

// ─── Region map ───────────────────────────────────────────────────────────────
//
// US terms are null until separately authored. Never convert GBP values.

export const PARTNER_TERMS_BY_REGION: Record<
  RegionCode,
  Record<PartnerTier, PartnerTierTerms> | null
> = {
  uk: {
    FOUNDATION: UK_FOUNDATION,
    CERTIFIED: UK_CERTIFIED,
  },
  us: null, // US partner terms not yet published
};

/** Convenience accessor — returns null if region has no published terms. */
export function getPartnerTerms(
  region: RegionCode,
  tier: PartnerTier
): PartnerTierTerms | null {
  return PARTNER_TERMS_BY_REGION[region]?.[tier] ?? null;
}

// ─── Version history ──────────────────────────────────────────────────────────

export interface PartnerTermsVersion {
  version: string;
  date: string;       // ISO 8601
  status: PartnerTermsStatus;
  changes: string[];
}

export const PARTNER_TERMS_CHANGELOG: PartnerTermsVersion[] = [
  {
    version: "0.1.0",
    date: "2026-08-10T00:00:00Z",
    status: "DRAFT",
    changes: [
      "Initial indicative commercial framework created.",
      "Two tiers defined: Foundation and Certified.",
      "All figures are development placeholders pending commercial director approval.",
    ],
  },
];

export const PARTNER_TERMS_CURRENT_VERSION = PARTNER_TERMS_CHANGELOG[PARTNER_TERMS_CHANGELOG.length - 1].version;

// ─── DRAFT gate ───────────────────────────────────────────────────────────────
//
// Pattern mirrors legal-status.ts: reads env vars to determine if this is a
// production hostname build, and fails hard if any tier is DRAFT.

/**
 * Returns true if any tier in the given region has status: 'DRAFT'.
 */
export function hasAnyDraftTier(region: RegionCode): boolean {
  const terms = PARTNER_TERMS_BY_REGION[region];
  if (!terms) return false;
  return Object.values(terms).some((t) => t.status === "DRAFT");
}

/**
 * Throws during a production build on alkotacycles.com if any tier is DRAFT.
 * Call this from the prebuild verify script or any server component that
 * renders live-facing partner commercial terms.
 *
 * This intentionally mirrors the pattern in legal-status.ts rather than
 * creating a parallel mechanism.
 */
export function assertPartnerTermsApproved(region: RegionCode): void {
  const vercelUrl = process.env.VERCEL_URL ?? "";
  const vercelProjectProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "";
  const vercelEnv = process.env.VERCEL_ENV ?? "";
  const strict = process.env.STRICT_PLACEHOLDERS === "true";

  const isProduction =
    (vercelEnv === "production" && !vercelUrl.includes("vercel.app")) ||
    vercelProjectProdUrl.includes("alkotacycles.com") ||
    strict;

  if (!isProduction) return; // Allow DRAFT in preview/dev

  const terms = PARTNER_TERMS_BY_REGION[region];
  if (!terms) return; // No terms = nothing to assert

  const draftTiers = Object.values(terms)
    .filter((t) => t.status === "DRAFT")
    .map((t) => t.label);

  if (draftTiers.length > 0) {
    throw new Error(
      `PRODUCTION BUILD FAILED: The following partner tiers are still DRAFT ` +
        `and may not be rendered on live-facing surfaces: ${draftTiers.join(", ")}. ` +
        `Set status to 'APPROVED' in src/config/partnerTerms.ts when commercially approved.`
    );
  }
}
