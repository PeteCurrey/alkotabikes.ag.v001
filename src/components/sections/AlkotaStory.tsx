"use client";

import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { COMPANY_STORY } from "@/lib/data/companyData";
import { ArrowRight } from "lucide-react";

export default function AlkotaStory() {
  return (
    <section className="w-full bg-alkota-carbon text-alkota-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 tech-grid-dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <TechnicalAnnotation label="WHY ALKOTA" variant="signal" />
          <h2 className="font-display font-extrabold text-4xl sm:text-7xl uppercase tracking-tight text-alkota-white leading-[0.9]">
            {COMPANY_STORY.headline}
          </h2>
          <p className="font-sans text-lg text-alkota-snow font-light leading-relaxed">
            {COMPANY_STORY.subheadline}
          </p>

          <div className="space-y-4 pt-2">
            {COMPANY_STORY.bodyParagraphs.map((p, idx) => (
              <p key={idx} className="font-sans text-xs sm:text-sm text-alkota-slate leading-relaxed font-light">
                {p}
              </p>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-3 bg-alkota-white text-alkota-black hover:bg-alkota-signal font-mono text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <span>OUR APPROACH</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="font-mono text-xs text-alkota-slate uppercase tracking-wider">
            WORKSHOP & ENGINEERING FACILITY SPECS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMPANY_STORY.workshopFacilities.map((fac) => (
              <div key={fac.title} className="p-4 bg-alkota-black border border-white/10 space-y-2">
                <div className="font-mono text-xs font-bold text-alkota-signal uppercase">
                  {fac.title}
                </div>
                <div className="font-sans text-xs text-alkota-slate leading-relaxed">
                  {fac.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
