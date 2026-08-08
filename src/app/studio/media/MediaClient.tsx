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
export default function MediaClient() {
  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Media Library</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Phase 01 notice: Full media management requires Phase 02 backend.</div>
      </div>
      <div className="bg-[#131313] border border-white/10 p-8 text-center text-[#647789] font-mono text-[10px]">
        Media items are currently loaded statically from alkotaStoryMedia.ts. Edit that file directly or wait for Phase 02 to implement database uploads.
      </div>
    </div>
  );
}
