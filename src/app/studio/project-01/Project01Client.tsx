'use client';
import React, { useState } from 'react';
import { PROJECT_01_SPECIFICATION, PROJECT_01_GEOMETRY } from '@/content/project01/specification';
import { PROJECT01_COMPONENTS } from '@/content/project01/components';
import { PROJECT_01_REVISIONS } from '@/content/project01/revisions';

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

function ConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#131313] border border-yellow-500/30 p-6 max-w-sm w-full space-y-4">
        <div className="font-mono text-[9px] text-yellow-400 font-bold uppercase">⚠ HIGH-IMPACT CHANGE</div>
        <p className="font-mono text-[9px] text-white">THIS CHANGE MAY ALTER PUBLIC PRODUCT INFORMATION.</p>
        <p className="font-mono text-[9px] text-[#647789]">CONFIRM STATUS CHANGE?</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 py-2 bg-yellow-500 text-black font-mono text-[9px] font-bold uppercase">CONFIRM</button>
          <button onClick={onCancel} className="flex-1 py-2 border border-white/10 font-mono text-[9px] uppercase text-[#647789]">CANCEL</button>
        </div>
      </div>
    </div>
  );
}

export default function Project01Client() {
  const [tab, setTab] = useState('SPECIFICATION');
  const [showConfirm, setShowConfirm] = useState(false);

  const unavailableCount = PROJECT01_COMPONENTS.filter(c => c.assetStatus === 'UNAVAILABLE').length;
  const underReviewCount = PROJECT01_COMPONENTS.filter(c => c.status === 'UNDER_REVIEW').length;

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Project 01</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Central control for Project 01 specification and components.</div>
      </div>
      <div className="flex gap-4 mb-6 font-mono text-[10px] uppercase">
        {['SPECIFICATION', 'COMPONENTS', 'GEOMETRY', 'REVISIONS'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 border ${tab === t ? 'border-[#1a73e8] text-[#1a73e8]' : 'border-white/10 text-[#647789]'}`}>{t}</button>
        ))}
      </div>
      {tab === 'SPECIFICATION' && (
        <div className="bg-[#131313] border border-white/10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">FIELD</th>
                <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">VALUE</th>
                <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">STATUS</th>
                <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">NOTES</th>
              </tr>
            </thead>
            <tbody>
              {['frontTravel', 'rearTravel', 'primaryWheelFormat', 'frameMaterialIntent', 'suspensionArchitecture'].map(key => {
                const spec = (PROJECT_01_SPECIFICATION as any)[key];
                if (!spec) return null;
                return (
                  <tr key={key} className="border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => setShowConfirm(true)}>
                    <td className="px-4 py-3 font-mono text-[9px] text-[#1a73e8] font-bold">{key}</td>
                    <td className="px-4 py-3 font-mono text-[9px] text-white">{spec.value}</td>
                    <td className="px-4 py-3"><StatusBadge status={spec.status} /></td>
                    <td className="px-4 py-3 font-mono text-[9px] text-white">{spec.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'COMPONENTS' && (
        <div>
          <div className="mb-4 font-mono text-[9px] flex gap-4 text-[#647789]">
            <span>TOTAL: {PROJECT01_COMPONENTS.length}</span>
            <span>UNAVAILABLE ASSETS: {unavailableCount}</span>
            {underReviewCount > 0 && <span className="text-yellow-400">⚠ {underReviewCount} UNDER REVIEW</span>}
          </div>
          <div className="bg-[#131313] border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">ID</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">CATEGORY</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">MANUFACTURER</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">PRODUCT / VARIANT</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">STATUS</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789]">ASSET STATUS</th>
                </tr>
              </thead>
              <tbody>
                {PROJECT01_COMPONENTS.map(c => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => setShowConfirm(true)}>
                    <td className="px-4 py-3 font-mono text-[9px] text-[#1a73e8] font-bold">{c.id}</td>
                    <td className="px-4 py-3 font-mono text-[9px] text-white">{c.category}</td>
                    <td className="px-4 py-3 font-mono text-[9px] text-white">{c.manufacturer}</td>
                    <td className="px-4 py-3 font-mono text-[9px] text-white">{c.product} / {c.variant}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3"><StatusBadge status={c.assetStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === 'GEOMETRY' && (
        <div className="bg-[#131313] border border-white/10 p-4">
          <p className="font-mono text-[9px] text-[#647789] mb-4">Sizes from R00 specification:</p>
          <div className="flex gap-4">
            {Object.keys(PROJECT_01_GEOMETRY.sizes).map(s => {
              const size = (PROJECT_01_GEOMETRY.sizes as any)[s];
              return (
                <div key={s} className="border border-white/10 p-4 flex-1">
                  <h3 className="font-mono text-[10px] text-white font-bold">{size.name}</h3>
                  <div className="mt-2"><StatusBadge status={size.status} /></div>
                  <pre className="mt-4 font-mono text-[8px] text-[#647789] whitespace-pre-wrap">{JSON.stringify(size.values, null, 2)}</pre>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {tab === 'REVISIONS' && (
        <div className="space-y-4">
          {PROJECT_01_REVISIONS.map(r => (
            <div key={r.revision} className="bg-[#131313] border border-white/10 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[9px] text-[#1a73e8] font-bold">{r.revision}</span>
                <span className="font-mono text-[9px] text-white">{r.date}</span>
                <StatusBadge status={r.status} />
              </div>
              <p className="font-mono text-[9px] text-white mb-2">{r.summary}</p>
              <ul className="list-disc list-inside font-mono text-[9px] text-[#647789]">
                {r.changes.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
      {showConfirm && <ConfirmModal onConfirm={() => setShowConfirm(false)} onCancel={() => setShowConfirm(false)} />}
    </div>
  );
}
