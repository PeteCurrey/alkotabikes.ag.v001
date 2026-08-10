"use client";

import React from "react";

// Schematic environment: flat ambient + directional technical lighting.
// No contact shadows, no environment maps, no HDR — this is engineering documentation.
const ambientLight    = "ambientLight"    as any;
const directionalLight = "directionalLight" as any;

export default function SchematicEnvironment() {
  return (
    <>
      {/* Flat ambient — ensures wireframe is readable on all angles */}
      <ambientLight intensity={1.6} color="#c8dde8" />

      {/* Primary key light — top-right front, creates mild depth cue */}
      <directionalLight position={[4, 6, 4]}  intensity={0.5} color="#e8f4ff" />

      {/* Rim light — top-rear-left, separates geometry from background */}
      <directionalLight position={[-3, 4, -4]} intensity={0.25} color="#a8c8e0" />

      {/* No contact shadows — shadows imply physical surface finish assertion */}
    </>
  );
}
