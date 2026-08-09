export type RegionCode = "uk" | "us";

export interface Region {
  code: RegionCode;
  hreflang: "en-GB" | "en-US";
  label: string; // "United Kingdom"
  shortLabel: string; // "UK"
  flag: string; // Emoji or SVG indicator
  currency: "GBP" | "USD";
  currencySymbol: "£" | "$";
  pricesIncludeTax: boolean; // true UK, false US
  taxLabel: string; // "inc. VAT" | "excl. tax"
  measurementSystem: "metric" | "imperial";
  dateFormat: string;
}

export const REGIONS: Record<RegionCode, Region> = {
  uk: {
    code: "uk",
    hreflang: "en-GB",
    label: "United Kingdom",
    shortLabel: "UK",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    pricesIncludeTax: true,
    taxLabel: "inc. VAT",
    measurementSystem: "metric",
    dateFormat: "DD/MM/YYYY",
  },
  us: {
    code: "us",
    hreflang: "en-US",
    label: "United States",
    shortLabel: "US",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    pricesIncludeTax: false,
    taxLabel: "excl. tax",
    measurementSystem: "imperial",
    dateFormat: "MM/DD/YYYY",
  },
};

export const DEFAULT_REGION: RegionCode = "us";
export const VALID_REGIONS: RegionCode[] = ["uk", "us"];

export function isValidRegion(code?: string): code is RegionCode {
  return !!code && (code === "uk" || code === "us");
}

export function getRegion(code?: string): Region {
  if (isValidRegion(code)) {
    return REGIONS[code];
  }
  return REGIONS[DEFAULT_REGION];
}

/**
 * Remove any existing region prefix (/uk or /us) from a pathname
 */
export function stripRegionPrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isValidRegion(segments[0])) {
    const stripped = "/" + segments.slice(1).join("/");
    return stripped === "/" ? "" : stripped;
  }
  return pathname === "/" ? "" : pathname;
}

/**
 * Build a region-prefixed URL path
 */
export function buildRegionalPath(path: string, region: RegionCode): string {
  const cleanPath = stripRegionPrefix(path);
  return `/${region}${cleanPath}`;
}
