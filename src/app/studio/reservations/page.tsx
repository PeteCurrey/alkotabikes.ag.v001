import React from "react";
import { Metadata } from "next";
import StudioShell from "../StudioShell";

export const metadata: Metadata = {
  title: "Reservations | Alkota Studio",
  robots: { index: false, follow: false },
};

export default function ReservationsPage() {
  return (
    <StudioShell>
      <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
        <div className="space-y-1 mb-8">
          <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">
            ALKOTA STUDIO
          </div>
          <h1 className="font-display font-bold text-2xl text-white uppercase">
            Reservations
          </h1>
          <div className="font-mono text-[8px] text-[#647789] uppercase">
            Phase 02 — Reservation infrastructure in development.{" "}
            PROJECT01_PAID_RESERVATIONS_ENABLED = false
          </div>
        </div>
        <div className="bg-[#131313] border border-white/10 p-8 text-center space-y-3">
          <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
            RESERVATION SYSTEM NOT YET ACTIVE
          </div>
          <p className="font-sans text-xs text-[#647789] font-light leading-relaxed max-w-md mx-auto">
            The reservation infrastructure (Phase 02) is being built. This view
            will display all reservations, invite management, deposit status,
            and payment release gate conditions.
          </p>
          <div className="font-mono text-[8px] text-[#647789]/50 uppercase">
            RESERVATION_MODE: CLOSED
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
