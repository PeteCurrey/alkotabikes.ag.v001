import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function TermsPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 font-sans text-xs text-alkota-graphite">
        <div className="border-b border-black/10 pb-6 space-y-2">
          <TechnicalAnnotation label="LEGAL" value="TERMS OF SERVICE" variant="slate" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight text-alkota-black">TERMS OF SERVICE</h1>
        </div>
        <p>All content, CAD schematics, and design specifications published on ALKOTA Performance Engineering are protected property. Specifications for Project 01 remain developmental placeholders until production release.</p>
      </div>
    </div>
  );
}
