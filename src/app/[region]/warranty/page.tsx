import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import { getLegalDocument } from "@/config/legalDocuments";
import { getCompany } from "@/lib/company";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { ShieldAlert } from "lucide-react";

const UK_TOC = [
  { id: "philosophy", title: "Warranty Philosophy" },
  { id: "provider", title: "1. Warranty Provider" },
  { id: "applicable", title: "2. Applicable Warranty Schedule" },
  { id: "schedule", title: "↳ Warranty Schedule (ALK-UK-WARSCHED-001)" },
  { id: "frame", title: "3. Frame Warranty" },
  { id: "finish", title: "4. Finish & Paint" },
  { id: "third-party", title: "5. Third-Party Components" },
  { id: "exclusions", title: "6. Commercial Exclusions" },
  { id: "claim", title: "7. Making a Claim" },
  { id: "statutory", title: "8. Statutory Rights (UK)" },
];

const US_TOC = [
  { id: "us-w-1", title: "1. Magnuson-Moss Act Designation (LIMITED)" },
  { id: "us-w-2", title: "2. Pre-Sale Availability Notice" },
  { id: "us-w-3", title: "3. Warranty Provider & Scope" },
  { id: "us-w-4", title: "4. Frame & Swingarm Coverage" },
  { id: "us-w-5", title: "5. Finish & Cosmetic Paint" },
  { id: "us-w-6", title: "6. Third-Party Components" },
  { id: "us-w-7", title: "7. Exclusions & Limitations" },
  { id: "us-w-8", title: "8. State Law Rights & Disclaimers" },
  { id: "us-w-9", title: "9. How to File a Warranty Claim" },
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
    path: "/warranty",
    title: "Warranty Philosophy",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function WarrantyPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const isUS = regionCode === "us";
  const doc = getLegalDocument("warranty", regionCode);
  const company = getCompany(regionCode);

  if (isUS) {
    return (
      <LegalPageLayout
        document={doc}
        toc={US_TOC}
        eyebrow="US CONSUMER WARRANTY (MAGNUSON-MOSS ACT)"
      >
        <div className="space-y-10">
          {/* Pre-Production Notice Banner */}
          <div className="p-6 bg-alkota-carbon text-alkota-snow border border-white/10 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-alkota-signal font-bold uppercase tracking-wider text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>PROJECT 01 PRE-PRODUCTION US WARRANTY NOTICE</span>
            </div>
            <p className="text-sm font-sans text-alkota-snow/90 leading-relaxed">
              Project 01 is currently in R00 pre-production development. Final commercial warranty terms and schedules will be published prior to production release and order opening.
            </p>
            <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              TERMS TO BE CONFIRMED BEFORE US PRODUCTION RELEASE.
            </div>
          </div>

          {/* 1. MMWA Designation */}
          <section id="us-w-1" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              01. MAGNUSON-MOSS WARRANTY ACT DESIGNATION
            </h2>
            <div className="p-4 bg-alkota-snow border border-black/10 space-y-2">
              <div className="font-mono text-sm font-bold text-alkota-black uppercase tracking-wider">
                DESIGNATION: LIMITED WARRANTY
              </div>
              <p className="text-xs text-black/70 leading-relaxed">
                In compliance with the federal Magnuson-Moss Warranty Act (15 U.S.C. §2301 et seq.) and 16 CFR Part 700, this written warranty is conspicuously designated as a <strong>LIMITED WARRANTY</strong>. This designation applies to consumer purchases over $15 in the United States.
              </p>
            </div>
          </section>

          {/* 2. Pre-Sale Availability */}
          <section id="us-w-2" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              02. PRE-SALE AVAILABILITY NOTICE
            </h2>
            <p>
              In accordance with 16 CFR Part 702 (Pre-Sale Availability of Written Warranty Terms), the full text of this written limited warranty is made available online prior to purchase at <em>alkotacycles.com/us/warranty</em> and upon request from customer support or authorized US partners.
            </p>
          </section>

          {/* 3. Provider */}
          <section id="us-w-3" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              03. WARRANTY PROVIDER &amp; SCOPE
            </h2>
            <p>The warrantor providing this limited warranty is:</p>
            <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
              <div><span className="text-black/50">WARRANTOR:</span> {company.legalEntityName}</div>
              <div><span className="text-black/50">WARRANTY EMAIL:</span> {company.email.warranty}</div>
              <div><span className="text-black/50">WEBSITE:</span> {company.websiteUrl}</div>
            </div>
          </section>

          {/* 4. Frame */}
          <section id="us-w-4" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              04. FRAME &amp; SWINGARM COVERAGE
            </h2>
            <p>
              Alkota warrants the carbon chassis frame and rear swingarm against defects in materials and manufacturing workmanship for the designated warranty term to the original purchaser.
            </p>
            <div className="p-3 bg-alkota-snow border border-black/10 font-mono text-xs">
              <span className="text-black/50">WARRANTY DURATION:</span> TO BE CONFIRMED BEFORE US PRODUCTION RELEASE
            </div>
          </section>

          {/* 5. Finish */}
          <section id="us-w-5" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              05. FINISH &amp; COSMETIC PAINT
            </h2>
            <p>
              Paint finishes, graphics, and clear coat layers are covered against manufacturing defects such as peeling or blistering for a specific finish term. Normal cosmetic scratch wear from trail use is excluded.
            </p>
          </section>

          {/* 6. Third Party */}
          <section id="us-w-6" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              06. THIRD-PARTY COMPONENTS
            </h2>
            <p>
              Suspension dampers, drivetrain components, brakes, and wheels manufactured by third-party suppliers are warranted by their respective original manufacturers. Alkota will assist customers in facilitating component warranty claims.
            </p>
          </section>

          {/* 7. Exclusions */}
          <section id="us-w-7" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              07. EXCLUSIONS &amp; LIMITATIONS
            </h2>
            <p>This limited warranty does not cover:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Normal wear and tear on consumable parts (brake pads, tyres, chains, seals, bearings).</li>
              <li>Damage resulting from crashes, collisions, improper assembly, or inadequate maintenance.</li>
              <li>Damage caused by unauthorized structural modifications or exceeding intended usage limits.</li>
              <li>Damage incurred during commercial rental or unapproved racing use.</li>
            </ul>
          </section>

          {/* 8. State Law Rights */}
          <section id="us-w-8" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              08. STATE LAW RIGHTS &amp; LEGAL DISCLAIMERS
            </h2>
            <p className="text-xs text-black/80 leading-relaxed">
              THIS LIMITED WARRANTY GIVES YOU SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS WHICH VARY FROM STATE TO STATE. SOME STATES DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS OR THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU.
            </p>
          </section>

          {/* 9. Claim */}
          <section id="us-w-9" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              09. HOW TO FILE A WARRANTY CLAIM
            </h2>
            <p>
              To initiate a warranty claim in the US, contact <a href={`mailto:${company.email.warranty}`} className="underline font-mono">{company.email.warranty}</a> with proof of purchase, chassis serial number, and photographs of the issue.
            </p>
          </section>
        </div>
      </LegalPageLayout>
    );
  }

  // UK Warranty Framework
  return (
    <LegalPageLayout
      document={doc}
      toc={UK_TOC}
      eyebrow="COMMERCIAL WARRANTY (UK)"
    >
      <div className="space-y-10">
        <div className="p-6 bg-alkota-carbon text-alkota-snow border border-white/10 space-y-3 font-mono">
          <div className="flex items-center gap-2 text-alkota-signal font-bold uppercase tracking-wider text-xs">
            <ShieldAlert className="w-4 h-4" />
            <span>PROJECT 01 PRE-PRODUCTION WARRANTY NOTICE</span>
          </div>
          <p className="text-sm font-sans text-alkota-snow/90 leading-relaxed">
            Project 01 has not yet reached production release. Commercial warranty terms are subject to final engineering validation.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
            FINAL PRODUCTION WARRANTY TO BE PUBLISHED BEFORE PRODUCTION ORDERS OPEN.
          </div>
        </div>

        <section id="philosophy" className="space-y-3">
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            OUR WARRANTY PHILOSOPHY
          </h2>
          <p>A premium mountain bike should be designed to be ridden, maintained, rebuilt and kept.</p>
          <p>The Alkota Limited Warranty is an additional commercial benefit and does not replace statutory consumer rights under the Consumer Rights Act 2015.</p>
        </section>

        <section id="provider" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            1. WARRANTY PROVIDER
          </h2>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
            {company.legalEntityName ?? company.tradingName} — {company.websiteUrl}
          </div>
        </section>

        <section id="applicable" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            2. APPLICABLE WARRANTY SCHEDULE
          </h2>
          <p>
            The commercial warranty terms and coverage terms for Project 01 are set out in the controlled <strong>Warranty Schedule (Document ID: ALK-UK-WARSCHED-001)</strong> below. Upon bike registration, individual chassis serial numbers and warranty registration records are linked to your My Alkota account.
          </p>
        </section>

        <section id="schedule" className="space-y-3 pl-4 border-l-2 border-alkota-signal/30">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-alkota-signal">WARRANTY SCHEDULE — DOCUMENT ID: ALK-UK-WARSCHED-001 · STATUS: DRAFT</div>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-3">
            <div className="font-bold text-alkota-black uppercase">COVERAGE SUMMARY (PRE-PRODUCTION DRAFT — SUBJECT TO REVISION)</div>
            <div className="space-y-1">
              <div className="flex gap-3"><span className="text-black/50 w-52 shrink-0">Carbon Frame &amp; Swingarm:</span><span>Term to be confirmed before production release</span></div>
              <div className="flex gap-3"><span className="text-black/50 w-52 shrink-0">AL7075-T6 Linkages &amp; Pivots:</span><span>Defect replacement — term to be confirmed</span></div>
              <div className="flex gap-3"><span className="text-black/50 w-52 shrink-0">Frame Paint &amp; Finish:</span><span>Manufacturing defect (peeling/blistering) — term to be confirmed</span></div>
              <div className="flex gap-3"><span className="text-black/50 w-52 shrink-0">3rd-Party Components:</span><span>Respective manufacturer warranties — facilitated by Alkota</span></div>
            </div>
            <div className="text-black/40 text-[10px] uppercase tracking-wider">Final schedule published before production orders open. Linked to chassis serial number upon bike registration in My Alkota.</div>
          </div>
        </section>

        <section id="frame" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            3. FRAME WARRANTY
          </h2>
          <div className="p-4 bg-alkota-snow border border-black/10 space-y-2 font-mono text-xs">
            <div className="font-bold text-alkota-black uppercase">Carbon Frame &amp; Swingarm</div>
            <div><span className="text-black/50">WARRANTY TERM:</span> TO BE CONFIRMED BEFORE PRODUCTION RELEASE</div>
          </div>
        </section>

        <section id="finish" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            4. FINISH &amp; PAINT
          </h2>
          <p>Paint and finish coverage is subject to separate terms. Cosmetic trail wear is excluded.</p>
        </section>

        <section id="third-party" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            5. THIRD-PARTY COMPONENTS
          </h2>
          <p>Specialist components carry manufacturer warranties. Exercising component warranties does not require you to surrender statutory rights against Alkota as retailer.</p>
        </section>

        <section id="exclusions" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            6. COMMERCIAL EXCLUSIONS
          </h2>
          <p>Excludes wear and tear, neglect, crash damage, corrosion, or unapproved structural modifications.</p>
        </section>

        <section id="claim" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            7. MAKING A CLAIM
          </h2>
          <p>Contact <a href={`mailto:${company.email.warranty}`} className="underline font-mono">{company.email.warranty}</a> to initiate a claim.</p>
        </section>

        <section id="statutory" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            8. STATUTORY RIGHTS (UK)
          </h2>
          <p>UK consumer statutory rights under the Consumer Rights Act 2015 operate independently of commercial warranty guarantees.</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
