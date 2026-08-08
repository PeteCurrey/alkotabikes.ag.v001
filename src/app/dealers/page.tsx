import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { DEALERS } from "@/lib/data/companyData";
import { MapPin } from "lucide-react";

export default function DealersPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-black/10 pb-8 space-y-3">
          <TechnicalAnnotation label="PERFORMANCE CENTERS" value="GLOBAL LOCATIONS" variant="slate" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
            PERFORMANCE CENTERS.
          </h1>
          <p className="font-sans text-base text-alkota-graphite max-w-2xl font-light leading-relaxed">
            Handpicked engineering hubs, demo centers, and technical service partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEALERS.map((dealer) => (
            <div
              key={dealer.name}
              className="p-8 bg-alkota-snow border border-black/10 hover:border-alkota-black transition-all space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="font-bold text-alkota-black">{dealer.city}, {dealer.country}</span>
                <MapPin className="w-4 h-4 text-alkota-slate" />
              </div>
              <h2 className="font-display text-xl font-bold text-alkota-black uppercase">
                {dealer.name}
              </h2>
              <div className="text-alkota-slate">{dealer.address}</div>
              <div className="text-[10px] text-alkota-graphite bg-white p-2 border border-black/10 uppercase font-semibold">
                {dealer.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
