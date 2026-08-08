/**
 * ALKOTA PARTNER NETWORK — WARRANTY CLAIM TYPES
 *
 * Warranty claim workflow shell.
 *
 * NOTE: Warranty policy and customer entitlement are not yet defined.
 * This type system is architectural infrastructure only.
 * Do not publish warranty terms or entitlement until legally approved.
 */

export type WarrantyClaimStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "PARTS_ORDERED"
  | "IN_REPAIR"
  | "RESOLVED";

export type WarrantyIssueCategory =
  | "FRAME"
  | "SUSPENSION"
  | "DRIVETRAIN"
  | "BRAKES"
  | "WHEELS"
  | "COCKPIT"
  | "FINISH"
  | "OTHER";

export interface WarrantyClaim {
  id: string;
  claimReference: string;           // APN-WC-000001
  customerId: string;
  bikeSerial: string | null;
  allocationId: string | null;
  dealerId: string;                 // submitting dealer
  issueCategory: WarrantyIssueCategory;
  issueDescription: string;
  photos: string[];                 // file paths / URLs
  diagnosticSteps: string | null;
  dealerRecommendation: string | null;
  status: WarrantyClaimStatus;
  // Alkota internal
  alkotaResponse: string | null;    // NOT shown to end customer
  alkotaReviewedBy: string | null;
  alkotaReviewedAt: string | null;
  partsRequired: string | null;
  internalNotes: string | null;
  submittedAt: string;
  resolvedAt: string | null;
  updatedAt: string;
}

export interface ServiceRecord {
  id: string;
  serviceReference: string;         // APN-SVC-000001
  customerId: string;
  bikeSerial: string | null;
  allocationId: string | null;
  dealerId: string;
  serviceType: "ROUTINE" | "WARRANTY" | "CRASH_DAMAGE" | "UPGRADE" | "SETUP";
  description: string;
  partsUsed: string | null;
  technicianNotes: string | null;
  servicedAt: string;
  nextServiceDue: string | null;
  createdAt: string;
}
