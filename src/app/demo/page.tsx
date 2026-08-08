import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Booking | Alkota",
  description: "Project 01 demo ride booking. Available when demo inventory is confirmed.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white pt-20 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-semibold">
          ALKOTA DEMO PROGRAMME
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
          DEMO BOOKING
          <br />
          <span className="text-[#1a73e8]">NOT YET ACTIVE.</span>
        </h1>
        <p className="font-sans text-sm text-[#647789] font-light leading-relaxed max-w-md mx-auto">
          Project 01 demo ride bookings will be available through selected Alkota
          Partner Network locations ahead of production in 2028. Demo bikes will
          be confirmed when partner allocation is finalised.
        </p>
        <div className="bg-[#131313] border border-white/10 p-5 text-left space-y-2">
          <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
            WHAT TO EXPECT
          </div>
          <p className="font-sans text-xs text-[#647789] font-light leading-relaxed">
            When live, you will be able to find your nearest authorised demo partner,
            select a date, confirm your rider size direction, and arrange a guided
            suspension setup session.
          </p>
        </div>
        <a
          href="/order"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1a73e8] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#0f0f0f] transition-colors"
        >
          JOIN THE REGISTER FIRST
        </a>
        <div className="font-mono text-[9px] text-[#647789]/50 uppercase pt-4">
          PRE-PRODUCTION — DEMO PROGRAMME PLANNED 2027
        </div>
      </div>
    </div>
  );
}
