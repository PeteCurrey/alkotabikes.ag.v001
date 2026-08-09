import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export const metadata: Metadata = {
  title: "Warranty Policy | Alkota Cycles",
  description:
    "Limited chassis warranty and crash replacement policy details from Alkota Cycles. Coverage terms and claims process for original Project 01 owners.",
  alternates: {
    canonical: `${siteUrl}/support/warranty`,
  },
  openGraph: {
    title: "Warranty Policy | Alkota Cycles",
    description:
      "Limited chassis warranty and crash replacement policy details from Alkota Cycles. Coverage terms and claims process for original Project 01 owners.",
    url: `${siteUrl}/support/warranty`,
  },
};

export default function WarrantyPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-black/10 pb-6 space-y-2">
          <TechnicalAnnotation label="POLICY" value="WARRANTY" variant="slate" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight">WARRANTY & CRASH REPLACEMENT</h1>
          <p className="font-sans text-xs text-alkota-slate">Chassis warranty coverage details for original Project 01 owners.</p>
        </div>

        <div className="space-y-4 font-sans text-xs text-alkota-graphite leading-relaxed">
          <div className="p-6 bg-alkota-snow border border-black/10 space-y-2">
            <h3 className="font-display font-bold text-sm text-alkota-black uppercase">LIMITED CHASSIS WARRANTY</h3>
            <p>ALKOTA warrants Project 01 carbon frames against manufacturing defects for original owners under the terms of the chassis policy.</p>
          </div>
          <div className="p-6 bg-alkota-snow border border-black/10 space-y-2">
            <h3 className="font-display font-bold text-sm text-alkota-black uppercase">CRASH REPLACEMENT SCHEME</h3>
            <p>In the event of severe mountain crash damage, ALKOTA offers discounted replacement front or rear triangles for registered original owners.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
