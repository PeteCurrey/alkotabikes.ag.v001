/**
 * ALKOTA CYCLES — PRICING ARCHITECTURE
 * lib/pricing.ts
 *
 * RULES (do not remove or "simplify"):
 *
 * 1. ZERO RUNTIME FX CONVERSION. No exchange rate, no multiplier, no FX API.
 *    Prices are commercially authored, not arithmetically derived.
 *    Reason A: UK consumer prices must display inclusive of VAT (Price Marking Order 2004).
 *    Reason B: US prices display exclusive of sales tax, which varies by destination ZIP.
 *    Reason C: Price points are commercial decisions (£45 → $49, not $56.83).
 *    Reason D: A floating rate changes prices without a human decision, and a cached
 *              page can contradict the checkout total.
 *
 * 2. INTEGER MINOR UNITS ONLY. amountMinor is always a whole number of pence or cents.
 *    Never use floating-point arithmetic for currency values.
 *
 * 3. MISSING REGIONAL PRICE = UNAVAILABLE. A product with no price for a region
 *    is not available in that region. Never fall back to another region's price.
 *    Never show a converted figure.
 *
 * 4. PROJECT 01 PRICES SHIP NULL. No TBC figure, no range, no "from".
 *    The existing "PRODUCTION PRICE: TBC" treatment renders instead.
 *
 * 5. CURRENCY MUST MATCH REGION. GBP prices only on UK pages; USD prices only on
 *    US pages. The formatPrice function enforces this at runtime; build-time
 *    validation in scripts/validate-prices.ts enforces it at build.
 */

import type { RegionCode } from "./regions";
import { REGIONS } from "./regions";

// ── Types ────────────────────────────────────────────────────────────────────

export interface RegionalPrice {
  region: RegionCode;
  /** Integer minor units (pence for GBP, cents for USD). NEVER floats. */
  amountMinor: number;
  currency: "GBP" | "USD";
  /** true for UK (VAT-inclusive), false for US (tax added at checkout) */
  taxIncluded: boolean;
  /**
   * VAT/tax rate applied to arrive at this price.
   * e.g. 0.20 = 20% VAT. null if tax not included or rate not applicable.
   */
  taxRateApplied: number | null;
}

export interface ProductPricing {
  productId: string;
  /** Prices indexed by region. A missing key means unavailable in that region. */
  prices: Partial<Record<RegionCode, RegionalPrice>>;
}

// ── Validation ───────────────────────────────────────────────────────────────

/** Throws if the price's currency does not match its declared region. */
export function assertPriceCurrencyMatchesRegion(price: RegionalPrice): void {
  const region = REGIONS[price.region];
  if (price.currency !== region.currency) {
    throw new Error(
      `Price currency mismatch: price for region "${price.region}" declares ` +
        `currency "${price.currency}" but region expects "${region.currency}". ` +
        `Never author a price with a mismatched currency — this is a data integrity error.`
    );
  }
  if (!Number.isInteger(price.amountMinor)) {
    throw new Error(
      `Price amountMinor must be an integer (minor units). ` +
        `Received ${price.amountMinor} for region ${price.region}.`
    );
  }
}

// ── Formatting ───────────────────────────────────────────────────────────────

/**
 * Format a RegionalPrice for display.
 *
 * UK: £120.00 inc. VAT
 * US: $149.00 excl. tax — tax calculated at checkout
 *
 * Tax label is sourced from lib/regions.ts — never hardcoded.
 */
export function formatPrice(price: RegionalPrice): string {
  assertPriceCurrencyMatchesRegion(price);
  const region = REGIONS[price.region];
  const amount = price.amountMinor / 100;
  const formatted = new Intl.NumberFormat(region.hreflang, {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} ${region.taxLabel}`;
}

/**
 * Format just the numeric amount without the tax label.
 * Use when the tax label is rendered separately.
 */
export function formatPriceAmount(price: RegionalPrice): string {
  assertPriceCurrencyMatchesRegion(price);
  const region = REGIONS[price.region];
  const amount = price.amountMinor / 100;
  return new Intl.NumberFormat(region.hreflang, {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Returns the price for a region, or null if unavailable in that region.
 * NEVER returns a price from a different region as fallback.
 */
export function getPriceForRegion(
  pricing: ProductPricing,
  region: RegionCode
): RegionalPrice | null {
  return pricing.prices[region] ?? null;
}

/**
 * Returns true if a product is available (has an authored price) in a given region.
 */
export function isAvailableInRegion(
  pricing: ProductPricing,
  region: RegionCode
): boolean {
  return region in pricing.prices;
}

// ── Project 01 Pricing Model ─────────────────────────────────────────────────

/**
 * Project 01 pricing. Both MSRPs ship null — no TBC figure, no range.
 * Rendering null shows the existing "PRODUCTION PRICE: TBC" treatment.
 *
 * US cost notes are internal only — NEVER rendered on the website.
 */
export interface Project01Pricing {
  uk: {
    msrp: RegionalPrice | null;
  };
  us: {
    msrp: RegionalPrice | null;
    /**
     * INTERNAL ONLY — never rendered.
     * Records HTS classification and duty assumptions for landed cost modelling.
     * Fields are null until confirmed by customs counsel.
     */
    costNotes: {
      /**
       * Harmonized Tariff Schedule classification.
       * Bicycles are typically HTS 8712.00.
       * Confirm with customs counsel — classification determines duty rate and
       * eligibility for any trade agreement benefits.
       */
      htsClassification: string | null;
      /**
       * Section 301 duty rate if product originates from China.
       * Leave null — do NOT estimate. Requires customs counsel confirmation
       * and depends on country of origin of the frame/complete bicycle.
       */
      section301DutyRate: number | null;
      /**
       * Most Favoured Nation (MFN) duty rate under the standard tariff schedule.
       * Leave null — requires confirmation.
       */
      mfnDutyRate: number | null;
      /**
       * Country of origin for customs purposes.
       * Determined by substantial transformation rules, not brand.
       * Leave null — requires confirmation with supply chain.
       */
      countryOfOrigin: string | null;
      /**
       * Estimated landed cost factor (duty + freight + insurance as % of FOB value).
       * Leave null — do NOT estimate without confirmed duty rate and freight quotes.
       */
      landedCostFactor: number | null;
      notes: string;
    };
  };
}

export const PROJECT_01_PRICING: Project01Pricing = {
  uk: {
    msrp: null,
  },
  us: {
    msrp: null,
    costNotes: {
      htsClassification: null,
      section301DutyRate: null,
      mfnDutyRate: null,
      countryOfOrigin: null,
      landedCostFactor: null,
      notes:
        "PENDING CUSTOMS COUNSEL REVIEW. Do not estimate duty rates or landed costs until: " +
        "(1) final country of manufacture is confirmed with supply chain, " +
        "(2) HTS classification is confirmed by a licensed customs broker, " +
        "(3) Section 301 applicability is assessed based on origin. " +
        "The US MSRP must account for import duty and landed cost before being commercially set. " +
        "Recommend engaging a customs broker and freight forwarder during prototype import planning.",
    },
  },
};

// ── Store Product Catalogue ───────────────────────────────────────────────────
//
// Add products here with independently authored prices per region.
// A product with only a UK price is unavailable in the US, and vice versa.

export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  pricing: ProductPricing;
  /** Brief description for catalogue rendering */
  description: string;
}

/**
 * Helper to author a UK GBP price (VAT-inclusive, 20% VAT rate).
 * amountMinor: total pence including VAT.
 */
export function gbpPrice(amountMinor: number): RegionalPrice {
  if (!Number.isInteger(amountMinor)) {
    throw new Error(`gbpPrice: amountMinor must be an integer. Received: ${amountMinor}`);
  }
  return {
    region: "uk",
    amountMinor,
    currency: "GBP",
    taxIncluded: true,
    taxRateApplied: 0.2,
  };
}

/**
 * Helper to author a US USD price (tax-exclusive).
 * amountMinor: price in cents, before sales tax.
 */
export function usdPrice(amountMinor: number): RegionalPrice {
  if (!Number.isInteger(amountMinor)) {
    throw new Error(`usdPrice: amountMinor must be an integer. Received: ${amountMinor}`);
  }
  return {
    region: "us",
    amountMinor,
    currency: "USD",
    taxIncluded: false,
    taxRateApplied: null,
  };
}

/**
 * Initial store catalogue.
 * Products with no US price are unavailable in the US store.
 * Products with no UK price are unavailable in the UK store.
 *
 * These are independently authored commercial decisions — not conversions.
 */
export const STORE_CATALOGUE: StoreProduct[] = [
  {
    id: "alkota-supply-cap-001",
    name: "Alkota Supply Cap",
    slug: "alkota-supply-cap",
    category: "apparel",
    description: "Structured 6-panel cap. Embroidered ALKOTA wordmark.",
    pricing: {
      productId: "alkota-supply-cap-001",
      prices: {
        uk: gbpPrice(3000),   // £30.00 inc. VAT
        us: usdPrice(3200),   // $32.00 excl. tax
      },
    },
  },
  {
    id: "alkota-supply-tee-001",
    name: "Alkota Supply Technical Tee",
    slug: "alkota-supply-tee",
    category: "apparel",
    description: "Merino blend technical tee. ALKOTA chest print.",
    pricing: {
      productId: "alkota-supply-tee-001",
      prices: {
        uk: gbpPrice(6000),   // £60.00 inc. VAT
        us: usdPrice(6500),   // $65.00 excl. tax
      },
    },
  },
  {
    id: "alkota-supply-bottle-001",
    name: "Alkota Supply Water Bottle",
    slug: "alkota-supply-bottle",
    category: "accessories",
    description: "750ml insulated steel bottle. ALKOTA monochrome logo.",
    pricing: {
      productId: "alkota-supply-bottle-001",
      prices: {
        uk: gbpPrice(2800),   // £28.00 inc. VAT
        us: usdPrice(3000),   // $30.00 excl. tax
      },
    },
  },
];
