'use client';
import React from 'react';
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    BASELINE: "bg-green-500/10 text-green-400 border-green-500/20",
    UNDER_REVIEW: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    OPTION: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    PLANNED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    SUPERSEDED: "bg-white/5 text-white/30 border-white/10",
    DEVELOPMENT_BASELINE: "bg-green-500/10 text-green-400 border-green-500/20",
    CURRENT: "bg-green-500/10 text-green-400 border-green-500/20",
    DEVELOPMENT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    PLACEHOLDER: "bg-white/5 text-white/40 border-white/10",
    PUBLISHED: "bg-green-500/10 text-green-400 border-green-500/20",
    available: "bg-green-500/10 text-green-400 border-green-500/20",
    coming_soon: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    APPLIED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
    AVAILABLE: "bg-green-500/10 text-green-400 border-green-500/20",
    UNAVAILABLE: "bg-red-500/10 text-red-400 border-red-500/20",
    PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };
  const cls = colors[status] ?? "bg-white/5 text-white/40 border-white/10";
  return (
    <span className={`font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold ${cls}`}>
      {status}
    </span>
  );
}
export default function RacingClient() {
  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-1">
          <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
          <h1 className="font-display font-bold text-2xl text-white uppercase">Racing Programme</h1>
          <div className="font-mono text-[8px] text-[#647789] uppercase">No race programme data exists. Do not publish fictional content.</div>
        </div>
        <button className="px-4 py-2 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10">NEW DISPATCH</button>
      </div>
      <div className="mb-8 flex gap-4 items-center">
        <span className="font-mono text-[10px] text-white">PROGRAMME STATUS:</span>
        <StatusBadge status="PLANNED" />
        <span className="font-mono text-[10px] text-[#1a73e8]">2027</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {['RIDERS', 'CALENDAR', 'DISPATCHES', 'RACE BIKES', 'RESULTS'].map(s => (
          <div key={s} className="bg-[#131313] border border-white/10 p-6 flex flex-col items-center justify-center min-h-[150px]">
            <span className="font-display text-lg text-white mb-2">{s}</span>
            <span className="font-mono text-[9px] text-[#647789]">Phase 02 — race programme launch</span>
          </div>
        ))}
      </div>
    </div>
  );
}
