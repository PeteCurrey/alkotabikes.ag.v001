'use client';
import React from 'react';
import { getReleaseReadiness, getOverallReleaseGates } from '@/lib/claims/index';
import { ENGINEERING_CLAIMS } from '@/content/project01/claims';
import type { ClaimStatus } from '@/content/project01/claims';
import { ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

const STATUS_ORDER: ClaimStatus[] = [
  'PRODUCTION_RELEASED',
  'VALIDATED',
  'VALIDATION_PENDING',
  'APPROVED_DEVELOPMENT',
  'EVIDENCE_REQUIRED',
  'ENGINEERING_REVIEW',
  'DRAFT',
  'SUPERSEDED',
];

const STATUS_LABEL: Partial<Record<ClaimStatus, string>> = {
  PRODUCTION_RELEASED:  'Production Released',
  VALIDATED:            'Validated',
  VALIDATION_PENDING:   'Validation Pending',
  APPROVED_DEVELOPMENT: 'Approved — Development',
  EVIDENCE_REQUIRED:    'Evidence Required',
  ENGINEERING_REVIEW:   'Engineering Review',
  DRAFT:                'Draft',
  SUPERSEDED:           'Superseded',
};

const STATUS_DOT: Partial<Record<ClaimStatus, string>> = {
  PRODUCTION_RELEASED:  'bg-emerald-400',
  VALIDATED:            'bg-green-400',
  VALIDATION_PENDING:   'bg-purple-400',
  APPROVED_DEVELOPMENT: 'bg-blue-400',
  EVIDENCE_REQUIRED:    'bg-orange-400',
  ENGINEERING_REVIEW:   'bg-yellow-400',
  DRAFT:                'bg-white/20',
  SUPERSEDED:           'bg-white/10',
};

function GateIndicator({ label, ready, description }: { label: string; ready: boolean; description: string }) {
  return (
    <div className={`p-5 border ${ready ? 'border-green-500/30 bg-green-500/5' : 'border-white/8 bg-[#131313]'}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {ready
            ? <ShieldCheck className="w-5 h-5 text-green-400" />
            : <ShieldX className="w-5 h-5 text-white/20" />
          }
        </div>
        <div className="space-y-1">
          <div className={`font-mono text-[10px] font-bold uppercase tracking-wider ${ready ? 'text-green-400' : 'text-white/40'}`}>
            {label}
          </div>
          <div className={`font-mono text-[8px] uppercase ${ready ? 'text-green-300/70' : 'text-[#647789]'}`}>
            {ready ? 'GATE CLEAR' : description}
          </div>
        </div>
        <div className="ml-auto">
          <span className={`font-mono text-[8px] uppercase tracking-widest px-2 py-1 border font-bold ${
            ready
              ? 'border-green-500/30 text-green-400 bg-green-500/10'
              : 'border-white/10 text-white/20 bg-white/5'
          }`}>
            {ready ? 'READY' : 'NOT READY'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ReleaseClient() {
  const systems = getReleaseReadiness();
  const overall = getOverallReleaseGates();

  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO · PROJECT 01</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">R00 Release Readiness</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">
          Engineering revision R00 · {overall.totalClaims} claims · {overall.evidenceRequired} evidence required
        </div>
      </div>

      {/* Overall alert */}
      {overall.evidenceRequired > 0 && (
        <div className="bg-orange-500/5 border border-orange-500/20 p-4 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
          <div className="font-mono text-[9px] text-orange-300">
            <span className="font-bold">{overall.evidenceRequired} CLAIM{overall.evidenceRequired > 1 ? 'S' : ''} REQUIRE EVIDENCE</span>
            <span className="text-[#647789] ml-2">— No release gate is achievable until all claims have filed source documents and engineering approval.</span>
          </div>
        </div>
      )}

      {/* Release gates — three separate, never a single percentage */}
      <div className="space-y-2">
        <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest mb-3">RELEASE GATES</div>
        <GateIndicator
          label="DEVELOPMENT RELEASE"
          ready={overall.developmentRelease}
          description="All claims must reach APPROVED_DEVELOPMENT or above"
        />
        <GateIndicator
          label="PROTOTYPE RELEASE"
          ready={overall.prototypeRelease}
          description="All claims must reach VALIDATION_PENDING or above"
        />
        <GateIndicator
          label="PRODUCTION RELEASE"
          ready={overall.productionRelease}
          description="All claims must be PRODUCTION_RELEASED"
        />
      </div>

      {/* Per-system breakdown */}
      <div className="space-y-3">
        <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">PER-SYSTEM CLAIM STATUS — R00</div>
        {systems.filter(s => s.total > 0).map(sys => (
          <div key={sys.system} className="bg-[#131313] border border-white/8 p-5 space-y-4">
            {/* System header */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] text-white font-bold uppercase">{sys.system}</div>
                <div className="font-mono text-[8px] text-[#647789]">{sys.total} claim{sys.total !== 1 ? 's' : ''}</div>
              </div>
              <div className="flex gap-1.5">
                {sys.developmentReady && (
                  <span className="font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold bg-blue-500/10 text-blue-400 border-blue-500/20">DEV ✓</span>
                )}
                {sys.prototypeReady && (
                  <span className="font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold bg-purple-500/10 text-purple-400 border-purple-500/20">PROTO ✓</span>
                )}
                {sys.productionReady && (
                  <span className="font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold bg-emerald-500/10 text-emerald-300 border-emerald-500/20">PROD ✓</span>
                )}
              </div>
            </div>

            {/* Status breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {STATUS_ORDER.filter(s => (sys.byStatus[s] ?? 0) > 0).map(status => (
                <div key={status} className="flex items-center gap-2 p-2 bg-[#0f0f0f] border border-white/5">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[status] ?? 'bg-white/20'}`} />
                  <div className="min-w-0">
                    <div className="font-mono text-[8px] text-[#647789] truncate">{STATUS_LABEL[status]}</div>
                    <div className="font-mono text-[11px] text-white font-bold">{sys.byStatus[status]}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Per-claim list */}
            <div className="space-y-1 border-t border-white/5 pt-3">
              {ENGINEERING_CLAIMS.filter(c => c.system === sys.system).map(c => (
                <div key={c.claimReference} className="flex items-center gap-3 py-1">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[c.status] ?? 'bg-white/20'}`} />
                  <span className="font-mono text-[8px] text-[#1a73e8]">{c.claimReference}</span>
                  <span className="font-mono text-[8px] text-white flex-1 truncate">{c.title}</span>
                  <span className="font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold shrink-0
                    ${c.status === 'EVIDENCE_REQUIRED'
                      ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      : 'bg-white/5 text-white/30 border-white/10'
                    }">
                    {c.status.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Systems with no claims yet */}
        {systems.filter(s => s.total === 0).map(sys => (
          <div key={sys.system} className="bg-[#131313] border border-white/5 px-5 py-3 flex items-center justify-between opacity-40">
            <span className="font-mono text-[10px] text-white uppercase">{sys.system}</span>
            <span className="font-mono text-[8px] text-[#647789]">NO CLAIMS REGISTERED</span>
          </div>
        ))}
      </div>
    </div>
  );
}
