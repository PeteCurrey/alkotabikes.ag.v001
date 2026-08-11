"use client";

import React from "react";
import Image from "next/image";
import { ConfiguratorVersionSnapshot } from "@/lib/configurator/types";
import { AlertCircle } from "lucide-react";

import { brandAssets } from "@/lib/assets";

interface CompositeVisualiserProps {
  snapshot: ConfiguratorVersionSnapshot;
  selections: Record<string, string>;
}

export default function CompositeVisualiser({ snapshot, selections }: CompositeVisualiserProps) {
  // Find base hero image
  const baseImage = snapshot.groups
    .flatMap((g) => g.options)
    .find((o) => o.media_id)?.media_id;

  // Collect visual layers for affected groups
  const layers: Array<{ groupKey: string; optionKey: string; url: string; zIndex: number }> = [];
  let missingVisualCount = 0;

  for (const group of snapshot.groups) {
    if (!group.affects_visual) continue;
    const selectedKey = selections[group.key];
    const option = group.options.find((o) => o.key === selectedKey);

    if (option) {
      if (option.layer_media_id) {
        layers.push({
          groupKey: group.key,
          optionKey: option.key,
          url: `/images/project01-${group.key}-${option.key}.png`,
          zIndex: group.step_position * 10,
        });
      } else {
        missingVisualCount++;
      }
    }
  }

  return (
    <div className="relative w-full aspect-[16/10] bg-alkota-carbon-light border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between p-4">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Base Render & Layers */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Representative Hero Image */}
        <div className="relative w-full h-full max-w-4xl mx-auto">
          <Image
            src={brandAssets.project01WhiteHero}
            alt={`${snapshot.model_name} Visual Representation`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />

          {/* Composite Overlay Layers */}
          {layers.map((layer) => (
            <div
              key={`${layer.groupKey}-${layer.optionKey}`}
              className="absolute inset-0"
              style={{ zIndex: layer.zIndex }}
            >
              <Image
                src={layer.url}
                alt={`${layer.groupKey} ${layer.optionKey} layer`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MANDATORY PRE-PRODUCTION DISCLOSURE */}
      <div className="relative z-20 mt-2 bg-black/70 backdrop-blur-sm border border-amber-500/30 rounded p-2.5 flex items-start gap-2 text-xs text-amber-200/90">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-mono text-amber-400 font-bold uppercase tracking-wider">Representative Rendering:</span>{" "}
          Pre-production development platform. Visual representation shows baseline chassis architecture. Specific option finishes and component layers reflect final engineering release targets.
        </p>
      </div>
    </div>
  );
}
