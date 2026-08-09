/**
 * ALKOTA CYCLES — COMPANY IDENTITY MODULE
 * lib/company.ts
 *
 * Single source of truth for all company identity data rendered on the site.
 *
 * RULES:
 * - Pull all values from src/config/legal.ts — never hardcode strings here.
 * - If a field still contains a {{PLACEHOLDER}}, it is not yet known and should
 *   be represented as null rather than an invented value.
 * - The build does NOT fail here — placeholders are intentional for pre-launch.
 * - What DOES fail the build is rendering a placeholder in a live commerce path
 *   (enforced by lib/legal-status.ts and the verify-claims script).
 *
 * TRADEMARK NOTE:
 * This module also serves as the canonical trademark registry.
 * Any component rendering a brand identifier must reference this registry,
 * not inline strings.
 */

import {
  LEGAL_TRADING_NAME,
  LEGAL_ENTITY_NAME,
  COMPANY_NUMBER,
  REGISTERED_OFFICE,
  REGISTERED_IN,
  VAT_NUMBER,
  CUSTOMER_SERVICE_EMAIL,
  LEGAL_EMAIL,
  PRIVACY_EMAIL,
  WARRANTY_EMAIL,
  RETURNS_EMAIL,
  CAREERS_EMAIL,
  AMBASSADOR_EMAIL,
  CUSTOMER_SERVICE_PHONE,
  RETURNS_ADDRESS,
  ICO_REGISTRATION_REFERENCE,
  hasUnresolvedPlaceholders,
} from "@/config/legal";

// ── Helpers ──────────────────────────────────────────────────────────────────

function resolved(value: string): string | null {
  return hasUnresolvedPlaceholders(value) ? null : value;
}

// ── COMPANY IDENTITY ─────────────────────────────────────────────────────────

export const company = {
  /** Brand trading name shown publicly: "Alkota Cycles" */
  tradingName: LEGAL_TRADING_NAME,

  /**
   * Full registered legal entity name.
   * null = not yet incorporated / registration pending.
   */
  legalEntityName: resolved(LEGAL_ENTITY_NAME),

  /** Companies House number. null = not yet registered. */
  companyNumber: resolved(COMPANY_NUMBER),

  /** Registered office address. null = pending. */
  registeredOffice: resolved(REGISTERED_OFFICE),

  /** Jurisdiction: England and Wales / Scotland / Northern Ireland */
  registeredIn: resolved(REGISTERED_IN),

  /** VAT registration number. null = not VAT registered or pending. */
  vatNumber: resolved(VAT_NUMBER),

  /** ICO registration reference (UK GDPR). null = pending. */
  icoReference: resolved(ICO_REGISTRATION_REFERENCE),

  // ── CONTACT ENDPOINTS ────────────────────────────────────────────────────

  email: {
    /** Primary customer contact. */
    customerService: resolved(CUSTOMER_SERVICE_EMAIL),
    /** Legal and IP enquiries. */
    legal: resolved(LEGAL_EMAIL),
    /** Data subject rights and privacy enquiries. */
    privacy: resolved(PRIVACY_EMAIL),
    /** Warranty claims. */
    warranty: resolved(WARRANTY_EMAIL),
    /** Returns and refund requests. */
    returns: resolved(RETURNS_EMAIL),
    /** Employment applications. */
    careers: resolved(CAREERS_EMAIL),
    /** Ambassador and rider applications. */
    ambassadors: resolved(AMBASSADOR_EMAIL),
  },

  /** Optional telephone. null = not published. */
  telephone: resolved(CUSTOMER_SERVICE_PHONE),

  /** Physical returns address. null = pending. */
  returnsAddress: resolved(RETURNS_ADDRESS),

  // ── WEB PRESENCE ────────────────────────────────────────────────────────

  domain: "alkotacycles.com",
  websiteUrl: "https://alkotacycles.com",
} as const;

// ── TRADEMARK REGISTRY ───────────────────────────────────────────────────────
//
// Every brand identifier that appears publicly must be registered here.
// Status values:
//   REGISTERED      — registered trade mark with registration number
//   PENDING         — application filed, awaiting registry decision
//   UNREGISTERED    — used as a trade mark but not yet applied for
//   COMMON_LAW      — protected via common law / passing-off only

export type TrademarkStatus =
  | "REGISTERED"
  | "PENDING"
  | "UNREGISTERED"
  | "COMMON_LAW";

export interface TrademarkEntry {
  mark: string;
  status: TrademarkStatus;
  /** Jurisdiction or class. */
  jurisdiction?: string;
  /** Registry reference number, if registered or pending. */
  registrationNumber?: string;
  /** Description of goods/services covered. */
  covers: string;
  /** Internal note. */
  note?: string;
}

export const trademarkRegistry: TrademarkEntry[] = [
  {
    mark: "ALKOTA",
    status: "UNREGISTERED",
    covers: "Mountain bicycles; bicycle frames; bicycle components; apparel",
    note:
      "Primary brand identifier. Application to be filed prior to commercial launch.",
  },
  {
    mark: "ALKOTA CYCLES",
    status: "UNREGISTERED",
    covers: "Mountain bicycles; bicycle frames; retail services relating to bicycles",
    note: "Trading name composite mark.",
  },
  {
    mark: "PROJECT 01",
    status: "UNREGISTERED",
    covers: "Mountain bicycle development programme; bicycle frames and components",
    note:
      "Development programme identifier. To be evaluated for registration prior to production release.",
  },
  {
    mark: "ALKOTA SUPPLY",
    status: "UNREGISTERED",
    covers: "Clothing; headwear; drinkware; accessories",
    note: "Apparel sub-brand.",
  },
];

// ── STATUS HELPERS ───────────────────────────────────────────────────────────

/**
 * Returns true if the company's legal identity is fully resolved
 * (no placeholder fields in the minimum required set for commerce).
 */
export function isCompanyIdentityComplete(): boolean {
  return (
    company.legalEntityName !== null &&
    company.companyNumber !== null &&
    company.registeredOffice !== null &&
    company.registeredIn !== null &&
    company.email.legal !== null &&
    company.email.privacy !== null
  );
}

/**
 * Returns a formatted legal identity block suitable for footer rendering.
 * Returns null if company identity is incomplete.
 */
export function getLegalIdentityBlock(): {
  line1: string;
  line2: string;
  line3: string;
} | null {
  if (!isCompanyIdentityComplete()) return null;

  return {
    line1: `${company.legalEntityName} trading as ${company.tradingName}`,
    line2: `Company No. ${company.companyNumber} · Registered in ${company.registeredIn}`,
    line3: `Registered Office: ${company.registeredOffice}`,
  };
}
