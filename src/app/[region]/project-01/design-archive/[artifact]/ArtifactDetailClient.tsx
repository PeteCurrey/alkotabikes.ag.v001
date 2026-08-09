"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  X,
  Download,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import type { DesignArtifactRecord } from "@/content/design/archive";
import DevelopmentStatusTicker from "@/components/ui/DevelopmentStatusTicker";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";

interface Props {
  artifact: DesignArtifactRecord;
  prev: DesignArtifactRecord | null;
  next: DesignArtifactRecord | null;
}

// ─── Fullscreen zoom modal ────────────────────────────────────────────────────

function ZoomModal({
  artifact,
  onClose,
}: {
  artifact: DesignArtifactRecord;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/98 flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-0.5">
          <div className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
            {artifact.id}
          </div>
          <div className="font-display font-bold text-base uppercase text-white">
            {artifact.title}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-alkota-slate hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image area */}
      <div
        className="flex-1 flex items-center justify-center p-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {artifact.status === "PLACEHOLDER" || imgError ? (
          <div className="w-full max-w-5xl aspect-video bg-[#0a1628] flex items-center justify-center border border-white/10">
            <div className="text-center space-y-2 font-mono">
              <div className="text-alkota-signal font-bold text-sm uppercase tracking-wider">
                {artifact.id}
              </div>
              <div className="text-alkota-slate text-[10px] uppercase tracking-widest">
                {artifact.title}
              </div>
              <div className="text-alkota-slate/50 text-[9px] uppercase tracking-widest">
                ARTIFACT PENDING
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-6xl max-h-[80vh]">
            <Image
              src={artifact.assetPath}
              alt={artifact.title}
              width={2400}
              height={1800}
              className="object-contain w-full h-full max-h-[80vh]"
              priority
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </div>

      {/* Bottom metadata */}
      <div
        className="px-6 py-3 border-t border-white/10 flex flex-wrap gap-6 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {[
          { label: "TYPE", value: artifact.type },
          { label: "REVISION", value: artifact.revision },
          { label: "PHASE", value: artifact.phase },
          { label: "STATUS", value: artifact.status },
        ].map((m) => (
          <div key={m.label} className="space-y-0.5">
            <div className="font-mono text-[8px] text-alkota-slate uppercase tracking-widest">
              {m.label}
            </div>
            <div className="font-mono text-[10px] text-white uppercase font-bold">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Placeholder rendering ────────────────────────────────────────────────────

function DetailPlaceholder({ artifact }: { artifact: DesignArtifactRecord }) {
  return (
    <div className="w-full bg-[#0a1628] aspect-[16/10] flex items-center justify-center border border-white/10 relative overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 750"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern id={`dg-${artifact.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100,119,137,0.15)" strokeWidth="0.5" />
          </pattern>
          <pattern id={`dgm-${artifact.id}`} width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill={`url(#dg-${artifact.id})`} />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(100,119,137,0.25)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="750" fill={`url(#dgm-${artifact.id})`} />
        {([[30, 30], [1170, 30], [30, 720], [1170, 720]] as [number,number][]).map(([x, y], i) => (
          <g key={i} stroke="rgba(100,119,137,0.4)" strokeWidth="1" fill="none">
            <line x1={x - 14} y1={y} x2={x + 14} y2={y} />
            <line x1={x} y1={y - 14} x2={x} y2={y + 14} />
            <circle cx={x} cy={y} r="4" />
          </g>
        ))}
        <rect x="24" y="24" width="1152" height="702" fill="none" stroke="rgba(100,119,137,0.3)" strokeWidth="0.6" strokeDasharray="10 5" />
        <text x="60" y="70" fontFamily="monospace" fontSize="13" fill="#7a93ab" fontWeight="700" letterSpacing="4">{artifact.id}</text>
        <text x="60" y="90" fontFamily="monospace" fontSize="10" fill="#647789" letterSpacing="2">{artifact.revision} · {artifact.phase}</text>
        <text x="1140" y="70" fontFamily="monospace" fontSize="10" fill="#647789" textAnchor="end" letterSpacing="2">{artifact.type}</text>
        <line x1="300" y1="355" x2="900" y2="355" stroke="rgba(100,119,137,0.35)" strokeWidth="0.75" />
        <text x="600" y="347" fontFamily="monospace" fontSize="11" fill="#647789" textAnchor="middle" letterSpacing="3">DESIGN ARTIFACT</text>
        <text x="600" y="390" fontFamily="monospace" fontSize="20" fill="#7a93ab" textAnchor="middle" fontWeight="700" letterSpacing="4">{artifact.title}</text>
        <line x1="300" y1="410" x2="900" y2="410" stroke="rgba(100,119,137,0.35)" strokeWidth="0.75" />
        <text x="600" y="436" fontFamily="monospace" fontSize="10" fill="#647789" textAnchor="middle" letterSpacing="3">ARTIFACT PENDING · REPLACE VIA ALKOTA STUDIO</text>
        <rect x="24" y="714" width="1152" height="36" fill="rgba(100,119,137,0.08)" />
        <text x="48" y="736" fontFamily="monospace" fontSize="9" fill="#647789" letterSpacing="2">ALKOTA PERFORMANCE ENGINEERING</text>
        <text x="1152" y="736" fontFamily="monospace" fontSize="9" fill="#647789" textAnchor="end" letterSpacing="2">PROJECT 01 · PRE-PRODUCTION · NOT FOR MANUFACTURE</text>
      </svg>
    </div>
  );
}

// ─── Main detail client ───────────────────────────────────────────────────────

export default function ArtifactDetailClient({ artifact, prev, next }: Props) {
  const [imgError, setImgError] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  const isPending = artifact.status === "PLACEHOLDER" || imgError;
  const hasRealImage = !isPending;

  return (
    <>
      {zoomOpen && hasRealImage && (
        <ZoomModal artifact={artifact} onClose={() => setZoomOpen(false)} />
      )}

      <div className="w-full bg-alkota-carbon text-alkota-white pt-20">
        <DevelopmentStatusTicker />

        {/* ── BREADCRUMB ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10">
          <nav className="flex items-center gap-1.5 font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">ALKOTA</Link>
            <ChevronRight className="w-2.5 h-2.5" />
            <Link href="/project-01/design-archive" className="hover:text-white transition-colors">DESIGN ARCHIVE</Link>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="text-alkota-signal font-bold">{artifact.id}</span>
          </nav>
        </div>

        {/* ── ARTIFACT HEADER ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TechnicalAnnotation label="DESIGN ARCHIVE" value={artifact.id} variant="signal" />
            <span className="font-mono text-[8px] text-alkota-slate/50 uppercase tracking-widest">·</span>
            <span className="font-mono text-[8px] text-alkota-slate uppercase tracking-widest border border-white/10 px-2 py-0.5">
              {artifact.type}
            </span>
            <span className={`font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border font-bold ${
              artifact.status === "PLACEHOLDER"
                ? "border-white/10 text-alkota-slate"
                : artifact.status === "PUBLISHED"
                ? "border-alkota-signal/40 text-alkota-signal"
                : "border-white/10 text-alkota-slate"
            }`}>
              {artifact.status}
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.9]">
            {artifact.title}
          </h1>
          {artifact.subtitle && (
            <p className="font-mono text-sm text-alkota-signal uppercase tracking-wider">
              {artifact.subtitle}
            </p>
          )}
        </div>

        {/* ── MAIN IMAGE ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="relative group">
            {isPending ? (
              <DetailPlaceholder artifact={artifact} />
            ) : (
              <div className="relative w-full overflow-hidden border border-white/10">
                <Image
                  src={artifact.assetPath}
                  alt={artifact.title}
                  width={1800}
                  height={1200}
                  className="w-full h-auto object-cover"
                  priority
                  onError={() => setImgError(true)}
                />
              </div>
            )}

            {/* Zoom button (only if real image) */}
            {hasRealImage && (
              <button
                onClick={() => setZoomOpen(true)}
                className="absolute top-4 right-4 p-2 bg-black/60 border border-white/10 text-alkota-snow hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                aria-label="View full screen"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            )}

            {/* Download (controlled by publicDownload flag) */}
            {artifact.publicDownload && hasRealImage && (
              <a
                href={artifact.assetPath}
                download
                className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-2 bg-black/60 border border-white/10 text-alkota-snow hover:text-white font-mono text-[9px] uppercase tracking-widest transition-all"
              >
                <Download className="w-3 h-3" />
                DOWNLOAD
              </a>
            )}
          </div>

          {/* Annotations */}
          {artifact.annotations && artifact.annotations.length > 0 && (
            <div className="mt-4 border border-white/10 p-4">
              <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest mb-3">
                DRAWING ANNOTATIONS
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {artifact.annotations.map((ann) => (
                  <div key={ann.number} className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-alkota-signal/20 border border-alkota-signal/30 text-alkota-signal font-mono text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                      {ann.number}
                    </span>
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] text-white uppercase font-bold">{ann.label}</div>
                      {ann.note && (
                        <div className="font-mono text-[8px] text-alkota-slate leading-relaxed">{ann.note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── ARTIFACT CONTENT ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

            {/* Left: narrative */}
            <div className="lg:col-span-7 space-y-10">
              {/* Caption */}
              <p className="font-sans text-base sm:text-lg text-alkota-snow/80 font-light leading-relaxed border-l-2 border-alkota-signal/40 pl-5">
                {artifact.caption}
              </p>

              {/* THE QUESTION / DECISION / WHY */}
              {(artifact.theQuestion || artifact.theDecision || artifact.why || artifact.whatHappenedNext) && (
                <div className="space-y-6">
                  {artifact.theQuestion && (
                    <div className="space-y-2">
                      <div className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
                        THE QUESTION
                      </div>
                      <p className="font-display font-bold text-lg uppercase text-white leading-tight">
                        {artifact.theQuestion}
                      </p>
                    </div>
                  )}
                  {artifact.theDecision && (
                    <div className="space-y-2 pt-2">
                      <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest font-bold">
                        THE DECISION
                      </div>
                      <p className="font-sans text-sm text-alkota-snow/80 font-light leading-relaxed">
                        {artifact.theDecision}
                      </p>
                    </div>
                  )}
                  {artifact.why && (
                    <div className="space-y-2">
                      <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest font-bold">
                        WHY
                      </div>
                      <p className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed">
                        {artifact.why}
                      </p>
                    </div>
                  )}
                  {artifact.whatHappenedNext && (
                    <div className="space-y-2 border-t border-white/10 pt-6">
                      <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest font-bold">
                        WHAT HAPPENED NEXT
                      </div>
                      <p className="font-sans text-sm text-alkota-snow/60 font-light leading-relaxed">
                        {artifact.whatHappenedNext}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Founder note */}
              {artifact.founderNote && (
                <div className="border border-alkota-signal/20 bg-alkota-signal/5 p-6 space-y-3">
                  <div className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
                    PETE / FOUNDER
                  </div>
                  <blockquote className="font-sans text-sm text-alkota-snow/80 italic font-light leading-relaxed">
                    &ldquo;{artifact.founderNote}&rdquo;
                  </blockquote>
                </div>
              )}

              {/* Superseded notice */}
              {artifact.supersededBy && (
                <div className="border border-white/10 bg-white/5 p-4 space-y-2">
                  <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest font-bold">
                    SUPERSEDED
                  </div>
                  <p className="font-sans text-xs text-alkota-snow/60 font-light">
                    This artifact has been superseded by{" "}
                    <Link href={`/project-01/design-archive/${artifact.supersededBy.toLowerCase()}`} className="text-alkota-signal hover:text-white underline">
                      {artifact.supersededBy}
                    </Link>
                    {artifact.supersededReason && `. ${artifact.supersededReason}`}
                  </p>
                </div>
              )}
            </div>

            {/* Right: metadata panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* Metadata table */}
              <div className="border border-white/10 p-5 space-y-4">
                <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest font-bold border-b border-white/10 pb-3">
                  ARTIFACT METADATA
                </div>
                {[
                  { label: "ARTIFACT ID", value: artifact.id },
                  { label: "TYPE", value: artifact.type },
                  { label: "REVISION", value: artifact.revision },
                  { label: "PHASE", value: artifact.phase },
                  { label: "STATUS", value: artifact.status },
                  ...(artifact.relatedRevision ? [{ label: "PROJECT REVISION", value: artifact.relatedRevision }] : []),
                  ...(artifact.dateAdded ? [{ label: "DATE ADDED", value: artifact.dateAdded }] : []),
                  ...(artifact.supersedes ? [{ label: "SUPERSEDES", value: artifact.supersedes }] : []),
                  ...(artifact.supersededBy ? [{ label: "SUPERSEDED BY", value: artifact.supersededBy }] : []),
                  { label: "PUBLIC DOWNLOAD", value: artifact.publicDownload ? "AVAILABLE" : "NOT AVAILABLE" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[8px] text-alkota-slate uppercase tracking-widest flex-shrink-0">
                      {row.label}
                    </span>
                    <span className="font-mono text-[9px] text-white uppercase text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Related journal entry */}
              {artifact.relatedJournalSlug && (
                <div className="border border-alkota-signal/20 p-5 space-y-3 hover:border-alkota-signal/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-alkota-signal" />
                    <div className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
                      FROM THE DEVELOPMENT JOURNAL
                    </div>
                  </div>
                  <Link
                    href={`/journal/project-01/${artifact.relatedJournalSlug}`}
                    className="block"
                  >
                    <div className="font-display font-bold text-sm uppercase text-white group-hover:text-alkota-signal transition-colors">
                      READ RELATED ENTRY
                    </div>
                    <div className="font-mono text-[9px] text-alkota-slate uppercase mt-1">
                      {artifact.relatedJournalSlug.replace(/-/g, " ").toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-alkota-signal">
                      <span className="font-mono text-[9px] uppercase tracking-wider">OPEN ENTRY</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </div>
              )}

              {/* Security note for CONTROLLED type */}
              {artifact.type === "CONTROLLED DRAWING" && (
                <div className="border border-white/10 p-4 space-y-1">
                  <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest font-bold">
                    DOCUMENT STATUS
                  </div>
                  <p className="font-mono text-[9px] text-alkota-slate/70 leading-relaxed">
                    This is a development-controlled document. It is displayed for programme transparency. Original source files are retained privately. This view uses a derived web asset.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── PREV / NEXT NAVIGATION ── */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/project-01/design-archive/${prev.slug}`}
                className="group flex items-start gap-4 p-4 border border-white/10 hover:border-alkota-signal/40 transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-alkota-slate flex-shrink-0 mt-0.5 group-hover:text-alkota-signal transition-colors" />
                <div className="space-y-1 min-w-0">
                  <div className="font-mono text-[8px] text-alkota-slate uppercase tracking-widest">PREVIOUS</div>
                  <div className="font-mono text-[9px] text-alkota-signal font-bold">{prev.id}</div>
                  <div className="font-display font-bold text-sm uppercase text-white truncate group-hover:text-alkota-signal transition-colors">
                    {prev.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/project-01/design-archive/${next.slug}`}
                className="group flex items-start justify-end gap-4 p-4 border border-white/10 hover:border-alkota-signal/40 transition-all text-right"
              >
                <div className="space-y-1 min-w-0">
                  <div className="font-mono text-[8px] text-alkota-slate uppercase tracking-widest">NEXT</div>
                  <div className="font-mono text-[9px] text-alkota-signal font-bold">{next.id}</div>
                  <div className="font-display font-bold text-sm uppercase text-white truncate group-hover:text-alkota-signal transition-colors">
                    {next.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-alkota-slate flex-shrink-0 mt-0.5 group-hover:text-alkota-signal transition-colors" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* ── BACK TO ARCHIVE ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Link
            href="/project-01/design-archive"
            className="inline-flex items-center gap-2 font-mono text-xs text-alkota-slate hover:text-alkota-signal uppercase font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            RETURN TO DESIGN ARCHIVE
          </Link>
        </div>
      </div>
    </>
  );
}
