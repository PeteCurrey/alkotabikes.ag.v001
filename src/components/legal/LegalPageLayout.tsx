"use client";

import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { LegalDocumentMetadata } from "@/config/legalDocuments";
import { hasUnresolvedPlaceholders } from "@/config/legal";
import { Printer, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TocItem {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  document: LegalDocumentMetadata;
  eyebrow?: string;
  toc?: TocItem[];
  children: React.ReactNode;
  rawTextForGateCheck?: string;
}

export default function LegalPageLayout({
  document,
  eyebrow = "LEGAL DOCUMENTATION",
  toc,
  children,
  rawTextForGateCheck,
}: LegalPageLayoutProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const showGateWarning =
    document.status === "DRAFT" ||
    (rawTextForGateCheck && hasUnresolvedPlaceholders(rawTextForGateCheck));

  return (
    <div className="w-full bg-alkota-white text-alkota-black min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <style jsx global>{`
        @media print {
          nav, footer, .no-print, header {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print-full {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-10 print-full">
        {/* Back Link */}
        <div className="no-print">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-alkota-black uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO LEGAL CENTRE</span>
          </Link>
        </div>

        {/* Legal Publication Gate Warning (if DRAFT or unresolved placeholders) */}
        {showGateWarning && (
          <div className="no-print p-4 bg-amber-500/10 border-l-4 border-amber-500 text-amber-900 flex items-start gap-3 text-xs font-mono">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold uppercase tracking-wider text-amber-950">
                LEGAL CONFIGURATION INCOMPLETE — PRE-PRODUCTION DRAFT
              </div>
              <p className="text-amber-900/90 font-sans text-xs">
                This legal document is currently in <span className="font-mono font-bold uppercase">{document.status}</span> status.
                It contains unresolved contracting entity placeholders. It must pass legal review and be approved before live commercial transactions.
              </p>
            </div>
          </div>
        )}

        {/* Header Block */}
        <div className="border-b border-black/10 pb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TechnicalAnnotation label={eyebrow} value={document.id} variant="slate" />
            <div className="flex items-center gap-3 no-print">
              <span
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest font-bold border ${
                  document.status === "APPROVED"
                    ? "bg-emerald-500/10 border-emerald-600 text-emerald-700"
                    : document.status === "SUPERSEDED"
                    ? "bg-gray-200 border-gray-400 text-gray-700"
                    : "bg-amber-500/10 border-amber-600 text-amber-800"
                }`}
              >
                STATUS: {document.status}
              </span>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-alkota-carbon text-alkota-white hover:bg-alkota-black font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT / SAVE PDF</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-alkota-black">
              {document.title}
            </h1>
            <p className="text-sm sm:text-base text-alkota-slate max-w-3xl leading-relaxed">
              {document.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-alkota-slate pt-2 border-t border-black/5">
            <div>
              <span className="text-black/40">DOCUMENT VERSION:</span> {document.version}
            </div>
            <div>
              <span className="text-black/40">EFFECTIVE DATE:</span> {document.effectiveDate}
            </div>
            <div>
              <span className="text-black/40">LAST UPDATED:</span> {document.lastUpdated}
            </div>
            {document.approvedBy && (
              <div>
                <span className="text-black/40">APPROVED BY:</span> {document.approvedBy} ({document.approvedAt})
              </div>
            )}
          </div>
        </div>

        {/* Content Layout with Sidebar Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Table of Contents Sticky Sidebar */}
          {toc && toc.length > 0 && (
            <aside className="lg:col-span-4 space-y-4 no-print lg:sticky lg:top-28">
              <div className="p-5 bg-alkota-snow border border-black/10 space-y-3 font-mono text-xs">
                <div className="font-bold uppercase tracking-widest text-alkota-black border-b border-black/10 pb-2">
                  TABLE OF CONTENTS
                </div>
                <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-2 font-sans text-xs">
                  {toc.map((item, idx) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-alkota-slate hover:text-alkota-black transition-colors py-1 hover:translate-x-0.5 transform"
                    >
                      <span className="font-mono text-alkota-black/40 mr-1.5 font-bold">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Body Text */}
          <main className={`${toc && toc.length > 0 ? "lg:col-span-8" : "lg:col-span-12"} max-w-4xl space-y-8 text-base text-alkota-black leading-relaxed font-sans`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
