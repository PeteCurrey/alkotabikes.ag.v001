"use client";

import React, { useState } from "react";
import { useRegion } from "@/components/region/RegionProvider";
import {
  PARTNER_TERMS_BY_REGION,
  type PartnerTier,
  type PartnerTierTerms,
} from "@/config/partnerTerms";
import { AlertTriangle, Calculator, Info, ShieldAlert } from "lucide-react";

export default function EarningsCalculator() {
  const { regionCode, region } = useRegion();

  const regionalTerms = PARTNER_TERMS_BY_REGION[regionCode];
  const [tier, setTier] = useState<PartnerTier>("CERTIFIED");

  // CRITICAL RULE: RRP opens EMPTY. No prefill, default, suggestion, or placeholder number.
  const [rrpInput, setRrpInput] = useState<string>("");
  const [unitsPerYearInput, setUnitsPerYearInput] = useState<string>("12");

  if (!regionalTerms) {
    return (
      <div className="p-8 bg-alkota-black border border-white/10 text-alkota-slate font-mono text-xs space-y-2">
        <div className="font-bold uppercase text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-alkota-signal" />
          <span>COMMERCIAL TERMS UNPUBLISHED ({regionCode.toUpperCase()})</span>
        </div>
        <p className="font-sans text-sm font-light text-alkota-snow/70">
          Partner commercial terms for the {region.label} market are currently unpublished. Terms will be released prior to regional partner recruitment.
        </p>
      </div>
    );
  }

  const activeTerms: PartnerTierTerms = regionalTerms[tier];

  // Parse user inputs safely
  const parsedRrp = parseFloat(rrpInput);
  const isRrpValid = !isNaN(parsedRrp) && parsedRrp > 0;
  const unitsPerYear = Math.max(1, parseInt(unitsPerYearInput, 10) || 1);

  // Derive figures from activeTerms single source of truth
  const commissionPercent = activeTerms.commissionPercent;
  const fitBuildFeeGBP = activeTerms.fitBuildHandoverFeeMinor / 100;
  const firstServiceFeeGBP = activeTerms.firstServiceReimbursementMinor / 100;

  // Computed values
  const commissionPerUnit = isRrpValid ? (parsedRrp * commissionPercent) / 100 : 0;
  const totalPerUnit = isRrpValid ? commissionPerUnit + fitBuildFeeGBP + firstServiceFeeGBP : 0;
  const projectedAnnual = isRrpValid ? totalPerUnit * unitsPerYear : 0;
  
  // Persuasive equivalent traditional margin % = (Total Per Unit / RRP) * 100
  const equivalentTraditionalMargin = isRrpValid ? (totalPerUnit / parsedRrp) * 100 : 0;

  return (
    <div className="bg-alkota-black border border-white/15 p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-alkota-signal uppercase font-bold tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>COMMERCIAL EARNINGS CALCULATOR</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            PROJECTED PARTNER REVENUE.
          </h3>
        </div>

        {/* Tier Selector */}
        <div className="flex items-center gap-2 bg-alkota-carbon p-1 border border-white/15">
          <button
            type="button"
            onClick={() => setTier("FOUNDATION")}
            className={`px-3 py-1.5 font-mono text-xs uppercase font-bold transition-colors ${
              tier === "FOUNDATION"
                ? "bg-alkota-signal text-alkota-black"
                : "text-alkota-slate hover:text-white"
            }`}
          >
            FOUNDATION (17%)
          </button>
          <button
            type="button"
            onClick={() => setTier("CERTIFIED")}
            className={`px-3 py-1.5 font-mono text-xs uppercase font-bold transition-colors ${
              tier === "CERTIFIED"
                ? "bg-alkota-signal text-alkota-black"
                : "text-alkota-slate hover:text-white"
            }`}
          >
            CERTIFIED (20%)
          </button>
        </div>
      </div>

      {/* Indicative DRAFT Banner */}
      {activeTerms.status === "DRAFT" && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 font-mono text-xs">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-amber-400 block">
              INDICATIVE, NON-CONTRACTUAL DRAFT TERMS
            </span>
            <p className="font-sans text-xs text-amber-200/80 leading-relaxed font-light">
              All commercial rates shown below are indicative development figures. Final partner terms will be formalised in a written agency agreement prior to commercial launch.
            </p>
          </div>
        </div>
      )}

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RRP Input */}
        <div className="space-y-2">
          <label htmlFor="calculator-rrp" className="font-mono text-xs text-alkota-slate uppercase tracking-wider block">
            ASSUMED RRP (EX-VAT, {region.currency}) *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 font-mono text-sm text-alkota-slate">
              {region.currencySymbol}
            </span>
            <input
              id="calculator-rrp"
              type="number"
              min="1"
              step="100"
              value={rrpInput}
              onChange={(e) => setRrpInput(e.target.value)}
              placeholder="Enter assumed RRP..."
              className="w-full bg-alkota-carbon border border-white/20 pl-8 pr-4 py-3 text-white font-mono text-sm focus:border-alkota-signal focus:outline-none placeholder:text-alkota-slate/40"
            />
          </div>
          <div className="p-3 bg-white/5 border border-white/10 flex items-start gap-2 text-[11px] font-mono text-alkota-slate">
            <AlertTriangle className="w-3.5 h-3.5 text-alkota-signal shrink-0 mt-0.5" />
            <span>
              <strong>UNPUBLISHED PRICING:</strong> Alkota Cycles has not published RRP pricing for Project 01. Please enter an assumed price to calculate worked earnings.
            </span>
          </div>
        </div>

        {/* Units / Year Input */}
        <div className="space-y-2">
          <label htmlFor="calculator-units" className="font-mono text-xs text-alkota-slate uppercase tracking-wider block">
            ESTIMATED UNITS HANDLED PER YEAR
          </label>
          <input
            id="calculator-units"
            type="number"
            min="1"
            max="200"
            value={unitsPerYearInput}
            onChange={(e) => setUnitsPerYearInput(e.target.value)}
            className="w-full bg-alkota-carbon border border-white/20 px-4 py-3 text-white font-mono text-sm focus:border-alkota-signal focus:outline-none"
          />
          <p className="font-mono text-[10px] text-alkota-slate uppercase">
            Based on catchment area capacity &amp; demo conversions.
          </p>
        </div>
      </div>

      {/* Output Results */}
      {isRrpValid ? (
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            {/* Commission */}
            <div className="p-4 bg-alkota-carbon border border-white/10 space-y-1">
              <div className="text-[10px] text-alkota-slate uppercase">
                AGENCY COMMISSION ({commissionPercent}%)
              </div>
              <div className="text-xl font-bold text-white">
                {region.currencySymbol}{commissionPerUnit.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-alkota-slate">Paid on ex-VAT RRP</div>
            </div>

            {/* Fit / Build Fee */}
            <div className="p-4 bg-alkota-carbon border border-white/10 space-y-1">
              <div className="text-[10px] text-alkota-slate uppercase">FIT / BUILD / HANDOVER</div>
              <div className="text-xl font-bold text-white">
                {region.currencySymbol}{fitBuildFeeGBP.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-alkota-slate">Fixed fee per bike</div>
            </div>

            {/* First Service */}
            <div className="p-4 bg-alkota-carbon border border-white/10 space-y-1">
              <div className="text-[10px] text-alkota-slate uppercase">FIRST SERVICE FEE</div>
              <div className="text-xl font-bold text-white">
                {region.currencySymbol}{firstServiceFeeGBP.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-alkota-slate">Reimbursed by Alkota</div>
            </div>

            {/* Total Per Unit */}
            <div className="p-4 bg-alkota-signal/10 border border-alkota-signal/40 space-y-1">
              <div className="text-[10px] text-alkota-signal font-bold uppercase">
                TOTAL REVENUE / UNIT
              </div>
              <div className="text-2xl font-bold text-alkota-signal">
                {region.currencySymbol}{totalPerUnit.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-white/80 font-bold">Zero inventory outlay</div>
            </div>
          </div>

          {/* Persuasive Summary Box */}
          <div className="p-6 bg-alkota-carbon border border-white/20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <div className="font-mono text-xs text-alkota-signal font-bold uppercase tracking-wider">
                RISK-ADJUSTED EQUIVALENT MARGIN
              </div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                {equivalentTraditionalMargin.toFixed(1)}%
              </div>
              <p className="font-sans text-xs text-alkota-slate leading-relaxed font-light">
                Under the Alkota Agency Model, earning {region.currencySymbol}{totalPerUnit.toFixed(2)} per bike with zero inventory holding cost, zero floorplan interest, and zero markdown risk generates an equivalent yield comparable to a traditional ~30%+ distribution margin.
              </p>
            </div>

            <div className="p-4 bg-alkota-black border border-white/10 space-y-2 font-mono text-xs">
              <div className="text-alkota-slate uppercase font-bold text-[10px]">
                PROJECTED ANNUAL PARTNER EARNINGS
              </div>
              <div className="text-3xl font-bold text-white">
                {region.currencySymbol}{projectedAnnual.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-alkota-slate text-[11px]">
                Calculated on {unitsPerYear} units @ {activeTerms.label} tier rates.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-alkota-carbon border border-dashed border-white/20 text-center font-mono text-xs text-alkota-slate space-y-2">
          <Calculator className="w-8 h-8 text-alkota-slate/50 mx-auto" />
          <div className="text-white font-bold uppercase">AWAITING RRP INPUT</div>
          <p className="font-sans text-xs font-light text-alkota-slate max-w-md mx-auto">
            Please enter an assumed ex-VAT RRP in the field above to generate per-unit revenue and equivalent margin breakdown.
          </p>
        </div>
      )}
    </div>
  );
}
