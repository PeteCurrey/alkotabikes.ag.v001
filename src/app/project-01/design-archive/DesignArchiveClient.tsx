"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Search,
  BookOpen,
  Calendar,
  LayoutGrid,
  AlignJustify,
} from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import DevelopmentStatusTicker from "@/components/ui/DevelopmentStatusTicker";
import {
  getAllPublicArtifacts,
  ARCHIVE_CHAPTERS,
  getChapterArtifacts,
  type DesignArtifactRecord,
} from "@/content/design/archive";
import { PROJECT_01_SPECIFICATION } from "@/content/project01/specification";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "CHRONOLOGY" | "SYSTEM";
type SystemFilter =
  | "ALL"
  | "RIDER"
  | "GEOMETRY"
  | "SUSPENSION"
  | "CHASSIS"
  | "CARBON"
  | "COMPONENTS"
  | "PROTOTYPE";

const SYSTEM_FILTERS: SystemFilter[] = [
  "ALL", "RIDER", "GEOMETRY", "SUSPENSION", "CHASSIS", "CARBON", "COMPONENTS", "PROTOTYPE",
];

function artifactMatchesFilter(a: DesignArtifactRecord, f: SystemFilter): boolean {
  if (f === "ALL") return true;
  const typeMap: Record<SystemFilter, string[]> = {
    ALL: [],
    RIDER: ["ALK-SKETCH-001", "ALK-SKETCH-002"],
    GEOMETRY: ["ALK-SKETCH-003", "ALK-SKETCH-011"],
    SUSPENSION: ["ALK-SKETCH-005", "ALK-SKETCH-006", "ALK-SKETCH-007"],
    CHASSIS: ["ALK-SKETCH-004", "ALK-SKETCH-008"],
    CARBON: ["ALK-SKETCH-009"],
    COMPONENTS: ["ALK-SKETCH-010"],
    PROTOTYPE: ["ALK-SKETCH-012"],
  };
  return typeMap[f]?.includes(a.id) ?? false;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: DesignArtifactRecord["status"] }) {
  const map: Record<string, string> = {
    PLACEHOLDER: "border-white/10 text-alkota-slate",
    PUBLISHED: "border-alkota-signal/40 text-alkota-signal bg-alkota-signal/5",
    INTERNAL: "border-yellow-500/30 text-yellow-400",
    SUPERSEDED: "border-white/10 text-alkota-slate line-through",
    ARCHIVED: "border-white/10 text-alkota-slate/50",
    CONTROLLED: "border-blue-400/30 text-blue-300",
  };
  return (
    <span
      className={`font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border font-bold ${map[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

// ─── Artifact placeholder SVG ─────────────────────────────────────────────────

function ArtifactPlaceholder({ artifact }: { artifact: DesignArtifactRecord }) {
  const gridColor = "rgba(100,119,137,0.18)";
  const textColor = "#647789";
  const accentColor = "#7a93ab";
  const regColor = "rgba(100,119,137,0.45)";

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={`g-${artifact.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="0.5" />
        </pattern>
        <pattern id={`gm-${artifact.id}`} width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill={`url(#g-${artifact.id})`} />
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke={gridColor} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill={`url(#gm-${artifact.id})`} />
      {([[30, 30], [770, 30], [30, 570], [770, 570]] as [number, number][]).map(([x, y], i) => (
        <g key={i} stroke={regColor} strokeWidth="1" fill="none">
          <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
          <line x1={x} y1={y - 10} x2={x} y2={y + 10} />
          <circle cx={x} cy={y} r="3" />
        </g>
      ))}
      <rect x="20" y="20" width="760" height="560" fill="none" stroke={regColor} strokeWidth="0.6" strokeDasharray="8 4" />
      <text x="40" y="52" fontFamily="monospace" fontSize="11" fill={accentColor} fontWeight="700" letterSpacing="3">{artifact.id}</text>
      <text x="40" y="68" fontFamily="monospace" fontSize="9" fill={textColor} letterSpacing="2">{artifact.revision}</text>
      <text x="760" y="52" fontFamily="monospace" fontSize="9" fill={textColor} textAnchor="end" letterSpacing="1.5">{artifact.phase}</text>
      <line x1="200" y1="272" x2="600" y2="272" stroke={regColor} strokeWidth="0.75" />
      <text x="400" y="264" fontFamily="monospace" fontSize="9" fill={textColor} textAnchor="middle" letterSpacing="3">{artifact.type}</text>
      <text x="400" y="308" fontFamily="monospace" fontSize="16" fill={accentColor} textAnchor="middle" fontWeight="700" letterSpacing="3">{artifact.title}</text>
      <line x1="200" y1="326" x2="600" y2="326" stroke={regColor} strokeWidth="0.75" />
      <text x="400" y="350" fontFamily="monospace" fontSize="9" fill={textColor} textAnchor="middle" letterSpacing="3">ARTIFACT PENDING</text>
      <rect x="20" y="548" width="760" height="32" fill={regColor} opacity="0.10" />
      <text x="40" y="569" fontFamily="monospace" fontSize="8" fill={textColor} letterSpacing="2">ALKOTA PERFORMANCE ENGINEERING</text>
      <text x="760" y="569" fontFamily="monospace" fontSize="8" fill={textColor} textAnchor="end" letterSpacing="2">PROJECT 01 · PRE-PRODUCTION</text>
    </svg>
  );
}

// ─── Artifact thumbnail card ──────────────────────────────────────────────────

function ArtifactCard({ artifact }: { artifact: DesignArtifactRecord }) {
  const [imgError, setImgError] = useState(false);
  const isPending = artifact.status === "PLACEHOLDER" || imgError;

  const aspectClasses: Record<string, string> = {
    "4:3": "aspect-[4/3]",
    "3:2": "aspect-[3/2]",
    "1:1": "aspect-square",
    "16:9": "aspect-video",
    "3:4": "aspect-[3/4]",
  };

  return (
    <Link
      href={`/project-01/design-archive/${artifact.slug}`}
      className="group block bg-alkota-black border border-white/10 hover:border-alkota-signal/40 transition-all duration-300"
    >
      {/* Image area */}
      <div className={`relative w-full overflow-hidden ${aspectClasses[artifact.aspectRatio]} bg-[#0a1628]`}>
        {!isPending ? (
          <Image
            src={artifact.assetPath}
            alt={artifact.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <ArtifactPlaceholder artifact={artifact} />
        )}

        {/* Type overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
            {artifact.type}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[9px] text-alkota-signal font-bold uppercase tracking-widest">
            {artifact.id}
          </span>
          <StatusBadge status={artifact.status} />
        </div>
        <h3 className="font-display font-bold text-sm uppercase tracking-tight text-white leading-tight group-hover:text-alkota-signal transition-colors">
          {artifact.title}
        </h3>
        <p className="font-mono text-[9px] text-alkota-slate uppercase">
          {artifact.phase}
        </p>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="font-mono text-[9px] text-alkota-slate/60 uppercase">{artifact.type}</span>
          <span className="text-alkota-slate/30">·</span>
          <span className="font-mono text-[9px] text-alkota-slate/60 uppercase">{artifact.revision}</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Chapter section ──────────────────────────────────────────────────────────

function ChapterSection({ chapter }: { chapter: typeof ARCHIVE_CHAPTERS[number] }) {
  const artifacts = getChapterArtifacts(chapter.id).filter((a) => a.visibility === "PUBLIC");
  const lines = chapter.headline.split("\n");

  return (
    <section className="border-t border-white/10 pt-16 pb-20 space-y-12">
      {/* Chapter header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <div className="lg:col-span-1">
          <span className="font-display font-bold text-5xl sm:text-6xl text-white/10 leading-none select-none">
            {chapter.number}
          </span>
        </div>
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
            {chapter.title}
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-[0.95]">
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {i === 1 ? <span className="text-alkota-signal">{line}</span> : line}
              </React.Fragment>
            ))}
          </h2>
        </div>
        <div className="lg:col-span-6 space-y-3">
          {chapter.copy.split("\n\n").map((para, i) => (
            <p key={i} className="font-sans text-sm text-alkota-snow/70 font-light leading-relaxed">
              {para}
            </p>
          ))}
          {chapter.linkLabel && chapter.linkHref && (
            <Link
              href={chapter.linkHref}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-alkota-signal hover:text-white uppercase font-bold transition-colors pt-2"
            >
              <span>{chapter.linkLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Artifacts */}
      {artifacts.length > 0 && (
        <div
          className={`grid gap-6 ${
            artifacts.length === 1
              ? "grid-cols-1 max-w-2xl"
              : artifacts.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {artifacts.map((a) => (
            <ArtifactCard key={a.id} artifact={a} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Main archive client ──────────────────────────────────────────────────────

export default function DesignArchiveClient() {
  const [viewMode, setViewMode] = useState<ViewMode>("CHRONOLOGY");
  const [systemFilter, setSystemFilter] = useState<SystemFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const archiveRef = useRef<HTMLDivElement>(null);

  const allPublic = getAllPublicArtifacts();
  const spec = PROJECT_01_SPECIFICATION;

  const filteredArtifacts = allPublic.filter((a) => {
    const matchesFilter = artifactMatchesFilter(a, systemFilter);
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const scrollToArchive = () => {
    archiveRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white pt-20">
      <DevelopmentStatusTicker />

      {/* ── HERO ── */}
      <section className="w-full bg-alkota-black min-h-[80vh] flex flex-col justify-end px-4 sm:px-6 lg:px-8 pt-24 pb-20 border-b border-white/10 relative overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10 space-y-10">
          {/* Eyebrow */}
          <div className="space-y-2">
            <TechnicalAnnotation
              label="PROJECT 01"
              value="DESIGN ARCHIVE"
              variant="signal"
            />
          </div>

          {/* H1 */}
          <div className="max-w-4xl">
            <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.9]">
              THE DRAWINGS
              <br />
              <span className="text-alkota-signal">BEHIND THE</span>
              <br />
              MACHINE.
            </h1>
          </div>

          {/* Intro */}
          <div className="max-w-2xl space-y-3">
            <p className="font-sans text-base sm:text-lg text-alkota-snow/80 font-light leading-relaxed">
              A bicycle accumulates a history before it accumulates kilometres.
            </p>
            <p className="font-sans text-sm text-alkota-snow/60 font-light leading-relaxed">
              Sketches. Measurements. Rejected ideas. Geometry. Components. Carbon. Revisions.
              <br />
              Some decisions survive. Others disappear.
              <br />
              This is the record of both.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={scrollToArchive}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
            >
              ENTER THE ARCHIVE
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/journal/project-01"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-alkota-snow font-mono font-bold text-xs uppercase tracking-wider hover:border-white/40 hover:text-white transition-colors"
            >
              READ THE DEVELOPMENT JOURNAL
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Programme status strip */}
          <div className="border-t border-white/10 pt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "PROJECT", value: "P01" },
              { label: "CURRENT REVISION", value: spec.currentRevision },
              { label: "CURRENT PHASE", value: "ENGINEERING" },
              { label: "ARCHIVE", value: "OPEN / GROWING" },
              { label: "PRODUCTION", value: "PLANNED 2028" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="font-mono text-[8px] text-alkota-slate uppercase tracking-widest">
                  {item.label}
                </div>
                <div className="font-mono text-[10px] text-alkota-signal font-bold uppercase">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHIVE ── */}
      <div ref={archiveRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-4">
        {/* View mode + filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("CHRONOLOGY")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
                viewMode === "CHRONOLOGY"
                  ? "bg-alkota-signal text-alkota-black border-alkota-signal font-bold"
                  : "border-white/10 text-alkota-slate hover:text-white"
              }`}
            >
              <AlignJustify className="w-3 h-3" />
              CHRONOLOGY
            </button>
            <button
              onClick={() => setViewMode("SYSTEM")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
                viewMode === "SYSTEM"
                  ? "bg-alkota-signal text-alkota-black border-alkota-signal font-bold"
                  : "border-white/10 text-alkota-slate hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              BY SYSTEM
            </button>
          </div>

          {/* Search (compact — only 12 artifacts currently) */}
          <div className="relative">
            <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-alkota-slate" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH ARCHIVE..."
              className="bg-alkota-black border border-white/10 text-white font-mono text-[10px] pl-8 pr-4 py-2 focus:outline-none focus:border-alkota-signal/40 placeholder:text-alkota-slate/40 uppercase tracking-wider w-48 sm:w-64"
            />
          </div>
        </div>

        {/* System filters (shown in SYSTEM mode) */}
        {viewMode === "SYSTEM" && (
          <div className="flex flex-wrap gap-2 pb-8">
            {SYSTEM_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setSystemFilter(f)}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest border transition-colors ${
                  systemFilter === f
                    ? "bg-alkota-signal text-alkota-black border-alkota-signal font-bold"
                    : "border-white/10 text-alkota-slate hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* ── CHRONOLOGY VIEW ── */}
        {viewMode === "CHRONOLOGY" && searchQuery === "" && (
          <div className="space-y-0">
            {ARCHIVE_CHAPTERS.map((chapter) => (
              <ChapterSection key={chapter.id} chapter={chapter} />
            ))}
          </div>
        )}

        {/* ── SYSTEM VIEW or SEARCH RESULTS ── */}
        {(viewMode === "SYSTEM" || searchQuery !== "") && (
          <div className="space-y-8">
            {searchQuery !== "" && (
              <div className="font-mono text-[10px] text-alkota-slate uppercase">
                {filteredArtifacts.length} RESULT{filteredArtifacts.length !== 1 ? "S" : ""} FOR &quot;{searchQuery.toUpperCase()}&quot;
              </div>
            )}
            {filteredArtifacts.length === 0 ? (
              <div className="text-center py-20 font-mono text-xs text-alkota-slate uppercase">
                NO ARTIFACTS MATCH THIS FILTER.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArtifacts.map((a) => (
                  <ArtifactCard key={a.id} artifact={a} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ROAD TO 2028 STRIP ── */}
        <div className="border-t border-white/10 pt-16 pb-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { year: "2026", headline: "DRAW IT.\nENGINEER IT.\nBUILD IT." },
              { year: "2027", headline: "RACE IT." },
              { year: "2028", headline: "PRODUCE IT." },
            ].map((item) => (
              <div key={item.year} className="space-y-2 border-l border-alkota-signal/30 pl-5">
                <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest">
                  {item.year}
                </div>
                <div className="font-display font-bold text-xl uppercase text-white leading-tight whitespace-pre-line">
                  {item.headline}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/road-to-2028"
            className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal hover:text-white uppercase font-bold transition-colors"
          >
            ROAD TO 2028
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── JOURNAL CONNECTION ── */}
        <div className="border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-alkota-signal" />
              <span className="font-mono text-[9px] text-alkota-signal uppercase tracking-widest font-bold">
                DEVELOPMENT JOURNAL
              </span>
            </div>
            <div className="font-display font-bold text-xl uppercase text-white">
              EVERY ARTIFACT HAS A STORY.
            </div>
            <p className="font-sans text-xs text-alkota-snow/60 font-light">
              The journal is where design decisions are explained in full.
            </p>
          </div>
          <Link
            href="/journal/project-01"
            className="inline-flex items-center gap-2 px-5 py-3 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex-shrink-0"
          >
            OPEN JOURNAL
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
