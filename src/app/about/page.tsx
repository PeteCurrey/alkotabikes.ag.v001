import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import AlkotaStory from "@/components/sections/AlkotaStory";

export default function AboutPage() {
  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 space-y-3">
          <TechnicalAnnotation label="COMPANY PHILOSOPHY" value="ORIGIN STATEMENT" variant="signal" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            PERFORMANCE<br />
            <span className="text-alkota-slate">IS ENGINEERED.</span>
          </h1>
          <p className="font-sans text-base text-alkota-snow max-w-2xl font-light leading-relaxed">
            ALKOTA Performance Engineering exists around one central belief: high-performance mountain bicycles are created through physical discipline, advanced engineering analysis, and continuous trail validation.
          </p>
        </div>

        <AlkotaStory />
      </div>
    </div>
  );
}
