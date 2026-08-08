'use client';
import React from 'react';
import { PROJECT_01_JOURNAL_ENTRIES } from '@/content/journal/project01/entries';
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
export default function JournalClient() {
  const published = PROJECT_01_JOURNAL_ENTRIES.filter(e => e.status === 'CURRENT').length;
  const dev = PROJECT_01_JOURNAL_ENTRIES.filter(e => e.status === 'DEVELOPMENT').length;
  const planned = PROJECT_01_JOURNAL_ENTRIES.filter(e => e.status === 'PLANNED').length;

  const sorted = [...PROJECT_01_JOURNAL_ENTRIES].sort((a, b) => {
    const order: Record<string, number> = { CURRENT: 1, DEVELOPMENT: 2, PLANNED: 3 };
    return (order[a.status] || 9) - (order[b.status] || 9);
  });

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-1">
          <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
          <h1 className="font-display font-bold text-2xl text-white uppercase">Journal Entries</h1>
          <div className="font-mono text-[8px] text-[#647789] uppercase">Manage engineering journal articles.</div>
        </div>
        <button onClick={() => alert('Phase 02 — database required')} className="px-4 py-2 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10 transition-colors">
          NEW ENTRY
        </button>
      </div>

      <div className="mb-4 font-mono text-[9px] flex gap-4 text-[#647789]">
        <span>{published} PUBLISHED</span>
        <span>{dev} IN DEVELOPMENT</span>
        <span>{planned} PLANNED</span>
      </div>

      <div className="bg-[#131313] border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">SEQUENCE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">TITLE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">PHASE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CATEGORY</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">STATUS</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">DATE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">REVISION</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(e => (
              <tr key={e.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 font-mono text-[9px] text-[#1a73e8] font-bold">{e.sequence}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{e.title}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{e.phase}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{e.category}</td>
                <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{e.date}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{e.revision}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => alert('Phase 02 — database required')} className="text-[#647789] hover:text-white font-mono text-[9px]">EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
