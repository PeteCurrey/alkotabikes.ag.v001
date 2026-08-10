/**
 * ALKOTA CYCLES — REGIONAL STRUCTURED DATA (JSON-LD)
 * lib/structured-data.ts
 *
 * Generates Schema.org Organization structured data per region.
 */

import type { RegionCode } from "./regions";
import { getCompany } from "./company";
import { REGIONS } from "./regions";
import { PROJECT_01_PRICING } from "./pricing";
import { siteUrl } from "./env";

export function generateOrganizationStructuredData(region: RegionCode) {
  const company = getCompany(region);
  const regionConfig = REGIONS[region];

  const address =
    region === "uk"
      ? "registeredOffice" in company && company.registeredOffice
        ? {
            "@type": "PostalAddress",
            streetAddress: company.registeredOffice,
            addressCountry: "GB",
          }
        : undefined
      : "principalPlaceOfBusiness" in company
      ? {
          "@type": "PostalAddress",
          streetAddress: company.principalPlaceOfBusiness,
          addressCountry: "US",
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.tradingName,
    legalName: company.legalEntityName ?? company.tradingName,
    url: `${siteUrl}/${region}`,
    logo: `${siteUrl}/images/alkota-logo.png`,
    email: company.email.customerService,
    areaServed: regionConfig.label,
    address,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: company.email.customerService,
        availableLanguage: [regionConfig.hreflang],
      },
      {
        "@type": "ContactPoint",
        contactType: "legal",
        email: company.email.legal,
        availableLanguage: [regionConfig.hreflang],
      },
    ],
  };
}

export function generateProductStructuredData(region: RegionCode) {
  const regionConfig = REGIONS[region];
  const msrp = PROJECT_01_PRICING[region].msrp;

  const offers = msrp
    ? {
        "@type": "Offer",
        price: (msrp.amountMinor / 100).toFixed(2),
        priceCurrency: msrp.currency,
        availability: "https://schema.org/PreOrder",
        url: `${siteUrl}/${region}/bikes/project-01`,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Project 01 Mountain Bike",
    brand: {
      "@type": "Brand",
      name: "Alkota Cycles",
    },
    description:
      "Alkota Project 01 full-carbon mountain bicycle development chassis.",
    offers,
  };
}
