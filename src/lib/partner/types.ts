/**
 * ALKOTA PARTNER NETWORK — CORE TYPES
 *
 * Partner organisation, staff, and commercial profile types.
 *
 * PRINCIPLE:
 * No commercial values (margins, territories, payment terms) are populated
 * until approved by Alkota commercially. All such fields are typed as null.
 */

import type { RegionId, CurrencyCode } from "@/content/project01/commercial";

// ─── Partner Types ────────────────────────────────────────────────────────────

export type PartnerType =
  | "RETAIL_PARTNER"
  | "SERVICE_PARTNER"
  | "DEMO_PARTNER"
  | "DISTRIBUTOR"
  | "RACE_SUPPORT";

export type PartnerAccountStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "ACTIVE"
  | "SUSPENDED"
  | "TERMINATED";

/** Tier classification. All new partners are TBC until commercially assigned. */
export type DealerTier = "TIER_1" | "TIER_2" | "TIER_3" | "TBC";

export type PartnerStaffRole = "OWNER" | "MANAGER" | "TECHNICIAN" | "SALES";

// ─── Partner Organisation ─────────────────────────────────────────────────────

export interface PartnerOrganisation {
  id: string;
  partnerReference: string;       // APN-XXXXXX
  businessName: string;
  contactName: string;
  contactEmail: string;
  website: string | null;
  location: string;
  country: string;
  region: RegionId;
  specialisms: string | null;
  whyAlkota: string | null;

  // Programme
  types: PartnerType[];           // Multi-role: a partner may hold more than one
  accountStatus: PartnerAccountStatus;
  dealerTier: DealerTier;

  // Commercial — all null until commercially approved
  territory: string | null;       // Not yet defined
  currency: CurrencyCode;
  dealerCostProfile: string | null;
  demoProgramme: boolean;
  allocationEligibility: boolean;
  leadEligibility: boolean;
  serviceAuthorised: boolean;
  warrantyAuthorised: boolean;
  paymentTerms: string | null;    // Not yet defined
  taxReference: string | null;

  // Admin
  internalNotes: string | null;
  appliedAt: string;
  approvedAt: string | null;
  activatedAt: string | null;
  updatedAt: string;
}

// ─── Partner Staff ────────────────────────────────────────────────────────────

export interface TrainingCompletion {
  moduleId: string;
  completedAt: string;
  certifiedBy: string | null;
}

export interface PartnerStaffMember {
  id: string;
  partnerId: string;
  name: string;
  email: string;
  role: PartnerStaffRole;
  trainingCompletions: TrainingCompletion[];
  active: boolean;
  createdAt: string;
}

// ─── Partner Application (from /dealers form) ─────────────────────────────────

export interface PartnerApplication {
  id: string;
  applicationReference: string;   // APN-XXXXXX generated at submission
  shopName: string;
  location: string;
  country: string;
  website: string | null;
  contactName: string;
  contactEmail: string;
  specialisms: string | null;
  whyAlkota: string | null;
  submittedAt: string;
  status: "RECEIVED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  reviewedAt: string | null;
  reviewedBy: string | null;
  internalNotes: string | null;
}
