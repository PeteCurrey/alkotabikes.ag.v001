/**
 * ALKOTA PROJECT 01 — 3D MODEL ADAPTER INTERFACE
 *
 * This interface is the contract between the configurator viewer and the
 * 3D geometry source (currently procedural primitives; future: GLB asset).
 *
 * A GLB with child nodes named exactly after ModelSlotId will drop in
 * to SchematicBikeModel without any configurator changes.
 *
 * See docs/glb-node-naming.md for the full commissioning specification.
 */

import * as THREE from "three";

export type ModelSlotId =
  | "chassis"        // Main front triangle: head tube, top tube, down tube, seat tube, BB
  | "rear-triangle"  // Swingarm: chainstays, seatstays, dropout interface
  | "linkage"        // Four-bar: bellcrank pivot, link arms
  | "rear-shock"     // Shock body, eyelet mounts, air sleeve
  | "fork"           // Fork lowers, stanchion tubes, crown, axle
  | "cockpit"        // Stem + handlebar assembly
  | "dropper-post"   // Seatpost body + saddle
  | "wheel-front"    // Front tyre, rim, hub, axle
  | "wheel-rear";    // Rear tyre, rim, hub, cassette, axle

/** Maps a ModelSlotId to the buildMatrix.ts systemId it corresponds to */
export const SLOT_TO_SYSTEM_ID: Record<ModelSlotId, string> = {
  "chassis":       "chassis",
  "rear-triangle": "chassis",      // rear triangle is part of chassis system
  "linkage":       "rear-shock",   // linkage belongs to suspension system
  "rear-shock":    "rear-shock",
  "fork":          "fork",
  "cockpit":       "cockpit",
  "dropper-post":  "dropper-post",
  "wheel-front":   "wheels",
  "wheel-rear":    "wheels",
};

/** Maps a buildMatrix.ts systemId to the primary ModelSlotId to highlight/focus */
export const SYSTEM_TO_PRIMARY_SLOT: Record<string, ModelSlotId> = {
  "chassis":      "chassis",
  "fork":         "fork",
  "rear-shock":   "rear-shock",
  "brakes-front": "fork",          // brakes are on the fork/frame, highlight fork
  "brakes-rear":  "rear-triangle",
  "drivetrain":   "rear-triangle",
  "wheels":       "wheel-front",   // select both wheels — handled in viewer
  "cockpit":      "cockpit",
  "dropper-post": "dropper-post",
};

/** World-space explosion offset for each slot at explode progress = 1.0 */
export const EXPLODE_OFFSETS: Record<ModelSlotId, [number, number, number]> = {
  "chassis":       [0,     0,    0],    // chassis stays fixed — everything else moves relative to it
  "rear-triangle": [-0.5, -0.15, 0],
  "linkage":       [0,    +0.7,  0],
  "rear-shock":    [0.15, +0.9,  0],
  "fork":          [+0.9, +0.5,  0],
  "cockpit":       [+0.2, +1.1,  0],
  "dropper-post":  [0,    +1.3,  0],
  "wheel-front":   [+1.8, 0,     0],
  "wheel-rear":    [-1.8, 0,     0],
};

/** Camera preset name that best frames each slot */
export const SLOT_CAMERA_PRESETS: Record<ModelSlotId, string> = {
  "chassis":       "SIDE",
  "rear-triangle": "REAR_34",
  "linkage":       "SHOCK_CLOSE",
  "rear-shock":    "SHOCK_CLOSE",
  "fork":          "FORK_CLOSE",
  "cockpit":       "COCKPIT_CLOSE",
  "dropper-post":  "COCKPIT_CLOSE",
  "wheel-front":   "WHEEL_FR",
  "wheel-rear":    "WHEEL_RR",
};

/** Human-readable label for each slot, used in overlay annotations */
export const SLOT_LABELS: Record<ModelSlotId, string> = {
  "chassis":       "CHASSIS / FRONT TRIANGLE",
  "rear-triangle": "REAR TRIANGLE / SWINGARM",
  "linkage":       "FOUR-BAR LINKAGE",
  "rear-shock":    "REAR SUSPENSION UNIT",
  "fork":          "FRONT SUSPENSION FORK",
  "cockpit":       "COCKPIT ASSEMBLY",
  "dropper-post":  "DROPPER POST / SADDLE",
  "wheel-front":   "FRONT WHEEL ASSEMBLY",
  "wheel-rear":    "REAR WHEEL ASSEMBLY",
};

/** Approximate world-space centroid for each slot's label anchor */
export const SLOT_LABEL_ANCHORS: Record<ModelSlotId, [number, number, number]> = {
  "chassis":       [0.15,  0.85, 0.6],
  "rear-triangle": [-0.55, 0.55, 0.6],
  "linkage":       [-0.1,  0.3,  0.6],
  "rear-shock":    [-0.05, 0.25, 0.6],
  "fork":          [1.1,   0.9,  0.6],
  "cockpit":       [0.75,  1.2,  0.6],
  "dropper-post":  [-0.2,  1.1,  0.6],
  "wheel-front":   [1.1,   0.46, 0.7],
  "wheel-rear":    [-1.1,  0.44, 0.7],
};

/**
 * The slot definition used by SchematicBikeModel.
 * Each slot is a named group in the Three.js scene.
 * Future GLB: match group.name === slotId.
 */
export interface ModelSlot {
  id: ModelSlotId;
  systemId: string;
  explodeOffset: THREE.Vector3;
  cameraPreset: string;
  labelAnchor: THREE.Vector3;
  label: string;
}

/** Materialised slot definitions for use in the viewer */
export const PRIMITIVE_SLOTS: ModelSlot[] = (Object.keys(EXPLODE_OFFSETS) as ModelSlotId[]).map(
  (id) => ({
    id,
    systemId: SLOT_TO_SYSTEM_ID[id],
    explodeOffset: new THREE.Vector3(...EXPLODE_OFFSETS[id]),
    cameraPreset: SLOT_CAMERA_PRESETS[id],
    labelAnchor: new THREE.Vector3(...SLOT_LABEL_ANCHORS[id]),
    label: SLOT_LABELS[id],
  })
);
