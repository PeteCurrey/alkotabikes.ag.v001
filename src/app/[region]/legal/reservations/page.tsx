import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import {
  PROJECT01_PAID_RESERVATIONS_ENABLED,
  APPROVED_DEPOSIT,
  DEPOSIT_STATUS,
  APPROVED_PRICE_LOCK_POLICY,
  CUSTOMER_SERVICE_EMAIL,
  renderCleanLegalText,
} from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Lock, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Project 01 Reservation Terms",
  description:
    "Pre-production reservation rights, deposit conditions, price lock rules, and Build Lock mechanics for Project 01.",
  alternates: {
    canonical: `${siteUrl}/legal/reservations`,
  },
  openGraph: {
    title: "Project 01 Reservation Terms",
    description:
      "Pre-production reservation rights, deposit conditions, price lock rules, and Build Lock mechanics for Project 01.",
    url: `${siteUrl}/legal/reservations`,
  },
};

const TOC = [
  { id: "res-1", title: "1. Purpose" },
  { id: "res-2", title: "2. Pre-Production Status" },
  { id: "res-3", title: "3. Reservation Scope" },
  { id: "res-4", title: "4. Deposit Terms" },
  { id: "res-5", title: "5. Pricing Status" },
  { id: "res-6", title: "6. Price Lock Policy" },
  { id: "res-7", title: "7. Production Timing" },
  { id: "res-8", title: "8. Pre-Production Changes" },
  { id: "res-9", title: "9. Component Substitution" },
  { id: "res-10", title: "10. Build Lock Mechanics" },
  { id: "res-11", title: "11. Pre-Build Lock Cancellation" },
  { id: "res-12", title: "12. Post-Build Lock Cancellation" },
  { id: "res-13", title: "13. Alkota Cancellation" },
  { id: "res-14", title: "14. Development Delay" },
  { id: "res-15", title: "15. Transferability" },
  { id: "res-16", title: "16. Resale Restrictions" },
  { id: "res-17", title: "17. Customer Obligations" },
  { id: "res-18", title: "18. Contract Documents" },
  { id: "res-19", title: "19. Statutory Consumer Rights" },
  { id: "res-20", title: "20. Contact & Support" },
];

export default function ReservationTermsPage() {
  const doc = LEGAL_DOCUMENTS.reservations;
  const supportEmail = renderCleanLegalText(CUSTOMER_SERVICE_EMAIL);

  return (
    <LegalPageLayout document={doc} toc={TOC} eyebrow="RESERVATION & PRE-ORDER TERMS">
      <div className="space-y-10">
        {/* Status Callout */}
        <div className="p-6 bg-alkota-carbon text-alkota-snow border border-white/10 space-y-3 font-mono">
          <div className="flex items-center gap-2 text-alkota-signal font-bold uppercase tracking-wider text-xs">
            <Lock className="w-4 h-4" />
            <span>COMMERCIAL RESERVATION SYSTEM STATUS</span>
          </div>
          <div className="text-xl font-display font-bold uppercase tracking-tight text-alkota-white">
            PAID RESERVATIONS NOT CURRENTLY OPEN
          </div>
          <p className="text-xs text-alkota-slate font-sans leading-relaxed">
            Project 01 is planned for production in 2028. Free registration on the Development Register is active, but paid deposit reservations remain closed until formal commercial release.
          </p>
        </div>

        {/* 1. Purpose */}
        <section id="res-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. PURPOSE
          </h2>
          <p>These Reservation Terms govern a future paid reservation for Project 01.</p>
          <p>Joining the Development Register is free and is not a Reservation.</p>
          <p>
            A Reservation does not exist until Alkota invites or permits you to reserve, commercial terms are presented,
            you accept the applicable version of these terms, and payment is received.
          </p>
        </section>

        {/* 2. Pre-Production Status */}
        <section id="res-2" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. PRE-PRODUCTION STATUS
          </h2>
          <p>
            Project 01 is a pre-production development programme. Specification, components, timing, pricing, and availability
            remain subject to controlled engineering development.
          </p>
        </section>

        {/* 3. Scope */}
        <section id="res-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. RESERVATION IS NOT AUTOMATICALLY A FINAL PRODUCTION ORDER
          </h2>
          <p>
            A Reservation secures priority allocation rights stated in the Reservation Summary. It is not an immediate
            guarantee of serial number or finished production order until contractually granted at Build Lock.
          </p>
        </section>

        {/* 4. Deposit */}
        <section id="res-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. DEPOSIT
          </h2>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
            <div>
              <span className="text-black/50">RESERVATION DEPOSIT:</span>{" "}
              {APPROVED_DEPOSIT || "TO BE PUBLISHED BEFORE PAID RESERVATIONS OPEN"}
            </div>
            <div>
              <span className="text-black/50">DEPOSIT STATUS:</span>{" "}
              {DEPOSIT_STATUS || "TO BE CONFIRMED BEFORE RESERVATIONS OPEN"}
            </div>
          </div>
        </section>

        {/* 5. Price */}
        <section id="res-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. PRICE
          </h2>
          <p>
            The Reservation Summary will explicitly designate pricing as INDICATIVE, FIXED, or SUBJECT TO BUILD LOCK before any customer commitment.
          </p>
        </section>

        {/* 6. Price Lock */}
        <section id="res-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. PRICE LOCK POLICY
          </h2>
          <div className="p-3 bg-alkota-snow border border-black/10 font-mono text-xs">
            <span className="text-black/50">PRICE LOCK POLICY:</span>{" "}
            {APPROVED_PRICE_LOCK_POLICY || "NOT YET APPROVED"}
          </div>
        </section>

        {/* 7. Timing */}
        <section id="res-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. PRODUCTION TIMING
          </h2>
          <p>Project 01 production is planned for 2028. A planned production year is not a guaranteed delivery date.</p>
        </section>

        {/* 8. Changes */}
        <section id="res-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. CHANGES BEFORE PRODUCTION
          </h2>
          <p>
            If a material engineering change affects a reserved build, Alkota will communicate what changed, why, and available customer options.
          </p>
        </section>

        {/* 9. Substitution */}
        <section id="res-9" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            09. COMPONENT SUBSTITUTION
          </h2>
          <p>If an agreed component becomes unavailable, Alkota will propose a technically compatible, equivalent replacement.</p>
        </section>

        {/* 10. Build Lock */}
        <section id="res-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. BUILD LOCK
          </h2>
          <p>Build Lock is the final stage at which production specification, configuration, and final pricing are confirmed.</p>
        </section>

        {/* 11 & 12 Cancellation */}
        <section id="res-11" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11 & 12. CANCELLATION POLICIES
          </h2>
          <p>Pre-Build Lock and Post-Build Lock cancellation rules will be published prior to reservation opening.</p>
        </section>

        {/* 13 to 20 */}
        <section id="res-15" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            15. TRANSFER OF RESERVATION
          </h2>
          <p className="font-mono text-xs bg-alkota-snow p-3 border border-black/10">
            POLICY: NOT TRANSFERABLE WITHOUT ALKOTA&apos;S WRITTEN AGREEMENT.
          </p>
        </section>

        <section id="res-20" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            20. CONTACT
          </h2>
          <p>Reservation Support: {supportEmail}</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
