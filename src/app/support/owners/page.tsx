import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Owner Documentation | Alkota Cycles",
  description:
    "Official owner manuals and technical documentation for Alkota Cycles bicycles. Documentation will be published ahead of first delivery in 2028.",
  alternates: {
    canonical: `${siteUrl}/support/owners`,
  },
  openGraph: {
    title: "Owner Documentation | Alkota Cycles",
    description:
      "Official owner manuals and technical documentation for Alkota Cycles bicycles. Documentation will be published ahead of first delivery in 2028.",
    url: `${siteUrl}/support/owners`,
  },
};

export default function OwnersPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-black/10 pb-6 space-y-2">
          <TechnicalAnnotation label="OWNER MANUALS" value="PRE-PRODUCTION" variant="slate" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight">OWNER DOCUMENTATION</h1>
          <p className="font-sans text-sm text-alkota-slate">
            Project 01 technical documentation, user guides, and maintenance protocols.
          </p>
        </div>

        <div className="p-8 bg-alkota-snow border border-black/10 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-alkota-slate" />
            <h2 className="font-mono text-xs font-bold text-alkota-black uppercase tracking-wider">
              DOCUMENTATION RELEASE STATUS // PRE-DELIVERY
            </h2>
          </div>
          <p className="font-sans text-xs text-alkota-graphite leading-relaxed">
            Official owner documentation — including the Project 01 Chassis User Manual, Torque Specification Matrix, 
            and Suspension Setup Guides — will be published prior to first customer deliveries in 2028. 
            Confirmed reservation holders will receive direct digital access to all technical documentation upon production release.
          </p>
          <div className="pt-2">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-alkota-black uppercase hover:text-alkota-signal transition-colors"
            >
              <span>JOIN PROJECT 01 ALLOCATION REGISTRY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
