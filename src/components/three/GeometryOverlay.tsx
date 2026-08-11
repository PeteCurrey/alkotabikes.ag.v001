"use client";

import React from "react";
import { Html } from "@react-three/drei";
import { PROJECT_01_GEOMETRY, PROJECT_01_SPECIFICATION } from "@/content/project01/specification";
import { ModelSlotId } from "./modelAdapter";

interface GeometryOverlayProps {
  frameSize: string;
  focusedSlotId: ModelSlotId | null;
  explodeProgress: number;
}

/**
 * Renders real spec values from specification.ts as Html labels anchored in
 * 3D space. If a value is null or undefined, nothing is rendered — never a
 * placeholder dimension.
 *
 * Values used here MUST exist in specification.ts and PROJECT_01_GEOMETRY.
 */
// System slot numbering map (16-system architecture)
const SLOT_SYSTEM_NUMBERS: Record<ModelSlotId, { num: string; label: string }> = {
  chassis:         { num: "01/16", label: "CHASSIS MONOCOQUE" },
  linkage:         { num: "02/16", label: "KINEMATIC LINKAGE" },
  "rear-triangle": { num: "02/16", label: "SWINGARM STRUCTURE" },
  fork:            { num: "03/16", label: "FRONT SUSPENSION" },
  "rear-shock":    { num: "04/16", label: "REAR SHOCK UNIT" },
  "wheel-front":   { num: "08/16", label: "FRONT CARBON WHEEL" },
  "wheel-rear":    { num: "08/16", label: "REAR CARBON WHEEL" },
  cockpit:         { num: "09/16", label: "INTEGRATED COCKPIT" },
  "dropper-post":  { num: "10/16", label: "DROPPER POST" },
};

export default function GeometryOverlay({ frameSize, focusedSlotId, explodeProgress }: GeometryOverlayProps) {
  const sizeKey = frameSize.toLowerCase() === "l" ? "large"
    : frameSize.toLowerCase() === "m" ? "medium"
    : frameSize.toLowerCase() === "s" ? "small"
    : frameSize.toLowerCase() === "xl" ? "xlarge"
    : "large";

  const geoValues = PROJECT_01_GEOMETRY.sizes[sizeKey]?.values;
  const spec = PROJECT_01_SPECIFICATION;

  const forkExplode  = explodeProgress * 0.9;
  const shockExplode = explodeProgress * 0.9;

  // Active focused system info
  const activeSystem = focusedSlotId ? SLOT_SYSTEM_NUMBERS[focusedSlotId] : null;

  return (
    <>
      {/* ── Active System Callout Badge with Leader Line ── */}
      {focusedSlotId && activeSystem && (
        <Html
          position={[0, 1.95, 0]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="flex flex-col items-center gap-1 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md">
            <div className="px-3 py-1.5 bg-black/95 border border-[#1a73e8] text-white flex items-center gap-2 shadow-2xl">
              <span className="px-1.5 py-0.5 bg-[#1a73e8] text-black font-bold">
                SYSTEM {activeSystem.num}
              </span>
              <span className="font-bold text-[#60a5fa]">{activeSystem.label}</span>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-[#1a73e8] to-transparent" />
          </div>
        </Html>
      )}

      {/* ── WHEELBASE — Full-bike view or chassis focus ── */}
      {(!focusedSlotId || focusedSlotId === "chassis") && geoValues?.wheelbaseMm && (
        <Html
          position={[0, -0.15, 0.4]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="flex flex-col items-center">
            <div className="px-2 py-0.5 bg-black/90 border border-[#1a73e8]/40 text-[9px] font-mono text-white flex items-center gap-1.5 shadow-lg">
              <span className="text-[#1a73e8] font-bold">WB</span>
              <span className="tabular-nums">{geoValues.wheelbaseMm} mm</span>
            </div>
          </div>
        </Html>
      )}

      {/* ── REAR CENTRE ── */}
      {(!focusedSlotId || focusedSlotId === "rear-triangle" || focusedSlotId === "chassis") && geoValues?.rearCentreMm && (
        <Html
          position={[-0.55 - explodeProgress * 0.5, 0.15, 0.4]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="px-2 py-0.5 bg-black/90 border border-[#1a73e8]/40 text-[9px] font-mono text-white flex items-center gap-1.5 shadow-lg">
            <span className="text-[#1a73e8] font-bold">RC</span>
            <span className="tabular-nums">{geoValues.rearCentreMm} mm</span>
          </div>
        </Html>
      )}

      {/* ── HEAD ANGLE ── */}
      {(!focusedSlotId || focusedSlotId === "fork" || focusedSlotId === "chassis") && geoValues?.headAngleDeg && (
        <Html
          position={[1.0 + forkExplode, 1.4, 0.4]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="px-2 py-0.5 bg-black/90 border border-[#1a73e8]/40 text-[9px] font-mono text-white flex items-center gap-1.5 shadow-lg">
            <span className="text-[#1a73e8] font-bold">HA</span>
            <span className="tabular-nums">{geoValues.headAngleDeg}°</span>
          </div>
        </Html>
      )}

      {/* ── FRONT TRAVEL ── */}
      {(!focusedSlotId || focusedSlotId === "fork") && (
        <Html
          position={[1.5 + forkExplode, 0.9, 0.4]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="px-2.5 py-1 bg-[#1a73e8]/20 border border-[#1a73e8] text-[9px] font-mono text-white flex items-center gap-1.5 shadow-xl">
            <span className="text-[#60a5fa] font-bold">F.TRAVEL</span>
            <span className="font-bold tabular-nums">{spec.frontTravel.value}</span>
          </div>
        </Html>
      )}

      {/* ── REAR TRAVEL ── */}
      {(!focusedSlotId || focusedSlotId === "rear-shock" || focusedSlotId === "linkage") && (
        <Html
          position={[0.3 + shockExplode, 1.3, 0.4]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="px-2.5 py-1 bg-[#1a73e8]/20 border border-[#1a73e8] text-[9px] font-mono text-white flex items-center gap-1.5 shadow-xl">
            <span className="text-[#60a5fa] font-bold">R.TRAVEL</span>
            <span className="font-bold tabular-nums">{spec.rearTravel.value}</span>
          </div>
        </Html>
      )}

      {/* ── REACH (R00 Large Master) ── */}
      {(focusedSlotId === "chassis") && geoValues?.reachMm && (
        <Html
          position={[0.4, 1.55, 0.4]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="px-2 py-0.5 bg-black/90 border border-white/20 text-[9px] font-mono text-white flex items-center gap-1.5 shadow-lg">
            <span className="text-[#1a73e8] font-bold">REACH</span>
            <span className="tabular-nums">{geoValues.reachMm} mm</span>
          </div>
        </Html>
      )}

      {/* ── STACK (R00 Large Master) ── */}
      {(focusedSlotId === "chassis") && geoValues?.stackMm && (
        <Html
          position={[0.85, 1.85, 0.4]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="px-2 py-0.5 bg-black/90 border border-white/20 text-[9px] font-mono text-white flex items-center gap-1.5 shadow-lg">
            <span className="text-[#1a73e8] font-bold">STACK</span>
            <span className="tabular-nums">{geoValues.stackMm} mm</span>
          </div>
        </Html>
      )}
    </>
  );
}
