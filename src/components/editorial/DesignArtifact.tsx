"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { DesignJourneyAsset } from "@/content/media/designJourney";

interface DesignArtifactProps {
  asset: DesignJourneyAsset;
  theme?: "blueprint" | "paper";
  showCaption?: boolean;
  className?: string;
}

function aspectToPadding(ratio: DesignJourneyAsset["aspectRatio"]): string {
  const map: Record<DesignJourneyAsset["aspectRatio"], string> = {
    "4:3": "75%",
    "3:2": "66.66%",
    "1:1": "100%",
    "16:9": "56.25%",
    "3:4": "133.33%",
  };
  return map[ratio];
}

export default function DesignArtifact({
  asset,
  theme = "blueprint",
  showCaption = true,
  className = "",
}: DesignArtifactProps) {
  const [imgError, setImgError] = useState(false);
  const isPending = asset.status === "PENDING" || imgError;

  const isBlueprint = theme === "blueprint";
  const bgColor = isBlueprint ? "#0a1628" : "#f5f0e8";
  const gridColor = isBlueprint ? "rgba(100,119,137,0.18)" : "rgba(100,119,137,0.25)";
  const textColor = isBlueprint ? "#647789" : "#4a5568";
  const accentColor = isBlueprint ? "#647789" : "#2d3748";
  const regColor = isBlueprint ? "rgba(100,119,137,0.5)" : "rgba(100,119,137,0.6)";

  const paddingBottom = aspectToPadding(asset.aspectRatio);

  return (
    <figure className={`group ${className}`}>
      <div className="relative w-full overflow-hidden border border-white/10" style={{ paddingBottom }}>
        {!isPending && (
          <Image
            src={asset.assetPath}
            alt={asset.title}
            fill
            className="object-cover object-center"
            onError={() => setImgError(true)}
          />
        )}

        {isPending && (
          <div className="absolute inset-0" style={{ backgroundColor: bgColor }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id={`grid-${asset.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="0.5" />
                </pattern>
                <pattern id={`grid-major-${asset.id}`} width="200" height="200" patternUnits="userSpaceOnUse">
                  <rect width="200" height="200" fill={`url(#grid-${asset.id})`} />
                  <path d="M 200 0 L 0 0 0 200" fill="none" stroke={gridColor} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="600" fill={`url(#grid-major-${asset.id})`} />

              {[
                [30, 30], [770, 30], [30, 570], [770, 570],
              ].map(([x, y], i) => (
                <g key={i} stroke={regColor} strokeWidth="1" fill="none">
                  <line x1={x - 12} y1={y} x2={x + 12} y2={y} />
                  <line x1={x} y1={y - 12} x2={x} y2={y + 12} />
                  <circle cx={x} cy={y} r="4" />
                </g>
              ))}

              <rect x="20" y="20" width="760" height="560" fill="none" stroke={regColor} strokeWidth="0.75" strokeDasharray="8 4" />

              <text x="40" y="55" fontFamily="monospace" fontSize="11" fill={accentColor} fontWeight="700" letterSpacing="3">
                {asset.id}
              </text>
              <text x="40" y="73" fontFamily="monospace" fontSize="9" fill={textColor} letterSpacing="2">
                {asset.revision}
              </text>

              <text x="760" y="55" fontFamily="monospace" fontSize="9" fill={textColor} textAnchor="end" letterSpacing="1.5">
                {asset.phase}
              </text>

              <g>
                <line x1="200" y1="275" x2="600" y2="275" stroke={regColor} strokeWidth="0.75" />
                <text x="400" y="268" fontFamily="monospace" fontSize="10" fill={textColor} textAnchor="middle" letterSpacing="3">
                  DESIGN ARTIFACT
                </text>
                <text
                  x="400"
                  y="310"
                  fontFamily="monospace"
                  fontSize="18"
                  fill={accentColor}
                  textAnchor="middle"
                  fontWeight="700"
                  letterSpacing="4"
                >
                  {asset.title}
                </text>
                <line x1="200" y1="328" x2="600" y2="328" stroke={regColor} strokeWidth="0.75" />
                <text x="400" y="352" fontFamily="monospace" fontSize="10" fill={textColor} textAnchor="middle" letterSpacing="3">
                  IMAGE PENDING
                </text>
              </g>

              <rect x="20" y="548" width="760" height="32" fill={regColor} opacity="0.12" />
              <text x="40" y="569" fontFamily="monospace" fontSize="9" fill={textColor} letterSpacing="2">
                ALKOTA PERFORMANCE ENGINEERING
              </text>
              <text x="760" y="569" fontFamily="monospace" fontSize="9" fill={textColor} textAnchor="end" letterSpacing="2">
                PROJECT 01 · PRE-PRODUCTION
              </text>
            </svg>
          </div>
        )}

        {isPending && (
          <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest px-2 py-1 border"
            style={{ borderColor: regColor, color: textColor, backgroundColor: bgColor + "dd" }}>
            PENDING
          </div>
        )}
      </div>

      {showCaption && (
        <figcaption className="pt-3 space-y-1 font-mono text-[10px] text-alkota-slate">
          <span className="text-alkota-signal font-bold block">{asset.id}</span>
          <span className="text-alkota-snow/70 leading-relaxed block">{asset.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}