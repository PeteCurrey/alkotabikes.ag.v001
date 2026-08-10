"use client";

import React from "react";
import { MapPin } from "lucide-react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { CLAIMS } from "@/lib/editorial-claims";

interface PlaceIdentityProps {
  claimId?: string;
  className?: string;
}

export default function PlaceIdentity({
  claimId = "ALK-CLAIM-006",
  className = "",
}: PlaceIdentityProps) {
  const foundClaim = CLAIMS.find((c) => c.id === claimId);

  // If claim is missing or status is UNSET or TARGET/PLANNED without verification,
  // hide component to avoid making unevidenced geographic claims.
  if (!foundClaim || foundClaim.status === "UNSET") {
    return null;
  }

  const isVerified = foundClaim.status === "VERIFIED";

  return (
    <div className={`bg-alkota-black border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-alkota-carbon border border-white/15 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-alkota-signal" />
        </div>
        <div>
          <TechnicalAnnotation label="PROGRAMME LOCATION" value="DEVELOPMENT ORIGIN" variant="signal" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            {foundClaim.text}
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-[9px] px-2.5 py-1 border uppercase tracking-widest ${
          isVerified
            ? "bg-alkota-signal/10 border-alkota-signal/40 text-alkota-signal"
            : "bg-white/5 border-white/15 text-alkota-slate"
        }`}>
          {isVerified ? "VERIFIED FACILITY" : `DEVELOPMENT LOCATION (${foundClaim.status})`}
        </span>
      </div>
    </div>
  );
}
