"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Edit3,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Image as ImageIcon,
  Info,
  Crosshair,
  ChevronRight,
  Search,
} from "lucide-react";

interface MediaAsset {
  id: string;
  storage_path: string;
  filename: string;
  mime_type: string;
  bytes: number;
  width: number | null;
  height: number | null;
  blur_data_url: string | null;
  alt_text: string | null;
  is_decorative: boolean;
  caption: string | null;
  credit: string | null;
  licence: string | null;
  focal_x: number;
  focal_y: number;
  signedUrl?: string;
  usedIn?: string[];
}

interface UploadStatus {
  id: string;
  filename: string;
  progress: number;
  status: "uploading" | "done" | "error";
  error?: string;
}

function FocalPointPicker({
  focalX,
  focalY,
  signedUrl,
  onChange,
}: {
  focalX: number;
  focalY: number;
  signedUrl: string | null;
  onChange: (x: number, y: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onChange(x, y);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-alkota-carbon border border-white/10 cursor-crosshair overflow-hidden"
      onClick={handleClick}
      title="Click to set focal point"
    >
      {signedUrl && (
        <Image
          src={signedUrl}
          alt="Focal point picker"
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
      )}
      {/* Crosshair */}
      <div
        className="absolute w-4 h-4 pointer-events-none"
        style={{
          left: `${focalX * 100}%`,
          top: `${focalY * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Crosshair className="w-full h-full text-alkota-signal drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]" />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "33.33% 33.33%",
        }}
      />
    </div>
  );
}

function AssetDrawer({
  asset,
  onClose,
  onUpdate,
  onDelete,
}: {
  asset: MediaAsset;
  onClose: () => void;
  onUpdate: (updated: MediaAsset) => void;
  onDelete: (id: string) => void;
}) {
  const [altText, setAltText] = useState(asset.alt_text || "");
  const [isDecorative, setIsDecorative] = useState(asset.is_decorative);
  const [caption, setCaption] = useState(asset.caption || "");
  const [credit, setCredit] = useState(asset.credit || "");
  const [licence, setLicence] = useState(asset.licence || "owned");
  const [focalX, setFocalX] = useState(asset.focal_x);
  const [focalY, setFocalY] = useState(asset.focal_y);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/media/${asset.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alt_text: altText,
          is_decorative: isDecorative,
          caption,
          credit,
          licence,
          focal_x: focalX,
          focal_y: focalY,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      onUpdate({ ...asset, ...data.asset });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${asset.filename}"? This cannot be undone.`)) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/media/${asset.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      onDelete(asset.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-md bg-alkota-black border-l border-white/10 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-alkota-black border-b border-white/10 px-4 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-alkota-signal" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">EDIT ASSET</span>
          </div>
          <button onClick={onClose} className="p-1 hover:text-white text-alkota-slate transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-5 flex-1">
          {/* Preview */}
          <div className="relative aspect-video bg-alkota-carbon border border-white/10 overflow-hidden">
            {asset.signedUrl && (
              <Image
                src={asset.signedUrl}
                alt={asset.alt_text || asset.filename}
                fill
                className="object-cover"
                unoptimized
              />
            )}
            {!asset.signedUrl && (
              <div className="flex items-center justify-center h-full text-alkota-slate">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="text-[10px] text-alkota-slate space-y-1 font-mono">
            <div className="truncate font-bold text-white/80">{asset.filename}</div>
            <div className="flex gap-4">
              <span>{(asset.bytes / 1024).toFixed(0)} KB</span>
              {asset.width && asset.height && <span>{asset.width}×{asset.height}px</span>}
              <span>{asset.mime_type}</span>
            </div>
          </div>

          {/* Focal Point */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-alkota-slate">
              FOCAL POINT
            </label>
            <FocalPointPicker
              focalX={focalX}
              focalY={focalY}
              signedUrl={asset.signedUrl || null}
              onChange={(x, y) => { setFocalX(x); setFocalY(y); }}
            />
            <p className="text-[10px] text-alkota-slate/60">
              Click to set the crop focus point. Used for responsive image cropping.
            </p>
          </div>

          {/* Decorative toggle */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="is_decorative"
              checked={isDecorative}
              onChange={(e) => setIsDecorative(e.target.checked)}
              className="mt-0.5 accent-alkota-signal"
            />
            <div>
              <label htmlFor="is_decorative" className="text-xs font-bold text-white cursor-pointer">
                Decorative image
              </label>
              <p className="text-[10px] text-alkota-slate/70 mt-0.5">
                Pure visual element with no informational value. Skip alt text.
              </p>
            </div>
          </div>

          {/* Alt text */}
          {!isDecorative && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-alkota-slate">
                ALT TEXT <span className="text-alkota-signal">*</span>
              </label>
              <textarea
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                rows={3}
                placeholder="Describe the image for screen readers and SEO…"
                className="w-full bg-alkota-carbon border border-white/10 text-white text-xs px-3 py-2 focus:outline-none focus:border-alkota-signal placeholder-alkota-slate/40 resize-none font-mono"
              />
              {altText.length > 0 && altText.length < 5 && (
                <p className="text-[10px] text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> At least 5 characters required
                </p>
              )}
            </div>
          )}

          {/* Caption */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-alkota-slate">
              CAPTION
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Optional display caption…"
              className="w-full bg-alkota-carbon border border-white/10 text-white text-xs px-3 py-2 focus:outline-none focus:border-alkota-signal placeholder-alkota-slate/40 font-mono"
            />
          </div>

          {/* Credit */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-alkota-slate">
              CREDIT / RIGHTS HOLDER
            </label>
            <input
              type="text"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              placeholder="Photographer or agency name…"
              className="w-full bg-alkota-carbon border border-white/10 text-white text-xs px-3 py-2 focus:outline-none focus:border-alkota-signal placeholder-alkota-slate/40 font-mono"
            />
          </div>

          {/* Licence */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-alkota-slate">
              LICENCE
            </label>
            <select
              value={licence}
              onChange={(e) => setLicence(e.target.value)}
              className="w-full bg-alkota-carbon border border-white/10 text-white text-xs px-3 py-2 focus:outline-none focus:border-alkota-signal font-mono"
            >
              <option value="owned">Owned</option>
              <option value="licensed">Licensed</option>
              <option value="cc-by">CC BY</option>
              <option value="unknown">Unknown ⚠</option>
            </select>
            {licence === "unknown" && (
              <p className="text-[10px] text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Unknown licence will block publish
              </p>
            )}
          </div>

          {/* Used on */}
          {asset.usedIn && asset.usedIn.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-alkota-slate flex items-center gap-1.5">
                <Info className="w-3 h-3" /> USED ON
              </label>
              <div className="space-y-1">
                {asset.usedIn.map((slot) => (
                  <div key={slot} className="flex items-center gap-2 px-2 py-1 bg-white/5 text-[11px] text-alkota-slate">
                    <ChevronRight className="w-3 h-3 text-alkota-signal" />
                    <span className="font-mono">{slot}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="px-3 py-2 bg-red-950/50 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-alkota-black border-t border-white/10 p-4 flex gap-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-3 py-2 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-red-300 text-xs uppercase tracking-wider transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            DELETE
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-3 py-2 bg-alkota-signal text-alkota-black text-xs font-bold uppercase tracking-wider hover:bg-alkota-signal/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saved ? (
              <><CheckCircle2 className="w-3.5 h-3.5" /> SAVED</>
            ) : (
              "SAVE CHANGES"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MediaGrid() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadStatus[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media/list");
      const data = await res.json();
      if (res.ok) {
        setAssets(data.assets || []);
      }
    } catch {
      // Silent — grid just stays empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const uploadFiles = async (files: File[]) => {
    for (const file of files) {
      const uploadId = crypto.randomUUID();
      setUploads((prev) => [
        { id: uploadId, filename: file.name, progress: 0, status: "uploading" },
        ...prev,
      ]);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/media/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          setUploads((prev) =>
            prev.map((u) =>
              u.id === uploadId
                ? { ...u, status: "error", error: data.error || "Upload failed", progress: 0 }
                : u
            )
          );
        } else {
          setUploads((prev) =>
            prev.map((u) =>
              u.id === uploadId ? { ...u, status: "done", progress: 100 } : u
            )
          );
          // Prepend new asset to grid
          setAssets((prev) => [data.asset, ...prev]);
          // Auto-remove success notification after 3s
          setTimeout(() => {
            setUploads((prev) => prev.filter((u) => u.id !== uploadId));
          }, 3000);
        }
      } catch {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId
              ? { ...u, status: "error", error: "Network error", progress: 0 }
              : u
          )
        );
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) uploadFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) uploadFiles(files);
    e.target.value = "";
  };

  const filtered = assets.filter(
    (a) =>
      !search ||
      a.filename.toLowerCase().includes(search.toLowerCase()) ||
      (a.alt_text || "").toLowerCase().includes(search.toLowerCase())
  );

  const missingAlt = assets.filter((a) => !a.is_decorative && !a.alt_text).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">MEDIA LIBRARY</h1>
          <p className="text-xs text-alkota-slate mt-0.5">
            {assets.length} asset{assets.length !== 1 ? "s" : ""}
            {missingAlt > 0 && (
              <span className="ml-3 text-amber-400 flex items-center gap-1 inline-flex">
                <AlertTriangle className="w-3 h-3" />
                {missingAlt} missing alt text
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAssets}
            className="p-2 border border-white/10 hover:border-white/30 text-alkota-slate hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-alkota-signal text-alkota-black text-xs font-bold uppercase tracking-wider hover:bg-alkota-signal/90 transition-colors"
          >
            <Upload className="w-4 h-4" />
            UPLOAD
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alkota-slate pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by filename or alt text…"
          className="w-full bg-alkota-carbon border border-white/10 text-white text-xs pl-9 pr-4 py-2.5 focus:outline-none focus:border-alkota-signal placeholder-alkota-slate/40 font-mono"
        />
      </div>

      {/* Upload progress */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((u) => (
            <div
              key={u.id}
              className={`flex items-center gap-3 px-3 py-2 border text-xs ${
                u.status === "error"
                  ? "border-red-500/30 bg-red-950/30 text-red-400"
                  : u.status === "done"
                  ? "border-green-500/30 bg-green-950/30 text-green-400"
                  : "border-white/10 bg-alkota-carbon text-alkota-slate"
              }`}
            >
              {u.status === "uploading" && <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />}
              {u.status === "done" && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
              {u.status === "error" && <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />}
              <span className="truncate font-mono flex-1">{u.filename}</span>
              <span className="text-[10px] uppercase">
                {u.status === "uploading" ? "Uploading…" : u.status === "done" ? "Done" : u.error}
              </span>
              {u.status !== "uploading" && (
                <button
                  onClick={() => setUploads((prev) => prev.filter((x) => x.id !== u.id))}
                  className="p-0.5 hover:opacity-70 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed px-6 py-8 text-center transition-colors cursor-pointer ${
          dragging
            ? "border-alkota-signal bg-alkota-signal/5 text-alkota-signal"
            : "border-white/10 text-alkota-slate hover:border-white/30"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-6 h-6 mx-auto mb-2" />
        <p className="text-xs">Drag &amp; drop images here, or click to browse</p>
        <p className="text-[10px] mt-1 text-alkota-slate/60">JPEG · PNG · WebP · AVIF · GIF · SVG · Max 25 MB</p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-alkota-slate">
          <Loader2 className="w-6 h-6 animate-spin mr-3" />
          <span className="text-xs uppercase tracking-widest">Loading assets…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-alkota-slate">
          <ImageIcon className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-xs">{search ? "No assets match your search." : "No assets uploaded yet."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((asset) => {
            const needsAlt = !asset.is_decorative && !asset.alt_text;
            return (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`group relative aspect-square bg-alkota-carbon border overflow-hidden text-left transition-all hover:border-alkota-signal ${
                  needsAlt ? "border-amber-500/40" : "border-white/10"
                }`}
              >
                {asset.signedUrl ? (
                  <Image
                    src={asset.signedUrl}
                    alt={asset.alt_text || asset.filename}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-8 h-8 text-alkota-slate/30" />
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white truncate font-mono">{asset.filename}</p>
                </div>
                {/* Warning badge */}
                {needsAlt && (
                  <div className="absolute top-1.5 right-1.5 bg-amber-500 rounded-full p-0.5">
                    <AlertTriangle className="w-2.5 h-2.5 text-black" />
                  </div>
                )}
                {/* Edit hint */}
                <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-alkota-signal text-alkota-black p-0.5">
                    <Edit3 className="w-2.5 h-2.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Asset detail drawer */}
      {selectedAsset && (
        <AssetDrawer
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onUpdate={(updated) => {
            setAssets((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
            setSelectedAsset(updated);
          }}
          onDelete={(id) => {
            setAssets((prev) => prev.filter((a) => a.id !== id));
            setSelectedAsset(null);
          }}
        />
      )}
    </div>
  );
}
