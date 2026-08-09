import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import { renderCleanLegalText, CUSTOMER_SERVICE_EMAIL } from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Alkota Cycles",
  description:
    "Delivery markets, Partner handover, dispatch estimates, risk of loss, and international import duty treatment.",
  alternates: {
    canonical: `${siteUrl}/shipping`,
  },
  openGraph: {
    title: "Shipping & Delivery | Alkota Cycles",
    description:
      "Delivery markets, Partner handover, dispatch estimates, risk of loss, and international import duty treatment.",
    url: `${siteUrl}/shipping`,
  },
};

const TOC = [
  { id: "ship-1", title: "1. Delivery Markets" },
  { id: "ship-2", title: "2. Project 01 Schedule" },
  { id: "ship-3", title: "3. Delivery Methods" },
  { id: "ship-4", title: "4. Partner Handover" },
  { id: "ship-5", title: "5. Delivery Charges" },
  { id: "ship-6", title: "6. Delivery Times" },
  { id: "ship-7", title: "7. Handling Delays" },
  { id: "ship-8", title: "8. Delivery Address" },
  { id: "ship-9", title: "9. Risk & Possession" },
  { id: "ship-10", title: "10. International Orders & Taxes" },
  { id: "ship-11", title: "11. Lost or Damaged Shipments" },
  { id: "ship-12", title: "12. Store Orders" },
];

export default function ShippingPage() {
  const doc = LEGAL_DOCUMENTS.shipping;
  const supportEmail = renderCleanLegalText(CUSTOMER_SERVICE_EMAIL);

  return (
    <LegalPageLayout document={doc} toc={TOC} eyebrow="LOGISTICS & DELIVERY">
      <div className="space-y-10">
        <section id="ship-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. DELIVERY MARKETS
          </h2>
          <p>
            Alkota will open commercial sales market by market. Presence on the website does not imply immediate production delivery availability in every jurisdiction.
          </p>
        </section>

        <section id="ship-2" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. PROJECT 01 SCHEDULE
          </h2>
          <p>Project 01 production is planned for 2028. Delivery timing will be communicated through official allocation windows.</p>
        </section>

        <section id="ship-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. DELIVERY METHODS
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>DIRECT DELIVERY: Hand-packaged white-glove courier to rider location.</li>
            <li>ALKOTA PARTNER HANDOVER: Professional PDI assembly, suspension baseline, and fit review via authorised partner.</li>
            <li>FACTORY COLLECTION: Regional headquarters collection where active.</li>
          </ul>
        </section>

        <section id="ship-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. PARTNER HANDOVER
          </h2>
          <p>Partner delivery includes full pre-delivery inspection (PDI), suspension baseline sag setup, and technical handover.</p>
        </section>

        <section id="ship-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. DELIVERY CHARGES
          </h2>
          <p>Delivery charges will be transparently calculated and displayed prior to binding order confirmation.</p>
        </section>

        <section id="ship-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. DELIVERY TIMES
          </h2>
          <p>Dispatch windows for store apparel items are separate from long-lead bicycle production allocation windows.</p>
        </section>

        <section id="ship-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. INTERNATIONAL ORDERS & CUSTOMS
          </h2>
          <p>
            For international purchases, import taxes, customs duties, and brokerage terms will be stated prior to checkout. Unavoidable charges will not be hidden.
          </p>
        </section>

        <section id="ship-11" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11. LOST OR DAMAGED SHIPMENTS
          </h2>
          <p>Contact customer support immediately at: {supportEmail}</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
