import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import { renderCleanLegalText, CUSTOMER_SERVICE_EMAIL, PRIVACY_EMAIL, WARRANTY_EMAIL } from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { MessageSquare } from "lucide-react";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/complaints",
    title: "Complaints",
    description: "How to raise a complaint about an Alkota order, reservation, product, privacy matter or warranty claim.",
  });
}

export default function ComplaintsPage() {
  const doc = LEGAL_DOCUMENTS.complaints;
  const supportEmail = renderCleanLegalText(CUSTOMER_SERVICE_EMAIL);
  const privacyEmail = renderCleanLegalText(PRIVACY_EMAIL);
  const warrantyEmail = renderCleanLegalText(WARRANTY_EMAIL);

  return (
    <LegalPageLayout document={doc} eyebrow="COMPLAINTS & ESCALATION">
      <div className="space-y-10">
        <p className="text-base sm:text-lg font-medium text-alkota-black leading-relaxed">
          A premium product deserves serious support. If we have got something wrong, contact us.
          We would rather solve the actual problem than direct you to a process document.
        </p>

        {/* Main contact */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            HOW TO RAISE A COMPLAINT
          </h2>
          <div className="p-5 bg-alkota-carbon text-alkota-snow border border-white/10 flex items-start gap-4">
            <MessageSquare className="w-5 h-5 text-alkota-signal shrink-0 mt-0.5" />
            <div className="font-mono text-sm space-y-1">
              <div className="font-bold uppercase tracking-wider">GENERAL COMPLAINTS</div>
              <div>{supportEmail}</div>
            </div>
          </div>

          <p>Please include where relevant:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-sm">
            <li>Your name and contact details</li>
            <li>Your order, reservation or Bike reference number</li>
            <li>A clear description of what happened</li>
            <li>What outcome you are seeking</li>
            <li>Any supporting evidence (photos, dates, correspondence references)</li>
          </ul>
        </section>

        {/* Acknowledgement */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            ACKNOWLEDGEMENT & HANDLING
          </h2>
          <p>
            Complaints are acknowledged promptly. You will not be required to contact multiple departments for a single issue
            that crosses internal boundaries — we will coordinate internally.
          </p>
          <p>Complaints may be handled by customer support, commercial, technical, warranty, privacy, or legal teams as appropriate.</p>
        </section>

        {/* Specific routes */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            SPECIFIC COMPLAINT ROUTES
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 bg-alkota-snow border border-black/10 space-y-1">
              <div className="font-mono text-xs font-bold uppercase text-alkota-black">PRIVACY</div>
              <div className="text-sm">{privacyEmail}</div>
            </div>
            <div className="p-4 bg-alkota-snow border border-black/10 space-y-1">
              <div className="font-mono text-xs font-bold uppercase text-alkota-black">WARRANTY</div>
              <div className="text-sm">{warrantyEmail}</div>
            </div>
            <div className="p-4 bg-alkota-snow border border-black/10 space-y-1">
              <div className="font-mono text-xs font-bold uppercase text-alkota-black">SAFETY / PRODUCT</div>
              <div className="text-sm">Escalated internally via customer support</div>
            </div>
          </div>
          <p className="text-sm text-alkota-slate">
            Safety-related complaints are escalated through a dedicated internal route and are not left in an unmonitored inbox.
          </p>
        </section>

        {/* Rights */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            YOUR LEGAL RIGHTS
          </h2>
          <p>
            Nothing in this complaints process prevents you from exercising any statutory right you may have,
            including pursuing a claim through the courts or contacting the relevant regulatory authority.
          </p>
          <p>
            For privacy complaints, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO)
            in the UK.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
