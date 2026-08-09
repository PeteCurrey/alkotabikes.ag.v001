import React from "react";
import { siteUrl } from "@/lib/env";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alkota Cycles",
    legalName: "Alkota Performance Engineering",
    url: siteUrl,
    logo: `${siteUrl}/brand/alkota-logo-dark.png`,
    description:
      "Performance mountain bike engineering company developing complete chassis platforms.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
