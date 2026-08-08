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

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const initialModeParam = searchParams.get("mode") as ConfiguratorMode | null;
  const initialBuildParam = searchParams.get("build");

  const [mode, setMode] = useState<ConfiguratorMode>(initialModeParam || "opening");
  const [selectedComponentForTheatre, setSelectedComponentForTheatre] = useState<Project01Component | null>(null);

  // Configuration state
  const [config, setConfig] = useState<BuildConfig>({
    finish: "CARBON",
    size: "L",
    wheelFormat: "29/29",
    forkId: "fork-fox38-factory",
    shockId: "shock-fox-floatx2-factory",
    frontBrakeId: "brake-front-hope-evov6ti",
    rearBrakeId: "brake-rear-hope-tr4",
    drivetrainId: "drivetrain-sram-xx-eagle-axs",
    wheelsId: "wheels-dt-swiss-exc1200",
    frontTyreId: "tyre-front-maxxis-assegai",
    rearTyreId: "tyre-rear-maxxis-minionDHR",
    cockpitId: "cockpit-renthal-fatbar-carbon",
    gripsId: "grips-ergon-ge1-evo",
  });

  useEffect(() => {
    if (initialModeParam && ["opening", "machine", "systems", "fit", "build", "summary"].includes(initialModeParam)) {
      setMode(initialModeParam);
    }
  }, [initialModeParam]);

  const handleUpdateConfig = (updated: Partial<BuildConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleFitCalculated = (fitResult: { recommendedSize: "S" | "M" | "L" | "XL" }) => {
    setConfig((prev) => ({ ...prev, size: fitResult.recommendedSize }));
  };

  return (
    <div className="w-full min-h-screen bg-alkota-carbon text-alkota-white pt-20">
      {/* Modes Navigation Header Bar */}
      <div className="w-full bg-alkota-black/90 border-b border-white/10 sticky top-16 z-40 backdrop-blur-md font-mono text-xs px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-alkota-signal animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider">PROJECT 01 CONFIGURATOR V2</span>
            <span className="text-alkota-slate hidden sm:inline">|</span>
            <span className="text-alkota-signal hidden sm:inline font-bold">R00 CONTROLLED BASELINE</span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: "opening", label: "HOME" },
              { id: "machine", label: "01 MACHINE" },
              { id: "systems", label: "02 SYSTEMS" },
              { id: "fit", label: "03 FIT" },
              { id: "build", label: "04 BUILD" },
              { id: "summary", label: "SUMMARY" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id as ConfiguratorMode)}
                className={`px-2.5 py-1 border text-[10px] uppercase font-bold transition-all ${
                  mode === tab.id
                    ? "border-alkota-signal bg-alkota-signal text-alkota-black"
                    : "border-white/10 text-alkota-slate hover:text-white bg-alkota-carbon/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Viewport per Mode */}
      {mode === "opening" && (
        <OpeningHero
          finish={config.finish}
          onFinishChange={(f) => handleUpdateConfig({ finish: f })}
          onSelectMode={(m) => setMode(m)}
        />
      )}

      {mode === "machine" && (
        <MachineStudio
          finish={config.finish}
          onFinishChange={(f) => handleUpdateConfig({ finish: f })}
          onNavigateToSystems={() => setMode("systems")}
        />
      )}

      {mode === "systems" && (
        <SystemsExplorer
          finish={config.finish}
          onSelectComponentForTheatre={(comp) => setSelectedComponentForTheatre(comp)}
          onNavigateToFit={() => setMode("fit")}
        />
      )}

      {mode === "fit" && (
        <FitEngine
          onFitCalculated={handleFitCalculated}
          onNavigateToBuild={() => setMode("build")}
        />
      )}

      {mode === "build" && (
        <BuildStage
          config={config}
          onUpdateConfig={handleUpdateConfig}
          onNavigateToSummary={() => setMode("summary")}
          onOpenComponentTheatre={(comp) => setSelectedComponentForTheatre(comp)}
        />
      )}

      {mode === "summary" && (
        <BuildSummary
          config={config}
          onEditBuild={() => setMode("build")}
        />
      )}

      {/* Component Theatre Modal Overlay */}
      {selectedComponentForTheatre && (
        <ComponentTheatre
          component={selectedComponentForTheatre}
          onClose={() => setSelectedComponentForTheatre(null)}
        />
      )}
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-alkota-carbon pt-32 text-center font-mono text-xs text-alkota-slate">LOADING PROJECT 01 DIGITAL SHOWROOM...</div>}>
      <ConfiguratorContent />
    </Suspense>
  );
}
