'use client';
import React, { useState, useMemo } from 'react';
import { ENGINEERING_CLAIMS, CLAIM_SYSTEMS, type ClaimStatus, type ClaimSystem } from '@/content/project01/claims';
import { ClaimStatusBadge, ClaimTypeBadge } from '@/lib/claims/guard';
import { getClaimPublicWording, CLAIM_STATUS_STYLE } from '@/lib/claims/publicLanguage';
import { ShieldAlert, CheckCircle2, Clock, Archive, LayoutList, FileSearch } from 'lucide-react';

type Tab = 'ALL' | 'EVIDENCE_REQUIRED' | 'VALIDATION_PENDING' | 'VALIDATED' | 'SUPERSEDED';

const TABS: { id: Tab; label: string; icon: React.ReactNode; filter: (s: ClaimStatus) => boolean }[] = [
  { id: 'ALL',                label: 'ALL CLAIMS',         icon: <LayoutList className="w-3 h-3" />,   filter: () => true },
  { id: 'EVIDENCE_REQUIRED', label: 'EVIDENCE REQUIRED',  icon: <ShieldAlert className="w-3 h-3" />,  filter: (s) => s === 'EVIDENCE_REQUIRED' },
  { id: 'VALIDATION_PENDING',label: 'VALIDATION PENDING', icon: <Clock className="w-3 h-3" />,        filter: (s) => s === 'VALIDATION_PENDING' },
  { id: 'VALIDATED',         label: 'VALIDATED',          icon: <CheckCircle2 className="w-3 h-3" />, filter: (s) => s === 'VALIDATED' || s === 'PRODUCTION_RELEASED' },
  { id: 'SUPERSEDED',        label: 'SUPERSEDED',         icon: <Archive className="w-3 h-3" />,      filter: (s) => s === 'SUPERSEDED' },
];

function ClaimCard({ claim }: { claim: typeof ENGINEERING_CLAIMS[0] }) {
  const [open, setOpen] = useState(false);
  const publicWording = getClaimPublicWording(claim);

  return (
    <div className="bg-[#131313] border border-white/8 hover:border-white/20 transition-all">
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] text-[#1a73e8] font-bold">{claim.claimReference}</span>
            <ClaimStatusBadge status={claim.status} />
            <ClaimTypeBadge claimType={claim.claimType} />
          </div>
          <div className="font-mono text-[11px] text-white font-semibold">{claim.title}</div>
          <div className="font-mono text-[9px] text-[#647789]">
            {claim.system} · REV {claim.engineeringRevision}
          </div>
        </div>
        <span className="font-mono text-[9px] text-[#647789] mt-1 shrink-0">{open ? '▲' : '▼'}</span>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-white/8 px-5 py-5 space-y-5">

          {/* WHAT ARE WE CLAIMING? */}
          <div className="space-y-1">
            <div className="font-mono text-[8px] text-[#1a73e8] uppercase tracking-widest font-bold">
              WHAT ARE WE CLAIMING?
            </div>
            <div className="font-mono text-[10px] text-white">
              {claim.value}{claim.unit ? ` ${claim.unit}` : ''}
            </div>
            <div className="font-mono text-[9px] text-[#647789]">{claim.internalWording}</div>
          </div>

          {/* WHAT SUPPORTS IT? */}
          <div className="space-y-1">
            <div className="font-mono text-[8px] text-[#1a73e8] uppercase tracking-widest font-bold">
              WHAT SUPPORTS IT?
            </div>
            {claim.sourceType ? (
              <div className="space-y-0.5">
                <div className="font-mono text-[9px] text-white">{claim.sourceType.replace(/_/g, ' ')}</div>
                {claim.sourceReference && (
                  <div className="font-mono text-[9px] text-[#647789]">Ref: {claim.sourceReference}</div>
                )}
                {claim.evidenceSummary && (
                  <div className="font-mono text-[9px] text-[#647789]">{claim.evidenceSummary}</div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 border font-bold bg-orange-500/10 text-orange-400 border-orange-500/20">
                  ⚠ NO EVIDENCE FILED
                </span>
                <span className="font-mono text-[9px] text-[#647789]">Source document required before this claim may be promoted.</span>
              </div>
            )}
          </div>

          {/* WHO APPROVED IT? */}
          <div className="space-y-1">
            <div className="font-mono text-[8px] text-[#1a73e8] uppercase tracking-widest font-bold">
              WHO APPROVED IT?
            </div>
            {claim.approvedBy ? (
              <div className="font-mono text-[9px] text-white">
                {claim.approvedBy}
                {claim.approvedAt && (
                  <span className="text-[#647789] ml-2">
                    {new Date(claim.approvedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            ) : (
              <span className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 border font-bold bg-white/5 text-white/30 border-white/10">
                NOT APPROVED
              </span>
            )}
          </div>

          {/* WHICH REVISION? */}
          <div className="space-y-1">
            <div className="font-mono text-[8px] text-[#1a73e8] uppercase tracking-widest font-bold">
              WHICH REVISION?
            </div>
            <div className="font-mono text-[9px] text-white">
              Engineering Revision {claim.engineeringRevision}
            </div>
          </div>

          {/* WHAT MAY THE WEBSITE SAY? */}
          <div className="space-y-1 border-t border-white/8 pt-4">
            <div className="font-mono text-[8px] text-[#1a73e8] uppercase tracking-widest font-bold">
              WHAT MAY THE WEBSITE SAY?
            </div>
            {publicWording ? (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-green-400 font-bold">"{publicWording}"</span>
                <span className="font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold bg-green-500/10 text-green-400 border-green-500/20">APPROVED TO PUBLISH</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5 border font-bold bg-orange-500/10 text-orange-400 border-orange-500/20">
                  ⚠ NOT CLEARED FOR PUBLIC USE
                </span>
                <span className="font-mono text-[9px] text-[#647789]">Claim must be evidenced and approved before it may appear on the public website.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EvidenceClient() {
  const [activeTab, setActiveTab] = useState<Tab>('EVIDENCE_REQUIRED');
  const [systemFilter, setSystemFilter] = useState<ClaimSystem | 'ALL'>('ALL');

  const tab = TABS.find(t => t.id === activeTab)!;

  const filtered = useMemo(() => {
    return ENGINEERING_CLAIMS.filter(c => {
      const matchesTab = tab.filter(c.status);
      const matchesSystem = systemFilter === 'ALL' || c.system === systemFilter;
      return matchesTab && matchesSystem;
    });
  }, [activeTab, systemFilter, tab]);

  const evidenceRequiredCount = ENGINEERING_CLAIMS.filter(c => c.status === 'EVIDENCE_REQUIRED').length;

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO · PROJECT 01</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Engineering Evidence</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">
          Claim provenance register — R00 · {ENGINEERING_CLAIMS.length} claims audited
        </div>
      </div>

      {/* Alert bar */}
      {evidenceRequiredCount > 0 && (
        <div className="bg-orange-500/5 border border-orange-500/20 p-4 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <div className="font-mono text-[9px] text-orange-400 font-bold uppercase">
              {evidenceRequiredCount} CLAIM{evidenceRequiredCount > 1 ? 'S' : ''} REQUIRE EVIDENCE
            </div>
            <div className="font-mono text-[8px] text-[#647789]">
              No R00 claims are currently evidenced. Each claim must have a source document, evidence summary, and approved-by identity before it may be promoted or shown publicly.
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => {
          const count = ENGINEERING_CLAIMS.filter(c => t.filter(c.status)).length;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 border font-mono text-[9px] uppercase transition-all ${
                activeTab === t.id
                  ? 'border-[#1a73e8] text-[#1a73e8] bg-[#1a73e8]/5'
                  : 'border-white/10 text-[#647789] hover:border-white/20'
              }`}
            >
              {t.icon}
              {t.label}
              <span className={`px-1 py-0.5 text-[7px] font-bold ${
                activeTab === t.id ? 'bg-[#1a73e8]/20 text-[#1a73e8]' : 'bg-white/5 text-white/30'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* System filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-mono text-[8px] text-[#647789] uppercase">Filter by system:</span>
        {(['ALL', ...CLAIM_SYSTEMS] as const).map(sys => (
          <button
            key={sys}
            onClick={() => setSystemFilter(sys)}
            className={`px-2 py-1 border font-mono text-[8px] uppercase transition-all ${
              systemFilter === sys
                ? 'border-[#1a73e8] text-[#1a73e8]'
                : 'border-white/10 text-[#647789] hover:border-white/20'
            }`}
          >
            {sys}
          </button>
        ))}
      </div>

      {/* Claims list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-32 border border-white/8 bg-[#131313]">
            <span className="font-mono text-[9px] text-[#647789] uppercase">No claims in this view</span>
          </div>
        ) : (
          filtered.map(claim => <ClaimCard key={claim.claimReference} claim={claim} />)
        )}
      </div>
    </div>
  );
}
