import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS, type LegalDocumentMetadata } from "@/config/legalDocuments";
import { company } from "@/lib/company";
import { Shield, ArrowRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Centre",
  description:
    "Alkota Cycles legal documentation index: Legal Notice, Privacy Policy, Terms & Conditions, Warranty, Returns, Shipping, Cookies, Accessibility, Safety, and Complaints.",
  alternates: {
    canonical: `${siteUrl}/legal`,
  },
  openGraph: {
    title: "Legal Centre",
    description:
      "Complete legal documentation for alkotacycles.com — operator particulars, policies, and terms.",
    url: `${siteUrl}/legal`,
  },
};

// ── Document groups for the index ────────────────────────────────────────────
const LEGAL_INDEX: {
  group: string;
  desc: string;
  docs: { key: keyof typeof LEGAL_DOCUMENTS; href: string }[];
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
    group: "DATA & PRIVACY",
    desc: "How we collect, use, protect, and manage your personal data.",
    docs: [
      { key: "privacy", href: "/privacy" },
      { key: "cookies", href: "/cookies" },
    ],
  },
  {
    group: "PRODUCT & SAFETY",
    desc: "Warranty framework, product safety guidance, and complaints procedure.",
    docs: [
      { key: "warranty", href: "/warranty" },
      { key: "safety", href: "/safety" },
      { key: "complaints", href: "/complaints" },
    ],
  },
  {
    group: "ACCESSIBILITY",
    desc: "Our WCAG 2.2 AA commitment and accessibility reporting.",
    docs: [{ key: "accessibility", href: "/accessibility" }],
  },
];

function StatusBadge({ status }: { status: LegalDocumentMetadata["status"] }) {
  if (status === "APPROVED") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-600 text-emerald-700">
        <CheckCircle className="w-3 h-3" />
        APPROVED
      </span>
    );
  }
  if (status === "LEGAL_REVIEW") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 border border-blue-600 text-blue-700">
        <Clock className="w-3 h-3" />
        UNDER REVIEW
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-600 text-amber-800">
      <AlertTriangle className="w-3 h-3" />
      DRAFT
    </span>
  );
}

export default function LegalCentrePage() {
  const allDocs = Object.values(LEGAL_DOCUMENTS);
  const draftCount = allDocs.filter((d) => d.status === "DRAFT" || d.status === "LEGAL_REVIEW").length;
  const approvedCount = allDocs.filter((d) => d.status === "APPROVED").length;

  return (
    <div className="w-full bg-alkota-white text-alkota-black min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ── Header ── */}
        <div className="border-b border-black/10 pb-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-alkota-slate tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>LEGAL DOCUMENTATION CENTRE</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-alkota-black leading-tight">
            LEGAL CENTRE
          </h1>
          <p className="font-sans text-sm text-alkota-slate leading-relaxed max-w-2xl">
            All legal, policy, and compliance documentation for {company.tradingName} and alkotacycles.com.
            Every document carries a version number, status, and effective date.
          </p>
        </div>

        {/* ── Operator Identity Panel ── */}
        <div className="p-5 bg-alkota-snow border border-black/10 font-mono text-xs space-y-3">
          <div className="font-bold text-[10px] tracking-widest uppercase text-alkota-slate">
            SITE OPERATOR
          </div>
          {company.legalEntityName ? (
            <div className="space-y-1 text-alkota-black/80">
              <div>{company.legalEntityName} trading as {company.tradingName}</div>
              {company.companyNumber && <div>Company No. {company.companyNumber}</div>}
              {company.registeredIn && <div>Registered in {company.registeredIn}</div>}
              {company.registeredOffice && <div>{company.registeredOffice}</div>}
            </div>
          ) : (
            <div className="text-alkota-slate/60 italic">
              {company.tradingName} · Legal entity registration pending.
              Operator particulars will be completed prior to commercial trading.
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

        {/* ── Status Summary ── */}
        {draftCount > 0 && (
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 flex items-start gap-3 font-mono text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold uppercase tracking-wider text-amber-900">
                PRE-PRODUCTION DOCUMENTATION STATUS
              </div>
              <p className="font-sans text-xs text-amber-800 leading-relaxed">
                {approvedCount} of {allDocs.length} documents are APPROVED.{" "}
                {draftCount} document{draftCount !== 1 ? "s" : ""} remain in DRAFT or UNDER REVIEW.
                Documents in DRAFT status must pass legal review before being relied upon in live commercial transactions.
              </p>
            </div>
          </div>
        )}

        {/* ── Document Groups ── */}
        <div className="space-y-10">
          {LEGAL_INDEX.map((group) => (
            <div key={group.group} className="space-y-4">
              <div className="border-b border-black/10 pb-3 space-y-1">
                <h2 className="font-display font-bold text-sm uppercase tracking-widest text-alkota-black">
                  {group.group}
                </h2>
                <p className="font-sans text-xs text-alkota-slate">{group.desc}</p>
              </div>

              <div className="space-y-2">
                {group.docs.map(({ key, href }) => {
                  const doc = LEGAL_DOCUMENTS[key];
                  if (!doc) return null;
                  return (
                    <Link
                      key={key}
                      href={href}
                      className="group flex items-center justify-between p-4 border border-black/8 hover:border-black/25 hover:bg-alkota-snow transition-all"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono font-bold text-sm text-alkota-black group-hover:text-alkota-black">
                            {doc.title}
                          </span>
                          <StatusBadge status={doc.status} />
                        </div>
                        <div className="font-sans text-xs text-alkota-slate leading-relaxed">
                          {doc.description}
                        </div>
                        <div className="flex items-center gap-4 font-mono text-[10px] text-alkota-slate/60">
                          <span>ID: {doc.id}</span>
                          <span>v{doc.version}</span>
                          <span>Effective: {doc.effectiveDate}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-alkota-slate group-hover:text-alkota-black shrink-0 ml-4 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <div className="pt-8 border-t border-black/10 font-mono text-[10px] text-alkota-slate/60 space-y-1">
          <div>Legal Centre · {company.tradingName} · {company.websiteUrl}</div>
          <div>
            Trademarks: ALKOTA, ALKOTA CYCLES and PROJECT 01 are registered or pending brand identifiers of {company.legalEntityName ?? company.tradingName}.
          </div>
        </div>

      </div>
    </div>
  );
}
