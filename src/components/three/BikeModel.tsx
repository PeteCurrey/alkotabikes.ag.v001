"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { FinishOption } from "@/lib/configurator/types";

// R3F React 19 JSX element helpers
const group = "group" as any;
const mesh = "mesh" as any;
const torusGeometry = "torusGeometry" as any;
const cylinderGeometry = "cylinderGeometry" as any;
const boxGeometry = "boxGeometry" as any;

interface BikeModelProps {
  finish: FinishOption;
  wheelFormat: string;
}

export default function BikeModel({ finish, wheelFormat }: BikeModelProps) {
  // Material parameters based on selected finish
  const frameMaterial = useMemo(() => {
    switch (finish) {
      case "GLACIER":
        return new THREE.MeshStandardMaterial({
          color: "#F4F6F7",
          metalness: 0.2,
          roughness: 0.15,
        });
      case "CARBON":
        return new THREE.MeshStandardMaterial({
          color: "#111417",
          metalness: 0.4,
          roughness: 0.3,
        });
      case "LAB":
        return new THREE.MeshStandardMaterial({
          color: "#1E2226",
          metalness: 0.6,
          roughness: 0.2,
        });
      case "GRAPHITE":
      default:
        return new THREE.MeshStandardMaterial({
          color: "#282D31",
          metalness: 0.5,
          roughness: 0.25,
        });
    }
  }, [finish]);

  // Metallic components material
  const alloyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#88929A",
        metalness: 0.85,
        roughness: 0.2,
      }),
    []
  );

  const kashimaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D4AF37",
        metalness: 0.9,
        roughness: 0.15,
      }),
    []
  );

  const rubberMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#050607",
        metalness: 0.05,
        roughness: 0.9,
      }),
    []
  );

  const isMX = wheelFormat === "MX-29-275";
  const rearWheelRadius = isMX ? 0.42 : 0.46;
  const frontWheelRadius = 0.46;

  return (
    <group position={[0, 0, 0]}>
      {/* FRONT WHEEL ASSEMBLY */}
      <group position={[1.1, frontWheelRadius, 0]}>
        {/* Tire */}
        <mesh material={rubberMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[frontWheelRadius, 0.05, 16, 48]} />
        </mesh>
        {/* Rim */}
        <mesh material={alloyMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[frontWheelRadius - 0.04, 0.02, 16, 48]} />
        </mesh>
        {/* Hub */}
        <mesh material={alloyMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 16]} />
        </mesh>
      </group>

      {/* REAR WHEEL ASSEMBLY */}
      <group position={[-1.1, rearWheelRadius, 0]}>
        {/* Tire */}
        <mesh material={rubberMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rearWheelRadius, 0.05, 16, 48]} />
        </mesh>
        {/* Rim */}
        <mesh material={alloyMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rearWheelRadius - 0.04, 0.02, 16, 48]} />
        </mesh>
        {/* Hub & Cassette */}
        <mesh material={alloyMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.14, 16]} />
        </mesh>
      </group>

      {/* FRONT FORK STANCHIONS & LEGS */}
      <group position={[1.1, frontWheelRadius, 0]} rotation={[0, 0, -0.38]}>
        <mesh material={alloyMaterial} position={[0, 0.35, 0.06]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 16]} />
        </mesh>
        <mesh material={alloyMaterial} position={[0, 0.35, -0.06]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 16]} />
        </mesh>
        <mesh material={kashimaMaterial} position={[0, 0.65, 0.06]}>
          <cylinderGeometry args={[0.018, 0.018, 0.35, 16]} />
        </mesh>
        <mesh material={kashimaMaterial} position={[0, 0.65, -0.06]}>
          <cylinderGeometry args={[0.018, 0.018, 0.35, 16]} />
        </mesh>
      </group>

      {/* MAIN FRAME - FRONT TRIANGLE */}
      <group position={[0, 0.45, 0]}>
        {/* Head Tube */}
        <mesh material={frameMaterial} position={[0.78, 0.58, 0]} rotation={[0, 0, -0.38]}>
          <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
        </mesh>

        {/* Top Tube */}
        <mesh material={frameMaterial} position={[0.3, 0.52, 0]} rotation={[0, 0, 0.18]}>
          <cylinderGeometry args={[0.035, 0.04, 0.85, 16]} />
        </mesh>

        {/* Down Tube */}
        <mesh material={frameMaterial} position={[0.35, 0.28, 0]} rotation={[0, 0, -0.42]}>
          <cylinderGeometry args={[0.05, 0.055, 0.92, 16]} />
        </mesh>

        {/* Seat Tube */}
        <mesh material={frameMaterial} position={[-0.15, 0.36, 0]} rotation={[0, 0, -0.22]}>
          <cylinderGeometry args={[0.04, 0.045, 0.65, 16]} />
        </mesh>

        {/* Bottom Bracket Shell */}
        <mesh material={alloyMaterial} position={[-0.05, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.1, 16]} />
        </mesh>
      </group>

      {/* REAR TRIANGLE SWINGARM & LINKAGE */}
      <group position={[-0.05, 0.47, 0]}>
        {/* Chainstays */}
        <mesh material={frameMaterial} position={[-0.5, -0.02, 0.05]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.7, 0.03, 0.02]} />
        </mesh>
        <mesh material={frameMaterial} position={[-0.5, -0.02, -0.05]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.7, 0.03, 0.02]} />
        </mesh>

        {/* Seatstays */}
        <mesh material={frameMaterial} position={[-0.45, 0.22, 0.05]} rotation={[0, 0, 0.58]}>
          <boxGeometry args={[0.6, 0.025, 0.02]} />
        </mesh>
        <mesh material={frameMaterial} position={[-0.45, 0.22, -0.05]} rotation={[0, 0, 0.58]}>
          <boxGeometry args={[0.6, 0.025, 0.02]} />
        </mesh>

        {/* Linkage Bellcrank */}
        <mesh material={alloyMaterial} position={[-0.1, 0.25, 0]}>
          <boxGeometry args={[0.12, 0.06, 0.1]} />
        </mesh>

        {/* Rear Suspension Shock */}
        <mesh material={kashimaMaterial} position={[-0.05, 0.18, 0]} rotation={[0, 0, 0.75]}>
          <cylinderGeometry args={[0.025, 0.025, 0.22, 16]} />
        </mesh>
      </group>

      {/* COCKPIT - HANDLEBAR & STEM */}
      <group position={[0.75, 1.1, 0]}>
        {/* Stem */}
        <mesh material={alloyMaterial} position={[-0.03, 0, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.08, 0.04, 0.04]} />
        </mesh>
        {/* Handlebar */}
        <mesh material={alloyMaterial} position={[0.01, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.8, 16]} />
        </mesh>
      </group>

      {/* SEATPOST & SADDLE */}
      <group position={[-0.22, 0.95, 0]}>
        {/* Dropper Stanchion */}
        <mesh material={alloyMaterial} position={[0, 0, 0]} rotation={[0, 0, -0.22]}>
          <cylinderGeometry args={[0.016, 0.016, 0.35, 16]} />
        </mesh>
        {/* Saddle */}
        <mesh material={rubberMaterial} position={[0.02, 0.18, 0]}>
          <boxGeometry args={[0.26, 0.04, 0.12]} />
        </mesh>
      </group>
    </group>
  );
}
