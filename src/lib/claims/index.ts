/**
 * ALKOTA CYCLES — ENGINEERING CLAIMS SERVICE LAYER
 *
 * Central API for consuming engineering claims.
 * All public-facing components must use these helpers.
 * Direct access to ENGINEERING_CLAIMS array is for Studio use only.
 */

import {
  ENGINEERING_CLAIMS,
  RELEASE_GATES,
  type EngineeringClaim,
  type ClaimSystem,
  type ClaimStatus,
} from "@/content/project01/claims";
import {
  isClaimPubliclyVisible,
  getClaimPublicWording,
  getQualifiedClaimLabel,
} from "@/lib/claims/publicLanguage";

// ─── Lookups ──────────────────────────────────────────────────────────────────

/**
 * Look up a single claim by its reference (APC-XXXXXX).
 * Returns undefined if not found.
 */
export function getClaimByRef(ref: string): EngineeringClaim | undefined {
  return ENGINEERING_CLAIMS.find((c) => c.claimReference === ref);
}

/**
 * All claims for a given engineering system.
 */
export function getClaimsBySystem(system: ClaimSystem): EngineeringClaim[] {
  return ENGINEERING_CLAIMS.filter((c) => c.system === system);
}

/**
 * All claims at or above a given status level.
 */
export function getClaimsByStatus(status: ClaimStatus): EngineeringClaim[] {
  return ENGINEERING_CLAIMS.filter((c) => c.status === status);
}

// ─── Approved sets (for public consumption) ───────────────────────────────────

/**
 * Claims approved for development communication.
 * Minimum: APPROVED_DEVELOPMENT status AND publicVisibility = true.
 */
export function getApprovedClaims(): EngineeringClaim[] {
  return ENGINEERING_CLAIMS.filter(isClaimPubliclyVisible);
}

/**
 * Claims cleared for production release documentation.
 * Only PRODUCTION_RELEASED claims with publicVisibility = true.
 * Used exclusively by Build Certificate and Dealer Technical Documents.
 */
export function getProductionReleasedClaims(): EngineeringClaim[] {
  return ENGINEERING_CLAIMS.filter(
    (c) => c.status === "PRODUCTION_RELEASED" && c.publicVisibility === true
  );
}

// ─── Release readiness ────────────────────────────────────────────────────────

export interface SystemReleaseSummary {
  system: ClaimSystem;
  total: number;
  byStatus: Partial<Record<ClaimStatus, number>>;
  developmentReady: boolean;
  prototypeReady: boolean;
  productionReady: boolean;
}

/**
 * Computes per-system release readiness for the Studio dashboard.
 * Never returns a single aggregate percentage.
 */
export function getReleaseReadiness(): SystemReleaseSummary[] {
  const systems: ClaimSystem[] = [
    "GEOMETRY", "KINEMATICS", "MATERIALS", "FIT", "SUSPENSION", "DRIVETRAIN", "COMPONENTS",
  ];

  return systems.map((system) => {
    const claims = getClaimsBySystem(system);
    const byStatus: Partial<Record<ClaimStatus, number>> = {};

    for (const c of claims) {
      byStatus[c.status] = (byStatus[c.status] ?? 0) + 1;
    }

    const allMeet = (gate: ClaimStatus[]) =>
      claims.length > 0 && claims.every((c) => gate.includes(c.status));

    return {
      system,
      total: claims.length,
      byStatus,
      developmentReady: allMeet(RELEASE_GATES.DEVELOPMENT_RELEASE),
      prototypeReady:   allMeet(RELEASE_GATES.PROTOTYPE_RELEASE),
      productionReady:  allMeet(RELEASE_GATES.PRODUCTION_RELEASE),
    };
  });
}

/**
 * Overall gate status across all systems.
 */
export function getOverallReleaseGates() {
  const summaries = getReleaseReadiness();
  const withClaims = summaries.filter((s) => s.total > 0);
  return {
    developmentRelease: withClaims.every((s) => s.developmentReady),
    prototypeRelease:   withClaims.every((s) => s.prototypeReady),
    productionRelease:  withClaims.every((s) => s.productionReady),
    evidenceRequired:   ENGINEERING_CLAIMS.filter((c) => c.status === "EVIDENCE_REQUIRED").length,
    totalClaims:        ENGINEERING_CLAIMS.length,
  };
}

// Re-export public language utilities for convenience
export { isClaimPubliclyVisible, getClaimPublicWording, getQualifiedClaimLabel };
