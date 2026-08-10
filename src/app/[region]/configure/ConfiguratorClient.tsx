"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OpeningHero from "@/components/configurator/OpeningHero";
import MachineStudio from "@/components/configurator/MachineStudio";
import SystemsExplorer from "@/components/configurator/SystemsExplorer";
import ComponentTheatre from "@/components/configurator/ComponentTheatre";
import FitEngine from "@/components/configurator/FitEngine";
import BuildStage, { BuildConfig } from "@/components/configurator/BuildStage";
import BuildSummary from "@/components/configurator/BuildSummary";
import { Project01Component } from "@/content/project01/components";

type ConfiguratorMode = "opening" | "machine" | "systems" | "fit" | "build" | "summary";

const DEFAULT_CONFIG: BuildConfig = {
  finish: "CARBON",
  size: "L",
  wheelFormat: "29/29",
  forkId: "",
  shockId: "",
  frontBrakeId: "",
  rearBrakeId: "",
  drivetrainId: "",
  wheelsId: "",
  frontTyreId: "",
  rearTyreId: "",
  cockpitId: "",
  gripsId: "",
};

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const initialModeParam = searchParams.get("mode") as ConfiguratorMode | null;
  const buildRefParam = searchParams.get("build") || searchParams.get("buildRef") || searchParams.get("ref");
  const sizeParam = searchParams.get("size");

  const [mode, setMode] = useState<ConfiguratorMode>(
    initialModeParam || (buildRefParam ? "summary" : "opening")
  );
  const [selectedComponentForTheatre, setSelectedComponentForTheatre] =
    useState<Project01Component | null>(null);
  const [config, setConfig] = useState<BuildConfig>(DEFAULT_CONFIG);
  const [loadedBuildRef, setLoadedBuildRef] = useState<string | null>(null);

  useEffect(() => {
    if (sizeParam && ["S", "M", "L", "XL"].includes(sizeParam.toUpperCase())) {
      setConfig((prev) => ({ ...prev, size: sizeParam.toUpperCase() as "S" | "M" | "L" | "XL" }));
    }

    if (buildRefParam) {
      fetch(`/api/builds?ref=${encodeURIComponent(buildRefParam)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.build) {
            const b = data.build;
            setLoadedBuildRef(b.build_reference);
            setConfig({
              finish: (b.finish || "CARBON").toUpperCase() as "GLACIER" | "CARBON",
              size: (b.frame_size || "L").toUpperCase() as "S" | "M" | "L" | "XL",
              wheelFormat: (b.wheel_format || "29/29") as "29/29" | "MX",
              forkId: b.selections?.fork || b.selections?.["fork"] || "",
              shockId: b.selections?.["rear-shock"] || b.selections?.shock || "",
              frontBrakeId: b.selections?.["brakes-front"] || b.selections?.frontBrake || "",
              rearBrakeId: b.selections?.["brakes-rear"] || b.selections?.rearBrake || "",
              drivetrainId: b.selections?.drivetrain || "",
              wheelsId: b.selections?.wheels || "",
              frontTyreId: b.selections?.frontTyre || "",
              rearTyreId: b.selections?.rearTyre || "",
              cockpitId: b.selections?.cockpit || "",
              gripsId: b.selections?.grips || "",
            });
            setMode("summary");
          }
        })
        .catch((err) => console.error("Failed to load saved build:", err));
    }
  }, [buildRefParam, sizeParam]);

  const handleCloseTheatre = () => {
    setSelectedComponentForTheatre(null);
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-white min-h-screen pt-20">
      {/* Component Theatre Overlay Modal */}
      {selectedComponentForTheatre && (
        <ComponentTheatre
          component={selectedComponentForTheatre}
          onClose={handleCloseTheatre}
        />
      )}

      {/* Main Mode Viewport */}
      {mode === "opening" && (
        <OpeningHero
          finish={config.finish}
          onFinishChange={(finish) => setConfig((prev) => ({ ...prev, finish }))}
          onSelectMode={(m) => setMode(m)}
        />
      )}

      {mode === "machine" && (
        <MachineStudio
          finish={config.finish}
          onFinishChange={(finish) => setConfig((prev) => ({ ...prev, finish }))}
          onNavigateToSystems={() => setMode("systems")}
        />
      )}

      {mode === "systems" && (
        <SystemsExplorer
          finish={config.finish}
          onSelectComponentForTheatre={setSelectedComponentForTheatre}
          onNavigateToFit={() => setMode("fit")}
        />
      )}

      {mode === "fit" && (
        <FitEngine
          onFitCalculated={({ recommendedSize }) => {
            setConfig((prev) => ({ ...prev, size: recommendedSize }));
          }}
          onNavigateToBuild={() => setMode("build")}
        />
      )}

      {mode === "build" && (
        <BuildStage
          config={config}
          onUpdateConfig={(updates) => setConfig((prev) => ({ ...prev, ...updates }))}
          onNavigateToSummary={() => setMode("summary")}
          onOpenComponentTheatre={setSelectedComponentForTheatre}
        />
      )}

      {mode === "summary" && (
        <BuildSummary
          config={config}
          initialBuildRef={loadedBuildRef}
          onEditBuild={() => setMode("build")}
        />
      )}
    </div>
  );
}

export default function ConfiguratorClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-[#0a0a0a] text-white min-h-screen pt-32 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#647789]">
          LOADING CONFIGURATOR...
        </div>
      }
    >
      <ConfiguratorContent />
    </Suspense>
  );
}
