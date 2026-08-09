/**
 * ALKOTA CYCLES — LEGAL STATUS GATE
 * lib/legal-status.ts
 *
 * Runtime server-side enforcement of legal document status.
 *
 * RULES:
 * - Only APPROVED documents may be accepted in live commercial transactions.
 * - DRAFT and LEGAL_REVIEW documents must never block a page render — they
 *   display a gate banner and disable commerce actions.
 * - This module is server-only. Import it only in Server Components or
 *   route handlers. Never import it in client components.
 *
 * Build-time: the verify-claims.ts script calls isCommercePermitted() and
 * fails the build if commerce is live while any required document is not APPROVED.
 */

import { LEGAL_DOCUMENTS, type LegalDocumentStatus } from "@/config/legalDocuments";
import {
  isLegalEntityConfigComplete,
  PROJECT01_PAID_RESERVATIONS_ENABLED,
} from "@/config/legal";

export type { LegalDocumentStatus };

// ── Core status query ───────────────────────────────────────────────────────

export function getLegalDocumentStatus(key: string): LegalDocumentStatus {
  const doc = LEGAL_DOCUMENTS[key];
  if (!doc) {
    // Unknown document = treat as DRAFT (safest default)
    return "DRAFT";
  }
  return doc.status;
}

export function isDocumentApproved(key: string): boolean {
  return getLegalDocumentStatus(key) === "APPROVED";
}

// ── Documents required before any commerce transaction ───────────────────────
// These are the minimum set that must ALL be APPROVED before ADD TO CART,
// CHECKOUT, or RESERVATION payment is enabled.

export const COMMERCE_REQUIRED_DOCUMENTS = [
  "terms",       // Terms & Conditions of Sale
  "privacy",     // Privacy Policy
  "returns",     // Returns & Refunds
  "shipping",    // Delivery Policy
] as const;

export type CommerceRequiredDocument = (typeof COMMERCE_REQUIRED_DOCUMENTS)[number];

// ── Commerce permission gate ─────────────────────────────────────────────────

export interface CommerceGateResult {
  permitted: boolean;
  /**
   * Human-readable reason why commerce is blocked, or null if permitted.
   */
  blockedReason: string | null;
  /**
   * List of document keys that are not yet APPROVED.
   */
  pendingDocuments: string[];
}

/**
 * Server-side check: may the site accept live commerce transactions right now?
 *
 * Returns `permitted: false` if:
 * - Any COMMERCE_REQUIRED_DOCUMENTS are not APPROVED
 * - The legal entity config has unresolved placeholders
 * - PROJECT01_PAID_RESERVATIONS_ENABLED is false (for reservation-specific paths)
 */
export function isCommercePermitted(): CommerceGateResult {
  // 1. Legal entity must be complete — no {{PLACEHOLDER}} fields
  if (!isLegalEntityConfigComplete()) {
    return {
      permitted: false,
      blockedReason:
        "Legal entity configuration is incomplete. Company registration details must be provided before commerce can be enabled.",
      pendingDocuments: ["LEGAL_ENTITY_CONFIG"],
    };
  }

  // 2. All required legal documents must be APPROVED
  const pendingDocuments = COMMERCE_REQUIRED_DOCUMENTS.filter(
    (key) => !isDocumentApproved(key)
  );

  if (pendingDocuments.length > 0) {
    const docTitles = pendingDocuments
      .map((key) => LEGAL_DOCUMENTS[key]?.title ?? key)
      .join(", ");

    return {
      permitted: false,
      blockedReason: `The following documents require legal review and approval before commerce can be enabled: ${docTitles}.`,
      pendingDocuments,
    };
  }

  return {
    permitted: true,
    blockedReason: null,
    pendingDocuments: [],
  };
}

/**
 * Narrower check: may the site accept Project 01 reservation payments?
 * Requires all commerce documents PLUS the reservations document to be APPROVED
 * AND the PROJECT01_PAID_RESERVATIONS_ENABLED flag to be true.
 */
export function isReservationPaymentPermitted(): CommerceGateResult {
  const base = isCommercePermitted();
  if (!base.permitted) {
    return base;
  }

  // Also require the reservations-specific document
  if (!isDocumentApproved("reservations")) {
    return {
      permitted: false,
      blockedReason:
        "Project 01 Reservation Terms must be APPROVED before reservation payments can be accepted.",
      pendingDocuments: ["reservations"],
    };
  }

  // Check the explicit flag
  if (!PROJECT01_PAID_RESERVATIONS_ENABLED) {
    return {
      permitted: false,
      blockedReason:
        "Reservation payments are not yet enabled. Set PROJECT01_PAID_RESERVATIONS_ENABLED to true in config/legal.ts when ready to accept deposits.",
      pendingDocuments: [],
    };
  }

  return {
    permitted: true,
    blockedReason: null,
    pendingDocuments: [],
  };
}

// ── Convenience helpers for use in Server Components ────────────────────────

/**
 * Returns the commerce gate status. Call in a Server Component to decide
 * whether to render cart/checkout controls or a gated fallback.
 *
 * Never throws — always returns a safe result.
 */
export function getCommerceGateStatus(): CommerceGateResult {
  try {
    return isCommercePermitted();
  } catch {
    return {
      permitted: false,
      blockedReason: "Commerce gate encountered an error during status check.",
      pendingDocuments: [],
    };
  }
}

/**
 * Returns the reservation payment gate status. Call in a Server Component
 * on the /order and /configure pages before rendering payment CTAs.
 */
export function getReservationGateStatus(): CommerceGateResult {
  try {
    return isReservationPaymentPermitted();
  } catch {
    return {
      permitted: false,
      blockedReason: "Reservation gate encountered an error during status check.",
      pendingDocuments: [],
    };
  }
}
