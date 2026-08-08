'use client';
import React from 'react';
import { products } from '@/content/store/products';
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
export default function StoreClient() {
  const live = products.filter(p => p.status === 'available').length;
  const coming = products.filter(p => p.status === 'coming_soon').length;

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Store Catalogue</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Manage supply products.</div>
      </div>
      <div className="mb-4 font-mono text-[9px] flex gap-4 text-[#647789]">
        <span>{products.length} TOTAL</span>
        <span>{live} LIVE</span>
        <span className="text-yellow-400">⚠ {coming} COMING SOON</span>
      </div>
      <div className="bg-[#131313] border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">ID</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">NAME</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CATEGORY</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">PRICE</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">STATUS</th>
              <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">MISSING FOR LIVE</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 font-mono text-[9px] text-[#1a73e8] font-bold">{p.id}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{p.name}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{p.category}</td>
                <td className="px-4 py-3 font-mono text-[9px] text-white">{p.price ? `£${p.price}` : 'TBC'}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 font-mono text-[8px] text-[#647789]">{p.status === 'coming_soon' ? 'PRICE / INVENTORY / IMAGE / DELIVERY' : ''}</td>
                <td className="px-4 py-3 text-right"><button onClick={() => alert('Phase 02')} className="text-[#647789] hover:text-white font-mono text-[9px]">EDIT</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
