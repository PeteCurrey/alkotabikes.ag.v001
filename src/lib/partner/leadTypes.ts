/**
 * ALKOTA PARTNER NETWORK — CUSTOMER LEAD TYPES
 *
 * Customer leads represent registrants who have opted to connect with
 * a partner, or who have been identified by Alkota for partner support.
 *
 * PRINCIPLE:
 * Customer identity (name, email) is ONLY shared with a dealer after
 * explicit customer consent. consentGiven must be true before PII is
 * returned from any API or rendered in any partner-facing UI.
 *
 * Internal notes are NEVER exposed to the customer.
 */

export type LeadStatus =
  | "NEW"
  | "ACCEPTED"
  | "CONTACTED"
  | "APPOINTMENT"
  | "DEMO"
  | "RESERVATION"
  | "CONVERTED"
  | "LOST";

export interface CustomerLead {
  id: string;
  leadReference: string;            // APN-LEAD-000001

  // Customer identity — only populated when consentGiven: true
  customerId: string | null;
  customerName: string | null;      // CONSENT GATED
  customerEmail: string | null;     // CONSENT GATED — do not expose without consent
  customerPhone: string | null;     // CONSENT GATED

  // Non-identifying interest data (safe to show without consent)
  customerLocation: string | null;  // city/region, not exact address
  bikeInterest: string;
  preferredFinish: string | null;
  sizeDirection: string | null;
  savedBuildRef: string | null;
  purchaseStage: string;
  registrationReference: string | null;

  // Assignment
  assignedDealerId: string | null;
  assignedAt: string | null;
  status: LeadStatus;

  // Consent
  consentGiven: boolean;
  consentTimestamp: string | null;
  consentMethod: string | null;     // e.g. "registration_form_opt_in"

  // Internal only — NEVER shown to customer or dealer
  internalNotes: string | null;

  createdAt: string;
  updatedAt: string;
}
