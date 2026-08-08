"use client";

import React, { useState } from "react";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Info } from "lucide-react";

interface KinematicChartProps {
  type: "leverage" | "antiSquat" | "axlePath";
}

export default function KinematicChart({ type }: KinematicChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const getChartData = () => {
    switch (type) {
      case "leverage":
        return {
          title: "LEVERAGE RATIO CURVE",
          yLabel: "Leverage Ratio (mm/mm)",
          xLabel: "Rear Wheel Travel (mm)",
          unit: "",
          points: [
            { x: 0, y: 3.10, label: "0mm (Unloaded)" },
            { x: 20, y: 2.95, label: "20mm" },
            { x: 40, y: 2.82, label: "40mm" },
            { x: 48, y: 2.76, label: "48mm (30% Sag)" },
            { x: 80, y: 2.58, label: "80mm" },
            { x: 120, y: 2.38, label: "120mm" },
            { x: 160, y: 2.22, label: "160mm (Bottom Out)" },
          ],
          note: "28.4% End-stroke progression rate designed for high-volume air and coil shocks.",
        };
      case "antiSquat":
        return {
          title: "PEDAL ANTI-SQUAT CURVE",
          yLabel: "Anti-Squat (%)",
          xLabel: "Rear Wheel Travel (mm)",
          unit: "%",
          points: [
            { x: 0, y: 135, label: "0mm (Unloaded)" },
            { x: 20, y: 124, label: "20mm" },
            { x: 48, y: 112, label: "48mm (30% Sag)" },
            { x: 80, y: 88, label: "80mm" },
            { x: 120, y: 60, label: "120mm" },
            { x: 160, y: 32, label: "160mm (Bottom Out)" },
          ],
          note: "Maintains >110% anti-squat around sag to eliminate pedal bob while reducing kickback deep in travel.",
        };
      case "axlePath":
      default:
        return {
          title: "REAR AXLE TRAJECTORY",
          yLabel: "Rearward Path (mm)",
          xLabel: "Vertical Travel (mm)",
          unit: "mm",
          points: [
            { x: 0, y: 0.0, label: "0mm" },
            { x: 48, y: 6.2, label: "48mm (Sag Peak Rearward)" },
            { x: 80, y: 5.1, label: "80mm" },
            { x: 120, y: 1.2, label: "120mm" },
            { x: 160, y: -4.5, label: "160mm" },
          ],
          note: "Initial rearward axle movement carries momentum over square-edged alpine obstacles.",
        };
    }
  };

  const data = getChartData();
  const width = 600;
  const height = 300;
  const padding = 50;

  // Scale calculations
  const xValues = data.points.map((p) => p.x);
  const yValues = data.points.map((p) => p.y);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues) * 0.9;
  const maxY = Math.max(...yValues) * 1.1;

  const getSvgX = (x: number) =>
    padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const getSvgY = (y: number) =>
    height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

  const pointsString = data.points
    .map((p) => `${getSvgX(p.x)},${getSvgY(p.y)}`)
    .join(" ");

  return (
    <div className="bg-alkota-carbon text-alkota-white p-6 border border-white/10 tech-grid-dark rounded-none space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="font-mono text-[10px] text-alkota-signal uppercase tracking-wider">
            TELEMETRY / {data.title}
          </div>
          <h4 className="font-display text-lg font-bold text-alkota-white">
            {data.title}
          </h4>
        </div>
        <TechnicalAnnotation label="DEMONSTRATION DATA" variant="slate" />
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[500px]"
        >
          {/* Grid lines */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#282D31"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#282D31"
            strokeWidth="1"
          />

          {/* Background area fill */}
          <polygon
            points={`${padding},${height - padding} ${pointsString} ${width - padding},${height - padding}`}
            fill="url(#chartGrad)"
            opacity="0.2"
          />

          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#647789" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Polyline */}
          <polyline
            fill="none"
            stroke="#647789"
            strokeWidth="2.5"
            points={pointsString}
          />

          {/* Data Points */}
          {data.points.map((p, idx) => {
            const cx = getSvgX(p.x);
            const cy = getSvgY(p.y);
            const isHovered = hoverIndex === idx;

            return (
              <g key={idx} className="cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? "6" : "4"}
                  fill={isHovered ? "#FFFFFF" : "#647789"}
                  stroke="#0B0D0F"
                  strokeWidth="2"
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
                {isHovered && (
                  <text
                    x={cx}
                    y={cy - 12}
                    fill="#647789"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {p.y} {data.unit}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer Info */}
      <div className="flex items-start gap-2 text-xs font-mono text-alkota-slate pt-2 border-t border-white/10">
        <Info className="w-4 h-4 text-alkota-signal flex-shrink-0 mt-0.5" />
        <p>{data.note}</p>
      </div>
    </div>
  );
}
