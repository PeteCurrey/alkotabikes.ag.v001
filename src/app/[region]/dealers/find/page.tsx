import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";




export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/dealers/find",
    title: "Find a Partner | Alkota",
    description: "Alkota Partner Network locator. Available when approved partners are active.",
  });
}

export default function FindPartnerPage() {
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white pt-20">
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
        <div className="space-y-4">
          <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-semibold">
            ALKOTA PARTNER NETWORK — LOCATOR
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl uppercase tracking-tight text-white leading-[0.9]">
            FIND A
            <br />
            <span className="text-[#1a73e8]">PARTNER.</span>
          </h1>
          <p className="font-sans text-sm text-[#647789] font-light leading-relaxed max-w-xl">
            The Alkota Partner Locator will be available when approved partner
            locations are confirmed and active. No partners have been publicly
            activated at this stage.
          </p>
        </div>

        {/* Filter UI — architecture present, not functional */}
        <div className="space-y-4">
          <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest border-b border-white/10 pb-3">
            FILTER BY CAPABILITY
          </div>
          <div className="flex flex-wrap gap-2">
            {["SALES", "DEMO", "SERVICE", "SUSPENSION"].map((f) => (
              <button
                key={f}
                disabled
                className="font-mono text-[9px] uppercase tracking-widest px-4 py-2 border border-white/10 text-[#647789] opacity-40 cursor-not-allowed"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-[#131313] border border-white/10 h-64 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
              MAP NOT YET ACTIVE
            </div>
            <p className="font-sans text-xs text-[#647789]/60 font-light">
              Partner locations will appear here when the network is activated.
            </p>
          </div>
        </div>

        {/* Empty results */}
        <div className="border border-white/10 p-8 text-center space-y-3">
          <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
            NO APPROVED PARTNERS YET
          </div>
          <p className="font-sans text-sm text-[#647789]/70 font-light leading-relaxed max-w-md mx-auto">
            Alkota is in early partner conversations. Approved partner locations
            will appear here as the programme progresses toward production in 2028.
          </p>
          <a
            href="/dealers"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#1a73e8] uppercase tracking-widest hover:text-white transition-colors"
          >
            VIEW PARTNER PROGRAMME →
          </a>
        </div>
      </div>
    </div>
  );
}
