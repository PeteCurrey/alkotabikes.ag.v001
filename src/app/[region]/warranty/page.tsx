import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import {
  FRAME_WARRANTY_TERM,
  PAINT_FINISH_WARRANTY_TERM,
  CRASH_REPLACEMENT_AVAILABLE,
  WARRANTY_TRANSFERABLE,
  WARRANTY_EMAIL,
  renderCleanLegalText,
} from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { ShieldAlert, Wrench, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Warranty Policy",
  description:
    "Alkota commercial warranty philosophy, statutory rights distinction, claim process, and pre-production release status.",
  alternates: {
    canonical: `${siteUrl}/warranty`,
  },
  openGraph: {
    title: "Warranty Policy",
    description:
      "Alkota commercial warranty philosophy, statutory rights distinction, claim process, and pre-production release status.",
    url: `${siteUrl}/warranty`,
  },
};

const TOC = [
  { id: "philosophy", title: "Warranty Philosophy" },
  { id: "provider", title: "1. Warranty Provider" },
  { id: "applicable", title: "2. Applicable Warranty" },
  { id: "frame", title: "3. Frame Warranty" },
  { id: "finish", title: "4. Finish & Paint" },
  { id: "third-party", title: "5. Third-Party Components" },
  { id: "exclusions", title: "6. Commercial Exclusions" },
  { id: "modifications", title: "7. Modifications" },
  { id: "crash", title: "8. Crash Replacement" },
  { id: "claim", title: "9. Making a Claim" },
  { id: "inspection", title: "10. Inspection" },
  { id: "remedy", title: "11. Remedy" },
  { id: "statutory", title: "12. Statutory Rights" },
  { id: "second-owners", title: "13. Second Owners" },
  { id: "race-use", title: "14. Race Use" },
  { id: "contact", title: "15. Contact" },
];

export default function WarrantyPage() {
  const doc = LEGAL_DOCUMENTS.warranty;
  const warrantyEmail = renderCleanLegalText(WARRANTY_EMAIL);

  return (
    <LegalPageLayout document={doc} toc={TOC} eyebrow="COMMERCIAL WARRANTY">
      <div className="space-y-10">
        {/* Pre-Production Notice Banner */}
        <div className="p-6 bg-alkota-carbon text-alkota-snow border border-white/10 space-y-3 font-mono">
          <div className="flex items-center gap-2 text-alkota-signal font-bold uppercase tracking-wider text-xs">
            <ShieldAlert className="w-4 h-4" />
            <span>PROJECT 01 PRE-PRODUCTION WARRANTY NOTICE</span>
          </div>
          <p className="text-sm font-sans text-alkota-snow/90 leading-relaxed">
            Project 01 has not yet reached production release. Commercial warranty terms are subject to final engineering validation.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
            FINAL PROJECT 01 PRODUCTION WARRANTY TO BE PUBLISHED BEFORE PRODUCTION ORDERS OPEN.
          </div>
        </div>

        {/* Philosophy */}
        <section id="philosophy" className="space-y-3">
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            OUR WARRANTY PHILOSOPHY
          </h2>
          <p>
            A premium mountain bike should be designed to be ridden, maintained, rebuilt and kept.
          </p>
          <p>Our warranty exists to support that principle.</p>
          <p>It is also important to distinguish a commercial warranty from your legal rights.</p>
          <p>The Alkota Limited Warranty is an additional benefit.</p>
          <p>
            It does not replace or reduce mandatory rights you may have against the seller where goods are faulty,
            misdescribed, not of satisfactory quality or otherwise fail to conform to applicable consumer law.
          </p>
        </section>

        {/* 1. Who Provides */}
        <section id="provider" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            1. WHO PROVIDES THE WARRANTY
          </h2>
          <p>Where stated in the applicable Warranty Schedule, the warranty provider is:</p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
            Alkota Cycles (Legal Entity Pending) — alkotacycles.com
          </div>
        </section>

        {/* 2. What Warranty Applies */}
        <section id="applicable" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            2. WHAT WARRANTY APPLIES?
          </h2>
          <p>
            The exact warranty applying to a Bike will be identified by product, model year, production revision, market,
            original purchase date, and warranty schedule version.
          </p>
          <p>Your My Alkota record will display the warranty schedule applicable to your individual Bike.</p>
        </section>

        {/* 3. Frame Warranty */}
        <section id="frame" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            3. FRAME WARRANTY
          </h2>
          <div className="p-4 bg-alkota-snow border border-black/10 space-y-2 font-mono text-xs">
            <div className="font-bold text-alkota-black uppercase">Carbon Frame & Swingarm</div>
            <div>
              <span className="text-black/50">WARRANTY TERM:</span>{" "}
              {FRAME_WARRANTY_TERM || "TO BE CONFIRMED BEFORE PRODUCTION RELEASE"}
            </div>
            <div>
              <span className="text-black/50">ELIGIBILITY:</span> Original purchaser from Alkota or authorised Alkota Partner
            </div>
          </div>
          <p className="text-sm">
            Coverage applies to qualifying defects in material or workmanship during the applicable warranty period.
          </p>
        </section>

        {/* 4. Finish */}
        <section id="finish" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            4. FINISH & PAINT
          </h2>
          <p>Paint, clearcoat, graphics and cosmetic finish are subject to separate terms. Normal cosmetic wear is separate from defects.</p>
          <div className="p-3 bg-alkota-snow border border-black/10 font-mono text-xs">
            <span className="text-black/50">FINISH COVERAGE:</span>{" "}
            {PAINT_FINISH_WARRANTY_TERM || "TO BE CONFIRMED BEFORE PRODUCTION RELEASE"}
          </div>
        </section>

        {/* 5. Third-Party Components */}
        <section id="third-party" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            5. THIRD-PARTY COMPONENTS
          </h2>
          <p>
            Project 01 uses specialist components produced by other manufacturers which carry their own manufacturer warranty.
          </p>
          <p>
            Where Alkota sold the complete Bike to a consumer, component manufacturer warranties do not require you to abandon
            statutory rights against Alkota as seller.
          </p>
        </section>

        {/* 6. Exclusions */}
        <section id="exclusions" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            6. WHAT A COMMERCIAL WARRANTY GENERALLY DOES NOT COVER
          </h2>
          <p>A commercial warranty is not intended to cover issues caused solely by:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Normal wear and tear or consumable component wear (tyres, brake pads, chains, bearings, grips, seals)</li>
            <li>Neglect, incorrect maintenance, or incorrect assembly</li>
            <li>Misuse, crash or impact damage</li>
            <li>Corrosion caused by inappropriate storage or maintenance</li>
            <li>Use of incompatible components or unauthorised modification</li>
            <li>Failure to follow safety-critical service instructions</li>
          </ul>
        </section>

        {/* 7. Modifications */}
        <section id="modifications" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            7. MODIFICATIONS
          </h2>
          <p>
            Where an unauthorised or incompatible modification causes or contributes to a failure, it may affect a claim
            concerning that failure. Unrelated statutory rights remain unaffected.
          </p>
        </section>

        {/* 8. Crash Damage */}
        <section id="crash" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            8. CRASH DAMAGE
          </h2>
          <p>Crash or impact damage is separate from a manufacturing defect.</p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
            <div className="font-bold text-alkota-black uppercase">CRASH REPLACEMENT PROGRAMME</div>
            <div className="text-amber-800 font-bold">
              {CRASH_REPLACEMENT_AVAILABLE ? "AVAILABLE" : "UNDER DEVELOPMENT — DETAILS TO BE PUBLISHED BEFORE PRODUCTION"}
            </div>
          </div>
        </section>

        {/* 9. Making a Claim */}
        <section id="claim" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            9. MAKING A WARRANTY CLAIM
          </h2>
          <p>Start your claim by contacting support or through My Alkota when available:</p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
            <span className="text-black/50">WARRANTY CONTACT:</span> {warrantyEmail}
          </div>
          <p className="text-sm">
            Please provide name, proof of purchase, frame serial number, photographs, and a description of the issue.
          </p>
        </section>

        {/* 10. Inspection */}
        <section id="inspection" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. INSPECTION
          </h2>
          <p>We may need to inspect the Bike or component and will provide clear instructions on shipping or Partner inspection.</p>
        </section>

        {/* 11. Remedy */}
        <section id="remedy" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11. REMEDY
          </h2>
          <p>Qualifying claims will be resolved by repair, replacement or another appropriate remedy.</p>
        </section>

        {/* 12. Statutory Rights */}
        <section id="statutory" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            12. STATUTORY RIGHTS
          </h2>
          <p>Your statutory rights under consumer protection laws are independent of commercial warranty terms.</p>
        </section>

        {/* 13. Second Owners */}
        <section id="second-owners" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            13. SECOND OWNERS / TRANSFER POLICY
          </h2>
          <div className="p-3 bg-alkota-snow border border-black/10 font-mono text-xs">
            <span className="text-black/50">SECOND-OWNER POLICY:</span>{" "}
            {WARRANTY_TRANSFERABLE ? "TRANSFERABLE SUBJECT TO TERMS" : "SECOND-OWNER / TRANSFER POLICY TO BE CONFIRMED"}
          </div>
        </section>

        {/* 14. Race Use */}
        <section id="race-use" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            14. RACE USE
          </h2>
          <p>
            Project 01 is developed as a performance mountain bike. Warranty exclusions will align with the published intended-use
            category rather than imposing blanket competition bans.
          </p>
        </section>

        {/* 15. Contact */}
        <section id="contact" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            15. CONTACT
          </h2>
          <p>Direct warranty enquiries: {warrantyEmail}</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
