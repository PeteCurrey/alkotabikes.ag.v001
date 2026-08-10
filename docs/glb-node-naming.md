# ALKOTA Project 01 — 3D Asset GLB Commissioning Specification

## 1. Overview
This document defines the technical structure, mesh hierarchy, naming conventions, and asset rules for commissioning future 3D GLB/GLTF assets for the ALKOTA Project 01 Configurator.

The 3D configurator relies on a strict slot-adapter model (`modelAdapter.ts`). Any future 3D asset matching this specification will drop directly into `SchematicBikeModel.tsx` without requiring code or logic changes in the web application.

---

## 2. Coordinate System & Scale
- **Up Axis**: Y-up
- **Forward Axis**: Z-forward (Front wheel extending along positive Z, facing right in standard side elevation)
- **Unit Scale**: Metric (1 Blender / Maya / Max unit = 1.0 metre)
- **Origin**: Bottom Bracket (BB) axis center `[0.0, 0.0, 0.0]` or Ground Contact center below BB.

---

## 3. Node Hierarchy & Naming Convention

The root container must be named `PROJECT_01_R00`. Below the root, the model MUST be separated into exactly 9 primary child groups matching the `ModelSlotId` string identifiers:

```text
PROJECT_01_R00 (Root Group / Scene)
├── chassis
├── rear-triangle
├── linkage
├── rear-shock
├── fork
├── cockpit
├── dropper-post
├── wheel-front
└── wheel-rear
```

### Slot Definitions & Contents
| Node Name (Slot ID) | Sub-components Included | Pivot Point Position |
| :--- | :--- | :--- |
| `chassis` | Main front triangle, head tube, top tube, down tube, seat tube, bottom bracket shell, shock upper mount lugs. | `[0, 0, 0]` (BB Center) |
| `rear-triangle` | Chainstays, seatstays, rear dropouts, brake caliper mount bracket. | Main swingarm pivot axis |
| `linkage` | Four-bar rocker arm / bellcrank, lower shock link clevis. | Main rocker pivot axis |
| `rear-shock` | Air sleeve, damper body, trunnion eyelet mounts, reservoir. | Upper shock mount eyelet |
| `fork` | Lower legs, arch, stanchion tubes, crown, steer tube, front axle. | Front wheel axle center |
| `cockpit` | Stem, handlebar, faceplate, stem spacers, grips, brake levers. | Head tube top center |
| `dropper-post` | Lower post collar, stanchion tube, saddle rails, saddle body. | Seat tube top clamp center |
| `wheel-front` | Front rim, hub, spokes, nipples, disc rotor, tyre. | Front axle center |
| `wheel-rear` | Rear rim, hub, cassette cog set, spokes, nipples, disc rotor, tyre. | Rear axle center |

---

## 4. Materials & Texturing Rules
- **No Embedded Materials**: The configurator engine programmatically applies schematic materials (`MeshBasicMaterial` / wireframe / ghost / highlight) depending on user interaction and component focus.
- **Clean Normals**: Ensure smooth shading groups / weighted vertex normals are calculated properly on geometry export.
- **No Decals / Fillets**: Do NOT add fabricated weld fillets, cable housing, cosmetic badges, or decals. Project 01 is in pre-production R00 development; photorealistic surface detailing is strictly prohibited until physical validation is complete.

---

## 5. Polygon Budget & Optimization
- **Total Triangles Target**: ≤ 25,000 triangles total across all 9 slots.
- **Per-Slot Budget**:
  - `chassis`: ~5,000 tris
  - `rear-triangle`: ~3,000 tris
  - `linkage`: ~1,500 tris
  - `rear-shock`: ~2,500 tris
  - `fork`: ~4,000 tris
  - `cockpit`: ~2,000 tris
  - `dropper-post`: ~1,500 tris
  - `wheel-front`: ~2,500 tris
  - `wheel-rear`: ~3,000 tris
- **Geometry Compression**: Export binary `.glb` with Draco compression enabled (`gltf-pipeline` or Blender GLTF exporter Draco option).

---

## 6. Verification Checklist Before Delivery
1. Import `.glb` into a WebGL viewer (e.g. Three.js editor or `gltf-viewer`).
2. Verify child node names match `chassis`, `rear-triangle`, `linkage`, `rear-shock`, `fork`, `cockpit`, `dropper-post`, `wheel-front`, `wheel-rear` exactly (case-sensitive).
3. Confirm origin is at BB center and scale is 1 unit = 1 metre.
