'use client';
/**
 * ALKOTA CYCLES — CLAIM GUARD COMPONENT
 *
 * Wraps any public technical claim. Resolves the claim by reference,
 * passes it through the Public Language Engine, and renders only
 * approved public wording.
 *
 * If the claim is not found, not visible, or has a blocked status,
 * renders the fallback (default: null).
 *
 * Usage:
 *   <ClaimGuard ref="APC-001001">
 *     {(wording) => <span>{wording}</span>}
 *   </ClaimGuard>
 *
 *   <ClaimGuard ref="APC-001001" fallback={<span>In development</span>} />
 */

import React from "react";
import { getClaimByRef } from "@/lib/claims/index";
import { getClaimPublicWording } from "@/lib/claims/publicLanguage";

interface ClaimGuardProps {
  /** The claim reference to resolve, e.g. "APC-001001" */
  claimRef: string;
  /**
   * Render prop — receives approved public wording.
   * If omitted, renders the wording as a plain span.
   */
  children?: (wording: string) => React.ReactNode;
  /** Rendered when claim is not found or not publicly visible. Default: null */
  fallback?: React.ReactNode;
  /** Optional className applied to the default span wrapper */
  className?: string;
}

export function ClaimGuard({ claimRef, children, fallback = null, className }: ClaimGuardProps) {
  const claim = getClaimByRef(claimRef);
  if (!claim) return <>{fallback}</>;

  const wording = getClaimPublicWording(claim);
  if (!wording) return <>{fallback}</>;

  if (children) return <>{children(wording)}</>;

  return <span className={className}>{wording}</span>;
}

/**
 * Inline claim status badge — for use in Studio internal views only.
 * Renders the raw status with the correct colour class.
 */
interface ClaimStatusBadgeProps {
  status: string;
  className?: string;
}

export function ClaimStatusBadge({ status, className = "" }: ClaimStatusBadgeProps) {
  const styles: Record<string, string> = {
    DRAFT:                "bg-white/5 text-white/30 border-white/10",
    ENGINEERING_REVIEW:   "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    EVIDENCE_REQUIRED:    "bg-orange-500/10 text-orange-400 border-orange-500/20",
    APPROVED_DEVELOPMENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    VALIDATION_PENDING:   "bg-purple-500/10 text-purple-400 border-purple-500/20",
    VALIDATED:            "bg-green-500/10 text-green-400 border-green-500/20",
    PRODUCTION_RELEASED:  "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    SUPERSEDED:           "bg-white/5 text-white/20 border-white/5",
  };
  const cls = styles[status] ?? "bg-white/5 text-white/30 border-white/10";
  return (
    <span className={`font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold ${cls} ${className}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

/**
 * Inline claim type badge — Studio internal views only.
 */
interface ClaimTypeBadgeProps {
  claimType: string;
  className?: string;
}

export function ClaimTypeBadge({ claimType, className = "" }: ClaimTypeBadgeProps) {
  const styles: Record<string, string> = {
    TARGET:                   "bg-white/5 text-white/50 border-white/10",
    DESIGN_INTENT:            "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CALCULATED:               "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    SIMULATED:                "bg-purple-500/10 text-purple-400 border-purple-500/20",
    MEASURED:                 "bg-green-500/10 text-green-400 border-green-500/20",
    TESTED:                   "bg-green-500/10 text-green-400 border-green-500/20",
    VALIDATED:                "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    PRODUCTION_SPECIFICATION: "bg-[#1a73e8]/20 text-[#1a73e8] border-[#1a73e8]/30",
  };
  const cls = styles[claimType] ?? "bg-white/5 text-white/30 border-white/10";
  return (
    <span className={`font-mono text-[7px] uppercase tracking-widest px-1.5 py-0.5 border font-bold ${cls} ${className}`}>
      {claimType.replace(/_/g, " ")}
    </span>
  );
}
