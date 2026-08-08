'use client';
import React from 'react';
import { PROJECT_01_SPECIFICATION } from '@/content/project01/specification';
import { DESIGN_ARCHIVE } from '@/content/design/archive';
import { products } from '@/content/store/products';

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
function downloadCSV(rows: string[][], filename: string) {
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function SettingsClient() {
  const handleExportStore = () => {
    const rows = [['ID', 'NAME', 'PRICE', 'STATUS']];
    products.forEach(p => rows.push([p.id, p.name, String(p.price || ''), p.status]));
    downloadCSV(rows, 'store-catalogue.csv');
  };

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">System Settings</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Data, security, and exports.</div>
      </div>

      <div className="space-y-8 max-w-2xl">
        <div className="bg-[#131313] border border-white/10 p-6">
          <h2 className="font-mono text-[10px] text-white mb-4">AUTHENTICATION</h2>
          <p className="font-mono text-[9px] text-[#647789] mb-4">Current session active. Studio access granted via environment variable in Phase 01.</p>
          <button onClick={() => alert('Phase 02')} className="px-4 py-2 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10">CHANGE PASSWORD</button>
        </div>

        <div className="bg-[#131313] border border-white/10 p-6 space-y-4">
          <h2 className="font-mono text-[10px] text-white mb-2">DATA EXPORT</h2>
          <div><button onClick={() => downloadJSON(PROJECT_01_SPECIFICATION, 'specification.json')} className="px-4 py-2 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10 w-full text-left">EXPORT SPECIFICATION JSON</button></div>
          <div><button onClick={() => downloadJSON(DESIGN_ARCHIVE, 'design-archive.json')} className="px-4 py-2 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10 w-full text-left">EXPORT DESIGN ARCHIVE JSON</button></div>
          <div><button onClick={handleExportStore} className="px-4 py-2 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10 w-full text-left">EXPORT STORE CATALOGUE CSV</button></div>
          <div><button disabled className="px-4 py-2 border border-white/10 text-[#647789] font-mono text-[9px] w-full text-left opacity-50 cursor-not-allowed">EXPORT REGISTRATIONS CSV (NEEDS DB)</button></div>
          <div><button disabled className="px-4 py-2 border border-white/10 text-[#647789] font-mono text-[9px] w-full text-left opacity-50 cursor-not-allowed">EXPORT PARTNER APPLICATIONS CSV (NEEDS DB)</button></div>
        </div>

        <div className="bg-[#131313] border border-white/10 p-6">
          <h2 className="font-mono text-[10px] text-white mb-4">DATA SOURCES</h2>
          <ul className="font-mono text-[9px] text-[#647789] space-y-2">
            <li>Specification: src/content/project01/specification.ts</li>
            <li>Components: src/content/project01/components.ts</li>
            <li>Journal: src/content/journal/project01/entries.ts</li>
            <li>Design Archive: src/content/design/archive.ts</li>
            <li>Products: src/content/store/products.ts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
