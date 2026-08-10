"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SchematicEnvironment from "./Environment";
import SchematicBikeModel from "./SchematicBikeModel";
import CameraRig, { CameraAnglePreset, PRESET_POSITIONS } from "./CameraRig";
import GeometryOverlay from "./GeometryOverlay";
import ModelFallback from "./ModelFallback";
import { FinishOption } from "@/lib/configurator/types";
import {
  ModelSlotId,
  SYSTEM_TO_PRIMARY_SLOT,
  SLOT_LABELS,
  SLOT_CAMERA_PRESETS,
} from "./modelAdapter";
import * as THREE from "three";
import { Eye, Maximize2, RotateCcw, Grid3x3 } from "lucide-react";

// ── Explode animation controller ─────────────────────────────────────────────
// Lives inside the Canvas so it has access to useFrame.
function ExplodeAnimator({
  targetProgress,
  onProgressUpdate,
  reducedMotion,
}: {
  targetProgress: number;
  onProgressUpdate: (p: number) => void;
  reducedMotion: boolean;
}) {
  const progressRef = useRef(0);
  useFrame(() => {
    const current = progressRef.current;
    const diff = targetProgress - current;
    if (Math.abs(diff) < 0.001) return;
    const next = reducedMotion ? targetProgress : current + diff * 0.08;
    progressRef.current = next;
    onProgressUpdate(next);
  });
  return null;
}

// ── Camera teleport on preset change ─────────────────────────────────────────
function CameraPresetApplier({
  preset,
  reducedMotion,
}: {
  preset: CameraAnglePreset;
  reducedMotion: boolean;
}) {
  const appliedRef = useRef<CameraAnglePreset | null>(null);
  const targetRef  = useRef(new THREE.Vector3());
  const lerping    = useRef(false);

  useEffect(() => {
    const pos = PRESET_POSITIONS[preset];
    targetRef.current.set(...pos);
    lerping.current = true;
    appliedRef.current = preset;
  }, [preset]);

  useFrame((state) => {
    if (!lerping.current) return;
    const t = targetRef.current;
    if (reducedMotion) {
      state.camera.position.copy(t);
      lerping.current = false;
    } else {
      state.camera.position.lerp(t, 0.07);
      if (state.camera.position.distanceTo(t) < 0.01) {
        state.camera.position.copy(t);
        lerping.current = false;
      }
    }
    state.camera.updateProjectionMatrix();
  });

  return null;
}

// ── Props ─────────────────────────────────────────────────────────────────────
export interface ConfiguratorCanvasProps {
  finish: FinishOption;
  wheelFormat: string;
  frameSize: string;
  focusedSystemId: string | null;         // from BuildStage active tab
  onSystemFocusFromCanvas: (systemId: string) => void; // 3D → panel sync
  onFinishChange?: (finish: FinishOption) => void;
}

export default function ConfiguratorCanvas({
  finish,
  wheelFormat,
  frameSize,
  focusedSystemId,
  onSystemFocusFromCanvas,
  onFinishChange,
}: ConfiguratorCanvasProps) {
  const [webGlSupported, setWebGlSupported] = useState<boolean | null>(null);
  const [force2d, setForce2d] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<CameraAnglePreset>("SIDE");
  const [explodeProgress, setExplodeProgress] = useState(0);
  const [explodeTarget, setExplodeTarget] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(supported);
    } catch {
      setWebGlSupported(false);
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // Derive focused slot from the panel's active system
  const focusedSlotId: ModelSlotId | null =
    focusedSystemId ? (SYSTEM_TO_PRIMARY_SLOT[focusedSystemId] ?? null) : null;

  // Auto-explode when a specific system (not chassis/finish/size) is focused
  useEffect(() => {
    const shouldExplode = !!(
      focusedSlotId &&
      focusedSlotId !== "chassis"
    );
    setExplodeTarget(shouldExplode ? 1 : 0);
    setIsExploded(shouldExplode);

    // Auto-camera to the best preset for the focused slot
    if (focusedSlotId) {
      const preset = SLOT_CAMERA_PRESETS[focusedSlotId] as CameraAnglePreset;
      if (preset) setCameraPreset(preset);
    }
  }, [focusedSlotId]);

  // 3D → panel: slot click bubbles up as systemId
  const handleSlotClick = useCallback((slotId: ModelSlotId) => {
    // Map slot → systemId for the panel
    import("./modelAdapter").then(({ SLOT_TO_SYSTEM_ID }) => {
      const systemId = SLOT_TO_SYSTEM_ID[slotId];
      if (systemId) onSystemFocusFromCanvas(systemId);
    });
  }, [onSystemFocusFromCanvas]);

  const toggleExplode = () => {
    const next = !isExploded;
    setIsExploded(next);
    setExplodeTarget(next ? 1 : 0);
  };

  const resetView = () => {
    setCameraPreset("SIDE");
    setIsExploded(false);
    setExplodeTarget(0);
  };

  if (webGlSupported === false || force2d) {
    return (
      <ModelFallback
        finish={finish}
        wheelFormat={wheelFormat}
        onFinishChange={onFinishChange}
      />
    );
  }

  const cameraPresetsList: { id: CameraAnglePreset; label: string }[] = [
    { id: "SIDE",          label: "SIDE"    },
    { id: "NON_DRIVE",     label: "NDS"     },
    { id: "FRONT",         label: "FRONT"   },
    { id: "REAR",          label: "REAR"    },
    { id: "TOP",           label: "TOP"     },
  ];

  return (
    <div
      className="relative w-full h-full bg-[#080c10] flex flex-col overflow-hidden border border-white/10"
      role="img"
      aria-label={`Schematic 3D development geometry viewer for Project 01${focusedSlotId ? `. Currently showing: ${SLOT_LABELS[focusedSlotId]}` : ""}. All configuration interactions are available in the panel below.`}
    >
      {/* ── Top toolbar ────────────────────────────────────────────────────── */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
        {/* Left: status badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-2.5 py-1 bg-black/80 border border-[#1a73e8]/40 text-[10px] font-mono text-[#1a73e8] uppercase backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] animate-pulse" />
            <span>SCHEMATIC VIEWER</span>
          </div>
          {focusedSlotId && (
            <div className="px-2.5 py-1 bg-black/80 border border-white/15 text-[10px] font-mono text-white uppercase backdrop-blur-md">
              {SLOT_LABELS[focusedSlotId]}
            </div>
          )}
        </div>

        {/* Right: camera presets + controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-0.5 bg-black/80 border border-white/10 p-0.5 backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-[#647789] mx-1.5" />
            {cameraPresetsList.map((p) => (
              <button
                key={p.id}
                onClick={() => setCameraPreset(p.id)}
                aria-label={`Camera angle: ${p.label}`}
                className={`px-2 py-1 text-[9px] font-mono uppercase transition-colors ${
                  cameraPreset === p.id
                    ? "bg-[#1a73e8] text-white font-bold"
                    : "text-[#647789] hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleExplode}
            title={isExploded ? "Collapse geometry" : "Exploded view — separate components along axes"}
            className={`px-2.5 py-1.5 border font-mono text-[9px] uppercase backdrop-blur-md flex items-center gap-1.5 transition-all ${
              isExploded
                ? "border-[#1a73e8]/60 bg-[#1a73e8]/15 text-[#1a73e8]"
                : "border-white/10 bg-black/80 text-[#647789] hover:text-white"
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">{isExploded ? "COLLAPSE" : "EXPLODE"}</span>
          </button>

          <button
            onClick={resetView}
            title="Reset camera and collapse geometry"
            className="px-2.5 py-1.5 border border-white/10 bg-black/80 hover:border-white/30 text-[#647789] hover:text-white font-mono text-[9px] uppercase backdrop-blur-md"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <button
            onClick={() => setForce2d(true)}
            title="Switch to 2D studio view"
            className="px-2.5 py-1.5 border border-white/10 bg-black/80 hover:border-white/30 text-[#647789] hover:text-white font-mono text-[9px] uppercase backdrop-blur-md"
          >
            <Grid3x3 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── WebGL Canvas ────────────────────────────────────────────────────── */}
      <div className="w-full flex-1" aria-hidden="true">
        <Canvas
          frameloop="demand"
          performance={{ min: 0.5 }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.9, 3.2], fov: 45 }}
          gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
          style={{ background: "#080c10" }}
        >
          <SchematicEnvironment />

          <SchematicBikeModel
            focusedSlotId={focusedSlotId}
            explodeProgress={explodeProgress}
            wheelFormat={wheelFormat}
            onSlotClick={handleSlotClick}
          />

          <GeometryOverlay
            frameSize={frameSize}
            focusedSlotId={focusedSlotId}
            explodeProgress={explodeProgress}
          />

          <ExplodeAnimator
            targetProgress={explodeTarget}
            onProgressUpdate={setExplodeProgress}
            reducedMotion={reducedMotion}
          />

          <CameraPresetApplier
            preset={cameraPreset}
            reducedMotion={reducedMotion}
          />

          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={5.5}
            maxPolarAngle={Math.PI / 2 + 0.08}
            minPolarAngle={Math.PI / 8}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      </div>

      {/* ── Persistent disclaimer — non-dismissible ─────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-center justify-between px-3 py-2 bg-black/90 border-t border-[#1a73e8]/20">
          <span className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-wider leading-tight">
            R00 DEVELOPMENT GEOMETRY — SCHEMATIC REPRESENTATION. NOT A PRODUCT RENDER.
          </span>
          <span className="font-mono text-[9px] text-[#647789] uppercase hidden sm:block">
            DRAG · SCROLL · CLICK COMPONENT
          </span>
        </div>
      </div>
    </div>
  );
}
