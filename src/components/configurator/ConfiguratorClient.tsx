"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConfiguratorVersionSnapshot, EngineResult, Violation } from "@/lib/configurator/types";
import { evaluateConfiguration } from "@/lib/configurator/engine";
import CompositeVisualiser from "./CompositeVisualiser";
import { captureLead } from "@/lib/leads/capture";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  AlertTriangle,
  Share2,
  Lock,
  Scale,
  Sparkles,
  Info,
  X,
} from "lucide-react";

interface ConfiguratorClientProps {
  snapshot: ConfiguratorVersionSnapshot;
  restoredSelections?: Record<string, string>;
  restoredToken?: string;
  region?: string;
}

export default function ConfiguratorClient({
  snapshot,
  restoredSelections,
  restoredToken,
  region = "uk",
}: ConfiguratorClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const market = region === "us" ? "US" : "GB";
  const pricingVisible = process.env.NEXT_PUBLIC_PRICING_VISIBLE !== "false";

  // Active step state
  const sortedGroups = [...snapshot.groups]
    .filter((g) => g.is_active)
    .sort((a, b) => a.step_position - b.step_position);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentGroup = sortedGroups[currentStepIndex] || sortedGroups[0];

  // User selections & locks
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    if (restoredSelections && Object.keys(restoredSelections).length > 0) {
      return restoredSelections;
    }
    // Parse URL query params
    const initial: Record<string, string> = {};
    for (const group of sortedGroups) {
      const paramVal = searchParams.get(group.key);
      if (paramVal) initial[group.key] = paramVal;
    }
    return initial;
  });

  const [lockedKeys, setLockedKeys] = useState<string[]>(() => Object.keys(selections));

  // Conflict modal state
  const [conflictViolation, setConflictViolation] = useState<Violation | null>(null);
  const [pendingSelection, setPendingSelection] = useState<{ groupKey: string; optionKey: string } | null>(null);

  // Interest registration modal state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [registerMessage, setRegisterMessage] = useState("");

  // Share link state
  const [shareToken, setShareToken] = useState<string | null>(restoredToken || null);
  const [shareCopied, setShareCopied] = useState(false);

  // Run Rules Engine
  const engineResult: EngineResult = evaluateConfiguration(snapshot, selections, market, lockedKeys);

  // Sync URL search params
  const updateUrlParams = (newSelections: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [gKey, oKey] of Object.entries(newSelections)) {
      params.set(gKey, oKey);
    }
    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  // Handle Option Select
  const handleSelectOption = (groupKey: string, optionKey: string) => {
    const isLocked = lockedKeys.includes(groupKey);

    // Try evaluating candidate selection
    const candidateSelections = { ...selections, [groupKey]: optionKey };
    const candidateLocked = isLocked ? lockedKeys : [...lockedKeys, groupKey];
    const candResult = evaluateConfiguration(snapshot, candidateSelections, market, candidateLocked);

    // Check for locked conflict
    const conflict = candResult.violations.find((v) => v.lockedConflict && v.groupKey === groupKey);

    if (conflict) {
      setConflictViolation(conflict);
      setPendingSelection({ groupKey, optionKey });
      return;
    }

    // Apply selection
    setSelections(candidateSelections);
    if (!isLocked) {
      setLockedKeys((prev) => [...prev, groupKey]);
    }
    updateUrlParams(candidateSelections);
  };

  // Force resolve locked conflict
  const confirmConflictChange = () => {
    if (!pendingSelection) return;
    const newLocked = lockedKeys.filter((k) => k !== conflictViolation?.groupKey);
    const newSelections = { ...selections, [pendingSelection.groupKey]: pendingSelection.optionKey };

    setSelections(newSelections);
    setLockedKeys(newLocked);
    updateUrlParams(newSelections);

    setConflictViolation(null);
    setPendingSelection(null);
  };

  // Save / Share Build
  const handleSaveBuild = async () => {
    try {
      const res = await fetch("/api/configurator/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelSlug: snapshot.model_slug,
          versionId: snapshot.id,
          selections: engineResult.resolvedSelections,
          market,
        }),
      });

      const data = await res.json();
      if (data.token) {
        setShareToken(data.token);
        const fullUrl = `${window.location.origin}/build/${snapshot.model_slug}/${data.token}`;
        await navigator.clipboard.writeText(fullUrl);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      }
    } catch (err) {
      console.error("Failed to share build:", err);
    }
  };

  // Register Interest Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setRegisterMessage("Please accept the privacy policy consent to register your build.");
      return;
    }

    setRegisterStatus("submitting");

    const res = await captureLead({
      email,
      full_name: name || undefined,
      lead_type: "preorder_interest",
      marketing_consent: consent,
      consent_text: "I request registration of my Project 01 build configuration for early allocation updates.",
      source_page: `/build/${snapshot.model_slug}`,
    });

    if (res.success) {
      setRegisterStatus("success");
      setRegisterMessage("Build configuration registered. Check your inbox for allocation updates.");
      // Also save build
      handleSaveBuild();
    } else {
      setRegisterStatus("error");
      setRegisterMessage(res.error || "Failed to register build.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs text-alkota-gold font-bold tracking-widest uppercase">
            BUILD CONFIGURATOR — DEVELOPMENT PLATFORM
          </div>
          <h1 className="font-mono text-3xl font-black tracking-tight mt-1 uppercase">
            {snapshot.model_name}
          </h1>
          <p className="font-sans text-sm text-[#9ab0c4] mt-1">
            Configure chassis options, suspension architecture, and component packages.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveBuild}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded text-xs font-mono font-bold uppercase transition"
          >
            <Share2 className="w-4 h-4 text-alkota-gold" />
            {shareCopied ? "LINK COPIED!" : "SHARE BUILD"}
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-alkota-gold hover:bg-alkota-gold-bright text-alkota-carbon rounded font-mono font-bold text-xs uppercase tracking-wider transition"
          >
            <Sparkles className="w-4 h-4" />
            REGISTER INTEREST
          </button>
        </div>
      </div>

      {/* Main Grid: Visualiser & Step Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visualiser & Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <CompositeVisualiser snapshot={snapshot} selections={engineResult.resolvedSelections} />

          {/* Weight Panel (Fabrication Trap Protection) */}
          <div className="border border-white/10 bg-white/5 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9ab0c4]">
              <Scale className="w-4 h-4 text-alkota-gold" />
              <span>ESTIMATED BUILD WEIGHT:</span>
            </div>

            <div>
              {engineResult.weight.totalGrams !== null ? (
                <span className="font-mono font-bold text-sm text-white">
                  {(engineResult.weight.totalGrams / 1000).toFixed(2)} kg /{" "}
                  {((engineResult.weight.totalGrams / 1000) * 2.20462).toFixed(2)} lbs
                </span>
              ) : (
                <span className="font-mono text-xs text-amber-400/80 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  WEIGHT HIDDEN (UNVERIFIED SOURCES PRESENT)
                </span>
              )}
            </div>
          </div>

          {/* Violations & Warnings Rail */}
          {engineResult.violations.length > 0 && (
            <div className="border border-amber-500/30 bg-amber-500/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                CONFIGURATION COMPATIBILITY WARNINGS
              </div>
              <ul className="space-y-1 text-xs text-amber-200/90 font-sans pl-6 list-disc">
                {engineResult.violations.map((v, i) => (
                  <li key={i}>{v.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Step Flow & Options (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/50 uppercase">
              STEP {currentStepIndex + 1} OF {sortedGroups.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((i) => Math.max(0, i - 1))}
                className="p-1.5 border border-white/10 rounded disabled:opacity-30 hover:bg-white/5 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentStepIndex === sortedGroups.length - 1}
                onClick={() => setCurrentStepIndex((i) => Math.min(sortedGroups.length - 1, i + 1))}
                className="p-1.5 border border-white/10 rounded disabled:opacity-30 hover:bg-white/5 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Group Header */}
          <div>
            <h2 className="font-mono text-xl font-bold uppercase text-white">{currentGroup.label}</h2>
            {currentGroup.help_text && (
              <p className="font-sans text-xs text-[#9ab0c4] mt-1">{currentGroup.help_text}</p>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-3" role="radiogroup" aria-label={currentGroup.label}>
            {currentGroup.options.map((option) => {
              const optKey = `${currentGroup.key}:${option.key}`;
              const isSelected = engineResult.resolvedSelections[currentGroup.key] === option.key;
              const availStatus = engineResult.availability[optKey] || engineResult.availability[option.id] || "available";
              const isDisabled = availStatus !== "available";

              const priceRow = option.prices[market === "US" ? "USD" : "GBP"];
              const deltaMinor = priceRow ? priceRow.delta_minor : 0;

              return (
                <div
                  key={option.key}
                  onClick={() => !isDisabled && handleSelectOption(currentGroup.key, option.key)}
                  className={`border rounded-lg p-4 cursor-pointer transition relative ${
                    isSelected
                      ? "border-alkota-gold bg-alkota-gold/10"
                      : isDisabled
                      ? "border-white/5 bg-white/5 opacity-50 cursor-not-allowed"
                      : "border-white/10 bg-black/40 hover:border-white/20"
                  }`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono font-bold text-sm text-white">
                        <span>{option.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-alkota-gold" />}
                      </div>

                      {option.description && (
                        <p className="font-sans text-xs text-[#9ab0c4]">{option.description}</p>
                      )}

                      {/* Unavailable Reason Badge */}
                      {isDisabled && (
                        <div className="font-mono text-[11px] text-amber-400 mt-2 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>Option Restricted by Compatibility Rule</span>
                        </div>
                      )}
                    </div>

                    {/* Price Delta Display */}
                    {pricingVisible && (
                      <div className="font-mono text-xs font-bold text-right shrink-0">
                        {deltaMinor === 0 ? (
                          <span className="text-white/40">INCLUDED</span>
                        ) : deltaMinor > 0 ? (
                          <span className="text-alkota-gold">
                            +{priceRow?.currency === "USD" ? "$" : "£"}
                            {(deltaMinor / 100).toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-emerald-400">
                            -{priceRow?.currency === "USD" ? "$" : "£"}
                            {Math.abs(deltaMinor / 100).toFixed(2)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Running Subtotal & Summary Rail */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#9ab0c4] uppercase">RUNNING BUILD SUBTOTAL:</span>
              {pricingVisible ? (
                <span className="font-mono text-2xl font-black text-alkota-gold">
                  {engineResult.pricing.currency === "USD" ? "$" : "£"}
                  {(engineResult.pricing.subtotalMinor / 100).toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              ) : (
                <span className="font-mono text-xs text-white/50">PRICING UNRELEASED (PRE-LAUNCH)</span>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((i) => Math.max(0, i - 1))}
                className="w-1/2 py-2.5 border border-white/15 rounded font-mono font-bold text-xs uppercase hover:bg-white/5 transition disabled:opacity-30"
              >
                PREVIOUS
              </button>

              <button
                disabled={currentStepIndex === sortedGroups.length - 1}
                onClick={() => setCurrentStepIndex((i) => Math.min(sortedGroups.length - 1, i + 1))}
                className="w-1/2 py-2.5 bg-white text-black font-mono font-bold text-xs uppercase hover:bg-white/90 transition disabled:opacity-30"
              >
                NEXT STEP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conflict Modal */}
      {conflictViolation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-alkota-carbon border border-amber-500/40 rounded-xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm uppercase">
              <AlertTriangle className="w-5 h-5" />
              CONFIRMED SELECTION CONFLICT
            </div>
            <p className="font-sans text-xs text-[#9ab0c4]">{conflictViolation.message}</p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConflictViolation(null)}
                className="px-4 py-2 border border-white/15 rounded font-mono text-xs font-bold uppercase hover:bg-white/5"
              >
                KEEP CURRENT
              </button>
              <button
                onClick={confirmConflictChange}
                className="px-4 py-2 bg-alkota-gold text-alkota-carbon rounded font-mono text-xs font-bold uppercase hover:bg-alkota-gold-bright"
              >
                CHANGE & RESOLVE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Interest Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-alkota-carbon border border-white/20 rounded-xl p-6 max-w-md w-full space-y-4 relative">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="font-mono text-xs text-alkota-gold font-bold uppercase">PRE-ORDER DEMAND SIGNAL</div>
              <h3 className="font-mono text-lg font-bold text-white uppercase mt-1">
                REGISTER INTEREST IN THIS BUILD
              </h3>
              <p className="font-sans text-xs text-[#9ab0c4] mt-1">
                Register your exact specification for priority production queue allocation. No deposit required during pre-launch.
              </p>
            </div>

            {registerStatus === "success" ? (
              <div className="p-4 border border-emerald-500/30 bg-emerald-500/10 rounded text-xs font-mono text-emerald-400">
                ✓ {registerMessage}
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                {registerMessage && (
                  <div className="p-3 border border-red-500/30 bg-red-500/10 rounded text-xs font-mono text-red-400">
                    {registerMessage}
                  </div>
                )}

                <div>
                  <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-xs text-white focus:border-alkota-gold outline-none"
                    placeholder="rider@alkotacycles.com"
                  />
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent-check"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5"
                  />
                  <label htmlFor="consent-check" className="font-sans text-[11px] text-[#9ab0c4]">
                    I consent to Alkota Cycles storing my build configuration and contacting me regarding allocation updates per the Privacy Policy.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={registerStatus === "submitting"}
                  className="w-full py-2.5 bg-alkota-gold hover:bg-alkota-gold-bright text-alkota-carbon font-mono font-bold text-xs uppercase tracking-wider rounded transition"
                >
                  {registerStatus === "submitting" ? "REGISTERING..." : "REGISTER SPECIFICATION"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
