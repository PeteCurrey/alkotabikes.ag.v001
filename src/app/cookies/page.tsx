import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function CookiesPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 font-sans text-xs text-alkota-graphite">
        <div className="border-b border-black/10 pb-6 space-y-2">
          <TechnicalAnnotation label="LEGAL" value="COOKIE POLICY" variant="slate" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight text-alkota-black">COOKIE SETTINGS & POLICY</h1>
        </div>
        <p>ALKOTA uses essential cookies to remember your 3D Configurator build state and preferences.</p>
      </div>
    </div>
  );
}
