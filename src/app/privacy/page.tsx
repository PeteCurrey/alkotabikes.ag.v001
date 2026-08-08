import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function PrivacyPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 font-sans text-xs text-alkota-graphite">
        <div className="border-b border-black/10 pb-6 space-y-2">
          <TechnicalAnnotation label="LEGAL" value="PRIVACY POLICY" variant="slate" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight text-alkota-black">PRIVACY POLICY</h1>
        </div>
        <p>ALKOTA Performance Engineering protects the data of our users and riders. We collect minimal telemetry data strictly for site functionality and Field Notes subscription management.</p>
      </div>
    </div>
  );
}
