import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import siteUrl from "@/lib/env";
import { REGIONAL_LEGAL_DOCUMENTS, getLegalDocument, type LegalDocumentMetadata } from "@/config/legalDocuments";
import { getCompany } from "@/lib/company";
import type { RegionCode } from "@/lib/regions";
import { Shield, ArrowRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const isUS = region === "us";
  const title = isUS ? "Legal Centre (US)" : "Legal Centre";
  const description = isUS
    ? "Alkota Cycles US legal documentation index: Legal Notice, US Privacy Notice, Terms & Conditions of Sale, Limited Warranty, Returns, Shipping, Cookies, and Accessibility."
    : "Alkota Cycles UK legal documentation index: Legal Notice, Privacy Policy, Terms & Conditions, Warranty, Returns, Shipping, Cookies, Accessibility, Safety, and Complaints.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${region}/legal`,
      languages: {
        "en-GB": `${siteUrl}/uk/legal`,
        "en-US": `${siteUrl}/us/legal`,
        "x-default": `${siteUrl}/us/legal`,
      },
    },
    openGraph: {
      title: `${title} | Alkota Cycles`,
      description,
      url: `${siteUrl}/${region}/legal`,
    },
  };
}

const LEGAL_INDEX: {
  group: string;
  desc: string;
  docs: { key: string; href: string }[];
}[] = [
  {
    group: "WEBSITE GOVERNANCE",
    desc: "Operator identity, site usage rules, and intellectual property.",
    docs: [{ key: "legal", href: "/legal/notice" }],
  },
  {
    group: "COMMERCIAL TERMS",
    desc: "Terms of sale, reservation rights, returns, and delivery.",
    docs: [
      { key: "terms", href: "/terms" },
      { key: "reservations", href: "/legal/reservations" },
      { key: "returns", href: "/returns" },
      { key: "shipping", href: "/shipping" },
    ],
  },
  {
    group: "WARRANTY & SAFETY",
    desc: "Commercial warranty framework and product safety protocols.",
    docs: [
      { key: "warranty", href: "/warranty" },
      { key: "safety", href: "/safety" },
    ],
  },
  {
    group: "PRIVACY & COMPLIANCE",
    desc: "Data protection, cookie consent, accessibility, and rider rights.",
    docs: [
      { key: "privacy", href: "/privacy" },
      { key: "cookies", href: "/cookies" },
      { key: "accessibility", href: "/accessibility" },
      { key: "complaints", href: "/complaints" },
    ],
  },
];

export default async function LegalCentrePage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const company = getCompany(regionCode);
  const regionalDocs = REGIONAL_LEGAL_DOCUMENTS[regionCode];

  return (
    <div className="w-full bg-alkota-snow text-alkota-black pt-28 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-black/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 text-alkota-signal font-mono text-xs font-bold tracking-widest uppercase">
            <Shield className="w-4 h-4" />
            <span>GOVERNANCE &amp; POLICY INDEX ({regionCode.toUpperCase()})</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-alkota-black">
            LEGAL CENTRE
          </h1>
          <p className="font-sans text-base text-alkota-slate max-w-2xl">
            All legal, policy, and compliance documentation for {company.tradingName} and alkotacycles.com/{regionCode}.
          </p>
        </div>

        {/* Operator Identity Panel */}
        <div className="p-5 bg-white border border-black/10 font-mono text-xs space-y-3 shadow-sm">
          <div className="font-bold text-[10px] tracking-widest uppercase text-alkota-slate">
            SITE OPERATOR ({regionCode.toUpperCase()})
          </div>
          {company.legalEntityName ? (
            <div className="space-y-1 text-alkota-black/80">
              <div>{company.legalEntityName} trading as {company.tradingName}</div>
              {"companyNumber" in company && company.companyNumber && <div>Company No. {company.companyNumber}</div>}
              {"registeredIn" in company && company.registeredIn && <div>Registered in {company.registeredIn}</div>}
              {"registeredOffice" in company && company.registeredOffice && <div>{company.registeredOffice}</div>}
              {"principalPlaceOfBusiness" in company && company.principalPlaceOfBusiness && <div>{company.principalPlaceOfBusiness}</div>}
            </div>
          ) : (
            <div className="text-alkota-slate/60 italic">
              {company.tradingName} · Legal entity registration pending.
            </div>
          )}
          {company.email.legal && (
            <div className="text-alkota-slate">
              Legal enquiries:{" "}
              <a href={`mailto:${company.email.legal}`} className="underline hover:text-alkota-black">
                {company.email.legal}
              </a>
            </div>
          )}
        </div>

        {/* Document Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEGAL_INDEX.map((group) => (
            <div key={group.group} className="space-y-4">
              <div className="border-b border-black/10 pb-2">
                <h2 className="font-mono text-xs font-bold text-alkota-black tracking-widest uppercase">
                  {group.group}
                </h2>
                <p className="font-sans text-xs text-alkota-slate mt-0.5">{group.desc}</p>
              </div>

              <div className="space-y-3">
                {group.docs.map((docRef) => {
                  const meta = regionalDocs[docRef.key];
                  if (!meta) return null;

                  return (
                    <Link
                      key={meta.id}
                      href={`/${regionCode}${docRef.href}`}
                      className="block p-4 bg-white border border-black/10 hover:border-black/30 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="font-mono text-xs font-bold text-alkota-black group-hover:text-alkota-signal transition-colors">
                            {meta.title}
                          </div>
                          <p className="font-sans text-xs text-alkota-slate line-clamp-2">{meta.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-alkota-slate group-hover:text-alkota-black shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between font-mono text-[10px] text-alkota-slate/70">
                        <span>{meta.id}</span>
                        <span>v{meta.version}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
