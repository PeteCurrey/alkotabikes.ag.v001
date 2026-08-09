import React from "react";
import { siteUrl } from "@/lib/env";

export default function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Alkota Project 01 Mountain Bike",
    description:
      "Aggressive all-mountain development platform engineered around 160 mm front / 150 mm rear travel and Horst-style kinematics.",
    brand: {
      "@type": "Brand",
      name: "Alkota Cycles",
    },
    image: [
      `${siteUrl}/images/project01-glacier-white-hero.jpg`,
      `${siteUrl}/images/project01-naked-carbon-hero.jpg`,
    ],
    category: "Bicycles > Mountain Bikes",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Front Travel",
        value: "160 mm",
      },
      {
        "@type": "PropertyValue",
        name: "Rear Travel",
        value: "150 mm",
      },
      {
        "@type": "PropertyValue",
        name: "Primary Wheel Platform",
        value: "29 / 29",
      },
      {
        "@type": "PropertyValue",
        name: "Chassis Material Intent",
        value: "Full Carbon Monocoque",
      },
      {
        "@type": "PropertyValue",
        name: "Suspension Architecture",
        value: "Low-pivot four-bar / Horst-style",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
