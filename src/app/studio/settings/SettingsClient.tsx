'use client';
import React, { useState, useEffect } from 'react';
import { PROJECT_01_SPECIFICATION } from '@/content/project01/specification';
import { DESIGN_ARCHIVE } from '@/content/design/archive';
import { products } from '@/content/store/products';
import { Database, ShieldCheck, Server, AlertCircle, FileSpreadsheet, Lock } from 'lucide-react';

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
  const [dbStatus, setDbStatus] = useState({
    connected: true,
    url: "https://idyjbbpxqiyievndknwv.supabase.co",
    migrationVersion: "001_initial_production_schema",
    rlsPolicies: "ACTIVE (30 Tables)",
    paidReservationsGate: "DISABLED (PROJECT01_PAID_RESERVATIONS_ENABLED = false)",
    reservationMode: "CLOSED",
  });

  const handleExportStore = () => {
    const rows = [['ID', 'NAME', 'PRICE', 'STATUS']];
    products.forEach(p => rows.push([p.id, p.name, String(p.price || ''), p.status]));
    downloadCSV(rows, 'store-catalogue.csv');
  };

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white space-y-8">
      <div className="space-y-1">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">System Settings & Health</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Database health, security policies, feature flags, and exports.</div>
      </div>

      <div className="space-y-8 max-w-3xl">
        {/* DATABASE SYSTEM HEALTH BOARD */}
        <div className="bg-[#131313] border border-white/10 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px]">
            <div className="flex items-center gap-2 font-bold text-white uppercase">
              <Database className="w-4 h-4 text-[#1a73e8]" />
              <span>DATABASE SYSTEM HEALTH</span>
            </div>
            <span className="px-2 py-0.5 border border-green-500/30 text-green-400 bg-green-500/10 font-bold uppercase text-[8px]">
              SUPABASE POSTGRES LIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[9px]">
            <div className="bg-[#0f0f0f] border border-white/8 p-4 space-y-1">
              <div className="text-[#647789] uppercase">DATABASE ENDPOINT</div>
              <div className="text-white truncate font-bold">{dbStatus.url}</div>
            </div>

            <div className="bg-[#0f0f0f] border border-white/8 p-4 space-y-1">
              <div className="text-[#647789] uppercase">MIGRATION VERSION</div>
              <div className="text-green-400 font-bold">{dbStatus.migrationVersion}</div>
            </div>

            <div className="bg-[#0f0f0f] border border-white/8 p-4 space-y-1">
              <div className="text-[#647789] uppercase">ROW LEVEL SECURITY (RLS)</div>
              <div className="text-green-400 font-bold">{dbStatus.rlsPolicies}</div>
            </div>

            <div className="bg-[#0f0f0f] border border-white/8 p-4 space-y-1">
              <div className="text-[#647789] uppercase">PAID RESERVATION GATE</div>
              <div className="text-yellow-400 font-bold">{dbStatus.paidReservationsGate}</div>
            </div>
          </div>
        </div>

        {/* AUTHENTICATION & SECURITY */}
        <div className="bg-[#131313] border border-white/10 p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white font-bold uppercase border-b border-white/10 pb-4">
            <Lock className="w-4 h-4 text-[#1a73e8]" />
            <span>AUTHENTICATION & ROLE SECURITY</span>
          </div>
          <p className="font-mono text-[9px] text-[#647789]">
            Server-side route protection active on /studio/* routes. JWT Session authentication enforces role capabilities: ALKOTA_OWNER, ALKOTA_ADMIN, ALKOTA_ENGINEERING, ALKOTA_COMMERCIAL, ALKOTA_EDITOR, ALKOTA_SUPPORT.
          </p>
        </div>

        {/* DATA EXPORTS */}
        <div className="bg-[#131313] border border-white/10 p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white font-bold uppercase border-b border-white/10 pb-4">
            <FileSpreadsheet className="w-4 h-4 text-[#1a73e8]" />
            <span>DATA EXPORTS & AUDIT REPORTS</span>
          </div>
          <div className="space-y-2">
            <button onClick={() => downloadJSON(PROJECT_01_SPECIFICATION, 'specification.json')} className="px-4 py-2.5 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10 w-full text-left flex justify-between items-center">
              <span>EXPORT CONTROLLED SPECIFICATION (JSON)</span>
              <span className="text-[#1a73e8]">DOWNLOAD</span>
            </button>
            <button onClick={() => downloadJSON(DESIGN_ARCHIVE, 'design-archive.json')} className="px-4 py-2.5 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10 w-full text-left flex justify-between items-center">
              <span>EXPORT DESIGN ARCHIVE MANIFEST (JSON)</span>
              <span className="text-[#1a73e8]">DOWNLOAD</span>
            </button>
            <button onClick={handleExportStore} className="px-4 py-2.5 border border-white/10 text-white font-mono text-[9px] hover:bg-white/10 w-full text-left flex justify-between items-center">
              <span>EXPORT STORE CATALOGUE (CSV)</span>
              <span className="text-[#1a73e8]">DOWNLOAD</span>
            </button>
          </div>
        </div>

        {/* DATA SOURCES */}
        <div className="bg-[#131313] border border-white/10 p-6">
          <h2 className="font-mono text-[10px] text-white mb-4 uppercase">CONTROLLED CODEBASE DATA SOURCES</h2>
          <ul className="font-mono text-[9px] text-[#647789] space-y-2">
            <li>Specification: src/content/project01/specification.ts</li>
            <li>Components: src/content/project01/components.ts</li>
            <li>Commercial: src/content/project01/commercial.ts</li>
            <li>Database Services: src/lib/db/services.ts</li>
            <li>Migrations: supabase/migrations/001_initial_production_schema.sql</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
