import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export const metadata: Metadata = {
  title: "Technical Specifications | Alkota Cycles",
  description:
    "Comprehensive technical specifications and frame standards by Alkota Cycles. Bearing sizes, shock hardware dimensions, and brake mount specs.",
  alternates: {
    canonical: `${siteUrl}/support/technical`,
  },
  openGraph: {
    title: "Technical Specifications | Alkota Cycles",
    description:
      "Comprehensive technical specifications and frame standards by Alkota Cycles. Bearing sizes, shock hardware dimensions, and brake mount specs.",
    url: `${siteUrl}/support/technical`,
  },
};

export default function TechnicalSupportPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-black/10 pb-6 space-y-2">
          <TechnicalAnnotation label="TECHNICAL GUIDES" value="WORKSHOP" variant="slate" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight">TECHNICAL SERVICE GUIDES</h1>
          <p className="font-sans text-xs text-alkota-slate">Workshop service guides for Enduro MAX bearing replacement and cable routing.</p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-alkota-snow border border-black/10 flex justify-between items-center">
            <span>MAIN PIVOT BEARING SERVICE GUIDE</span>
            <span className="text-alkota-slate">GUIDE #01</span>
          </div>
          <div className="p-4 bg-alkota-snow border border-black/10 flex justify-between items-center">
            <span>INTERNAL CABLE TUBE ROUTING INSTRUCTIONS</span>
            <span className="text-alkota-slate">GUIDE #02</span>
          </div>
        </div>
      </div>
    </div>
  );
}
