/**
 * ALKOTA CYCLES — COMPANY IDENTITY MODULE
 * lib/company.ts
 *
 * Single source of truth for company identity data per region.
 *
 * RULES:
 * - Pull UK values from src/config/legal.ts.
 * - US entity fields use explicit "PLACEHOLDER — " literals until real values are provided.
 * - Do NOT invent plausible US entity names, numbers or addresses.
 * - Every placeholder is reported at build time via scripts/placeholder-report.ts and
 *   fails production builds on alkotacycles.com.
 */

import type { RegionCode } from "./regions";
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

function resolved(value: string): string | null {
  return hasUnresolvedPlaceholders(value) ? null : value;
}

export interface BaseCompanyEntity {
  tradingName: string;
  legalEntityName: string | null;
  email: {
    customerService: string | null;
    legal: string | null;
    privacy: string | null;
    warranty: string | null;
    returns: string | null;
    careers: string | null;
    ambassadors: string | null;
  };
  telephone: string | null;
  returnsAddress: string | null;
  domain: string;
  websiteUrl: string;
}

export interface UKCompanyEntity extends BaseCompanyEntity {
  region: "uk";
  companyNumber: string | null;
  registeredOffice: string | null;
  registeredIn: string | null;
  vatNumber: string | null;
  icoReference: string | null;
}

export interface USCompanyEntity extends BaseCompanyEntity {
  region: "us";
  /** e.g. LLC, Corporation */
  entityType: string;
  stateOfIncorporation: string;
  registeredAgent: string;
  principalPlaceOfBusiness: string;
  /** Internal store presence only — NEVER rendered on public pages */
  ein: string;
  stateTaxRegistrations: string[];
}

export type CompanyEntity = UKCompanyEntity | USCompanyEntity;

export const COMPANY_ENTITIES: Record<RegionCode, CompanyEntity> = {
  uk: {
    region: "uk",
    tradingName: LEGAL_TRADING_NAME,
    legalEntityName: resolved(LEGAL_ENTITY_NAME),
    companyNumber: resolved(COMPANY_NUMBER),
    registeredOffice: resolved(REGISTERED_OFFICE),
    registeredIn: resolved(REGISTERED_IN),
    vatNumber: resolved(VAT_NUMBER),
    icoReference: resolved(ICO_REGISTRATION_REFERENCE),
    email: {
      customerService: resolved(CUSTOMER_SERVICE_EMAIL) ?? "support@alkotacycles.com",
      legal: resolved(LEGAL_EMAIL) ?? "legal@alkotacycles.com",
      privacy: resolved(PRIVACY_EMAIL) ?? "privacy@alkotacycles.com",
      warranty: resolved(WARRANTY_EMAIL) ?? "warranty@alkotacycles.com",
      returns: resolved(RETURNS_EMAIL) ?? "returns@alkotacycles.com",
      careers: resolved(CAREERS_EMAIL) ?? "careers@alkotacycles.com",
      ambassadors: resolved(AMBASSADOR_EMAIL) ?? "ambassadors@alkotacycles.com",
    },
    telephone: resolved(CUSTOMER_SERVICE_PHONE),
    returnsAddress: resolved(RETURNS_ADDRESS),
    domain: "alkotacycles.com",
    websiteUrl: "https://alkotacycles.com",
  },

  us: {
    region: "us",
    tradingName: LEGAL_TRADING_NAME,
    legalEntityName: "PLACEHOLDER — US Entity Legal Name",
    entityType: "PLACEHOLDER — US Entity Type (e.g. LLC / Corporation)",
    stateOfIncorporation: "PLACEHOLDER — US State of Incorporation",
    registeredAgent: "PLACEHOLDER — US Registered Agent",
    principalPlaceOfBusiness: "PLACEHOLDER — US Principal Place of Business",
    ein: "PLACEHOLDER — US EIN (internal use only)",
    stateTaxRegistrations: ["PLACEHOLDER — State Tax Registration"],
    email: {
      customerService: "support@alkotacycles.com",
      legal: "legal@alkotacycles.com",
      privacy: "privacy@alkotacycles.com",
      warranty: "warranty@alkotacycles.com",
      returns: "returns@alkotacycles.com",
      careers: "careers@alkotacycles.com",
      ambassadors: "ambassadors@alkotacycles.com",
    },
    telephone: null,
    returnsAddress: "PLACEHOLDER — US Returns Address",
    domain: "alkotacycles.com",
    websiteUrl: "https://alkotacycles.com/us",
  },
};

/**
 * Get company entity information for a specific region.
 */
export function getCompany(region: RegionCode = "uk"): CompanyEntity {
  return COMPANY_ENTITIES[region] ?? COMPANY_ENTITIES.uk;
}

/** Default company identity export (UK entity baseline for legacy imports) */
export const company = COMPANY_ENTITIES.uk;

// ── TRADEMARK REGISTRY ───────────────────────────────────────────────────────

export type TrademarkStatus =
  | "REGISTERED"
  | "PENDING"
  | "UNREGISTERED"
  | "COMMON_LAW";

export interface TrademarkEntry {
  mark: string;
  status: TrademarkStatus;
  jurisdiction?: string;
  registrationNumber?: string;
  covers: string;
  note?: string;
}

export const trademarkRegistry: TrademarkEntry[] = [
  {
    mark: "ALKOTA",
    status: "UNREGISTERED",
    covers: "Mountain bicycles; bicycle frames; bicycle components; apparel",
    note: "Primary brand identifier. Application to be filed prior to commercial launch.",
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
    note: "Development programme identifier.",
  },
  {
    mark: "ALKOTA SUPPLY",
    status: "UNREGISTERED",
    covers: "Clothing; headwear; drinkware; accessories",
    note: "Apparel sub-brand.",
  },
];

// ── STATUS HELPERS ───────────────────────────────────────────────────────────

export function isCompanyIdentityComplete(region: RegionCode = "uk"): boolean {
  const entity = COMPANY_ENTITIES[region];
  if (entity.region === "uk") {
    return (
      entity.legalEntityName !== null &&
      entity.companyNumber !== null &&
      entity.registeredOffice !== null &&
      entity.registeredIn !== null &&
      entity.email.legal !== null &&
      entity.email.privacy !== null
    );
  } else {
    if (entity.legalEntityName === null) return false;
    return (
      !entity.legalEntityName.includes("PLACEHOLDER — ") &&
      !entity.registeredAgent.includes("PLACEHOLDER — ") &&
      !entity.principalPlaceOfBusiness.includes("PLACEHOLDER — ")
    );
  }
}

export function getLegalIdentityBlock(region: RegionCode = "uk"): {
  line1: string;
  line2: string;
  line3: string;
} | null {
  if (!isCompanyIdentityComplete(region)) return null;

  const entity = COMPANY_ENTITIES[region];
  if (entity.region === "uk") {
    return {
      line1: `${entity.legalEntityName} trading as ${entity.tradingName}`,
      line2: `Company No. ${entity.companyNumber} · Registered in ${entity.registeredIn}`,
      line3: `Registered Office: ${entity.registeredOffice}`,
    };
  } else {
    return {
      line1: `${entity.legalEntityName} trading as ${entity.tradingName}`,
      line2: `${entity.entityType} · Incorporated in ${entity.stateOfIncorporation}`,
      line3: `Principal Place of Business: ${entity.principalPlaceOfBusiness}`,
    };
  }
}
