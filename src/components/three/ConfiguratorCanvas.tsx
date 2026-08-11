"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Html } from "@react-three/drei";
import SchematicEnvironment from "./Environment";
import SchematicBikeModel, { ViewMode } from "./SchematicBikeModel";
import { CameraAnglePreset, PRESET_POSITIONS } from "./CameraRig";
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
import { Eye, Maximize2, RotateCcw, Grid3x3, Sliders, Layers } from "lucide-react";

// ── Explode animation controller ─────────────────────────────────────────────
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

// ── Camera position applier with smooth damped lerp ─────────────────────────
function CameraPresetApplier({
  preset,
  reducedMotion,
}: {
  preset: CameraAnglePreset;
  reducedMotion: boolean;
}) {
  const targetRef = useRef(new THREE.Vector3());
  const lerping = useRef(false);

  useEffect(() => {
    const pos = PRESET_POSITIONS[preset];
    targetRef.current.set(...pos);
    lerping.current = true;
  }, [preset]);

  useFrame((state) => {
    if (!lerping.current) return;
    const t = targetRef.current;
    if (reducedMotion) {
      state.camera.position.copy(t);
      lerping.current = false;
    } else {
      state.camera.position.lerp(t, 0.08);
      if (state.camera.position.distanceTo(t) < 0.01) {
        state.camera.position.copy(t);
        lerping.current = false;
      }
    }
    state.camera.updateProjectionMatrix();
  });

  return null;
}

// ── CAD Ground Grid & Bottom-Bracket Datum Marker ───────────────────────────
function GroundDatumGrid() {
  return (
    <group position={[0, 0, 0]}>
      {/* Measured Grid Plane */}
      <gridHelper args={[10, 20, "#1a73e8", "#121d28"]} position={[0, 0, 0]} />

      {/* BB Center Datum Node [0,0,0] */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>

      {/* Axis Datum Lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-1.5, 0, 0, 1.8, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1a73e8" opacity={0.4} transparent />
      </line>

      <Html position={[0, -0.08, 0]} center style={{ pointerEvents: "none" }}>
        <div className="font-mono text-[8px] text-[#60a5fa] bg-black/90 px-1.5 py-0.5 border border-[#1a73e8]/40 uppercase tracking-widest whitespace-nowrap shadow-lg">
          DATUM ORIGIN [BB 0,0,0]
        </div>
      </Html>
    </group>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
export interface ConfiguratorCanvasProps {
  finish: FinishOption;
  wheelFormat: string;
  frameSize: string;
  focusedSystemId: string | null;
  onSystemFocusFromCanvas: (systemId: string) => void;
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
  const [cameraProjection, setCameraProjection] = useState<"ORTHOGRAPHIC" | "PERSPECTIVE">("ORTHOGRAPHIC");
  const [viewMode, setViewMode] = useState<ViewMode>("GHOST");
  const [explodeProgress, setExplodeProgress] = useState(0);
  const [explodeTarget, setExplodeTarget] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [bootStep, setBootStep] = useState(0);

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

    // Staggered initialization boot sequence
    const t1 = setTimeout(() => setBootStep(1), 50);
    const t2 = setTimeout(() => setBootStep(2), 120);
    const t3 = setTimeout(() => setBootStep(3), 200);

    return () => {
      mq.removeEventListener("change", listener);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Derive focused slot from panel system
  const focusedSlotId: ModelSlotId | null =
    focusedSystemId ? (SYSTEM_TO_PRIMARY_SLOT[focusedSystemId] ?? null) : null;

  // Auto-explode and camera jump on focus
  useEffect(() => {
    const shouldExplode = !!(focusedSlotId && focusedSlotId !== "chassis");
    setExplodeTarget(shouldExplode ? 0.75 : 0);
    setIsExploded(shouldExplode);

    if (focusedSlotId) {
      const preset = SLOT_CAMERA_PRESETS[focusedSlotId] as CameraAnglePreset;
      if (preset) setCameraPreset(preset);
    }
  }, [focusedSlotId]);

  // 3D → panel focus mapping
  const handleSlotClick = useCallback((slotId: ModelSlotId) => {
    import("./modelAdapter").then(({ SLOT_TO_SYSTEM_ID }) => {
      const systemId = SLOT_TO_SYSTEM_ID[slotId];
      if (systemId) onSystemFocusFromCanvas(systemId);
    });
  }, [onSystemFocusFromCanvas]);

  const toggleExplode = () => {
    const next = !isExploded;
    setIsExploded(next);
    setExplodeTarget(next ? 0.85 : 0);
  };

  const resetView = () => {
    setCameraPreset("SIDE");
    setCameraProjection("ORTHOGRAPHIC");
    setViewMode("GHOST");
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
    { id: "SIDE",      label: "SIDE"  },
    { id: "NON_DRIVE", label: "NDS"   },
    { id: "FRONT",     label: "FRONT" },
    { id: "REAR",      label: "REAR"  },
    { id: "TOP",       label: "TOP"   },
  ];

  return (
    <div
      className="relative w-full h-full bg-[#080c10] flex flex-col overflow-hidden border border-white/10"
      role="img"
      aria-label={`CAD schematic development viewer for Project 01${focusedSlotId ? `. Currently focusing: ${SLOT_LABELS[focusedSlotId]}` : ""}.`}
    >
      {/* ── Initialization Boot Sequence Overlay ───────────────────────────── */}
      {bootStep < 3 && (
        <div className="absolute inset-0 z-30 bg-[#080c10] flex flex-col items-center justify-center p-6 space-y-2 font-mono text-[10px] text-[#1a73e8] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1a73e8] animate-ping" />
            <span>[00.01s] INITIALISING R00 CAD SCHEMATIC VIEWER...</span>
          </div>
          {bootStep >= 1 && <div>[00.05s] COMPILING TECHNICAL CONTOUR SHADERS...</div>}
          {bootStep >= 2 && <div>[00.12s] RESOLVING SYSTEM 01..16 DATUM NODES...</div>}
        </div>
      )}

      {/* ── Top Toolbar — CAD Control Surface ───────────────────────────────── */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Status & Active Component Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-2.5 py-1 bg-black/90 border border-[#1a73e8]/40 text-[10px] font-mono text-[#1a73e8] uppercase backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] animate-pulse" />
            <span>CAD SCHEMATIC</span>
          </div>
          {focusedSlotId && (
            <div className="px-2.5 py-1 bg-black/90 border border-white/15 text-[10px] font-mono text-white uppercase backdrop-blur-md">
              {SLOT_LABELS[focusedSlotId]}
            </div>
          )}
        </div>

        {/* Right: Camera, Projection, View Mode & Explode Controls */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
          {/* View Mode Toggle: GHOST / SOLID / WIRE */}
          <div className="flex items-center bg-black/90 border border-white/10 p-0.5 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-[#647789] mx-1.5" />
            {(["GHOST", "SOLID", "WIREFRAME"] as ViewMode[]).map((vm) => (
              <button
                key={vm}
                onClick={() => setViewMode(vm)}
                className={`px-2 py-1 text-[9px] font-mono uppercase transition-colors ${
                  viewMode === vm
                    ? "bg-[#1a73e8] text-white font-bold"
                    : "text-[#647789] hover:text-white"
                }`}
              >
                {vm.substring(0, 5)}
              </button>
            ))}
          </div>

          {/* Projection Toggle: ORTHO / PERSP */}
          <div className="flex items-center bg-black/90 border border-white/10 p-0.5 backdrop-blur-md">
            <button
              onClick={() =>
                setCameraProjection((prev) =>
                  prev === "ORTHOGRAPHIC" ? "PERSPECTIVE" : "ORTHOGRAPHIC"
                )
              }
              className="px-2.5 py-1 text-[9px] font-mono uppercase font-bold text-white hover:text-[#60a5fa] transition-colors"
            >
              {cameraProjection === "ORTHOGRAPHIC" ? "ORTHO" : "PERSP"}
            </button>
          </div>

          {/* Camera Angles List */}
          <div className="hidden md:flex items-center gap-0.5 bg-black/90 border border-white/10 p-0.5 backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-[#647789] mx-1.5" />
            {cameraPresetsList.map((p) => (
              <button
                key={p.id}
                onClick={() => setCameraPreset(p.id)}
                aria-label={`Camera angle: ${p.label}`}
                className={`px-2 py-1 text-[9px] font-mono uppercase transition-colors ${
                  cameraPreset === p.id
                    ? "bg-white/15 text-white font-bold border-b-2 border-[#1a73e8]"
                    : "text-[#647789] hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Explode View Control */}
          <button
            onClick={toggleExplode}
            title={isExploded ? "Collapse assemblies" : "Exploded view — separate assemblies along axes"}
            className={`px-2.5 py-1.5 border font-mono text-[9px] uppercase backdrop-blur-md flex items-center gap-1.5 transition-all ${
              isExploded
                ? "border-[#1a73e8]/60 bg-[#1a73e8]/20 text-[#60a5fa]"
                : "border-white/10 bg-black/90 text-[#647789] hover:text-white"
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            <span>{isExploded ? "COLLAPSE" : "EXPLODE"}</span>
          </button>

          {/* Reset View Button */}
          <button
            onClick={resetView}
            title="Reset view to default Orthographic side elevation"
            className="px-2.5 py-1.5 border border-white/10 bg-black/90 hover:border-white/30 text-[#647789] hover:text-white font-mono text-[9px] uppercase backdrop-blur-md"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── Scrubbable Exploded View Slider Bar (Visible when exploded) ────── */}
      {isExploded && (
        <div className="absolute top-14 right-3 z-20 bg-black/90 border border-[#1a73e8]/40 p-2 font-mono text-[9px] space-y-1.5 backdrop-blur-md max-w-xs w-56">
          <div className="flex items-center justify-between text-[#1a73e8]">
            <span className="font-bold flex items-center gap-1">
              <Sliders className="w-3 h-3" />
              <span>EXPLODE SCRUBBER</span>
            </span>
            <span>{Math.round(explodeProgress * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explodeProgress}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setExplodeTarget(val);
              setExplodeProgress(val);
            }}
            className="w-full h-1 bg-[#121d28] accent-[#1a73e8] cursor-pointer"
          />
        </div>
      )}

      {/* ── Corner HUD Info Panel ────────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-3 z-20 font-mono text-[9px] text-[#647789] bg-black/90 border border-white/10 p-2.5 space-y-1 backdrop-blur-md pointer-events-none hidden sm:block">
        <div className="text-white font-bold border-b border-white/10 pb-1 flex items-center justify-between gap-4">
          <span>HUD INSTRUMENTATION</span>
          <span className="text-[#1a73e8]">R00 MAST</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 pt-0.5 text-[8.5px]">
          <div>ELEVATION: <span className="text-white">{cameraPreset}</span></div>
          <div>CAMERA: <span className="text-[#60a5fa]">{cameraProjection}</span></div>
          <div>STYLE: <span className="text-white">{viewMode}</span></div>
          <div>SCALE: <span className="text-[#647789]">1:10 MASTER</span></div>
        </div>
      </div>

      {/* ── WebGL Canvas ────────────────────────────────────────────────────── */}
      <div className="w-full flex-1" aria-hidden="true">
        <Canvas
          frameloop="demand"
          performance={{ min: 0.5 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{ background: "#080c10" }}
        >
          {cameraProjection === "ORTHOGRAPHIC" ? (
            <OrthographicCamera
              makeDefault
              position={[0, 0.9, 3.8]}
              zoom={210}
              near={0.1}
              far={100}
            />
          ) : (
            <PerspectiveCamera
              makeDefault
              position={[0, 0.9, 3.2]}
              fov={42}
              near={0.1}
              far={100}
            />
          )}

          <SchematicEnvironment />

          <GroundDatumGrid />

          <SchematicBikeModel
            focusedSlotId={focusedSlotId}
            explodeProgress={explodeProgress}
            wheelFormat={wheelFormat}
            viewMode={viewMode}
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
            minDistance={1.2}
            maxDistance={6.0}
            maxPolarAngle={Math.PI / 2 + 0.05}
            minPolarAngle={Math.PI / 8}
            minAzimuthAngle={-Math.PI / 2 - 0.2}
            maxAzimuthAngle={Math.PI / 2 + 0.2}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.4}
          />
        </Canvas>
      </div>

      {/* ── Persistent Framing Line — Non-dismissible ───────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-center justify-between px-3 py-1.5 bg-black/95 border-t border-white/10">
          <span className="font-mono text-[9px] text-[#647789] uppercase tracking-wider leading-tight">
            R00 DEVELOPMENT GEOMETRY — SCHEMATIC REPRESENTATION. NOT A PRODUCT RENDER.
          </span>
          <span className="font-mono text-[9px] text-[#1a73e8] uppercase hidden sm:block font-bold">
            CAD ELEVATION • ORTHOGRAPHIC VIEW
          </span>
        </div>
      </div>
    </div>
  );
}
