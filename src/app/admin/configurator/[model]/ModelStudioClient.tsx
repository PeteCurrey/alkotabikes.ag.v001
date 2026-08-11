"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sliders, Layers, DollarSign, Compass, Bookmark, History, Play, AlertOctagon, Check } from "lucide-react";

interface ModelStudioClientProps {
  model: any;
  groups: any[];
  rules: any[];
  presets: any[];
  versions: any[];
}

export default function ModelStudioClient({
  model,
  groups,
  rules,
  presets,
  versions,
}: ModelStudioClientProps) {
  const [activeTab, setActiveTab] = useState<
    "structure" | "rules" | "pricing" | "geometry" | "presets" | "versions"
  >("structure");

  const [publishStatus, setPublishStatus] = useState<"idle" | "publishing" | "success" | "error">("idle");
  const [publishMessage, setPublishMessage] = useState<string>("");

  const handlePublishVersion = async () => {
    setPublishStatus("publishing");
    try {
      const res = await fetch(`/api/admin/configurator/${model.slug}/publish`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setPublishStatus("success");
        setPublishMessage(`Published snapshot v${data.version}`);
      } else {
        setPublishStatus("error");
        setPublishMessage(data.error || "Publish failed validation.");
      }
    } catch (err) {
      setPublishStatus("error");
      setPublishMessage("Failed to publish version.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs text-alkota-gold font-bold uppercase tracking-widest flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            CONFIGURATOR STUDIO — MANAGED PLATFORM
          </div>
          <h1 className="font-mono text-2xl font-bold uppercase mt-1">{model.name}</h1>
          <p className="font-sans text-xs text-[#9ab0c4] mt-1">{model.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/configurator/${model.slug}/simulate`}
            className="flex items-center gap-2 px-4 py-2 border border-white/15 hover:bg-white/5 rounded font-mono font-bold text-xs uppercase text-white transition"
          >
            <Play className="w-4 h-4 text-alkota-gold" />
            SIMULATE
          </Link>

          <button
            onClick={handlePublishVersion}
            disabled={publishStatus === "publishing"}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded font-mono font-bold text-xs uppercase transition disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            {publishStatus === "publishing" ? "PUBLISHING..." : "PUBLISH VERSION"}
          </button>
        </div>
      </div>

      {publishMessage && (
        <div
          className={`p-4 border rounded font-mono text-xs ${
            publishStatus === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {publishMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-1">
        {[
          { id: "structure", label: "Structure & Options", icon: Layers },
          { id: "rules", label: "Compatibility Rules", icon: Sliders },
          { id: "pricing", label: "Pricing Matrix", icon: DollarSign },
          { id: "geometry", label: "Geometry & Fit", icon: Compass },
          { id: "presets", label: "Curated Presets", icon: Bookmark },
          { id: "versions", label: "Version Snapshots", icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-bold uppercase transition border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-alkota-gold text-alkota-gold bg-white/5"
                  : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === "structure" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-mono text-sm font-bold text-white uppercase">OPTION GROUPS ({groups.length})</h3>
            </div>

            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="border border-white/10 bg-alkota-carbon rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="font-mono text-sm font-bold text-white uppercase flex items-center gap-2">
                      <span className="text-alkota-gold">STEP {group.step_position}:</span>
                      <span>{group.label}</span>
                      <span className="text-white/40 text-xs">({group.key})</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 uppercase">
                        {group.group_type}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.options?.map((opt: any) => (
                      <div key={opt.id} className="border border-white/10 bg-black/40 p-3 rounded space-y-1">
                        <div className="font-mono text-xs font-bold text-white flex justify-between">
                          <span>{opt.label}</span>
                          {opt.is_default && <span className="text-alkota-gold text-[10px]">DEFAULT</span>}
                        </div>
                        <div className="font-mono text-[11px] text-white/50">{opt.key}</div>
                        <div className="font-mono text-[10px] text-white/40 pt-1">
                          Weight: {opt.weight_grams ? `${opt.weight_grams}g` : "null"} ({opt.weight_source})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-mono text-sm font-bold text-white uppercase">ACTIVE RULES ({rules.length})</h3>
            </div>

            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule.id} className="border border-white/10 bg-alkota-carbon rounded-xl p-4 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-alkota-gold uppercase">{rule.name}</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/70 uppercase">
                      {rule.rule_type} (Priority {rule.priority})
                    </span>
                  </div>
                  <div className="text-white/80">{rule.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "versions" && (
          <div className="space-y-4">
            <h3 className="font-mono text-sm font-bold text-white uppercase">PUBLISHED VERSION SNAPSHOTS</h3>
            <div className="space-y-3 font-mono text-xs">
              {versions.map((ver) => (
                <div key={ver.id} className="border border-white/10 bg-alkota-carbon p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">VERSION {ver.version}</div>
                    <div className="text-white/50 text-[11px]">
                      Published: {ver.published_at ? new Date(ver.published_at).toLocaleString("en-GB") : "Draft"}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded uppercase text-[10px]">
                    {ver.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
