'use client';
import React from 'react';
export default function PartnersClient() {
  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Partner Network</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Applications submitted via /dealers are not yet connected to a database backend. Phase 01 notice.</div>
      </div>
      <div className="flex gap-4 mb-6 font-mono text-[10px] uppercase">
        {['ALL', 'APPLIED', 'UNDER REVIEW', 'APPROVED', 'ACTIVE'].map(t => (
          <button key={t} className="px-4 py-2 border border-white/10 text-[#647789]">{t}</button>
        ))}
      </div>
      <div className="bg-[#131313] border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">BUSINESS</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CONTACT</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">COUNTRY</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CAPABILITY</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">APPLIED</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={6} className="px-4 py-8 text-center text-[#647789] font-mono text-[9px]">NO RECORDS FOUND</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
