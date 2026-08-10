"use client";

import React, { useState, useEffect } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import {
  Wrench,
  Search,
  Filter,
  Download,
  BarChart3,
  CheckCircle,
  Clock,
  X,
  FileText,
  Layers,
  Sparkles,
  UserCheck,
} from "lucide-react";

interface SavedBuild {
  id: string;
  build_reference: string;
  region: string;
  frame_size: string;
  wheel_format: string;
  finish: string;
  selections: Record<string, string>;
  fit_inputs?: Record<string, any>;
  email?: string;
  registration_reference?: string | null;
  source: string;
  created_at: string;
  registrations?: {
    registration_reference: string;
    full_name: string;
    email: string;
    country: string;
  };
}

interface Analytics {
  totalBuilds: number;
  attachedToRegistrations: number;
  attachmentRatePct: number;
  finishDistribution: {
    GLACIER: { count: number; pct: number };
    CARBON: { count: number; pct: number };
  };
  sizeDistribution: {
    S: { count: number; pct: number };
    M: { count: number; pct: number };
    L: { count: number; pct: number };
    XL: { count: number; pct: number };
  };
  wheelFormatDistribution: {
    "29/29": { count: number; pct: number };
    MX: { count: number; pct: number };
  };
}

export default function BuildsClient() {
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [regionFilter, setRegionFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");
  const [wheelFilter, setWheelFilter] = useState("ALL");
  const [finishFilter, setFinishFilter] = useState("ALL");
  const [attachedFilter, setAttachedFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Inspect Modal
  const [selectedBuild, setSelectedBuild] = useState<SavedBuild | null>(null);

  const fetchBuilds = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (regionFilter !== "ALL") params.append("region", regionFilter);
      if (sizeFilter !== "ALL") params.append("frameSize", sizeFilter);
      if (wheelFilter !== "ALL") params.append("wheelFormat", wheelFilter);
      if (finishFilter !== "ALL") params.append("finish", finishFilter);
      if (attachedFilter !== "ALL") params.append("attached", attachedFilter);
      if (searchQuery) params.append("search", searchQuery);

      const res = await fetch(`/api/studio/builds?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBuilds(data.builds || []);
        setAnalytics(data.analytics || null);
      }
    } catch (err) {
      console.error("Failed to fetch studio builds:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, [regionFilter, sizeFilter, wheelFilter, finishFilter, attachedFilter, searchQuery]);

  // Export as CSV
  const handleExportCSV = () => {
    if (builds.length === 0) return;
    const headers = [
      "BUILD_REF",
      "REGION",
      "FRAME_SIZE",
      "WHEEL_FORMAT",
      "FINISH",
      "EMAIL",
      "REGISTRATION_REF",
      "CREATED_AT",
    ];

    const rows = builds.map((b) => [
      b.build_reference,
      b.region,
      b.frame_size,
      b.wheel_format,
      b.finish,
      b.email || "ANONYMOUS",
      b.registration_reference || "UNATTACHED",
      b.created_at,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `alkota_saved_builds_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export as JSON
  const handleExportJSON = () => {
    if (builds.length === 0) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ exportDate: new Date().toISOString(), totalCount: builds.length, builds }, null, 2)
    )}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `alkota_saved_builds_export_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-sans text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <TechnicalAnnotation label="STUDIO CMS" value="COMMERCIAL DEMAND ANALYTICS" variant="signal" />
          <h1 className="font-display font-medium text-4xl sm:text-5xl uppercase tracking-tight text-white">
            SAVED BUILDS & <span className="text-[#1a73e8]">DEMAND DATA</span>
          </h1>
          <p className="font-mono text-xs text-[#647789] uppercase tracking-wider">
            CUSTOMER CONFIGURATIONS • FINISH & SIZE DEMAND DISTRIBUTION • REGISTRATION INTAKE
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 bg-[#1a73e8] text-white font-mono text-xs font-bold uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>EXPORT JSON</span>
          </button>
        </div>
      </div>

      {/* Section 1: Aggregate Commercial Demand View */}
      {analytics && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#1a73e8] uppercase font-bold tracking-widest flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>AGGREGATE DEMAND ANALYTICS (PRE-PRODUCTION FORECASTING)</span>
            </span>
            <span className="font-mono text-[10px] text-[#647789]">
              SAMPLE SIZE: {analytics.totalBuilds} SAVED BUILDS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Finish Distribution */}
            <div className="p-5 bg-[#131313] border border-white/10 space-y-3 font-mono">
              <span className="text-[#647789] text-[10px] uppercase font-bold block">FINISH PREFERENCE</span>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-bold">GLACIER WHITE</span>
                    <span className="text-[#1a73e8] font-bold">{analytics.finishDistribution.GLACIER.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/60 border border-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#1a73e8] transition-all"
                      style={{ width: `${analytics.finishDistribution.GLACIER.pct}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-bold">NAKED CARBON</span>
                    <span className="text-emerald-400 font-bold">{analytics.finishDistribution.CARBON.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/60 border border-white/10 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all"
                      style={{ width: `${analytics.finishDistribution.CARBON.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Size Distribution */}
            <div className="p-5 bg-[#131313] border border-white/10 space-y-3 font-mono">
              <span className="text-[#647789] text-[10px] uppercase font-bold block">FRAME SIZE BREAKDOWN</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                {(["S", "M", "L", "XL"] as const).map((sz) => (
                  <div key={sz} className="p-2 bg-black/50 border border-white/10 space-y-1">
                    <span className="text-[10px] text-[#647789] uppercase block">{sz}</span>
                    <span className="text-sm font-bold text-white block">
                      {analytics.sizeDistribution[sz].pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wheel Format Distribution */}
            <div className="p-5 bg-[#131313] border border-white/10 space-y-3 font-mono">
              <span className="text-[#647789] text-[10px] uppercase font-bold block">WHEEL FORMAT DEMAND</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-bold">29 / 29 PRIMARY</span>
                  <span className="text-white font-bold">{analytics.wheelFormatDistribution["29/29"].pct}%</span>
                </div>
                <div className="flex justify-between text-xs pt-1">
                  <span className="text-[#647789]">MX (29 / 27.5)</span>
                  <span className="text-[#1a73e8] font-bold">{analytics.wheelFormatDistribution.MX.pct}%</span>
                </div>
              </div>
            </div>

            {/* Registration Attachment Rate */}
            <div className="p-5 bg-[#131313] border border-white/10 space-y-2 font-mono">
              <span className="text-[#647789] text-[10px] uppercase font-bold block">REGISTRATION ATTACHMENT</span>
              <div className="text-3xl font-bold text-[#1a73e8]">
                {analytics.attachmentRatePct}%
              </div>
              <p className="text-[10px] text-[#647789]">
                {analytics.attachedToRegistrations} of {analytics.totalBuilds} builds attached to customer pre-order registrations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Filters & Search */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
        <div className="relative col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#647789]" />
          <input
            type="text"
            placeholder="Search Build Ref, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131313] border border-white/15 pl-9 pr-4 py-2 text-white placeholder-[#647789] focus:border-[#1a73e8] focus:outline-none"
          />
        </div>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="bg-[#131313] border border-white/15 px-3 py-2 text-white focus:outline-none"
        >
          <option value="ALL">ALL REGIONS</option>
          <option value="UK">UK</option>
          <option value="US">US</option>
        </select>

        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="bg-[#131313] border border-white/15 px-3 py-2 text-white focus:outline-none"
        >
          <option value="ALL">ALL SIZES</option>
          <option value="S">SIZE S</option>
          <option value="M">SIZE M</option>
          <option value="L">SIZE L</option>
          <option value="XL">SIZE XL</option>
        </select>

        <select
          value={wheelFilter}
          onChange={(e) => setWheelFilter(e.target.value)}
          className="bg-[#131313] border border-white/15 px-3 py-2 text-white focus:outline-none"
        >
          <option value="ALL">ALL WHEEL FORMATS</option>
          <option value="29/29">29 / 29 PRIMARY</option>
          <option value="MX">MX (29 / 27.5)</option>
        </select>

        <select
          value={attachedFilter}
          onChange={(e) => setAttachedFilter(e.target.value)}
          className="bg-[#131313] border border-white/15 px-3 py-2 text-white focus:outline-none"
        >
          <option value="ALL">ALL INTAKE STATUS</option>
          <option value="true">REGISTERED ATTACHED</option>
          <option value="false">UNATTACHED GUEST</option>
        </select>
      </div>

      {/* Section 3: Saved Builds Table */}
      <div className="bg-[#131313] border border-white/10 shadow-2xl overflow-x-auto font-mono text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-[#647789] bg-[#0a0a0a]">
              <th className="px-4 py-3">BUILD REFERENCE</th>
              <th className="px-4 py-3">CUSTOMER / EMAIL</th>
              <th className="px-4 py-3">REGION</th>
              <th className="px-4 py-3">SIZE</th>
              <th className="px-4 py-3">WHEELS</th>
              <th className="px-4 py-3">FINISH</th>
              <th className="px-4 py-3">REGISTRATION</th>
              <th className="px-4 py-3">CREATED</th>
              <th className="px-4 py-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {builds.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-[#647789]">
                  NO SAVED BUILDS MATCHING CURRENT FILTER CRITERIA
                </td>
              </tr>
            ) : (
              builds.map((build) => (
                <tr key={build.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-[#1a73e8] font-bold">
                    {build.build_reference}
                  </td>
                  <td className="px-4 py-4 text-white">
                    {build.email || <span className="text-[#647789] italic">GUEST SESSION</span>}
                  </td>
                  <td className="px-4 py-4 uppercase text-[#647789] font-bold">{build.region}</td>
                  <td className="px-4 py-4 text-white font-bold">{build.frame_size}</td>
                  <td className="px-4 py-4 text-[#647789]">{build.wheel_format}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                        build.finish === "GLACIER"
                          ? "border-blue-400/40 text-blue-300 bg-blue-950/40"
                          : "border-[#647789]/40 text-white bg-black/60"
                      }`}
                    >
                      {build.finish === "GLACIER" ? "GLACIER WHITE" : "NAKED CARBON"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {build.registration_reference ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{build.registration_reference}</span>
                      </span>
                    ) : (
                      <span className="text-[#647789] text-[10px] uppercase">UNATTACHED</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-[#647789] text-[10px]">
                    {new Date(build.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => setSelectedBuild(build)}
                      className="px-3 py-1 bg-white/10 text-white font-bold hover:bg-[#1a73e8] transition-colors text-[10px] uppercase"
                    >
                      INSPECT
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* INSPECT BUILD MODAL */}
      {selectedBuild && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#131313] border border-white/15 max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[#1a73e8] text-[10px] uppercase font-bold">IMMUTABLE BUILD SNAPSHOT</span>
                <h3 className="font-display font-bold text-2xl uppercase text-white">
                  {selectedBuild.build_reference}
                </h3>
              </div>
              <button onClick={() => setSelectedBuild(null)} className="text-[#647789] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[#647789] text-[10px] uppercase block">FRAME SIZE</span>
                <span className="text-white font-bold text-sm uppercase">SIZE {selectedBuild.frame_size}</span>
              </div>

              <div>
                <span className="text-[#647789] text-[10px] uppercase block">WHEEL FORMAT</span>
                <span className="text-white font-bold text-sm uppercase">{selectedBuild.wheel_format}</span>
              </div>

              <div>
                <span className="text-[#647789] text-[10px] uppercase block">FINISH</span>
                <span className="text-white font-bold text-sm uppercase">{selectedBuild.finish}</span>
              </div>

              <div>
                <span className="text-[#647789] text-[10px] uppercase block">REGISTRATION ATTACHMENT</span>
                <span className="text-emerald-400 font-bold text-sm uppercase">
                  {selectedBuild.registration_reference || "NONE (GUEST)"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[#1a73e8] text-[10px] uppercase font-bold block">
                STATIC COMPONENT SELECTIONS
              </span>
              <div className="bg-black/60 border border-white/10 p-4 font-mono text-[11px] text-emerald-300 overflow-x-auto space-y-1">
                {Object.entries(selectedBuild.selections || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-white/5 py-1">
                    <span className="text-[#647789] uppercase">{key}:</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedBuild.fit_inputs && Object.keys(selectedBuild.fit_inputs).length > 0 && (
              <div className="space-y-2">
                <span className="text-[#1a73e8] text-[10px] uppercase font-bold block">
                  RIDER FIT INPUT SNAPSHOT
                </span>
                <div className="bg-black/60 border border-white/10 p-4 font-mono text-[11px] text-white">
                  {JSON.stringify(selectedBuild.fit_inputs, null, 2)}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setSelectedBuild(null)}
                className="px-6 py-2.5 bg-white/10 text-white font-bold uppercase hover:bg-white hover:text-black"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
