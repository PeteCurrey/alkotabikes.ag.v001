/**
 * ALKOTA Performance Engineering — Primary Manufacturer Sources
 * Authoritative links to third-party primary manufacturer documentation.
 */

export interface ManufacturerSource {
  brand: string;
  officialWebsite: string;
  technicalDocsUrl: string;
  pressKitUrl: string;
  sourceLastVerified: string;
}

export const PRIMARY_SOURCES: Record<string, ManufacturerSource> = {
  "FOX": {
    brand: "FOX Factory",
    officialWebsite: "https://www.ridefox.com",
    technicalDocsUrl: "https://www.ridefox.com/fox17/help.php?m=bike",
    pressKitUrl: "https://www.ridefox.com/news.php",
    sourceLastVerified: "2026-08-08",
  },
  "HOPE TECHNOLOGY": {
    brand: "Hope Technology",
    officialWebsite: "https://www.hopetech.com",
    technicalDocsUrl: "https://www.hopetech.com/tech-support/",
    pressKitUrl: "https://www.hopetech.com/news/",
    sourceLastVerified: "2026-08-08",
  },
  "SRAM": {
    brand: "SRAM",
    officialWebsite: "https://www.sram.com",
    technicalDocsUrl: "https://www.sram.com/en/service",
    pressKitUrl: "https://www.sram.com/en/company/news",
    sourceLastVerified: "2026-08-08",
  },
  "DT SWISS": {
    brand: "DT Swiss",
    officialWebsite: "https://www.dtswiss.com",
    technicalDocsUrl: "https://www.dtswiss.com/en/support",
    pressKitUrl: "https://www.dtswiss.com/en/news",
    sourceLastVerified: "2026-08-08",
  },
  "MAXXIS": {
    brand: "Maxxis Tyres",
    officialWebsite: "https://www.maxxis.com",
    technicalDocsUrl: "https://www.maxxis.com/us/technology/bicycle-technology/",
    pressKitUrl: "https://www.maxxis.com/us/news/",
    sourceLastVerified: "2026-08-08",
  },
  "RENTHAL": {
    brand: "Renthal Cycling",
    officialWebsite: "https://www.renthal.com/cycling",
    technicalDocsUrl: "https://www.renthal.com/cycling/support",
    pressKitUrl: "https://www.renthal.com/cycling/news",
    sourceLastVerified: "2026-08-08",
  },
  "ERGON": {
    brand: "Ergon Bike",
    officialWebsite: "https://www.ergonbike.com",
    technicalDocsUrl: "https://www.ergonbike.com/en/service.html",
    pressKitUrl: "https://www.ergonbike.com/en/news.html",
    sourceLastVerified: "2026-08-08",
  },
  "CANE CREEK": {
    brand: "Cane Creek Components",
    officialWebsite: "https://canecreek.com",
    technicalDocsUrl: "https://canecreek.com/support/",
    pressKitUrl: "https://canecreek.com/news/",
    sourceLastVerified: "2026-08-08",
  },
};
