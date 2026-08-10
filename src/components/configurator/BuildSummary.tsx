"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import SpecificationStatus from "@/components/ui/SpecificationStatus";
import { PROJECT01_MEDIA } from "@/content/project01/media";
import { PROJECT01_COMPONENTS } from "@/content/project01/components";
import { getPublicPriceDisplay } from "@/content/project01/commercial";
import { BuildConfig, PROJECT01_PRICING_VISIBLE } from "./BuildStage";
import { createCertificateData, generateCertificateHTML } from "@/lib/certificate/pdfEngine";
import {
  ArrowRight,
  Download,
  Share2,
  Check,
  Edit3,
  ShieldCheck,
  BookmarkPlus,
  Copy,
  FileText,
  RefreshCw,
  Printer,
} from "lucide-react";

interface BuildSummaryProps {
  config: BuildConfig;
  initialBuildRef?: string | null;
  onEditBuild: () => void;
}

export default function BuildSummary({
  config,
  initialBuildRef,
  onEditBuild,
}: BuildSummaryProps) {
  const [savedBuildRef, setSavedBuildRef] = useState<string | null>(initialBuildRef || null);
  const [savedFitRef, setSavedFitRef] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCertPreview, setShowCertPreview] = useState(false);
  const [isSavingBuild, setIsSavingBuild] = useState(false);
  const [buildPersisted, setBuildPersisted] = useState(Boolean(initialBuildRef));
  const [buildSaveError, setBuildSaveError] = useState<string | null>(null);

  const heroImage = PROJECT01_MEDIA.getFinishHero(config.finish);

  const fork = PROJECT01_COMPONENTS.find((c) => c.id === config.forkId);
  const shock = PROJECT01_COMPONENTS.find((c) => c.id === config.shockId);
  const frontBrake = PROJECT01_COMPONENTS.find((c) => c.id === config.frontBrakeId);
  const rearBrake = PROJECT01_COMPONENTS.find((c) => c.id === config.rearBrakeId);
  const drivetrain = PROJECT01_COMPONENTS.find((c) => c.id === config.drivetrainId);
  const wheels = PROJECT01_COMPONENTS.find((c) => c.id === config.wheelsId);

  const handleGenerateBuildRef = async () => {
    if (savedBuildRef) return; // Already saved — idempotent
    setIsSavingBuild(true);
    setBuildSaveError(null);

    try {
      const selections: Record<string, string> = {};
      if (config.forkId) selections["fork"] = config.forkId;
      if (config.shockId) selections["rear-shock"] = config.shockId;
      if (config.frontBrakeId) selections["brakes-front"] = config.frontBrakeId;
      if (config.rearBrakeId) selections["brakes-rear"] = config.rearBrakeId;
      if (config.drivetrainId) selections["drivetrain"] = config.drivetrainId;
      if (config.wheelsId) selections["wheels"] = config.wheelsId;

      const res = await fetch("/api/builds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frameSize: config.size,
          wheelFormat: config.wheelFormat,
          finish: config.finish,
          selections,
          region: "uk",
        }),
      });

      const data = await res.json();

      if (data.buildReference) {
        setSavedBuildRef(data.buildReference);
        setBuildPersisted(data.persisted ?? false);
      } else {
        throw new Error(data.error || "No build reference returned from server.");
      }
    } catch (err: any) {
      // Graceful fallback: generate a local reference so the flow isn't blocked
      const hex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, "0");
      setSavedBuildRef(`AKT-${config.size}-LOCAL-${hex}`);
      setBuildSaveError(`Build saved locally only — database unavailable. Share link will not resolve. Error: ${err.message}`);
    } finally {
      setIsSavingBuild(false);
    }

    if (!savedFitRef) {
      const fitHex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, "0");
      setSavedFitRef(`P01-FIT-${fitHex}`);
    }
  };

  const currentBuildRef = savedBuildRef || "P01-CFG-A8F2E4";
  const currentFitRef = savedFitRef || "P01-FIT-7C91D3";

  const certData = createCertificateData(
    currentBuildRef,
    currentFitRef,
    config.finish,
    config.size
  );

  const handleCopyShareLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/configure?build=${currentBuildRef}` : "";
    if (url) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleDownloadCertificate = () => {
    const win = window.open(`/api/certificate/generate?buildRef=${currentBuildRef}&fitRef=${currentFitRef}&finish=${config.finish}&size=${config.size}`, "_blank");
    if (win) win.focus();
  };

  const orderParams = new URLSearchParams({
    buildRef: currentBuildRef,
    fitRef: currentFitRef,
    finish: config.finish,
    size: config.size,
  }).toString();

  return (
    <div className="w-full bg-alkota-carbon text-alkota-white min-h-screen p-4 sm:p-6 lg:p-12 space-y-8 tech-grid-dark">
      {/* Header */}
      <div className="max-w-6xl mx-auto border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <TechnicalAnnotation label="BUILD SUMMARY & CERTIFICATE" value="PROJECT 01" variant="signal" />
          <h1 className="font-display font-medium text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95]">
            YOUR <span className="text-alkota-signal">PROJECT 01.</span>
          </h1>
          <p className="font-sans text-sm text-alkota-snow/80 max-w-xl font-light">
            Review your specified development build. Generate your Development Build Certificate or register directly for production allocation.
          </p>
        </div>

        <div className="font-mono text-xs text-alkota-slate uppercase text-right space-y-1">
          <div className="text-white font-bold">BUILD REF: {currentBuildRef}</div>
          <div className="text-alkota-signal">FIT REF: {currentFitRef}</div>
          <SpecificationStatus status="DEVELOPMENT_BASELINE" label="CREATED AGAINST R00" />
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Master Image & Reference Box */}
        <div className="lg:col-span-5 bg-alkota-black border border-white/10 p-6 space-y-6 shadow-2xl">
          <div className="relative w-full h-[280px] sm:h-[340px] bg-black/60 border border-white/10 flex items-center justify-center p-4">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain object-center"
            />
          </div>

          <div className="p-4 bg-alkota-carbon border border-white/10 space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-alkota-slate text-[10px] uppercase font-bold">BUILD REFERENCE:</span>
              <span className="font-bold text-white tracking-widest">{currentBuildRef}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-alkota-slate text-[10px] uppercase font-bold">FIT REFERENCE:</span>
              <span className="font-bold text-alkota-signal tracking-widest">{currentFitRef}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-alkota-slate text-[10px] uppercase font-bold">REVISION LOGGED:</span>
              <span className="font-bold text-white">PROJECT 01 R00</span>
            </div>
          </div>

          {/* Certificate & Action buttons */}
          <div className="space-y-3 font-mono text-xs">
            {/* Save Build Reference */}
            {!savedBuildRef ? (
              <button
                onClick={handleGenerateBuildRef}
                disabled={isSavingBuild}
                className="w-full py-3 bg-white/10 border border-white/20 text-white font-bold uppercase hover:border-alkota-signal hover:text-alkota-signal transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>{isSavingBuild ? "SAVING BUILD…" : "SAVE BUILD REFERENCE"}</span>
              </button>
            ) : (
              <div className={`w-full py-3 border flex items-center justify-center gap-2 ${
                buildPersisted
                  ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
                  : "border-amber-500/40 bg-amber-950/40 text-amber-300"
              }`}>
                <Check className="w-4 h-4 flex-shrink-0" />
                <span className="uppercase font-bold tracking-wider">
                  {buildPersisted ? `SAVED — ${savedBuildRef}` : `LOCAL ONLY — ${savedBuildRef}`}
                </span>
              </div>
            )}

            {buildSaveError && (
              <div className="p-3 bg-amber-950/60 border border-amber-500/30 text-amber-200 text-[10px] leading-relaxed">
                {buildSaveError}
              </div>
            )}

            <button
              onClick={handleDownloadCertificate}
              className="w-full py-3.5 bg-alkota-signal text-alkota-black font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD DEVELOPMENT BUILD CERTIFICATE (PDF)</span>
            </button>

            <button
              onClick={handleCopyShareLink}
              disabled={!savedBuildRef}
              title={!savedBuildRef ? "Save your build reference first to generate a shareable link" : undefined}
              className="w-full py-3 bg-white/10 border border-white/20 text-white font-bold uppercase hover:border-white transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4 text-alkota-signal" />
              <span>{copiedLink ? "SHAREABLE LINK COPIED" : "COPY SHAREABLE BUILD LINK"}</span>
            </button>

            <button
              onClick={onEditBuild}
              className="w-full py-3 border border-white/15 text-alkota-slate hover:text-white uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>EDIT BUILD SPECIFICATION</span>
            </button>
          </div>
        </div>

        {/* Right: Detailed Specification Table */}
        <div className="lg:col-span-7 bg-alkota-black border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <span className="font-mono text-[10px] text-alkota-signal uppercase tracking-widest font-bold">
              SUMMARY SPECIFICATION TABLE
            </span>
            <h3 className="font-display font-medium text-2xl uppercase text-white">
              CONTROLLED SPECIFICATION
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">LAUNCH FINISH:</span>
              <span className="text-alkota-signal font-bold uppercase">
                {config.finish === "GLACIER" ? "GLACIER WHITE (ARCHITECTURAL)" : "NAKED CARBON (STRUCTURAL UD)"}
              </span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">DEVELOPMENT SIZE:</span>
              <span className="text-white font-bold uppercase">
                SIZE {config.size} ({config.size === "L" ? "R00 LARGE MASTER BASELINE" : "DEVELOPMENT INDICATION"})
              </span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">WHEEL FORMAT:</span>
              <span className="text-white font-bold uppercase">{config.wheelFormat} PRIMARY</span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">FRONT SUSPENSION:</span>
              <span className="text-white font-bold uppercase">{fork?.manufacturer} {fork?.product} (160 MM)</span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">REAR SUSPENSION:</span>
              <span className="text-white font-bold uppercase">{shock?.manufacturer} {shock?.product} (150 MM TARGET)</span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">ASYMMETRIC BRAKES:</span>
              <span className="text-white font-bold uppercase">{frontBrake?.product} FRONT / {rearBrake?.product} REAR</span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">TRANSMISSION:</span>
              <span className="text-white font-bold uppercase">{drivetrain?.manufacturer} {drivetrain?.product}</span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">WHEELS:</span>
              <span className="text-white font-bold uppercase">{wheels?.manufacturer} {wheels?.product}</span>
            </div>

            <div className="p-3 bg-alkota-carbon border border-white/10 flex justify-between items-center">
              <span className="text-alkota-slate uppercase">PRICING STATUS:</span>
              <span className="text-white font-bold uppercase">
                {getPublicPriceDisplay().text}
              </span>
            </div>
          </div>

          {/* Revision Preservation Notice */}
          <div className="p-4 bg-alkota-carbon border border-white/10 space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-alkota-slate text-[10px] uppercase font-bold">REVISION LOGGED:</span>
              <span className="text-alkota-signal font-bold">PROJECT 01 R00</span>
            </div>
            <p className="text-[11px] text-alkota-slate font-light leading-relaxed">
              This build specification is preserved against revision R00. Future engineering baseline changes will not mutate this specification without explicit review.
            </p>
          </div>

          {/* Register CTA */}
          <div className="pt-2 space-y-3">
            <Link
              href={`/order?${orderParams}`}
              className="w-full py-4 bg-alkota-signal text-alkota-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-xl text-center"
            >
              <span>REGISTER THIS BUILD IN PROJECT 01</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
