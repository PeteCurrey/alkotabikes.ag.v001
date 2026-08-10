import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import { getLegalDocument } from "@/config/legalDocuments";
import { getCompany } from "@/lib/company";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Download } from "lucide-react";

const UK_TOC = [
  { id: "ret-1", title: "1. 14-Day Statutory Change-of-Mind Returns" },
  { id: "ret-2", title: "2. How to Cancel & Model Form" },
  { id: "ret-3", title: "3. Return Condition & Inspection" },
  { id: "ret-4", title: "4. Return Delivery Costs" },
  { id: "ret-5", title: "5. Original Delivery Charges" },
  { id: "ret-6", title: "6. Refund Timing & Processing" },
  { id: "ret-7", title: "7. Custom & Personalised Goods" },
  { id: "ret-8", title: "8. Faulty Goods (Consumer Rights Act 2015)" },
];

const US_TOC = [
  { id: "us-ret-1", title: "1. Voluntary Contractual Return Policy" },
  { id: "us-ret-2", title: "2. Return Eligibility & Timeframe" },
  { id: "us-ret-3", title: "3. Condition of Returned Items" },
  { id: "us-ret-4", title: "4. Return Shipping & Restocking" },
  { id: "us-ret-5", title: "5. Refund Processing" },
  { id: "us-ret-6", title: "6. Damaged or Defective Items" },
];


export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/returns",
    title: "1. 14-Day Statutory Change-of-Mind Returns",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function ReturnsPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const isUS = regionCode === "us";
  const doc = getLegalDocument("returns", regionCode);
  const company = getCompany(regionCode);

  if (isUS) {
    return (
      <LegalPageLayout
        document={doc}
        toc={US_TOC}
        eyebrow="US RETURNS & VOLUNTARY REFUND POLICY"
      >
        <div className="space-y-10">
          <p className="text-base sm:text-lg font-medium text-alkota-black leading-relaxed">
            Alkota Cycles offers a voluntary contractual returns policy for US purchases. Under US law, distance sales returns operate on a contractual policy basis rather than statutory cancellation.
          </p>

          <section id="us-ret-1" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              01. VOLUNTARY CONTRACTUAL RETURN POLICY
            </h2>
            <p>
              We provide a voluntary return window for qualifying unused merchandise and apparel purchased online through alkotacycles.com/us. This policy is offered voluntarily by Alkota Cycles as a customer service policy.
            </p>
          </section>

          <section id="us-ret-2" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              02. RETURN ELIGIBILITY &amp; TIMEFRAME
            </h2>
            <p>
              Qualifying non-custom products may be returned within 30 days of delivery date provided they are unused, in original packaging, and accompanied by proof of purchase.
            </p>
          </section>

          <section id="us-ret-3" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              03. CONDITION OF RETURNED ITEMS
            </h2>
            <p>
              Returned items must be undamaged, unridden, and in re-sellable condition with all tags and protective packaging intact. Items showing trail wear or assembly marks may be declined or subject to a partial refund reflecting diminished value.
            </p>
          </section>

          <section id="us-ret-4" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              04. RETURN SHIPPING &amp; RESTOCKING
            </h2>
            <p>
              Return shipping costs for voluntary change-of-mind returns are the responsibility of the customer. Returns must be shipped with tracking to our designated US returns facility:
            </p>
            <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
              <div><span className="text-black/50">RETURNS FACILITY:</span> {company.returnsAddress ?? "Alkota US Returns Facility (Pending)"}</div>
              <div><span className="text-black/50">RETURNS EMAIL:</span> {company.email.returns}</div>
            </div>
          </section>

          <section id="us-ret-5" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              05. REFUND PROCESSING
            </h2>
            <p>
              Once returned items are received and inspected at our US warehouse, approved refunds are issued to the original payment method within 10 business days.
            </p>
          </section>

          <section id="us-ret-6" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              06. DAMAGED OR DEFECTIVE ITEMS
            </h2>
            <p>
              If your order arrives damaged during transit or contains a manufacturing defect, contact <a href={`mailto:${company.email.returns}`} className="underline font-mono">{company.email.returns}</a> immediately with photos of the damaged item and packaging for prompt replacement or warranty resolution.
            </p>
          </section>
        </div>
      </LegalPageLayout>
    );
  }

  // UK Returns Policy
  return (
    <LegalPageLayout
      document={doc}
      toc={UK_TOC}
      eyebrow="CUSTOMER SUPPORT & STATUTORY RETURNS (UK)"
    >
      <div className="space-y-10">
        <p className="text-base sm:text-lg font-medium text-alkota-black leading-relaxed">
          Under UK law, distance consumers have explicit statutory cancellation rights in addition to remedies for faulty goods.
        </p>

        <section id="ret-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. 14-DAY STATUTORY CHANGE-OF-MIND RETURNS
          </h2>
          <p>
            Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, UK consumers have a statutory right to cancel an online order within 14 days of receiving physical possession of the goods without giving any reason. You then have a further 14 days from notifying us to send back the goods.
          </p>
        </section>

        <section id="ret-2" className="space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. HOW TO CANCEL &amp; MODEL CANCELLATION FORM
          </h2>
          <p>Contact returns support at:</p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
            <span className="text-black/50">RETURNS EMAIL:</span> {company.email.returns}
          </div>
          <div className="p-5 border border-black/10 bg-alkota-snow space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-alkota-black">
                MODEL STATUTORY CANCELLATION FORM (UK)
              </span>
              <a
                href={`mailto:${company.email.returns}?subject=UK%20Statutory%20Cancellation%20Form`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-alkota-carbon text-alkota-white hover:bg-alkota-black font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>SUBMIT VIA EMAIL</span>
              </a>
            </div>
            <pre className="text-[11px] font-mono whitespace-pre-wrap bg-white p-3 border border-black/10 text-alkota-slate">
{`To: ${company.email.returns}
I/We [*] hereby give notice that I/We [*] cancel my/our [*] contract of sale of the following goods [*]:
Ordered on [*] / Received on [*]:
Name of consumer(s):
Address of consumer(s):
Order Reference:
Date:`}
            </pre>
          </div>
        </section>

        <section id="ret-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. RETURN CONDITION &amp; INSPECTION
          </h2>
          <p>
            You may inspect goods to establish their nature and characteristics. Deductions may be made if handling beyond reasonable examination causes diminished value.
          </p>
        </section>

        <section id="ret-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. RETURN DELIVERY COSTS
          </h2>
          <p>
            Return shipping costs for statutory change-of-mind returns are borne by the customer. Return costs for faulty goods are paid by Alkota.
          </p>
        </section>

        <section id="ret-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. ORIGINAL DELIVERY CHARGES
          </h2>
          <p>Standard delivery costs are included in statutory refunds.</p>
        </section>

        <section id="ret-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. REFUND TIMING &amp; PROCESSING
          </h2>
          <p>Statutory refunds are processed within 14 days of receiving returned goods or proof of return dispatch.</p>
        </section>

        <section id="ret-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. CUSTOM &amp; PERSONALISED GOODS
          </h2>
          <p>Selecting standard options does not render a bicycle bespoke. Custom exceptions will be explicitly flagged before order.</p>
        </section>

        <section id="ret-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. FAULTY GOODS (CONSUMER RIGHTS ACT 2015)
          </h2>
          <p>
            If an item is faulty or non-conforming, UK consumers have statutory rights to repair, replacement or full refund under the Consumer Rights Act 2015.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
