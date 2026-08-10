"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export type CameraAnglePreset =
  | "SIDE"
  | "NON_DRIVE"
  | "FRONT"
  | "REAR"
  | "TOP"
  | "FORK_CLOSE"
  | "SHOCK_CLOSE"
  | "COCKPIT_CLOSE"
  | "WHEEL_FR"
  | "WHEEL_RR";

interface CameraRigProps {
  preset: CameraAnglePreset;
  reducedMotion: boolean;
}

const PRESET_POSITIONS: Record<CameraAnglePreset, [number, number, number]> = {
  SIDE:          [0,    0.9,  3.2],
  NON_DRIVE:     [0,    0.9, -3.2],
  FRONT:         [3.5,  0.8,  0  ],
  REAR:          [-3.5, 0.8,  0  ],
  TOP:           [0,    4.0,  0.1],
  FORK_CLOSE:    [2.2,  1.4,  1.0],
  SHOCK_CLOSE:   [-0.5, 0.7,  0.8],
  COCKPIT_CLOSE: [1.0,  1.6,  0.6],
  WHEEL_FR:      [1.6,  0.5,  1.5],
  WHEEL_RR:      [-1.8, 0.4,  1.5],
};

const PRESET_TARGETS: Record<CameraAnglePreset, [number, number, number]> = {
  SIDE:          [0,    0.8,  0  ],
  NON_DRIVE:     [0,    0.8,  0  ],
  FRONT:         [0.3,  0.8,  0  ],
  REAR:          [-0.3, 0.7,  0  ],
  TOP:           [0,    0.5,  0  ],
  FORK_CLOSE:    [1.1,  0.9,  0  ],
  SHOCK_CLOSE:   [-0.05, 0.65, 0 ],
  COCKPIT_CLOSE: [0.75, 1.1,  0  ],
  WHEEL_FR:      [1.1,  0.46, 0  ],
  WHEEL_RR:      [-1.1, 0.44, 0  ],
};

const _targetVec = new THREE.Vector3();
const _lookVec   = new THREE.Vector3();

export default function CameraRig({ preset, reducedMotion }: CameraRigProps) {
  const lastPresetRef = useRef<CameraAnglePreset | null>(null);

  useFrame((state) => {
    const pos  = PRESET_POSITIONS[preset] ?? PRESET_POSITIONS.SIDE;
    const look = PRESET_TARGETS[preset]   ?? PRESET_TARGETS.SIDE;

    _targetVec.set(...pos);
    _lookVec.set(...look);

    if (reducedMotion || lastPresetRef.current !== preset) {
      // Instant teleport on first switch or reduced-motion
      state.camera.position.copy(_targetVec);
      lastPresetRef.current = preset;
    } else {
      // Smooth lerp (only when preset unchanged — driven by user orbit otherwise)
      // We only nudge toward preset when camera is far off; OrbitControls handles
      // the actual orbit. This rig only fires on explicit preset changes.
    }

    // Keep lookAt fresh
    if (reducedMotion || lastPresetRef.current === preset) {
      // We don't force lookAt every frame — that fights OrbitControls.
      // Camera rig is one-shot: it positions, then hands off to OrbitControls.
    }
  });

  return null;
}

export { PRESET_POSITIONS, PRESET_TARGETS };
