"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Type,
  RefreshCw,
  ChevronDown,
  X,
  Search,
  AlertTriangle,
} from "lucide-react";
import { CMS_REGISTRY, PageDefinition, SlotDefinition } from "@/lib/cms/registry";

interface SlotRow {
  page_key: string;
  slot_key: string;
  slot_type: string;
  media_id: string | null;
  value_text: string | null;
  value_json: unknown;
  locale: string;
  media_assets: {
    id: string;
    filename: string;
    alt_text: string | null;
    width: number | null;
    height: number | null;
    signedUrl?: string;
  } | null;
}

interface MediaAsset {
  id: string;
  filename: string;
  alt_text: string | null;
  signedUrl?: string;
}

// ── Media Picker Modal ────────────────────────────────────────────────────────
function MediaPickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (asset: MediaAsset) => void;
  onClose: () => void;
}) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/media/list?pageSize=100");
        const data = await res.json();
        setAssets(data.assets || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = assets.filter(
    (a) =>
      !search ||
      a.filename.toLowerCase().includes(search.toLowerCase()) ||
      (a.alt_text || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-alkota-black border border-white/10 w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-xs font-bold uppercase tracking-widest text-white">SELECT IMAGE</span>
          <button onClick={onClose} className="text-alkota-slate hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-alkota-slate pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets…"
              className="w-full bg-alkota-carbon border border-white/10 text-white text-xs pl-8 pr-3 py-2 focus:outline-none focus:border-alkota-signal placeholder-alkota-slate/40 font-mono"
              autoFocus
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-alkota-slate">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-xs">Loading…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-alkota-slate">
              <ImageIcon className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-xs">No assets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filtered.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => onSelect(asset)}
                  className="group relative aspect-square bg-alkota-carbon border border-white/10 hover:border-alkota-signal overflow-hidden transition-all"
                >
                  {asset.signedUrl ? (
                    <Image
                      src={asset.signedUrl}
                      alt={asset.alt_text || asset.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 33vw, 25vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-5 h-5 text-alkota-slate/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-alkota-signal/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[9px] text-white truncate">{asset.filename}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Single slot row ───────────────────────────────────────────────────────────
function SlotRow({
  pageDef,
  slotDef,
  slotRow,
  onSaved,
}: {
  pageDef: PageDefinition;
  slotDef: SlotDefinition;
  slotRow: SlotRow | null;
  onSaved: (row: SlotRow) => void;
}) {
  const [textValue, setTextValue] = useState(slotRow?.value_text || "");
  const [currentMedia, setCurrentMedia] = useState(slotRow?.media_assets || null);
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFilled = slotDef.type === "image"
    ? !!currentMedia
    : !!textValue.trim();

  const handleSave = async (mediaId?: string, mediaAsset?: MediaAsset) => {
    setSaving(true);
    setError(null);
    try {
      const body: Record<string, unknown> = {
        slot_key: slotDef.slotKey,
        locale: "en-GB",
      };
      if (slotDef.type === "image") {
        body.media_id = mediaId || slotRow?.media_id || null;
      } else {
        body.value_text = textValue;
      }

      const res = await fetch(`/api/admin/content/${pageDef.pageKey}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      if (mediaAsset) setCurrentMedia(mediaAsset as SlotRow["media_assets"]);
      onSaved(data.slot);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
        {/* Status indicator */}
        <div className="mt-0.5 flex-shrink-0">
          {isFilled ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : slotDef.required ? (
            <AlertCircle className="w-4 h-4 text-amber-400" />
          ) : (
            <div className="w-4 h-4 border border-white/20 rounded-full" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {slotDef.type === "image" ? (
              <ImageIcon className="w-3 h-3 text-alkota-slate" />
            ) : (
              <Type className="w-3 h-3 text-alkota-slate" />
            )}
            <span className="text-xs font-bold text-white">{slotDef.label}</span>
            {slotDef.required && (
              <span className="text-[9px] text-alkota-signal font-bold">REQUIRED</span>
            )}
          </div>
          <p className="text-[10px] text-alkota-slate mb-3">{slotDef.description}</p>

          {slotDef.type === "image" ? (
            <div className="flex items-center gap-3">
              {/* Thumbnail */}
              <div className="relative w-16 h-12 bg-alkota-carbon border border-white/10 overflow-hidden flex-shrink-0">
                {currentMedia?.signedUrl ? (
                  <Image
                    src={currentMedia.signedUrl}
                    alt={currentMedia.alt_text || currentMedia.filename}
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-4 h-4 text-alkota-slate/30" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                {currentMedia ? (
                  <p className="text-[10px] text-alkota-slate truncate font-mono">{currentMedia.filename}</p>
                ) : (
                  <p className="text-[10px] text-alkota-slate/50 italic">No image selected</p>
                )}
                <button
                  onClick={() => setShowPicker(true)}
                  className="mt-1.5 px-3 py-1 bg-white/5 hover:bg-alkota-signal/10 border border-white/10 hover:border-alkota-signal text-[10px] text-alkota-slate hover:text-alkota-signal uppercase tracking-wider transition-all"
                >
                  {currentMedia ? "CHANGE IMAGE" : "SELECT IMAGE"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                rows={2}
                placeholder={slotDef.fallbackText || "Enter text…"}
                className="w-full bg-alkota-carbon border border-white/10 text-white text-xs px-3 py-2 focus:outline-none focus:border-alkota-signal placeholder-alkota-slate/40 resize-none font-mono"
              />
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-alkota-signal text-alkota-black text-[10px] font-bold uppercase tracking-wider hover:bg-alkota-signal/90 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : saved ? (
                  <><CheckCircle2 className="w-3 h-3" />SAVED</>
                ) : (
                  "SAVE"
                )}
              </button>
            </div>
          )}

          {error && (
            <p className="mt-2 text-[10px] text-red-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              {error}
            </p>
          )}
          {saved && slotDef.type === "image" && (
            <p className="mt-2 text-[10px] text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Saved
            </p>
          )}
        </div>
      </div>

      {/* Media picker modal */}
      {showPicker && (
        <MediaPickerModal
          onSelect={(asset) => {
            setShowPicker(false);
            handleSave(asset.id, asset);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}

// ── Page accordion ────────────────────────────────────────────────────────────
function PageAccordion({
  pageDef,
  slots,
  onSlotSaved,
}: {
  pageDef: PageDefinition;
  slots: SlotRow[];
  onSlotSaved: (slot: SlotRow) => void;
}) {
  const [open, setOpen] = useState(false);

  const filledCount = pageDef.slots.filter((slotDef) => {
    const row = slots.find((s) => s.slot_key === slotDef.slotKey);
    if (slotDef.type === "image") return !!row?.media_assets;
    return !!(row?.value_text?.trim());
  }).length;

  const totalRequired = pageDef.slots.filter((s) => s.required).length;
  const filledRequired = pageDef.slots.filter((s) => {
    if (!s.required) return false;
    const row = slots.find((r) => r.slot_key === s.slotKey);
    if (s.type === "image") return !!row?.media_assets;
    return !!(row?.value_text?.trim());
  }).length;

  const allGood = filledRequired === totalRequired;

  return (
    <div className="border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors ${open ? "bg-white/5" : ""}`}
      >
        <div className="flex items-center gap-3">
          {allGood ? (
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          )}
          <div className="text-left">
            <div className="text-xs font-bold text-white">{pageDef.label}</div>
            <div className="text-[10px] text-alkota-slate font-mono">{pageDef.pageKey}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 bg-white/10 overflow-hidden">
              <div
                className={`h-full transition-all ${allGood ? "bg-green-400" : "bg-amber-400"}`}
                style={{ width: `${(filledCount / pageDef.slots.length) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-alkota-slate">{filledCount}/{pageDef.slots.length}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-alkota-slate transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-white/10 px-4 divide-y-0">
          {pageDef.slots.map((slotDef) => {
            const row = slots.find((s) => s.slot_key === slotDef.slotKey) || null;
            return (
              <SlotRow
                key={slotDef.slotKey}
                pageDef={pageDef}
                slotDef={slotDef}
                slotRow={row}
                onSaved={onSlotSaved}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
export default function SlotEditor() {
  const [slotsByPage, setSlotsByPage] = useState<Record<string, SlotRow[]>>({});
  const [loading, setLoading] = useState(true);

  const fetchAllSlots = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        CMS_REGISTRY.map(async (page) => {
          const res = await fetch(`/api/admin/content/${page.pageKey}?locale=en-GB`);
          const data = await res.json();
          return { pageKey: page.pageKey, slots: data.slots || [] };
        })
      );
      const byPage: Record<string, SlotRow[]> = {};
      for (const r of results) {
        byPage[r.pageKey] = r.slots;
      }
      setSlotsByPage(byPage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllSlots();
  }, [fetchAllSlots]);

  // Overall completeness
  let totalRequired = 0;
  let filledRequired = 0;
  for (const pageDef of CMS_REGISTRY) {
    for (const slotDef of pageDef.slots) {
      if (!slotDef.required) continue;
      totalRequired++;
      const row = (slotsByPage[pageDef.pageKey] || []).find(
        (s) => s.slot_key === slotDef.slotKey
      );
      if (slotDef.type === "image" ? !!row?.media_assets : !!(row?.value_text?.trim())) {
        filledRequired++;
      }
    }
  }
  const pct = totalRequired > 0 ? Math.round((filledRequired / totalRequired) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">CONTENT SLOTS</h1>
          <p className="text-xs text-alkota-slate mt-0.5">
            Database-driven images and marketing copy for every page
          </p>
        </div>
        <button
          onClick={fetchAllSlots}
          disabled={loading}
          className="p-2 border border-white/10 hover:border-white/30 text-alkota-slate hover:text-white transition-colors disabled:opacity-50"
          title="Refresh all slots"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Progress summary */}
      <div className="p-4 bg-alkota-black border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            REQUIRED SLOTS COMPLETE
          </span>
          <span
            className={`text-sm font-bold tabular-nums ${
              pct === 100 ? "text-green-400" : pct >= 70 ? "text-amber-400" : "text-red-400"
            }`}
          >
            {filledRequired}/{totalRequired} — {pct}%
          </span>
        </div>
        <div className="h-1.5 bg-white/10">
          <div
            className={`h-full transition-all ${
              pct === 100 ? "bg-green-400" : pct >= 70 ? "bg-amber-400" : "bg-red-400"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct < 100 && (
          <p className="text-[10px] text-amber-400 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {totalRequired - filledRequired} required slot{totalRequired - filledRequired !== 1 ? "s" : ""} unfilled — build will fail until resolved.
          </p>
        )}
      </div>

      {/* Page accordions */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-alkota-slate">
          <Loader2 className="w-6 h-6 animate-spin mr-3" />
          <span className="text-xs uppercase tracking-widest">Loading slots…</span>
        </div>
      ) : (
        <div className="space-y-2">
          {CMS_REGISTRY.map((pageDef) => (
            <PageAccordion
              key={pageDef.pageKey}
              pageDef={pageDef}
              slots={slotsByPage[pageDef.pageKey] || []}
              onSlotSaved={(savedSlot) => {
                setSlotsByPage((prev) => {
                  const pageSlots = prev[pageDef.pageKey] || [];
                  const exists = pageSlots.findIndex((s) => s.slot_key === savedSlot.slot_key);
                  const updated =
                    exists >= 0
                      ? pageSlots.map((s, i) => (i === exists ? savedSlot : s))
                      : [...pageSlots, savedSlot];
                  return { ...prev, [pageDef.pageKey]: updated };
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
