"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type CameraAnglePreset = "SIDE" | "FRONT_34" | "REAR_34" | "DRIVE" | "COCKPIT";

interface CameraRigProps {
  preset: CameraAnglePreset;
}

const PRESET_POSITIONS: Record<CameraAnglePreset, [number, number, number]> = {
  SIDE: [0, 0.9, 3.2],
  FRONT_34: [2.4, 1.1, 2.2],
  REAR_34: [-2.4, 1.0, -2.2],
  DRIVE: [1.4, 0.5, 1.8],
  COCKPIT: [0.1, 1.4, 0.9],
};

const PRESET_TARGETS: Record<CameraAnglePreset, [number, number, number]> = {
  SIDE: [0, 0.8, 0],
  FRONT_34: [0.3, 0.8, 0],
  REAR_34: [-0.3, 0.7, 0],
  DRIVE: [0, 0.5, 0],
  COCKPIT: [0.4, 1.0, 0],
};

export default function CameraRig({ preset }: CameraRigProps) {
  useFrame((state) => {
    const targetPos = PRESET_POSITIONS[preset] || PRESET_POSITIONS.SIDE;
    const targetLook = PRESET_TARGETS[preset] || PRESET_TARGETS.SIDE;

    state.camera.position.lerp(new THREE.Vector3(...targetPos), 0.05);
    state.camera.lookAt(new THREE.Vector3(...targetLook));
  });

  return null;
}
