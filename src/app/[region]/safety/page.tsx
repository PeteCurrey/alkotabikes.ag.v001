import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { getLegalDocument } from "@/config/legalDocuments";
import { getCompany } from "@/lib/company";
import { getRegionalCompliance } from "@/lib/product-compliance";
import type { RegionCode } from "@/lib/regions";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const isUS = region === "us";
  const title = isUS
    ? "Product Safety & CPSC Compliance (16 CFR Part 1512)"
    : "Product Safety & Intended Use (EN ISO 4210)";
  const description = isUS
    ? "CPSC 16 CFR Part 1512 compliance overview, mandatory reflector set requirements, braking standards, and safety checks for Project 01."
    : "EN ISO 4210 pre-ride protocols, intended use envelope, carbon inspection, torque guidance, and maintenance for Project 01.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${region}/safety`,
      languages: {
        "en-GB": `${siteUrl}/uk/safety`,
        "en-US": `${siteUrl}/us/safety`,
        "x-default": `${siteUrl}/us/safety`,
      },
    },
    openGraph: {
      title: `${title} | Alkota Cycles`,
      description,
      url: `${siteUrl}/${region}/safety`,
    },
  };
}

const TOC = [
  { id: "safe-standard", title: "1. Applicable Safety Standards" },
  { id: "safe-physical", title: "2. Physical Product Requirements" },
  { id: "safe-docs", title: "3. Technical Documentation" },
  { id: "safe-use", title: "4. Intended Use Envelope" },
  { id: "safe-helmet", title: "5. Helmet & Protection" },
  { id: "safe-preride", title: "6. Pre-Ride Checklist" },
  { id: "safe-carbon", title: "7. Carbon Inspection" },
  { id: "safe-bulletins", title: "8. Technical Recalls & Bulletins" },
];

export default async function SafetyPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const isUS = regionCode === "us";
  const doc = getLegalDocument("safety", regionCode);
  const company = getCompany(regionCode);
  const compliance = getRegionalCompliance(regionCode);

  return (
    <LegalPageLayout
      document={doc}
      toc={TOC}
      eyebrow={isUS ? "PRODUCT SAFETY & CPSC 16 CFR 1512" : "PRODUCT SAFETY & EN ISO 4210"}
    >
      <div className="space-y-10">
        {/* Safety Callout */}
        <div className="p-5 bg-amber-50 border-l-4 border-amber-500 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-relaxed">
            Mountain biking involves inherent environmental risks. Good engineering, correct setup, pre-ride inspection, maintenance, and certified protective equipment co-exist with rider responsibility.
          </p>
        </div>

        {/* 1. Applicable Standard */}
        <section id="safe-standard" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. APPLICABLE SAFETY STANDARDS ({regionCode.toUpperCase()})
          </h2>
          <p>
            Bicycles distributed in {isUS ? "the United States" : "the United Kingdom"} are governed by specific regulatory and safety standards:
          </p>
          <div className="p-5 bg-alkota-snow border border-black/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-alkota-black uppercase">
                {compliance.primaryStandard.name}
              </span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-mono text-[10px] uppercase font-bold">
                STATUS: {compliance.primaryStandard.status}
              </span>
            </div>
            <p className="text-xs text-black/70 leading-relaxed">
              {compliance.primaryStandard.scope}
            </p>
            <div className="p-3 bg-white border border-black/10 text-xs font-mono text-black/80">
              {compliance.primaryStandard.developmentNotes}
            </div>
          </div>
        </section>

        {/* 2. Physical Product Implications */}
        <section id="safe-physical" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. PHYSICAL PRODUCT COMPLIANCE IMPLICATIONS
          </h2>
          {isUS ? (
            <div className="p-5 bg-red-950/5 border-l-4 border-red-600 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-red-900 uppercase">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>PHYSICAL PRODUCT SPECIFICATION &amp; CPSC 16 CFR 1512 MANDATE</span>
              </div>
              <p className="text-xs text-red-950 leading-relaxed">
                US bicycle safety regulation (CPSC 16 CFR Part 1512) mandates physical product design and equipment specifications that differ from European standards. Compliance requires engineering and supply chain integration:
              </p>
              <ul className="space-y-2 text-xs font-mono text-black/80 list-disc pl-5">
                {compliance.primaryStandard.physicalProductImplications?.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">
              EN ISO 4210-6 standards govern structural test loads, fatigue limits, and impact absorption for mountain bicycles in the UK. Validation testing is conducted with UKAS-accredited laboratories.
            </p>
          )}
        </section>

        {/* 3. Technical Documentation */}
        <section id="safe-docs" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. TECHNICAL DOCUMENTATION
          </h2>
          <p>
            Production bikes ship with comprehensive owner manuals and torque specifications. Workshop procedures must strictly follow technical guides rather than general online estimates.
          </p>
        </section>

        {/* 4. Intended Use Envelope */}
        <section id="safe-use" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. INTENDED USE ENVELOPE
          </h2>
          <p>
            Project 01 is engineered for aggressive trail and enduro mountain bike usage. Final ASTM usage classifications (Category 4 / Category 5) will be certified prior to production distribution.
          </p>
        </section>

        {/* 5. Protection */}
        <section id="safe-helmet" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. HELMET &amp; PROTECTIVE EQUIPMENT
          </h2>
          <p>
            Always wear a certified bicycle helmet complying with CPSC or EN 1078 standards, alongside appropriate body protection suited to trail severity.
          </p>
        </section>

        {/* 6. Pre-Ride Checklist */}
        <section id="safe-preride" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. PRE-RIDE CHECKLIST
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Brakes — lever feel, pad wear, and hydraulic pressure</li>
            <li>Wheels &amp; Axles — thru-axle torque and spoke integrity</li>
            <li>Cockpit — stem clamp torque and handlebar alignment</li>
            <li>Suspension — air pressure sag and pivot hardware security</li>
          </ul>
        </section>

        {/* 7. Carbon Inspection */}
        <section id="safe-carbon" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. CARBON CHASSIS INSPECTION
          </h2>
          <p>
            Inspect carbon fibre frame sections after any hard crash. Delamination or structural cracking can occur without external paint deformation. Discontinue use immediately if structural damage is suspected.
          </p>
        </section>

        {/* 8. Recalls */}
        <section id="safe-bulletins" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. TECHNICAL RECALLS &amp; SAFETY BULLETINS
          </h2>
          <p>
            Mandatory product safety communications and CPSC reporting bulletins are distributed to registered owners via email and displayed in My Alkota. Contact customer support at <a href={`mailto:${company.email.customerService}`} className="underline font-mono">{company.email.customerService}</a>.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
