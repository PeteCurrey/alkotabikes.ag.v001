"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRegion } from "./RegionProvider";
import { REGIONS, RegionCode, buildRegionalPath } from "@/lib/regions";
import { Globe, X, ArrowRight } from "lucide-react";

const DISMISSED_KEY = "alkota_region_banner_dismissed";
const REGION_COOKIE = "alkota-region";

export default function RegionBanner() {
  const { regionCode } = useRegion();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [suggestedRegion, setSuggestedRegion] = useState<RegionCode | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    try {
      if (localStorage.getItem(DISMISSED_KEY)) {
        return;
      }
    } catch {
      // Ignore storage errors
    }

    // Check cookie or headers passed from server if available
    // For client check: read cookie if exists
    const match = document.cookie.match(new RegExp("(?:^|; )alkota-region=([^;]*)"));
    const cookieVal = match ? match[1] : null;

    if (cookieVal && (cookieVal === "uk" || cookieVal === "us")) {
      if (cookieVal !== regionCode) {
        setSuggestedRegion(cookieVal as RegionCode);
        setVisible(true);
      }
    }
  }, [regionCode]);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Ignore
    }
  };

  const handleSwitch = () => {
    if (!suggestedRegion) return;
    document.cookie = `${REGION_COOKIE}=${suggestedRegion}; max-age=31536000; path=/; SameSite=Lax`;
    handleDismiss();
    const targetPath = buildRegionalPath(pathname, suggestedRegion);
    router.push(targetPath);
  };

  if (!visible || !suggestedRegion) return null;

  const targetRegion = REGIONS[suggestedRegion];

  return (
    <div
      role="region"
      aria-label="Region suggestion"
      className="bg-alkota-carbon text-alkota-snow border-b border-white/10 px-4 py-2.5 font-mono text-xs shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-alkota-signal shrink-0" />
          <span>
            You are viewing the <strong className="text-white">{REGIONS[regionCode].label}</strong> site. Switch to{" "}
            <strong className="text-white">{targetRegion.label}</strong> ({targetRegion.currency})?
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSwitch}
            className="px-3 py-1 bg-alkota-signal text-alkota-white hover:bg-alkota-white hover:text-alkota-black transition-colors font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>SWITCH TO {targetRegion.shortLabel} ({targetRegion.flag})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-alkota-slate hover:text-white transition-colors"
            aria-label="Dismiss region suggestion"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
