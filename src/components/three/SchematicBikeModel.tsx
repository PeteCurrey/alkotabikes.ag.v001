"use client";

/**
 * ALKOTA PROJECT 01 — SCHEMATIC BIKE MODEL
 *
 * Procedural primitive geometry with named slot groups matching the model adapter
 * interface. This is a SCHEMATIC TECHNICAL VIEWER, not a product render.
 *
 * Slot group names are the contract: when a real GLB with matching node names
 * is available, it replaces this file. The configurator does not change.
 *
 * See docs/glb-node-naming.md for commissioning spec.
 */

import React, { useMemo } from "react";
import * as THREE from "three";
import { Edges } from "@react-three/drei";
import { ModelSlotId, EXPLODE_OFFSETS } from "./modelAdapter";

export type ViewMode = "GHOST" | "SOLID" | "WIREFRAME";

export interface SchematicBikeModelProps {
  focusedSlotId: ModelSlotId | null;
  /** 0 = collapsed, 1 = fully exploded. Animated externally via useFrame. */
  explodeProgress: number;
  wheelFormat: string;
  viewMode?: ViewMode;
  onSlotClick: (slotId: ModelSlotId) => void;
}

/** Compute world position = base + (explodeOffset * progress) */
function ep(base: [number, number, number], id: ModelSlotId, p: number): [number, number, number] {
  const o = EXPLODE_OFFSETS[id] || [0, 0, 0];
  return [base[0] + o[0] * p, base[1] + o[1] * p, base[2] + o[2] * p];
}

/** Which slots are highlighted (primary + linked) for a given focused system slot */
function highlightedSlots(focused: ModelSlotId | null): Set<ModelSlotId> {
  if (!focused) return new Set();
  const set = new Set<ModelSlotId>([focused]);
  // Wheels: both highlighted together
  if (focused === "wheel-front") set.add("wheel-rear");
  if (focused === "wheel-rear") set.add("wheel-front");
  // Linkage and shock go together
  if (focused === "rear-shock") set.add("linkage");
  if (focused === "linkage") set.add("rear-shock");
  return set;
}

export default function SchematicBikeModel({
  focusedSlotId,
  explodeProgress,
  wheelFormat,
  viewMode = "GHOST",
  onSlotClick,
}: SchematicBikeModelProps) {
  const p = explodeProgress;
  const isMX = wheelFormat === "MX" || wheelFormat.includes("MX");
  const rearWheelRadius = isMX ? 0.42 : 0.46;
  const frontWheelRadius = 0.46;

  // ── Shared schematic materials ─────────────────────────────────────────────
  const matWire = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#2a4865",
    wireframe: true,
  }), []);

  const matWireHighlight = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#60a5fa",
    wireframe: true,
  }), []);

  const matGhost = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#0e1722",
    transparent: true,
    opacity: 0.14,
    wireframe: false,
    depthWrite: false,
  }), []);

  const matSolid = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#0c1015",
    transparent: false,
    wireframe: false,
  }), []);

  const matHighlight = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#1a73e8",
    transparent: true,
    opacity: 0.88,
    wireframe: false,
  }), []);

  const highlighted = highlightedSlots(focusedSlotId);
  const anyFocused = focusedSlotId !== null;

  /** Pick surface material for a given slot */
  const m = (id: ModelSlotId): THREE.Material => {
    if (viewMode === "WIREFRAME") {
      return highlighted.has(id) ? matWireHighlight : matWire;
    }
    if (highlighted.has(id)) {
      return matHighlight;
    }
    if (viewMode === "SOLID") {
      return matSolid;
    }
    // Default GHOST mode
    return matGhost;
  };

  /** Pick edge contour line color */
  const edgeColor = (id: ModelSlotId): string => {
    if (highlighted.has(id)) return "#60a5fa";
    if (viewMode === "SOLID") return "#4a5a6a";
    return "#2e4a66";
  };

  const clickHandler = (id: ModelSlotId) =>
    (e: any) => {
      e.stopPropagation();
      onSlotClick(id);
    };

  return (
    <group position={[0, 0, 0]}>

      {/* ── FRONT WHEEL ASSEMBLY ──────────────────────────────────────────── */}
      <group
        name="wheel-front"
        position={ep([1.1, frontWheelRadius, 0], "wheel-front", p)}
        onClick={clickHandler("wheel-front")}
      >
        {/* Tyre */}
        <mesh material={m("wheel-front")} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[frontWheelRadius, 0.055, 10, 32]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-front")} threshold={15} />}
        </mesh>
        {/* Rim */}
        <mesh material={m("wheel-front")} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[frontWheelRadius - 0.045, 0.018, 10, 32]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-front")} threshold={15} />}
        </mesh>
        {/* Hub */}
        <mesh material={m("wheel-front")} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.038, 0.038, 0.14, 12]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-front")} threshold={15} />}
        </mesh>
        {/* Spokes indicator */}
        <mesh material={m("wheel-front")} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[frontWheelRadius - 0.05, 0.004, 0.003, 4]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-front")} threshold={15} />}
        </mesh>
      </group>

      {/* ── REAR WHEEL ASSEMBLY ───────────────────────────────────────────── */}
      <group
        name="wheel-rear"
        position={ep([-1.1, rearWheelRadius, 0], "wheel-rear", p)}
        onClick={clickHandler("wheel-rear")}
      >
        <mesh material={m("wheel-rear")} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rearWheelRadius, 0.055, 10, 32]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-rear")} threshold={15} />}
        </mesh>
        <mesh material={m("wheel-rear")} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rearWheelRadius - 0.045, 0.018, 10, 32]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-rear")} threshold={15} />}
        </mesh>
        {/* Hub + cassette stack */}
        <mesh material={m("wheel-rear")} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.042, 0.16, 12]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-rear")} threshold={15} />}
        </mesh>
        <mesh material={m("wheel-rear")} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[rearWheelRadius - 0.05, 0.004, 0.003, 4]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("wheel-rear")} threshold={15} />}
        </mesh>
      </group>

      {/* ── FRONT FORK ───────────────────────────────────────────────────── */}
      <group
        name="fork"
        position={ep([1.1, frontWheelRadius, 0], "fork", p)}
        rotation={[0, 0, -0.38]}
        onClick={clickHandler("fork")}
      >
        {/* Lower legs */}
        <mesh material={m("fork")} position={[0, 0.32, 0.065]}>
          <cylinderGeometry args={[0.022, 0.022, 0.58, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("fork")} threshold={15} />}
        </mesh>
        <mesh material={m("fork")} position={[0, 0.32, -0.065]}>
          <cylinderGeometry args={[0.022, 0.022, 0.58, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("fork")} threshold={15} />}
        </mesh>
        {/* Stanchion tubes */}
        <mesh material={m("fork")} position={[0, 0.66, 0.065]}>
          <cylinderGeometry args={[0.017, 0.017, 0.36, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("fork")} threshold={15} />}
        </mesh>
        <mesh material={m("fork")} position={[0, 0.66, -0.065]}>
          <cylinderGeometry args={[0.017, 0.017, 0.36, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("fork")} threshold={15} />}
        </mesh>
        {/* Crown */}
        <mesh material={m("fork")} position={[0, 0.85, 0]}>
          <boxGeometry args={[0.05, 0.04, 0.18]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("fork")} threshold={15} />}
        </mesh>
      </group>

      {/* ── MAIN CHASSIS — FRONT TRIANGLE ────────────────────────────────── */}
      <group
        name="chassis"
        position={ep([0, 0.45, 0], "chassis", p)}
        onClick={clickHandler("chassis")}
      >
        {/* Head tube */}
        <mesh material={m("chassis")} position={[0.78, 0.58, 0]} rotation={[0, 0, -0.38]}>
          <cylinderGeometry args={[0.042, 0.042, 0.19, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("chassis")} threshold={15} />}
        </mesh>
        {/* Top tube */}
        <mesh material={m("chassis")} position={[0.3, 0.52, 0]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.033, 0.038, 0.86, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("chassis")} threshold={15} />}
        </mesh>
        {/* Down tube */}
        <mesh material={m("chassis")} position={[0.35, 0.28, 0]} rotation={[0, 0, -0.42]}>
          <cylinderGeometry args={[0.048, 0.054, 0.92, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("chassis")} threshold={15} />}
        </mesh>
        {/* Seat tube */}
        <mesh material={m("chassis")} position={[-0.15, 0.36, 0]} rotation={[0, 0, -0.22]}>
          <cylinderGeometry args={[0.038, 0.044, 0.65, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("chassis")} threshold={15} />}
        </mesh>
        {/* Bottom bracket shell */}
        <mesh material={m("chassis")} position={[-0.05, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.044, 0.044, 0.11, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("chassis")} threshold={15} />}
        </mesh>
      </group>

      {/* ── REAR TRIANGLE / SWINGARM ─────────────────────────────────────── */}
      <group
        name="rear-triangle"
        position={ep([-0.05, 0.47, 0], "rear-triangle", p)}
        onClick={clickHandler("rear-triangle")}
      >
        {/* Chainstays */}
        <mesh material={m("rear-triangle")} position={[-0.5, -0.02, 0.052]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.72, 0.032, 0.022]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("rear-triangle")} threshold={15} />}
        </mesh>
        <mesh material={m("rear-triangle")} position={[-0.5, -0.02, -0.052]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.72, 0.032, 0.022]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("rear-triangle")} threshold={15} />}
        </mesh>
        {/* Seatstays */}
        <mesh material={m("rear-triangle")} position={[-0.45, 0.22, 0.052]} rotation={[0, 0, 0.58]}>
          <boxGeometry args={[0.62, 0.026, 0.018]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("rear-triangle")} threshold={15} />}
        </mesh>
        <mesh material={m("rear-triangle")} position={[-0.45, 0.22, -0.052]} rotation={[0, 0, 0.58]}>
          <boxGeometry args={[0.62, 0.026, 0.018]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("rear-triangle")} threshold={15} />}
        </mesh>
      </group>

      {/* ── FOUR-BAR LINKAGE ─────────────────────────────────────────────── */}
      <group
        name="linkage"
        position={ep([-0.15, 0.72, 0], "linkage", p)}
        onClick={clickHandler("linkage")}
      >
        <mesh material={m("linkage")} position={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.065, 0.11]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("linkage")} threshold={15} />}
        </mesh>
        {/* Link rod */}
        <mesh material={m("linkage")} position={[0, -0.12, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("linkage")} threshold={15} />}
        </mesh>
      </group>

      {/* ── REAR SHOCK UNIT ──────────────────────────────────────────────── */}
      <group
        name="rear-shock"
        position={ep([-0.05, 0.65, 0], "rear-shock", p)}
        onClick={clickHandler("rear-shock")}
      >
        {/* Shock body */}
        <mesh material={m("rear-shock")} rotation={[0, 0, 0.75]}>
          <cylinderGeometry args={[0.026, 0.026, 0.24, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("rear-shock")} threshold={15} />}
        </mesh>
        {/* Air sleeve / can */}
        <mesh material={m("rear-shock")} position={[-0.06, 0.06, 0]} rotation={[0, 0, 0.75]}>
          <cylinderGeometry args={[0.036, 0.036, 0.14, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("rear-shock")} threshold={15} />}
        </mesh>
        {/* Shaft */}
        <mesh material={m("rear-shock")} position={[0.1, -0.1, 0]} rotation={[0, 0, 0.75]}>
          <cylinderGeometry args={[0.014, 0.014, 0.12, 8]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("rear-shock")} threshold={15} />}
        </mesh>
      </group>

      {/* ── COCKPIT — STEM + HANDLEBAR ────────────────────────────────────── */}
      <group
        name="cockpit"
        position={ep([0.75, 1.1, 0], "cockpit", p)}
        onClick={clickHandler("cockpit")}
      >
        {/* Stem body */}
        <mesh material={m("cockpit")} position={[-0.03, 0, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.09, 0.042, 0.042]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("cockpit")} threshold={15} />}
        </mesh>
        {/* Handlebar */}
        <mesh material={m("cockpit")} position={[0.01, 0.022, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.82, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("cockpit")} threshold={15} />}
        </mesh>
        {/* Bar ends */}
        <mesh material={m("cockpit")} position={[0.01, 0.022, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("cockpit")} threshold={15} />}
        </mesh>
        <mesh material={m("cockpit")} position={[0.01, 0.022, -0.38]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("cockpit")} threshold={15} />}
        </mesh>
      </group>

      {/* ── DROPPER POST + SADDLE ─────────────────────────────────────────── */}
      <group
        name="dropper-post"
        position={ep([-0.22, 0.95, 0], "dropper-post", p)}
        onClick={clickHandler("dropper-post")}
      >
        {/* Post stanchion */}
        <mesh material={m("dropper-post")} position={[0, 0, 0]} rotation={[0, 0, -0.22]}>
          <cylinderGeometry args={[0.017, 0.017, 0.36, 10]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("dropper-post")} threshold={15} />}
        </mesh>
        {/* Saddle rails */}
        <mesh material={m("dropper-post")} position={[0, 0.19, 0]} rotation={[0, 0, 0.04]}>
          <boxGeometry args={[0.28, 0.036, 0.007]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("dropper-post")} threshold={15} />}
        </mesh>
        {/* Saddle shell */}
        <mesh material={m("dropper-post")} position={[0.02, 0.21, 0]}>
          <boxGeometry args={[0.27, 0.028, 0.115]} />
          {viewMode !== "WIREFRAME" && <Edges color={edgeColor("dropper-post")} threshold={15} />}
        </mesh>
      </group>

    </group>
  );
}
