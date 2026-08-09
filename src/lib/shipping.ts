/**
 * ALKOTA CYCLES — SHIPPING MODEL
 * lib/shipping.ts
 *
 * Per-region shipping configuration.
 * Cross-border DDP/DAP position is explicit — duty must not be discovered at delivery.
 */

import type { RegionCode } from "./regions";

export type DutyTerms = "DDP" | "DAP" | "NOT_APPLICABLE";

export interface ShippingTier {
  name: string;
  description: string;
  /** Threshold in minor units above which this tier is free, or null */
  freeAboveAmountMinor: number | null;
  currency: "GBP" | "USD";
  /** Cost in minor units, or 0 if free */
  costMinor: number;
  estimatedDays: string;
  carriers: string[];
}

export interface CrossBorderShipping {
  originRegion: RegionCode;
  destinationRegion: RegionCode;
  available: boolean;
  /** Incoterms: DDP (duty paid by Alkota) or DAP (duty paid by customer on delivery) */
  dutyTerms: DutyTerms;
  /**
   * Customer-facing duty disclosure — rendered at checkout if available is true.
   * Must be explicit about who bears duty. Cannot be "TBC" in production.
   */
  customerDisclosure: string;
  carriers: string[];
  estimatedDays: string;
}

export interface RegionalShippingConfig {
  region: RegionCode;
  /** Country/countries shipped from */
  originCountries: string[];
  /** Countries served by this regional fulfilment */
  destinationCountries: string[];
  tiers: ShippingTier[];
  crossBorder: CrossBorderShipping[];
  notes: string;
}

export const SHIPPING_CONFIG: Record<RegionCode, RegionalShippingConfig> = {
  uk: {
    region: "uk",
    originCountries: ["United Kingdom"],
    destinationCountries: ["United Kingdom", "Republic of Ireland"],
    tiers: [
      {
        name: "Standard Delivery",
        description: "Tracked standard delivery",
        freeAboveAmountMinor: null,
        currency: "GBP",
        costMinor: 0, // PLACEHOLDER — set before commerce enabled
        estimatedDays: "PLACEHOLDER — delivery timescale",
        carriers: ["PLACEHOLDER — carrier name"],
      },
      {
        name: "Express Delivery",
        description: "Next working day tracked delivery",
        freeAboveAmountMinor: null,
        currency: "GBP",
        costMinor: 0, // PLACEHOLDER — set before commerce enabled
        estimatedDays: "PLACEHOLDER — delivery timescale",
        carriers: ["PLACEHOLDER — carrier name"],
      },
    ],
    crossBorder: [
      {
        originRegion: "uk",
        destinationRegion: "us",
        available: false,
        dutyTerms: "NOT_APPLICABLE",
        customerDisclosure:
          "International shipping from the UK to the United States is not currently available from this regional store. Please check the US store at alkotacycles.com/us/ for US fulfilment options.",
        carriers: [],
        estimatedDays: "N/A",
      },
    ],
    notes:
      "UK fulfilment. Shipping rates and carriers to be confirmed before commerce is enabled. Republic of Ireland shipments are cross-border for customs purposes (Incoterms to be set).",
  },

  us: {
    region: "us",
    originCountries: ["United States"],
    destinationCountries: ["United States"],
    tiers: [
      {
        name: "Standard Shipping",
        description: "Tracked standard shipping (contiguous US)",
        freeAboveAmountMinor: null,
        currency: "USD",
        costMinor: 0, // PLACEHOLDER — set before commerce enabled
        estimatedDays: "PLACEHOLDER — delivery timescale",
        carriers: ["PLACEHOLDER — carrier name"],
      },
      {
        name: "Express Shipping",
        description: "Tracked express shipping (contiguous US)",
        freeAboveAmountMinor: null,
        currency: "USD",
        costMinor: 0, // PLACEHOLDER — set before commerce enabled
        estimatedDays: "PLACEHOLDER — delivery timescale",
        carriers: ["PLACEHOLDER — carrier name"],
      },
    ],
    crossBorder: [
      {
        originRegion: "uk",
        destinationRegion: "us",
        available: false,
        dutyTerms: "NOT_APPLICABLE",
        customerDisclosure:
          "Cross-border shipping from the UK to the United States is not currently available. US fulfilment will be provided from within the United States.",
        carriers: [],
        estimatedDays: "N/A",
      },
    ],
    notes:
      "US fulfilment. If UK ships to US customers before US fulfilment exists, DAP terms must be adopted and the customer-facing disclosure must clearly state that import duty and customs charges will be levied by US Customs and Border Protection on delivery. This must be shown at checkout before payment, not in a post-purchase email. PLACEHOLDER — duty position to be confirmed with customs counsel before any cross-border shipment.",
  },
};

export function getShippingConfig(region: RegionCode): RegionalShippingConfig {
  return SHIPPING_CONFIG[region];
}

/**
 * Returns cross-border config if UK ships to US customers before US fulfilment is active.
 * This is the mechanism by which the duty disclosure reaches the checkout.
 */
export function getCrossBorderConfig(
  origin: RegionCode,
  destination: RegionCode
): CrossBorderShipping | null {
  return (
    SHIPPING_CONFIG[origin].crossBorder.find(
      (cb) => cb.destinationRegion === destination
    ) ?? null
  );
}
