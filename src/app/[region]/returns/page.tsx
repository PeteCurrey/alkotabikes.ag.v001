import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import { renderCleanLegalText, RETURNS_EMAIL, CUSTOMER_SERVICE_EMAIL } from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns, Cancellations & Refunds",
  description:
    "Distance-selling change-of-mind rights, return conditions, model cancellation form, faulty goods remedies, and refund timelines.",
  alternates: {
    canonical: `${siteUrl}/returns`,
  },
  openGraph: {
    title: "Returns, Cancellations & Refunds",
    description:
      "Distance-selling change-of-mind rights, return conditions, model cancellation form, faulty goods remedies, and refund timelines.",
    url: `${siteUrl}/returns`,
  },
};

const TOC = [
  { id: "ret-1", title: "1. Change-of-Mind Returns" },
  { id: "ret-2", title: "2. How to Cancel & Form" },
  { id: "ret-3", title: "3. Return Condition" },
  { id: "ret-4", title: "4. Return Delivery Costs" },
  { id: "ret-5", title: "5. Original Delivery Refunds" },
  { id: "ret-6", title: "6. Refund Timing" },
  { id: "ret-7", title: "7. Custom / Personalised Goods" },
  { id: "ret-8", title: "8. Faulty Goods & Remedies" },
  { id: "ret-9", title: "9. Wrong Item Received" },
  { id: "ret-10", title: "10. Transit Damage" },
  { id: "ret-11", title: "11. Alkota Supply Apparel" },
  { id: "ret-12", title: "12. Project 01 Reservations" },
];

export default function ReturnsPage() {
  const doc = LEGAL_DOCUMENTS.returns;
  const returnsEmail = renderCleanLegalText(RETURNS_EMAIL);
  const supportEmail = renderCleanLegalText(CUSTOMER_SERVICE_EMAIL);

  return (
    <LegalPageLayout document={doc} toc={TOC} eyebrow="CUSTOMER SUPPORT & RETURNS">
      <div className="space-y-10">
        <p className="text-base sm:text-lg font-medium text-alkota-black leading-relaxed">
          We separate four different situations because they are not the same: changing your mind, receiving the wrong item,
          receiving damaged goods, and receiving goods that are faulty or do not conform to contract.
        </p>

        {/* 1. Online Change of Mind */}
        <section id="ret-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. ONLINE CHANGE-OF-MIND RETURNS
          </h2>
          <p>
            For qualifying consumer purchases made online in the UK/EU, you have the right to cancel your order within 14 days after delivery
            without giving a reason, and return the goods within the applicable statutory return window.
          </p>
        </section>

        {/* 2. How to Cancel */}
        <section id="ret-2" className="space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. HOW TO CANCEL & MODEL CANCELLATION FORM
          </h2>
          <p>Contact returns support directly at:</p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
            <span className="text-black/50">RETURNS EMAIL:</span> {returnsEmail}
          </div>
          <p className="text-sm">
            Please include your name, order reference, item details, and statement of cancellation.
          </p>
          
          {/* Downloadable Model Form Box */}
          <div className="p-5 border border-black/10 bg-alkota-snow space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-alkota-black">
                MODEL STATUTORY CANCELLATION FORM (UK/EU)
              </span>
              <a
                href={`mailto:${returnsEmail}?subject=Cancellation%20Form%20Submission`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-alkota-carbon text-alkota-white hover:bg-alkota-black font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>SUBMIT VIA EMAIL</span>
              </a>
            </div>
            <pre className="text-[11px] font-mono whitespace-pre-wrap bg-white p-3 border border-black/10 text-alkota-slate">
{`To: ${returnsEmail}
I/We [*] hereby give notice that I/We [*] cancel my/our [*] contract of sale of the following goods [*]:
Ordered on [*] / Received on [*]:
Name of consumer(s):
Address of consumer(s):
Order Reference:
Date:`}
            </pre>
          </div>
        </section>

        {/* 3. Return Condition */}
        <section id="ret-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. RETURN CONDITION
          </h2>
          <p>
            You may inspect goods to the extent necessary to establish their nature, characteristics and functioning.
            Deductions may be made if handling beyond reasonable in-store examination causes diminished value. Restocking fees are not charged on statutory returns.
          </p>
        </section>

        {/* 4. Return Delivery */}
        <section id="ret-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. RETURN DELIVERY COSTS
          </h2>
          <p>
            Return shipping costs for change-of-mind returns are borne by the customer unless explicitly stated otherwise prior to purchase.
            Return costs for faulty or non-conforming items are handled by Alkota in accordance with consumer law.
          </p>
        </section>

        {/* 5. Original Delivery */}
        <section id="ret-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. ORIGINAL DELIVERY REFUNDS
          </h2>
          <p>Standard delivery costs are included in statutory refunds. Premium delivery upgrades are non-refundable.</p>
        </section>

        {/* 6. Refund Timing */}
        <section id="ret-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. REFUND TIMING
          </h2>
          <p>Refunds are processed within 14 days of receiving returned goods or proof of return, via the original payment method.</p>
        </section>

        {/* 7. Custom Goods */}
        <section id="ret-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. CUSTOM / PERSONALISED GOODS
          </h2>
          <p>
            Standard option configuration does not automatically classify a bicycle as bespoke. Where custom exceptions apply,
            it will be explicitly stated before purchase.
          </p>
        </section>

        {/* 8. Faulty Goods */}
        <section id="ret-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. FAULTY GOODS & STATUTORY REMEDIES
          </h2>
          <p>
            If an item is faulty, misdescribed, or non-conforming, contact {supportEmail} for repair, replacement, or statutory refund.
          </p>
        </section>

        {/* 9 to 12 */}
        <section id="ret-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. TRANSIT DAMAGE
          </h2>
          <p>Inspect packaging on arrival. Photograph transit damage promptly to assist shipping claims.</p>
        </section>

        <section id="ret-12" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            12. PROJECT 01 RESERVATIONS
          </h2>
          <p>Project 01 pre-production reservations are governed separately by /legal/reservations.</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
