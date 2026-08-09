/**
 * ALKOTA CYCLES — PUBLIC LANGUAGE ENGINE
 *
 * CRITICAL RULE: No public UI component may render an internal claim type
 * or status string directly. All public-facing technical language must
 * pass through this module.
 *
 * Internal strings are engineering classifications.
 * Public strings are approved commercial language.
 * They are not the same thing.
 */

import type { ClaimType, ClaimStatus, EngineeringClaim } from "@/content/project01/claims";

// ─── Type → permitted public label ───────────────────────────────────────────

const CLAIM_TYPE_PUBLIC_LABEL: Record<ClaimType, string> = {
  TARGET:                   "Development Target",
  DESIGN_INTENT:            "Engineering Direction",
  CALCULATED:               "Engineering Baseline",
  SIMULATED:                "Simulation Baseline",
  MEASURED:                 "Measured — Prototype",
  TESTED:                   "Test Result",
  VALIDATED:                "Validated",
  PRODUCTION_SPECIFICATION: "Production Specification",
};

// ─── Status → permitted public wording ───────────────────────────────────────
// Statuses that should NEVER be rendered publicly return null.

const CLAIM_STATUS_PUBLIC_WORDING: Record<ClaimStatus, string | null> = {
  DRAFT:                null,   // Never public
  ENGINEERING_REVIEW:   null,   // Never public
  EVIDENCE_REQUIRED:    null,   // Never public
  APPROVED_DEVELOPMENT: "Development Target",
  VALIDATION_PENDING:   "Subject to Validation",
  VALIDATED:            "Validated",
  PRODUCTION_RELEASED:  "Production Specification",
  SUPERSEDED:           null,   // Never public
};

// ─── Status badge colour for internal Studio UI ───────────────────────────────

export const CLAIM_STATUS_STYLE: Record<ClaimStatus, string> = {
  DRAFT:                "bg-white/5 text-white/30 border-white/10",
  ENGINEERING_REVIEW:   "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  EVIDENCE_REQUIRED:    "bg-orange-500/10 text-orange-400 border-orange-500/20",
  APPROVED_DEVELOPMENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  VALIDATION_PENDING:   "bg-purple-500/10 text-purple-400 border-purple-500/20",
  VALIDATED:            "bg-green-500/10 text-green-400 border-green-500/20",
  PRODUCTION_RELEASED:  "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  SUPERSEDED:           "bg-white/5 text-white/20 border-white/5",
};

export const CLAIM_TYPE_STYLE: Record<ClaimType, string> = {
  TARGET:                   "bg-white/5 text-white/50 border-white/10",
  DESIGN_INTENT:            "bg-blue-500/10 text-blue-400 border-blue-500/20",
  CALCULATED:               "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  SIMULATED:                "bg-purple-500/10 text-purple-400 border-purple-500/20",
  MEASURED:                 "bg-green-500/10 text-green-400 border-green-500/20",
  TESTED:                   "bg-green-500/10 text-green-400 border-green-500/20",
  VALIDATED:                "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  PRODUCTION_SPECIFICATION: "bg-[#1a73e8]/20 text-[#1a73e8] border-[#1a73e8]/30",
};

// ─── Core engine functions ────────────────────────────────────────────────────

/**
 * Returns the permitted public wording for a claim's status.
 * Returns null if the claim must not be shown publicly.
 */
export function getStatusPublicWording(status: ClaimStatus): string | null {
  return CLAIM_STATUS_PUBLIC_WORDING[status] ?? null;
}

/**
 * Returns the permitted public label for a claim type.
 */
export function getTypePublicLabel(claimType: ClaimType): string {
  return CLAIM_TYPE_PUBLIC_LABEL[claimType];
}

/**
 * Returns the full approved public wording for a claim.
 * Respects the manually set publicWording field if present and claim is visible.
 * Returns null if claim must not be rendered publicly.
 */
export function getClaimPublicWording(claim: EngineeringClaim): string | null {
  // Hard gate: invisible claims render nothing
  if (!claim.publicVisibility) return null;

  // Hard gate: blocked statuses render nothing
  const statusWording = CLAIM_STATUS_PUBLIC_WORDING[claim.status];
  if (statusWording === null) return null;

  // Prefer manually approved public wording if set
  if (claim.publicWording) return claim.publicWording;

  // Fall back to status-derived wording
  return statusWording;
}

/**
 * Returns true if a claim may be shown publicly.
 * A claim is publicly visible only when:
 *   1. publicVisibility = true (manually enabled by approver)
 *   2. status is not in the blocked list
 */
export function isClaimPubliclyVisible(claim: EngineeringClaim): boolean {
  if (!claim.publicVisibility) return false;
  return CLAIM_STATUS_PUBLIC_WORDING[claim.status] !== null;
}

/**
 * Returns a qualified pre-production descriptor for a claim.
 * Used where a claim value needs to be shown with its status context.
 * Example: "160 mm — Development Target"
 */
export function getQualifiedClaimLabel(claim: EngineeringClaim): string {
  const wording = getStatusPublicWording(claim.status) ?? getTypePublicLabel(claim.claimType);
  const valueStr = claim.unit ? `${claim.value} ${claim.unit}` : claim.value;
  return `${valueStr} — ${wording}`;
}
