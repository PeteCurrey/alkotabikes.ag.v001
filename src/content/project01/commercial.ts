/**
 * ALKOTA PROJECT 01 — CONTROLLED COMMERCIAL SYSTEM
 *
 * Central Source of Truth for Project 01 Commercial Controls, Pricing Status,
 * Regional Availability, Commercial Revisions, and Dealer Margin Structure.
 *
 * PRINCIPLE:
 * Engineering release and Commercial release are strictly separated.
 * A component or specification may be technically approved but not commercially available.
 * Only PUBLISHED prices appear publicly.
 */

export type CommercialStatus =
  | "NOT_PRICED"
  | "INTERNAL_PRICING"
  | "PRICE_REVIEW"
  | "PRICE_APPROVED"
  | "RESERVATION_PREPARATION"
  | "RESERVATION_INVITE_ONLY"
  | "RESERVATIONS_OPEN"
  | "RESERVATIONS_PAUSED"
  | "PRODUCTION_ORDERING"
  | "SOLD_OUT";

export type PriceStatus =
  | "NOT_SET"
  | "INTERNAL"
  | "PROVISIONAL"
  | "APPROVED"
  | "PUBLISHED"
  | "SUPERSEDED";

export type PricingVisibility = "HIDDEN" | "INTERNAL_ONLY" | "INDICATIVE_PUBLIC" | "PUBLISHED_PUBLIC";

export type DepositType = "FIXED_AMOUNT font" | "PERCENTAGE" | "TOKEN";

export type DepositRefundability = "FULLY_REFUNDABLE" | "NON_REFUNDABLE" | "CONDITIONAL";

export type RegionId = "UK" | "EU" | "USA" | "CANADA" | "AUSTRALIA_NZ" | "REST_OF_WORLD";

export type CurrencyCode = "GBP" | "EUR" | "USD" | "CAD" | "AUD";

export type TaxMode = "INCLUSIVE" | "EXCLUSIVE" | "CALCULATED_AT_CHECKOUT" | "NOT_CONFIGURED";

export type DeliveryMethod = "DIRECT" | "ALKOTA_PARTNER" | "COLLECTION" | "TBC";

export interface RegionalCommercialSpec {
  regionId: RegionId;
  name: string;
  enabled: boolean;
  commercialStatus: CommercialStatus;
  currency: CurrencyCode;
  displayPrice: number | null; // null = TBC / Not Set
  priceStatus: PriceStatus;
  taxTreatment: TaxMode;
  taxIncluded: boolean;
  deliveryAvailable: boolean;
  reservationAvailable: boolean;
  dealerOnly: boolean;
  notes: string;
}

export interface ComponentPriceDelta {
  componentId: string;
  priceDelta: number | null; // null = TBC
  priceDeltaStatus: PriceStatus;
  currency: CurrencyCode;
  regionId: RegionId;
  notes?: string;
}

export interface DealerCommercialFields {
  msrp: number | null;
  dealerCost: number | null;
  dealerMarginPct: number | null;
  demoPrice: number | null;
  currency: CurrencyCode;
  regionId: RegionId;
}

export interface Project01Commercial {
  id: string;
  project: string;
  codeName: string;
  commercialRevision: string; // e.g. "C00"
  commercialStatus: CommercialStatus;
  baseCurrency: CurrencyCode;
  basePrice: number | null; // null = TBC / Not set
  priceStatus: PriceStatus;
  pricingVisibility: PricingVisibility;
  reservationEnabled: boolean;
  reservationMode: "DISABLED" | "INVITE_ONLY" | "OPEN" | "WAITLIST";
  reservationDeposit: number | null; // e.g. 500
  depositType: DepositType;
  depositRefundability: DepositRefundability;
  productionYear: number;
  estimatedProductionWindow: string;
  allocationMode: "PRIORITY_REGISTER" | "FIRST_COME" | "DEALER_ALLOCATION";
  termsVersion: string;
  taxMode: TaxMode;
  deliveryMethod: DeliveryMethod;
  createdAt: string;
  updatedAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
}

// ─── CONTROLLED COMMERCIAL INSTANCE (C00 BASELINE) ───────────────────────────

export const PROJECT_01_COMMERCIAL: Project01Commercial = {
  id: "P01-COM-001",
  project: "Project 01",
  codeName: "P01-C00",
  commercialRevision: "C00",
  commercialStatus: "RESERVATION_PREPARATION",
  baseCurrency: "GBP",
  basePrice: null, // Public price is TBC
  priceStatus: "INTERNAL",
  pricingVisibility: "HIDDEN",
  reservationEnabled: false,
  reservationMode: "DISABLED",
  reservationDeposit: 500, // Proposed deposit, not active
  depositType: "FIXED_AMOUNT font",
  depositRefundability: "FULLY_REFUNDABLE",
  productionYear: 2028,
  estimatedProductionWindow: "Q2 2028",
  allocationMode: "PRIORITY_REGISTER",
  termsVersion: "2026.1-PRE-RELEASE",
  taxMode: "INCLUSIVE",
  deliveryMethod: "ALKOTA_PARTNER",
  createdAt: "2026-01-15",
  updatedAt: "2026-02-01",
  approvedBy: "Pete Currey / OWNER",
  approvedAt: "2026-02-01",
};

// ─── REGIONAL COMMERCIAL SPECIFICATIONS ──────────────────────────────────────

export const REGIONAL_COMMERCIAL_SPECS: Record<RegionId, RegionalCommercialSpec> = {
  UK: {
    regionId: "UK",
    name: "United Kingdom",
    enabled: true,
    commercialStatus: "RESERVATION_PREPARATION",
    currency: "GBP",
    displayPrice: null,
    priceStatus: "NOT_SET",
    taxTreatment: "INCLUSIVE",
    taxIncluded: true,
    deliveryAvailable: true,
    reservationAvailable: false,
    dealerOnly: false,
    notes: "Home market. Production planned 2028. Direct + Partner delivery.",
  },
  EU: {
    regionId: "EU",
    name: "European Union",
    enabled: true,
    commercialStatus: "RESERVATION_PREPARATION",
    currency: "EUR",
    displayPrice: null,
    priceStatus: "NOT_SET",
    taxTreatment: "INCLUSIVE",
    taxIncluded: true,
    deliveryAvailable: true,
    reservationAvailable: false,
    dealerOnly: false,
    notes: "Primary export market. Direct + Partner Network delivery.",
  },
  USA: {
    regionId: "USA",
    name: "United States",
    enabled: true,
    commercialStatus: "RESERVATION_PREPARATION",
    currency: "USD",
    displayPrice: null,
    priceStatus: "NOT_SET",
    taxTreatment: "EXCLUSIVE",
    taxIncluded: false,
    deliveryAvailable: true,
    reservationAvailable: false,
    dealerOnly: false,
    notes: "North American launch market. State sales taxes calculated at checkout.",
  },
  CANADA: {
    regionId: "CANADA",
    name: "Canada",
    enabled: true,
    commercialStatus: "RESERVATION_PREPARATION",
    currency: "CAD",
    displayPrice: null,
    priceStatus: "NOT_SET",
    taxTreatment: "EXCLUSIVE",
    taxIncluded: false,
    deliveryAvailable: true,
    reservationAvailable: false,
    dealerOnly: false,
    notes: "GST/PST calculated at checkout.",
  },
  AUSTRALIA_NZ: {
    regionId: "AUSTRALIA_NZ",
    name: "Australia & New Zealand",
    enabled: true,
    commercialStatus: "RESERVATION_PREPARATION",
    currency: "AUD",
    displayPrice: null,
    priceStatus: "NOT_SET",
    taxTreatment: "INCLUSIVE",
    taxIncluded: true,
    deliveryAvailable: true,
    reservationAvailable: false,
    dealerOnly: false,
    notes: "GST inclusive pricing.",
  },
  REST_OF_WORLD: {
    regionId: "REST_OF_WORLD",
    name: "Rest of World",
    enabled: false,
    commercialStatus: "NOT_PRICED",
    currency: "USD",
    displayPrice: null,
    priceStatus: "NOT_SET",
    taxTreatment: "NOT_CONFIGURED",
    taxIncluded: false,
    deliveryAvailable: false,
    reservationAvailable: false,
    dealerOnly: true,
    notes: "Individual market evaluation required.",
  },
};

// ─── COMPONENT PRICE DELTAS ───────────────────────────────────────────────────

export const COMPONENT_PRICE_DELTAS: ComponentPriceDelta[] = [
  {
    componentId: "FOX-36-GRIP2",
    priceDelta: 0,
    priceDeltaStatus: "INTERNAL",
    currency: "GBP",
    regionId: "UK",
    notes: "Included in baseline development build",
  },
  {
    componentId: "FOX-[#1a73e8]-FLOAT-X2",
    priceDelta: 0,
    priceDeltaStatus: "INTERNAL",
    currency: "GBP",
    regionId: "UK",
    notes: "Included in baseline development build",
  },
  {
    componentId: "HOPE-TECH4-V4",
    priceDelta: 0,
    priceDeltaStatus: "INTERNAL",
    currency: "GBP",
    regionId: "UK",
    notes: "Included in baseline development build",
  },
  {
    componentId: "DT-EX1700-29",
    priceDelta: 0,
    priceDeltaStatus: "INTERNAL",
    currency: "GBP",
    regionId: "UK",
    notes: "Included in baseline development build",
  },
  {
    componentId: "DT-EXC1501-29",
    priceDelta: null,
    priceDeltaStatus: "INTERNAL",
    currency: "GBP",
    regionId: "UK",
    notes: "Carbon wheel upgrade delta under commercial evaluation",
  },
];

// ─── PRIVATE DEALER COMMERCIALS (STRICTLY UNEXPOSED TO PUBLIC API) ────────────

const DEALER_COMMERCIALS_INTERNAL: DealerCommercialFields[] = [
  {
    msrp: null,
    dealerCost: null,
    dealerMarginPct: null,
    demoPrice: null,
    currency: "GBP",
    regionId: "UK",
  },
  {
    msrp: null,
    dealerCost: null,
    dealerMarginPct: null,
    demoPrice: null,
    currency: "EUR",
    regionId: "EU",
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export function getPublicPriceDisplay(region: RegionId = "UK"): {
  text: string;
  isPublished: boolean;
  statusText: string;
} {
  const regSpec = REGIONAL_COMMERCIAL_SPECS[region];
  const com = PROJECT_01_COMMERCIAL;

  if (com.priceStatus === "PUBLISHED" && regSpec?.displayPrice !== null) {
    const symbol = regSpec.currency === "GBP" ? "£" : regSpec.currency === "EUR" ? "€" : "$";
    return {
      text: `${symbol}${regSpec.displayPrice.toLocaleString()}`,
      isPublished: true,
      statusText: "COMMERCIAL MSRP",
    };
  }

  if (com.priceStatus === "PROVISIONAL" && regSpec?.displayPrice !== null) {
    const symbol = regSpec.currency === "GBP" ? "£" : regSpec.currency === "EUR" ? "€" : "$";
    return {
      text: `${symbol}${regSpec.displayPrice.toLocaleString()}`,
      isPublished: false,
      statusText: "INDICATIVE DEVELOPMENT PRICE",
    };
  }

  return {
    text: "FINAL PRICING TO BE CONFIRMED",
    isPublished: false,
    statusText: "PRE-PRODUCTION DEVELOPMENT",
  };
}

/** Strictly internal function — Studio only */
export function getInternalDealerCommercials(): DealerCommercialFields[] {
  return DEALER_COMMERCIALS_INTERNAL;
}
