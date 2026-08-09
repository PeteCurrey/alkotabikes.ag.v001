/**
 * ALKOTA CYCLES — LEGAL ENTITY & LEGAL CONFIGURATION
 *
 * Master configuration file for legal entity particulars, contact endpoints,
 * commercial terms baselines, and legal document publication gates.
 *
 * DO NOT INVENT THE CONTRACTING LEGAL ENTITY.
 * Placeholders formatted as {{PLACEHOLDER}} are flagged by the Legal Publication Gate.
 */

export const LEGAL_TRADING_NAME = "Alkota Cycles";

export const LEGAL_ENTITY_NAME = "{{LEGAL_ENTITY_NAME}}";
export const COMPANY_NUMBER = "{{COMPANY_NUMBER}}";
export const REGISTERED_OFFICE = "{{REGISTERED_OFFICE}}";
export const REGISTERED_IN = "{{England and Wales / Scotland / Northern Ireland}}";
export const VAT_NUMBER = "{{VAT_NUMBER_IF_APPLICABLE}}";

export const CUSTOMER_SERVICE_EMAIL = "{{CUSTOMER_SERVICE_EMAIL}}";
export const LEGAL_EMAIL = "{{LEGAL_EMAIL}}";
export const PRIVACY_EMAIL = "{{PRIVACY_EMAIL}}";
export const WARRANTY_EMAIL = "{{WARRANTY_EMAIL}}";
export const RETURNS_EMAIL = "{{RETURNS_EMAIL}}";
export const CAREERS_EMAIL = "{{CAREERS_EMAIL}}";
export const AMBASSADOR_EMAIL = "{{AMBASSADOR_EMAIL}}";

export const CUSTOMER_SERVICE_PHONE = "{{OPTIONAL_PHONE}}";
export const RETURNS_ADDRESS = "{{RETURNS_ADDRESS}}";
export const ICO_REGISTRATION_REFERENCE = "{{IF_APPLICABLE}}";

// ── SUGGESTED EVENTUAL ALIASES (FOR REFERENCE) ──────────────────────────────
export const SUGGESTED_ALIASES = {
  support: "support@alkotacycles.com",
  legal: "legal@alkotacycles.com",
  privacy: "privacy@alkotacycles.com",
  warranty: "warranty@alkotacycles.com",
  returns: "returns@alkotacycles.com",
  careers: "careers@alkotacycles.com",
  ambassadors: "ambassadors@alkotacycles.com",
};

// ── WARRANTY CENTRAL VARIABLES ─────────────────────────────────────────────
export const FRAME_WARRANTY_TERM: string | null = null;
export const PAINT_FINISH_WARRANTY_TERM: string | null = null;
export const ALKOTA_COMPONENT_WARRANTY_TERM: string | null = null;
export const WARRANTY_TRANSFERABLE: boolean | null = null;
export const CRASH_REPLACEMENT_AVAILABLE = false;

// ── PROJECT 01 RESERVATION & COMMERCIAL VARIABLES ─────────────────────────
export const PROJECT01_PAID_RESERVATIONS_ENABLED = false;
export const APPROVED_DEPOSIT: string | null = null;
export const DEPOSIT_STATUS: string | null = null;
export const APPROVED_PRICE_LOCK_POLICY: string | null = null;
export const PRE_BUILD_LOCK_CANCELLATION_POLICY: string | null = null;
export const POST_BUILD_LOCK_CANCELLATION_POLICY: string | null = null;
export const DELAY_AND_LONG_STOP_POLICY: string | null = null;
export const RESERVATION_TRANSFER_POLICY: string | null = null;

// ── FEATURE FLAGS FOR CAREERS & FORMS ──────────────────────────────────────
export const GENERAL_CAREERS_SUBMISSIONS = true;

// ── LEGAL PUBLICATION GATE HELPERS ─────────────────────────────────────────

export function hasUnresolvedPlaceholders(text: string): boolean {
  return /\{\{[^}]+\}\}/.test(text);
}

export function isLegalEntityConfigComplete(): boolean {
  const fields = [
    LEGAL_ENTITY_NAME,
    COMPANY_NUMBER,
    REGISTERED_OFFICE,
    REGISTERED_IN,
    CUSTOMER_SERVICE_EMAIL,
    LEGAL_EMAIL,
    PRIVACY_EMAIL,
    WARRANTY_EMAIL,
    RETURNS_EMAIL,
  ];
  return !fields.some((f) => hasUnresolvedPlaceholders(f));
}

/**
 * Returns a clean customer-facing string, hiding raw {{PLACEHOLDER}} syntax
 * from real visitors while preserving clarity.
 */
export function getLegalValue(val: string, fallback: string): string {
  if (hasUnresolvedPlaceholders(val)) {
    return fallback;
  }
  return val;
}

/**
 * Formats full legal text for customer rendering, replacing raw placeholder tags
 * with clean readable descriptions, so real users never see double-brace syntax.
 */
export function renderCleanLegalText(text: string): string {
  return text
    .replace(/\{\{LEGAL_ENTITY_NAME\}\}/g, getLegalValue(LEGAL_ENTITY_NAME, "Alkota Cycles (Legal Entity Pending)"))
    .replace(/\{\{COMPANY_NUMBER\}\}/g, getLegalValue(COMPANY_NUMBER, "Pending"))
    .replace(/\{\{REGISTERED_OFFICE\}\}/g, getLegalValue(REGISTERED_OFFICE, "Alkota Cycles Registered Office (Pending)"))
    .replace(/\{\{REGISTERED_IN\}\}/g, getLegalValue(REGISTERED_IN, "England and Wales"))
    .replace(/\{\{VAT_NUMBER_IF_APPLICABLE\}\}/g, getLegalValue(VAT_NUMBER, "Pending"))
    .replace(/\{\{VAT_NUMBER\}\}/g, getLegalValue(VAT_NUMBER, "Pending"))
    .replace(/\{\{CUSTOMER_SERVICE_EMAIL\}\}/g, getLegalValue(CUSTOMER_SERVICE_EMAIL, "support@alkotacycles.com"))
    .replace(/\{\{LEGAL_EMAIL\}\}/g, getLegalValue(LEGAL_EMAIL, "legal@alkotacycles.com"))
    .replace(/\{\{PRIVACY_EMAIL\}\}/g, getLegalValue(PRIVACY_EMAIL, "privacy@alkotacycles.com"))
    .replace(/\{\{WARRANTY_EMAIL\}\}/g, getLegalValue(WARRANTY_EMAIL, "warranty@alkotacycles.com"))
    .replace(/\{\{RETURNS_EMAIL\}\}/g, getLegalValue(RETURNS_EMAIL, "returns@alkotacycles.com"))
    .replace(/\{\{CAREERS_EMAIL\}\}/g, getLegalValue(CAREERS_EMAIL, "careers@alkotacycles.com"))
    .replace(/\{\{AMBASSADOR_EMAIL\}\}/g, getLegalValue(AMBASSADOR_EMAIL, "ambassadors@alkotacycles.com"))
    .replace(/\{\{OPTIONAL_PHONE\}\}/g, getLegalValue(CUSTOMER_SERVICE_PHONE, "Via Email Support"))
    .replace(/\{\{RETURNS_ADDRESS\}\}/g, getLegalValue(RETURNS_ADDRESS, "Alkota Returns Department (Pending)"))
    .replace(/\{\{IF_APPLICABLE\}\}/g, getLegalValue(ICO_REGISTRATION_REFERENCE, "Pending"))
    .replace(/\{\{FRAME_WARRANTY_TERM\}\}/g, FRAME_WARRANTY_TERM || "TO BE PUBLISHED BEFORE PRODUCTION ORDERS OPEN")
    .replace(/\{\{PAINT_FINISH_WARRANTY_TERM\}\}/g, PAINT_FINISH_WARRANTY_TERM || "TO BE CONFIRMED BEFORE PRODUCTION RELEASE")
    .replace(/\{\{APPROVED_ELIGIBILITY\}\}/g, "Original purchaser from Alkota or authorised Alkota Partner")
    .replace(/\{\{APPROVED_DEPOSIT\}\}/g, APPROVED_DEPOSIT || "TO BE PUBLISHED BEFORE PAID RESERVATIONS OPEN")
    .replace(/\{\{REFUNDABLE \/ PARTIALLY REFUNDABLE \/ NON-REFUNDABLE\}\}/g, DEPOSIT_STATUS || "TO BE CONFIRMED BEFORE RESERVATIONS OPEN")
    .replace(/\{\{APPROVED_PRICE_LOCK_POLICY\}\}/g, APPROVED_PRICE_LOCK_POLICY || "NOT YET APPROVED")
    .replace(/\{\{PRE_BUILD_LOCK_CANCELLATION_POLICY\}\}/g, PRE_BUILD_LOCK_CANCELLATION_POLICY || "To be published prior to reservation opening.")
    .replace(/\{\{POST_BUILD_LOCK_CANCELLATION_POLICY\}\}/g, POST_BUILD_LOCK_CANCELLATION_POLICY || "To be published prior to reservation opening.")
    .replace(/\{\{DELAY_AND_LONG_STOP_POLICY\}\}/g, DELAY_AND_LONG_STOP_POLICY || "To be published prior to reservation opening.")
    .replace(/\{\{RESERVATION_TRANSFER_POLICY\}\}/g, RESERVATION_TRANSFER_POLICY || "NOT TRANSFERABLE WITHOUT ALKOTA'S WRITTEN AGREEMENT.")
    .replace(/\{\{CHANGE_OF_MIND_RETURN_COST_POLICY\}\}/g, "Returned items under change-of-mind rights are at customer cost unless explicitly stated otherwise in writing before purchase.");
}
