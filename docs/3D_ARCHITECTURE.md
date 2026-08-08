# ALKOTA PERFORMANCE ENGINEERING — 3D CONFIGURATOR ARCHITECTURE

## 1. ARCHITECTURAL OVERVIEW
The ALKOTA Configurator is designed as a hybrid 3D/2D web application built on **React Three Fiber (R3F)**, **Three.js**, and **@react-three/drei**.

It runs strictly client-side to ensure zero hydration mismatch and zero performance penalty for non-configurator pages on the site.

```
/src/
  ├── components/three/
  │   ├── ConfiguratorCanvas.tsx   # Client entry & R3F Canvas container
  │   ├── BikeModel.tsx            # Procedural 3D Bicycle chassis & components mesh
  │   ├── Environment.tsx          # Studio lighting, ground reflections, contact shadows
  │   ├── CameraRig.tsx            # Animated camera preset transitions (Side, 3/4, Cockpit, etc.)
  │   └── ModelFallback.tsx        # High-definition 2D fallback for non-WebGL runtimes
  └── lib/configurator/
      ├── configurationState.ts    # React state & configuration engine
      ├── compatibilityEngine.ts   # Rule validator for size & component matching
      └── buildIdGenerator.ts      # Deterministic hash ID generator (e.g. A01-L-MX-00482)
```

---

## 2. PRESET CAMERA ANGLES
- **SIDE** `[0, 1.0, 3.2]` — Full chassis side profile presentation.
- **FRONT_THREE_QUARTER** `[2.2, 1.2, 2.2]` — Dynamic front 3/4 view emphasizing cockpit and fork.
- **REAR_THREE_QUARTER** `[-2.2, 1.1, -2.2]` — Rear triangle, suspension linkage, and drivetrain angle.
- **DRIVE** `[1.2, 0.6, 1.8]` — Low angle drive-side detail.
- **COCKPIT** `[0, 1.5, 0.8]` — Rider viewpoint over handlebar and stem.

---

## 3. PRODUCTION MODEL INGESTION STRATEGY
When the final CAD-derived bicycle model is engineered:
1. **Asset Pipeline**: Export STEP/CAD models into Blender, apply Draco mesh compression and KTX2 texture compression to target a maximum asset size of < 8MB for the entire assembly.
2. **File Placement**: Place compressed GLTF/GLB models in `/public/models/project01-chassis.glb`.
3. **Material Swatching**: Assign named material slots (`Paint_Finish`, `Carbon_Weave`, `Hardware_Anodized`, `Suspension_Kashima`) to dynamically update metalness, roughness, and color attributes without re-loading geometries.

---

## 4. WebGL FALLBACK STRATEGY
If WebGL context creation fails or if `prefers-reduced-motion` / low GPU capability is detected:
- The `ConfiguratorCanvas` component automatically renders `ModelFallback.tsx`.
- All 13 configuration options, real-time Build ID calculations, and specification outputs remain 100% interactive.
