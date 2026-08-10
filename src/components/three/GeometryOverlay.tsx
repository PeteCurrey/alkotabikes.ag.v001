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
export default function GeometryOverlay({ frameSize, focusedSlotId, explodeProgress }: GeometryOverlayProps) {
  // Only the Large (R00 master) size has real geometry values.
  // Other sizes have values: null — render nothing for them.
  const sizeKey = frameSize.toLowerCase() === "l" ? "large"
    : frameSize.toLowerCase() === "m" ? "medium"
    : frameSize.toLowerCase() === "s" ? "small"
    : frameSize.toLowerCase() === "xl" ? "xlarge"
    : "large";

  const geoValues = PROJECT_01_GEOMETRY.sizes[sizeKey]?.values;

  // Suppress all overlays when no geometry is available (S, M, XL at R00)
  if (!geoValues) return null;

  const spec = PROJECT_01_SPECIFICATION;

  // ── Annotation positions shift with explode ──────────────────────────────
  // Labels follow their slot's approximate world position.
  const forkExplode  = explodeProgress * 0.9;
  const shockExplode = explodeProgress * 0.9;

  return (
    <>
      {/* ── WHEELBASE ── only shown in full-bike view (no focus or chassis focus) ── */}
      {(!focusedSlotId || focusedSlotId === "chassis") && geoValues.wheelbaseMm && (
        <Html
          position={[0, -0.12, 0.7]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="schematic-label">
            <span className="schematic-label__key">WB</span>
            <span className="schematic-label__value">{geoValues.wheelbaseMm} mm</span>
          </div>
        </Html>
      )}

      {/* ── REAR CENTRE ── shown on chassis or rear-triangle focus ── */}
      {(!focusedSlotId || focusedSlotId === "rear-triangle" || focusedSlotId === "chassis") && geoValues.rearCentreMm && (
        <Html
          position={[-0.55 - explodeProgress * 0.5, 0.15, 0.7]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="schematic-label">
            <span className="schematic-label__key">RC</span>
            <span className="schematic-label__value">{geoValues.rearCentreMm} mm</span>
          </div>
        </Html>
      )}

      {/* ── HEAD ANGLE ── shown on chassis or fork focus ── */}
      {(!focusedSlotId || focusedSlotId === "fork" || focusedSlotId === "chassis") && geoValues.headAngleDeg && (
        <Html
          position={[1.0 + forkExplode, 1.4, 0.7]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="schematic-label">
            <span className="schematic-label__key">HA</span>
            <span className="schematic-label__value">{geoValues.headAngleDeg}°</span>
          </div>
        </Html>
      )}

      {/* ── FRONT TRAVEL ── shown on fork focus or full view ── */}
      {(!focusedSlotId || focusedSlotId === "fork") && (
        <Html
          position={[1.5 + forkExplode, 0.9, 0.7]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="schematic-label schematic-label--highlight">
            <span className="schematic-label__key">F.TRAVEL</span>
            <span className="schematic-label__value">{spec.frontTravel.value}</span>
          </div>
        </Html>
      )}

      {/* ── REAR TRAVEL ── shown on shock/linkage focus or full view ── */}
      {(!focusedSlotId || focusedSlotId === "rear-shock" || focusedSlotId === "linkage") && (
        <Html
          position={[0.3 + shockExplode, 1.3, 0.7]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="schematic-label schematic-label--highlight">
            <span className="schematic-label__key">R.TRAVEL</span>
            <span className="schematic-label__value">{spec.rearTravel.value}</span>
          </div>
        </Html>
      )}

      {/* ── REACH (R00 L only) ── shown on chassis focus ── */}
      {(focusedSlotId === "chassis") && geoValues.reachMm && (
        <Html
          position={[0.4, 1.6, 0.7]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="schematic-label">
            <span className="schematic-label__key">REACH</span>
            <span className="schematic-label__value">{geoValues.reachMm} mm</span>
          </div>
        </Html>
      )}

      {/* ── STACK (R00 L only) ── shown on chassis focus ── */}
      {(focusedSlotId === "chassis") && geoValues.stackMm && (
        <Html
          position={[0.85, 1.9, 0.7]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div className="schematic-label">
            <span className="schematic-label__key">STACK</span>
            <span className="schematic-label__value">{geoValues.stackMm} mm</span>
          </div>
        </Html>
      )}
    </>
  );
}
