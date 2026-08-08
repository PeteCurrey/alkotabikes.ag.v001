import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

export default function OwnersPage() {
  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-black/10 pb-6 space-y-2">
          <TechnicalAnnotation label="OWNER MANUALS" value="PROJECT 01" variant="slate" />
          <h1 className="font-display font-bold text-4xl uppercase tracking-tight">OWNER DOCUMENTATION</h1>
          <p className="font-sans text-xs text-alkota-slate">Download official Project 01 chassis manuals and torque matrices.</p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-alkota-snow border border-black/10 flex justify-between items-center">
            <span>PROJECT 01 CHASSIS USER MANUAL (PDF)</span>
            <span className="text-alkota-slate">REV 001 • 4.2 MB</span>
          </div>
          <div className="p-4 bg-alkota-snow border border-black/10 flex justify-between items-center">
            <span>TORQUE SPECIFICATION MATRIX (PDF)</span>
            <span className="text-alkota-slate">REV 001 • 1.1 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
