"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Box, Layers, Maximize2, Move3D } from "lucide-react";

export default function CADViewerPlaceholder() {
  const [wireframe, setWireframe] = useState(true);
  const [activeLayer, setActiveLayer] = useState<"FRONT" | "REAR" | "LINKAGE">("FRONT");

  return (
    <div className="relative w-full h-[400px] bg-alkota-carbon text-alkota-white p-6 border border-white/10 tech-grid-dark flex flex-col justify-between overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <TechnicalAnnotation label="CAD / FEA ENVIRONMENT" value="REV 001" variant="signal" />
          <span className="font-mono text-[10px] text-alkota-slate uppercase hidden sm:inline">
            SYSTEM LOAD VECTOR MODELING
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1 font-mono text-[10px] uppercase border transition-all ${
              wireframe
                ? "border-alkota-signal text-alkota-signal bg-alkota-signal/10"
                : "border-white/10 text-alkota-slate"
            }`}
          >
            {wireframe ? "WIREFRAME" : "SOLID SHADED"}
          </button>
        </div>
      </div>

      {/* Interactive Wireframe Canvas Visual */}
      <div className="relative my-auto flex items-center justify-center">
        <svg
          viewBox="0 0 800 400"
          className="w-full max-w-2xl h-auto transition-all duration-300"
        >
          {/* Grid background lines */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="#282D31" strokeDasharray="4 4" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="#282D31" strokeDasharray="4 4" />

          {/* Front Triangle CAD Wireframe */}
          <polygon
            points="650,100 400,140 360,300 400,140"
            fill={wireframe ? "none" : "rgba(40,45,49,0.5)"}
            stroke={activeLayer === "FRONT" ? "#C8FF00" : "#737C84"}
            strokeWidth={activeLayer === "FRONT" ? "2.5" : "1.5"}
            strokeDasharray={wireframe ? "6 3" : undefined}
          />
          <line
            x1="650"
            y1="100"
            x2="360"
            y2="300"
            stroke={activeLayer === "FRONT" ? "#C8FF00" : "#737C84"}
            strokeWidth={activeLayer === "FRONT" ? "2.5" : "1.5"}
          />

          {/* Rear Swingarm CAD */}
          <line
            x1="360"
            y1="300"
            x2="150"
            y2="290"
            stroke={activeLayer === "REAR" ? "#C8FF00" : "#737C84"}
            strokeWidth={activeLayer === "REAR" ? "2.5" : "1.5"}
            strokeDasharray={wireframe ? "4 4" : undefined}
          />
          <line
            x1="400"
            y1="140"
            x2="150"
            y2="290"
            stroke={activeLayer === "REAR" ? "#C8FF00" : "#737C84"}
            strokeWidth={activeLayer === "REAR" ? "2.5" : "1.5"}
          />

          {/* Linkage Node Highlights */}
          <circle cx="650" cy="100" r="6" fill="#C8FF00" />
          <circle cx="400" cy="140" r="6" fill="#C8FF00" />
          <circle cx="360" cy="300" r="8" fill="#C8FF00" />
          <circle cx="150" cy="290" r="6" fill="#C8FF00" />

          {/* Crosshair Coordinates */}
          <text x="660" y="95" fill="#737C84" fontSize="10" fontFamily="monospace">
            [+650, +100] HEADTUBE
          </text>
          <text x="340" y="320" fill="#737C84" fontSize="10" fontFamily="monospace">
            [+360, -300] BB SHELL
          </text>
        </svg>
      </div>

      {/* Layer Toggle Bar */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 z-10 font-mono text-xs text-alkota-slate">
        <div className="flex items-center space-x-2">
          <Move3D className="w-4 h-4 text-alkota-signal" />
          <span className="uppercase">ACTIVE CAD LAYER:</span>
        </div>

        <div className="flex space-x-2">
          {(["FRONT", "REAR", "LINKAGE"] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-2.5 py-1 text-[10px] uppercase border ${
                activeLayer === layer
                  ? "border-alkota-signal text-alkota-white bg-alkota-signal/10 font-bold"
                  : "border-white/10 text-alkota-slate hover:text-white"
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
