'use client';
import React from 'react';
import { DESIGN_ARCHIVE } from '@/content/design/archive';
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
export default function DesignClient() {
  const total = DESIGN_ARCHIVE.length;
  const placeholders = DESIGN_ARCHIVE.filter(a => a.status === 'PLACEHOLDER').length;
  const publicCount = DESIGN_ARCHIVE.filter(a => a.visibility === 'PUBLIC').length;
  const studioOnly = DESIGN_ARCHIVE.filter(a => a.visibility === 'STUDIO_ONLY').length;

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Design Archive</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Replace placeholders by dropping real files at the assetPath shown in each record.</div>
      </div>

      <div className="mb-4 font-mono text-[9px] flex gap-4 text-[#647789]">
        <span>{total} TOTAL</span>
        <span className="text-yellow-400">⚠ {placeholders} PLACEHOLDERS</span>
        <span>{publicCount} PUBLIC</span>
        <span className="text-[#1a73e8]">{studioOnly} STUDIO ONLY</span>
      </div>

      <div className="bg-[#131313] border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">ID</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">TITLE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">STATUS</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">ASSET PATH</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">VISIBILITY</th>
            </tr>
          </thead>
          <tbody>
            {DESIGN_ARCHIVE.map(a => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 font-mono text-[9px] text-[#1a73e8] font-bold">{a.id}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{a.title}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                <td className="px-4 py-3 font-mono text-[9px] text-[#647789]">{a.assetPath}</td>
                <td className="px-4 py-3"><StatusBadge status={a.visibility} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
