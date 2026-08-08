'use client';
import React from 'react';
export default function RegistrationsClient() {
  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Registrations</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Phase 01 notice: No database connected. Wire up /api/register to a real backend.</div>
      </div>
      <div className="mb-4 font-mono text-[9px] flex gap-4 text-[#647789]">
        <span>0 TOTAL</span>
        <span>0 HIGH INTENT</span>
        <span>0 SAVED BUILDS</span>
      </div>
      <div className="flex gap-4 mb-6 font-mono text-[10px] uppercase">
        {['ALL', 'HIGH INTENT', 'GLACIER WHITE', 'NAKED CARBON'].map(t => (
          <button key={t} className="px-4 py-2 border border-white/10 text-[#647789]">{t}</button>
        ))}
      </div>
      <div className="bg-[#131313] border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">REF</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">NAME</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">EMAIL</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">COUNTRY</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">DATE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">INTENT</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">FINISH</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={8} className="px-4 py-8 text-center text-[#647789] font-mono text-[9px]">NO RECORDS FOUND</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
