"use client";

import React from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Activity, CheckCircle2, ShieldCheck, AlertTriangle } from "lucide-react";

export default function TestRecord() {
  const records = [
    {
      id: "FATIGUE-001",
      name: "ISO 4210 FRAME FATIGUE TEST",
      standard: "ISO+ 140% OVERLOAD",
      cycles: "1,250,000 CYCLES",
      status: "PASSED",
      notes: "Pedal force fatigue test applied continuously for 96 hours. Zero micro-fractures detected under ultrasonic NDT.",
    },
    {
      id: "IMPACT-002",
      name: "DOWNTUBE HEADTUBE DROP IMPACT",
      standard: "50KG DROP MASS @ 2.4M/S",
      cycles: "25 IMPACTS",
      status: "PASSED",
      notes: "Monocoque headtube junction absorbed maximum impact displacement with zero structural delamination.",
    },
    {
      id: "TELEMETRY-003",
      name: "ALPS TELEMETRY TRAIL LOGGING",
      standard: "MORZINE / BLACK CHATEL",
      cycles: "48 TRAIL HOURS",
      status: "IN PROGRESS",
      notes: "12-channel potentiometer telemetry recording suspension shaft velocities up to 4.8 m/s on wet roots.",
    },
  ];

  return (
    <div className="bg-alkota-carbon text-alkota-white p-6 border border-white/10 tech-grid-dark rounded-none space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider">
            LAB & TERRAIN VALIDATION LOG
          </div>
          <h3 className="font-display text-xl font-bold text-alkota-white">
            FATIGUE & TELEMETRY RECORDS
          </h3>
        </div>
        <TechnicalAnnotation label="TEST REGIMEN: ISO+" variant="signal" />
      </div>

      {/* Test Log Cards */}
      <div className="space-y-4">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="p-4 bg-alkota-black border border-white/10 hover:border-white/20 transition-all font-sans text-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-alkota-signal uppercase font-bold">
                  [{rec.id}]
                </span>
                <h4 className="font-display font-bold text-alkota-white text-sm">
                  {rec.name}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-alkota-slate">
                  {rec.standard}
                </span>
                <span
                  className={`px-2 py-0.5 font-mono text-[9px] uppercase font-bold ${
                    rec.status === "PASSED"
                      ? "bg-alkota-signal/10 border border-alkota-signal text-alkota-signal"
                      : "bg-alkota-ice/10 border border-alkota-ice text-alkota-ice"
                  }`}
                >
                  {rec.status}
                </span>
              </div>
            </div>

            <p className="text-alkota-slate leading-relaxed">{rec.notes}</p>

            <div className="flex items-center justify-between font-mono text-[10px] text-alkota-slate pt-2">
              <span>CYCLES / DURATION: <strong className="text-alkota-white">{rec.cycles}</strong></span>
              <span>INSPECTION: ULTRASONIC NDT</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
