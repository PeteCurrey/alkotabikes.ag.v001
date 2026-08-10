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
import { ModelSlotId, EXPLODE_OFFSETS } from "./modelAdapter";

// R3F React 19 JSX shims
const group = "group" as any;
const mesh = "mesh" as any;
const torusGeometry = "torusGeometry" as any;
const cylinderGeometry = "cylinderGeometry" as any;
const boxGeometry = "boxGeometry" as any;

export interface SchematicBikeModelProps {
  focusedSlotId: ModelSlotId | null;
  /** 0 = collapsed, 1 = fully exploded. Animated externally via useFrame. */
  explodeProgress: number;
  wheelFormat: string;
  onSlotClick: (slotId: ModelSlotId) => void;
}

/** Compute world position = base + (explodeOffset * progress) */
function ep(base: [number, number, number], id: ModelSlotId, p: number): [number, number, number] {
  const o = EXPLODE_OFFSETS[id];
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
  onSlotClick,
}: SchematicBikeModelProps) {
  const p = explodeProgress;
  const isMX = wheelFormat === "MX" || wheelFormat.includes("MX");
  const rearWheelRadius = isMX ? 0.42 : 0.46;
  const frontWheelRadius = 0.46;

  // ── Shared schematic materials ─────────────────────────────────────────────
  // Three modes only — no PBR, no metalness, no Kashima gold.
  const matWire = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#2a5f80",
    wireframe: true,
  }), []);

  const matGhost = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#647789",
    transparent: true,
    opacity: 0.1,
    wireframe: false,
    depthWrite: false,
  }), []);

  const matHighlight = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#1a73e8",
    transparent: true,
    opacity: 0.82,
    wireframe: false,
  }), []);

  const matHighlightEdge = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#60a5fa",
    wireframe: true,
  }), []);

  const highlighted = highlightedSlots(focusedSlotId);
  const anyFocused = focusedSlotId !== null;

  /** Pick material for a given slot */
  const m = (id: ModelSlotId): THREE.Material => {
    if (!anyFocused) return matWire;
    if (highlighted.has(id)) return matHighlight;
    return matGhost;
  };

  /** Pick edge material (shown on highlighted slots) */
  const me = (id: ModelSlotId): THREE.Material => {
    if (!anyFocused) return matWire;
    if (highlighted.has(id)) return matHighlightEdge;
    return matGhost;
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
        </mesh>
        {/* Rim */}
        <mesh material={me("wheel-front")} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[frontWheelRadius - 0.045, 0.018, 10, 32]} />
        </mesh>
        {/* Hub */}
        <mesh material={me("wheel-front")} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.038, 0.038, 0.14, 12]} />
        </mesh>
        {/* Spokes indicator (simplified cross disc) */}
        <mesh material={me("wheel-front")} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[frontWheelRadius - 0.05, 0.004, 0.003, 4]} />
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
        </mesh>
        <mesh material={me("wheel-rear")} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rearWheelRadius - 0.045, 0.018, 10, 32]} />
        </mesh>
        {/* Hub + cassette stack */}
        <mesh material={me("wheel-rear")} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.042, 0.16, 12]} />
        </mesh>
        <mesh material={me("wheel-rear")} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[rearWheelRadius - 0.05, 0.004, 0.003, 4]} />
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
        </mesh>
        <mesh material={m("fork")} position={[0, 0.32, -0.065]}>
          <cylinderGeometry args={[0.022, 0.022, 0.58, 10]} />
        </mesh>
        {/* Stanchion tubes (upper, lighter gauge) */}
        <mesh material={me("fork")} position={[0, 0.66, 0.065]}>
          <cylinderGeometry args={[0.017, 0.017, 0.36, 10]} />
        </mesh>
        <mesh material={me("fork")} position={[0, 0.66, -0.065]}>
          <cylinderGeometry args={[0.017, 0.017, 0.36, 10]} />
        </mesh>
        {/* Crown */}
        <mesh material={me("fork")} position={[0, 0.85, 0]}>
          <boxGeometry args={[0.05, 0.04, 0.18]} />
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
        </mesh>
        {/* Top tube */}
        <mesh material={me("chassis")} position={[0.3, 0.52, 0]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.033, 0.038, 0.86, 10]} />
        </mesh>
        {/* Down tube */}
        <mesh material={m("chassis")} position={[0.35, 0.28, 0]} rotation={[0, 0, -0.42]}>
          <cylinderGeometry args={[0.048, 0.054, 0.92, 10]} />
        </mesh>
        {/* Seat tube */}
        <mesh material={me("chassis")} position={[-0.15, 0.36, 0]} rotation={[0, 0, -0.22]}>
          <cylinderGeometry args={[0.038, 0.044, 0.65, 10]} />
        </mesh>
        {/* Bottom bracket shell */}
        <mesh material={m("chassis")} position={[-0.05, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.044, 0.044, 0.11, 10]} />
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
        </mesh>
        <mesh material={m("rear-triangle")} position={[-0.5, -0.02, -0.052]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.72, 0.032, 0.022]} />
        </mesh>
        {/* Seatstays */}
        <mesh material={me("rear-triangle")} position={[-0.45, 0.22, 0.052]} rotation={[0, 0, 0.58]}>
          <boxGeometry args={[0.62, 0.026, 0.018]} />
        </mesh>
        <mesh material={me("rear-triangle")} position={[-0.45, 0.22, -0.052]} rotation={[0, 0, 0.58]}>
          <boxGeometry args={[0.62, 0.026, 0.018]} />
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
        </mesh>
        {/* Link rod */}
        <mesh material={me("linkage")} position={[0, -0.12, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
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
        </mesh>
        {/* Air sleeve / can */}
        <mesh material={me("rear-shock")} position={[-0.06, 0.06, 0]} rotation={[0, 0, 0.75]}>
          <cylinderGeometry args={[0.036, 0.036, 0.14, 10]} />
        </mesh>
        {/* Shaft */}
        <mesh material={me("rear-shock")} position={[0.1, -0.1, 0]} rotation={[0, 0, 0.75]}>
          <cylinderGeometry args={[0.014, 0.014, 0.12, 8]} />
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
        </mesh>
        {/* Handlebar */}
        <mesh material={me("cockpit")} position={[0.01, 0.022, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.82, 10]} />
        </mesh>
        {/* Bar ends (grips footprint) */}
        <mesh material={me("cockpit")} position={[0.01, 0.022, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
        </mesh>
        <mesh material={me("cockpit")} position={[0.01, 0.022, -0.38]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
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
        </mesh>
        {/* Saddle rails placeholder */}
        <mesh material={me("dropper-post")} position={[0, 0.19, 0]} rotation={[0, 0, 0.04]}>
          <boxGeometry args={[0.28, 0.036, 0.007]} />
        </mesh>
        {/* Saddle shell */}
        <mesh material={m("dropper-post")} position={[0.02, 0.21, 0]}>
          <boxGeometry args={[0.27, 0.028, 0.115]} />
        </mesh>
      </group>

    </group>
  );
}
