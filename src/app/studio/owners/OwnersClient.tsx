'use client';
import React from 'react';
export default function OwnersClient() {
  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Owners & Production</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Manage customers, production bikes, serials, build records, delivery, service, warranty.</div>
      </div>
      <div className="bg-[#131313] border border-yellow-500/20 p-4 mb-8">
        <span className="font-mono text-[9px] text-yellow-400">PHASE 01 NOTICE: No owner records exist — Project 01 has not launched into production.</span>
      </div>
      <div className="bg-[#131313] border border-white/10 opacity-50">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">SERIAL</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CUSTOMER</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">DELIVERY DATE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">BUILD SPEC</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">SERVICE RECORDS</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">WARRANTY</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={6} className="px-4 py-8 text-center text-[#647789] font-mono text-[9px]">PREVIEW ONLY</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
