"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Environment from "./Environment";
import BikeModel from "./BikeModel";
import CameraRig, { CameraAnglePreset } from "./CameraRig";
import ModelFallback from "./ModelFallback";
import { FinishOption } from "@/lib/configurator/types";
import { Eye, RotateCcw, Box, ShieldAlert } from "lucide-react";

interface ConfiguratorCanvasProps {
  finish: FinishOption;
  wheelFormat: string;
  cameraPreset: CameraAnglePreset;
  onCameraPresetChange?: (preset: CameraAnglePreset) => void;
  onFinishChange?: (finish: FinishOption) => void;
}

export default function ConfiguratorCanvas({
  finish,
  wheelFormat,
  cameraPreset,
  onCameraPresetChange,
  onFinishChange,
}: ConfiguratorCanvasProps) {
  const [webGlSupported, setWebGlSupported] = useState<boolean | null>(null);
  const [force2d, setForce2d] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const isSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(isSupported);
    } catch {
      setWebGlSupported(false);
    }
  }, []);

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
    { id: "SIDE", label: "SIDE" },
    { id: "FRONT_34", label: "FRONT 3/4" },
    { id: "REAR_34", label: "REAR 3/4" },
    { id: "DRIVE", label: "DRIVE" },
    { id: "COCKPIT", label: "COCKPIT" },
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] bg-alkota-carbon tech-grid-dark flex flex-col justify-between overflow-hidden border border-white/10 rounded-none">
      {/* Viewport Top Header Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-2">
          <div className="px-2.5 py-1 bg-alkota-black/80 border border-white/10 text-[10px] font-mono text-alkota-signal uppercase backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-alkota-signal animate-pulse" />
            <span>3D INTERACTIVE VIEWPORT</span>
          </div>
        </div>

        {/* View Angle Preset Selector */}
        <div className="hidden sm:flex items-center space-x-1 bg-alkota-black/80 border border-white/10 p-1 backdrop-blur-md">
          <Eye className="w-3.5 h-3.5 text-alkota-slate ml-2 mr-1" />
          {cameraPresetsList.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onCameraPresetChange && onCameraPresetChange(preset.id)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase transition-colors ${
                cameraPreset === preset.id
                  ? "bg-alkota-signal text-alkota-black font-semibold"
                  : "text-alkota-slate hover:text-white"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Toggle 2D / 3D Fallback Mode */}
        <button
          onClick={() => setForce2d(!force2d)}
          className="px-3 py-1 bg-alkota-black/80 border border-white/10 hover:border-white/30 text-alkota-slate hover:text-white font-mono text-[10px] uppercase backdrop-blur-md flex items-center gap-1.5"
          title="Switch between 3D WebGL and HD 2D Studio view"
        >
          <Box className="w-3 h-3 text-alkota-ice" />
          <span>{force2d ? "ENABLE 3D" : "2D VIEW"}</span>
        </button>
      </div>

      {/* R3F WebGL Canvas Container */}
      <div className="w-full h-full flex-1">
        <Canvas
          shadows
          camera={{ position: [0, 0.9, 3.2], fov: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{ background: "#0B0D0F" }}
        >
          <Suspense fallback={null}>
            <Environment />
            <BikeModel finish={finish} wheelFormat={wheelFormat} />
            <CameraRig preset={cameraPreset} />
            <OrbitControls
              enablePan={false}
              minDistance={1.8}
              maxDistance={4.5}
              maxPolarAngle={Math.PI / 2 + 0.05}
              minPolarAngle={Math.PI / 6}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Controls Indicator */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between text-[10px] font-mono text-alkota-slate">
        <div className="bg-alkota-black/70 px-3 py-1 border border-white/10 backdrop-blur-sm">
          DRAG TO ROTATE • SCROLL TO ZOOM
        </div>
        <div className="bg-alkota-black/70 px-3 py-1 border border-white/10 backdrop-blur-sm">
          ALKOTA / PROJECT 01 3D MODEL REV 001
        </div>
      </div>
    </div>
  );
}
