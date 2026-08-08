'use client';
import React from 'react';
export default function BuildsClient() {
  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Saved Builds</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Phase 01 notice: No database connected.</div>
      </div>
      <div className="bg-[#131313] border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">BUILD REF</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CUSTOMER</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">REVISION</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">FINISH</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">FIT REF</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">SIZE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CREATED</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={7} className="px-4 py-8 text-center text-[#647789] font-mono text-[9px]">NO RECORDS FOUND</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
