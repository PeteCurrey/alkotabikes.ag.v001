/**
 * Shared admin dashboard card shell.
 * Provides consistent chrome for all module cards with state badges.
 */
import React from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";

export type CardState = "live" | "building" | "planned" | "unavailable";

interface AdminCardProps {
  title: string;
  state: CardState;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

function StateBadge({ state }: { state: CardState }) {
  const styles: Record<CardState, string> = {
    live: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    building: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    planned: "bg-alkota-slate/20 text-alkota-slate border-alkota-slate/30",
    unavailable: "bg-red-500/20 text-red-400 border-red-500/40",
  };
  const labels: Record<CardState, string> = {
    live: "LIVE",
    building: "BUILDING",
    planned: "PLANNED",
    unavailable: "UNAVAILABLE",
  };
  return (
    <span
      className={`text-[9px] font-mono font-bold uppercase tracking-widest border px-1.5 py-0.5 ${styles[state]}`}
    >
      {labels[state]}
    </span>
  );
}

export function AdminCard({ title, state, href, children, className = "" }: AdminCardProps) {
  return (
    <div
      className={`bg-alkota-black/60 border border-white/10 p-5 flex flex-col gap-4 ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-alkota-slate">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <StateBadge state={state} />
          {href && (
            <Link
              href={href}
              className="text-alkota-slate hover:text-alkota-signal transition-colors"
              aria-label={`View ${title}`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

/** Skeleton placeholder for Suspense fallback */
export function CardSkeleton({ title }: { title: string }) {
  return (
    <div className="bg-alkota-black/60 border border-white/10 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-alkota-slate">
          {title}
        </span>
        <div className="h-4 w-16 bg-white/10 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-8 bg-white/5 animate-pulse" />
        <div className="h-4 w-3/4 bg-white/5 animate-pulse" />
        <div className="h-4 w-1/2 bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}

/** Standardised "query failed" error state for one card */
export function CardUnavailable({ title, error }: { title: string; error?: string }) {
  return (
    <AdminCard title={title} state="unavailable">
      <div className="flex items-start gap-2 text-red-400">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-wide">Query failed</p>
          {error && (
            <p className="text-[10px] font-mono text-red-400/70 mt-1 break-all">{error}</p>
          )}
          <p className="text-[10px] font-mono text-alkota-slate mt-1">
            All other cards continue to render normally.
          </p>
        </div>
      </div>
    </AdminCard>
  );
}

/** Stat block used within cards */
export function StatRow({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-slate flex-shrink-0">
        {label}
      </span>
      <span
        className={`font-mono text-xs font-bold text-right ${
          accent ? "text-alkota-signal" : "text-alkota-white"
        }`}
      >
        {value}
        {sub && (
          <span className="text-alkota-slate font-normal ml-1 text-[10px]">{sub}</span>
        )}
      </span>
    </div>
  );
}
