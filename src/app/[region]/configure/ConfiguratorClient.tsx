"use client";

import React, { useState, Suspense } from "react";
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

  const [mode, setMode] = useState<ConfiguratorMode>(initialModeParam || "opening");
  const [selectedComponentForTheatre, setSelectedComponentForTheatre] =
    useState<Project01Component | null>(null);
  const [config, setConfig] = useState<BuildConfig>(DEFAULT_CONFIG);

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
