"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRegion } from "./RegionProvider";
import { REGIONS, RegionCode, buildRegionalPath, VALID_REGIONS } from "@/lib/regions";
import { Globe, ChevronDown, Check } from "lucide-react";

const REGION_COOKIE = "alkota-region";

function setRegionCookie(code: RegionCode) {
  // Set 1-year cookie, SameSite=Lax, Path=/
  document.cookie = `${REGION_COOKIE}=${code}; max-age=31536000; path=/; SameSite=Lax`;
}

interface RegionSwitcherProps {
  variant?: "header" | "footer" | "mobile" | "subnav";
  className?: string;
}

export default function RegionSwitcher({
  variant = "header",
  className = "",
}: RegionSwitcherProps) {
  const { region, regionCode } = useRegion();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRegion = (targetCode: RegionCode) => {
    if (targetCode === regionCode) {
      setOpen(false);
      return;
    }
    setRegionCookie(targetCode);
    const targetPath = buildRegionalPath(pathname, targetCode);
    setOpen(false);
    router.push(targetPath);
  };

  if (variant === "mobile") {
    return (
      <div className={`space-y-2 border-t border-white/10 pt-4 font-mono text-xs ${className}`}>
        <div className="text-alkota-slate uppercase tracking-wider text-[10px]">
          REGION & CURRENCY
        </div>
        <div className="grid grid-cols-2 gap-2">
          {VALID_REGIONS.map((code) => {
            const r = REGIONS[code];
            const isSelected = code === regionCode;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelectRegion(code)}
                className={`flex items-center justify-between p-3 border transition-colors ${
                  isSelected
                    ? "bg-alkota-signal/10 border-alkota-signal text-alkota-white font-bold"
                    : "bg-alkota-black/50 border-white/10 text-alkota-slate hover:text-alkota-white hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{r.flag}</span>
                  <span>{r.shortLabel}</span>
                  <span className="text-[10px] text-alkota-slate">· {r.currency}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-alkota-signal" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors ${
          variant === "subnav"
            ? "px-3 py-1.5 bg-alkota-snow border border-black/10 text-alkota-black hover:border-black/30"
            : "px-2.5 py-1.5 text-alkota-snow/90 hover:text-alkota-signal hover:bg-white/5 border border-white/10"
        }`}
        aria-expanded={open}
        aria-label="Select region and currency"
      >
        <span aria-hidden="true">{region.flag}</span>
        <span className="font-bold">{region.shortLabel}</span>
        <span className="opacity-60 text-[10px]">· {region.currency}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute right-0 mt-1 w-48 z-[120] bg-alkota-carbon text-alkota-snow border border-white/20 shadow-2xl font-mono text-xs ${
            variant === "subnav" ? "bg-alkota-carbon text-alkota-snow" : ""
          }`}
        >
          <div className="p-2 border-b border-white/10 text-[10px] uppercase text-alkota-slate tracking-wider">
            SELECT REGION
          </div>
          <div className="py-1">
            {VALID_REGIONS.map((code) => {
              const r = REGIONS[code];
              const isSelected = code === regionCode;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelectRegion(code)}
                  className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors hover:bg-white/10 ${
                    isSelected ? "text-alkota-signal font-bold bg-white/5" : "text-alkota-snow/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{r.flag}</span>
                    <div>
                      <div className="font-bold">{r.label}</div>
                      <div className="text-[10px] text-alkota-slate font-normal">
                        {r.currency} ({r.currencySymbol}) · {r.taxLabel}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-alkota-signal shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
