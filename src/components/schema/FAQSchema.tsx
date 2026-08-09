import React from "react";

const FAQS = [
  {
    q: "WHEN WILL PROJECT 01 LAUNCH?",
    a: "Production launch is planned for 2028, subject to completion of the engineering and validation programme.",
  },
  {
    q: "CAN I ORDER A BIKE TODAY?",
    a: "You can join the Project 01 development register today. Formal production reservations will open later in the programme.",
  },
  {
    q: "DO I HAVE TO PAY NOW?",
    a: "No. Joining the current Project 01 Register does not require payment.",
  },
  {
    q: "IS THE CURRENT SPECIFICATION FINAL?",
    a: "No. Project 01 remains in pre-production development.",
  },
  {
    q: "WHY REGISTER THIS EARLY?",
    a: "Because we want the people most interested in the machine to be part of the journey rather than appearing only when the buy button goes live.",
  },
  {
    q: "WILL REGISTERED CUSTOMERS GET PRIORITY?",
    a: "Registered customers are intended to receive early access to formal production reservation opportunities.",
  },
  {
    q: "CAN I CHOOSE MY SPECIFICATION?",
    a: "The final ordering process is intended to include meaningful configuration. Available options will be confirmed as the production specification is finalised.",
  },
  {
    q: "WHAT IF PROJECT 01 CHANGES?",
    a: "We tell you. Development changes are part of the programme and will be documented through the Project 01 Journal.",
  },
  {
    q: "WHEN WILL PRICING BE ANNOUNCED?",
    a: "Final pricing will be published once the production specification and manufacturing programme are sufficiently mature.",
  },
  {
    q: "WHERE WILL ALKOTA DELIVER?",
    a: "Initial market availability will be confirmed before production reservations open.",
  },
];

export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
