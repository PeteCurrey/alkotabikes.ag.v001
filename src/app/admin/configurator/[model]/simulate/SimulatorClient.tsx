"use client";

import React, { useState } from "react";
import { ConfiguratorVersionSnapshot, EngineResult } from "@/lib/configurator/types";
import { evaluateConfiguration } from "@/lib/configurator/engine";
import { computeTotalCombinations } from "@/lib/configurator/validation";
import { Sliders, Activity, AlertTriangle, CheckCircle, Scale, ShieldAlert } from "lucide-react";

interface SimulatorClientProps {
  snapshot: ConfiguratorVersionSnapshot;
  modelSlug: string;
}

export default function SimulatorClient({ snapshot, modelSlug }: SimulatorClientProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [market, setMarket] = useState<string>("GB");
  const [lockedKeys, setLockedKeys] = useState<string[]>([]);

  // Run Rules Engine
  const engineResult: EngineResult = evaluateConfiguration(snapshot, selections, market, lockedKeys);
  const totalCombinations = computeTotalCombinations(snapshot);

  const handleSelectOption = (groupKey: string, optionKey: string) => {
    const isLocked = lockedKeys.includes(groupKey);
    const newSelections = { ...selections, [groupKey]: optionKey };
    setSelections(newSelections);
    if (!isLocked) {
      setLockedKeys((prev) => [...prev, groupKey]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs text-alkota-gold font-bold uppercase tracking-widest flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            DRY-RUN SIMULATOR & COMPATIBILITY TRACE
          </div>
          <h1 className="font-mono text-2xl font-bold uppercase mt-1">
            SIMULATION — {snapshot.model_name}
          </h1>
          <p className="font-sans text-xs text-[#9ab0c4] mt-1">
            Test compatibility rule evaluation, iteration fixpoints, locked selections, and pricing in real time.
          </p>
        </div>

        {/* Combination Counter */}
        <div className="border border-white/15 bg-black/40 rounded-lg p-3 text-right">
          <div className="font-mono text-[10px] text-white/50 uppercase">TOTAL CARTESIAN COMBINATIONS</div>
          <div className="font-mono text-lg font-bold text-alkota-gold">{totalCombinations.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Selection Flow (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-white/70 font-bold uppercase">MOCK CUSTOMER SELECTION FLOW</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-white/40">MARKET:</span>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="bg-black/50 border border-white/15 rounded px-2 py-1 text-xs text-white font-mono"
              >
                <option value="GB">GB (GBP / VAT Incl)</option>
                <option value="US">US (USD / Tax Excl)</option>
              </select>
            </div>
          </div>

          {snapshot.groups.map((group) => (
            <div key={group.key} className="border border-white/10 bg-alkota-carbon rounded-lg p-4 space-y-3">
              <div className="font-mono text-xs font-bold text-white uppercase flex items-center justify-between">
                <span>{group.label}</span>
                {selections[group.key] && <span className="text-alkota-gold text-[11px]">SELECTED</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.options.map((option) => {
                  const optKey = `${group.key}:${option.key}`;
                  const isSelected = engineResult.resolvedSelections[group.key] === option.key;
                  const avail = engineResult.availability[optKey] || engineResult.availability[option.id] || "available";
                  const isDisabled = avail !== "available";

                  return (
                    <button
                      key={option.key}
                      onClick={() => !isDisabled && handleSelectOption(group.key, option.key)}
                      disabled={isDisabled}
                      className={`p-2.5 rounded border text-left font-mono text-xs transition relative ${
                        isSelected
                          ? "border-alkota-gold bg-alkota-gold/15 text-white font-bold"
                          : isDisabled
                          ? "border-white/5 bg-white/5 text-white/30 cursor-not-allowed"
                          : "border-white/10 bg-black/40 text-white/80 hover:border-white/20"
                      }`}
                    >
                      <div className="truncate">{option.label}</div>
                      {isDisabled && (
                        <div className="text-[9px] text-amber-400 mt-1 uppercase">RESTRICTED</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Engine Trace & Results (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Output Summary */}
          <div className="border border-white/10 bg-alkota-carbon rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-xs text-white/70 font-bold uppercase">ENGINE EVALUATION OUTPUT</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  engineResult.isValid
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {engineResult.isValid ? "VALID CONFIGURATION" : "VIOLATIONS DETECTED"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div>
                <span className="text-white/40">COMPUTED SUBTOTAL:</span>
                <div className="text-lg font-bold text-alkota-gold">
                  {engineResult.pricing.currency === "USD" ? "$" : "£"}
                  {(engineResult.pricing.subtotalMinor / 100).toFixed(2)}
                </div>
              </div>

              <div>
                <span className="text-white/40">BUILD WEIGHT:</span>
                <div className="text-sm font-bold text-white mt-1">
                  {engineResult.weight.totalGrams !== null ? (
                    `${(engineResult.weight.totalGrams / 1000).toFixed(2)} kg`
                  ) : (
                    <span className="text-amber-400 text-xs">HIDDEN (UNVERIFIED)</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rule Execution Trace */}
          <div className="border border-white/10 bg-alkota-carbon rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-alkota-gold font-bold uppercase border-b border-white/10 pb-2">
              <Activity className="w-4 h-4" />
              LIVE RULE EXECUTION TRACE
            </div>

            {engineResult.ruleTrace.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto font-mono text-xs pr-2">
                {engineResult.ruleTrace.map((tr, idx) => (
                  <div key={idx} className="p-2.5 bg-black/40 border border-white/10 rounded space-y-1">
                    <div className="flex items-center justify-between text-white/50 text-[10px]">
                      <span>ITERATION {tr.iteration}</span>
                      <span className="text-alkota-gold uppercase">{tr.ruleType}</span>
                    </div>
                    <div className="font-bold text-white">{tr.ruleName}</div>
                    <div className="text-[#9ab0c4] text-[11px]">{tr.action}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs font-mono text-white/40 py-6 text-center">
                No active rules fired for the current selection state.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
