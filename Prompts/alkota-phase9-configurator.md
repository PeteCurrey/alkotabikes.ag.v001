# ALKOTA CYCLES — PHASE 9: 3D CONFIGURATOR + COMPONENT BACKEND
### Architecture, the asset dependency, and phased build prompts

---

# 1. WHAT ALREADY EXISTS

More than you might think. The skeleton is in place:

| | Status |
|---|---|
| `/[region]/configure` route, SSR shell | ✅ 231 words server-rendered, real H1 |
| `ConfiguratorClient.tsx` | ✅ built |
| `src/components/three/` — Canvas, CameraRig, BikeModel | ✅ built |
| `three` / `@react-three/fiber` / `@react-three/drei` | ✅ installed |
| `src/lib/configurator/` — types, configurationData, buildIdGenerator | ✅ built |
| `src/content/project01/components.ts` | ✅ **58 real components** — FOX, Hope Technology, DT Swiss, Maxxis, SRAM, Renthal, all `BASELINE` |
| `buildMatrix.ts` — configurable vs fixed systems, compatibility | ✅ built |
| `registrations.saved_build_reference` column | ✅ **already in schema, unused** |
| `/studio` CMS with 18 sections | ✅ auth-gated |

The build ID generator already produces `A01-L-MX-48213` style references. The schema already anticipated saved builds. Someone thought this through.

---

# 2. THE BLOCKING DEPENDENCY: THERE IS NO 3D MODEL

```
find public src -iname "*.glb" -o -iname "*.gltf"  →  0 files
```

`BikeModel.tsx` is **218 lines of procedural primitives** — 52 meshes built from `torusGeometry`, `cylinderGeometry` and `boxGeometry`. Torus wheels, cylinder tubes. It's a schematic stand-in, not a bike.

This is the crux. The code for an immersive configurator is a few weeks of work. **The asset is the hard part, and it has a cost and a lead time you can't code your way around.**

And there's a deeper problem than cost.

## 2.1 The honesty problem

A photoreal 3D configurator shows a rider *exactly* what their bike looks like. Project 01 has not been prototyped — the programme rail says prototype R&D is NEXT, not current. So a photoreal model would be:

- **A fabricated claim.** Every weld, every tube junction, every cable route, every dropout would be an assertion about a physical object that doesn't exist. That's precisely what `lib/claims.ts` and the whole build-gate architecture exist to prevent.
- **Guaranteed to be wrong.** The bike will change between now and 2028. Every change orphans the model.
- **Off-brand.** Your entire differentiator is "you are not buying a render." A photoreal configurator is, definitionally, a render.

## 2.2 The recommendation: schematic-first, photoreal later

**Build a precise technical 3D viewer — and be explicit that it's a development schematic, not a product render.**

This isn't a compromise. It's better:

- **It's honest.** "R00 DEVELOPMENT GEOMETRY — SCHEMATIC REPRESENTATION" is a true statement about a true thing.
- **It's on-brand.** The site's entire visual language is engineering documentation — mono type, system numbering, development sheets, exploded archive drawings. A wireframe/schematic 3D viewer is *more* native to Alkota than a glossy render would be.
- **Nobody else has one.** Every competitor has a photoreal configurator. None has an honest technical one. Mondraker owns Forward Geometry; you could own the exploded development view.
- **It survives design change.** Geometry updates are cheap when you're not maintaining PBR bakes and normal maps.
- **It's buildable now**, with real component data, at a fraction of the cost.

Then in 2027, when a prototype exists and CAD is frozen, you swap the asset layer and the configurator becomes photoreal. The data architecture, backend, saved builds and order capture — everything below — stays identical.

## 2.3 If you do want photoreal now

You need a production 3D asset with separated, swappable component meshes. The spec:

- Source: your actual CAD (SolidWorks/Fusion/Rhino), not an artist's interpretation
- Retopologised to realtime budget — roughly 150–250k tris for the full bike
- Separated meshes per configurable system: frame, fork, shock, wheels, tyres, drivetrain, brakes, bar/stem, saddle
- PBR materials, baked AO, 2K–4K texture atlases
- Draco or Meshopt compression, GLB packaging, target under 8MB total
- LOD variants for mobile

Realistically £3–8k and 4–8 weeks with a specialist studio, **and it requires frozen CAD.** If Project 01 CAD isn't frozen, this money buys an asset that will be wrong.

**My strong recommendation: schematic now, photoreal at prototype.**

---

# 3. THE DATA PROBLEM — TWO COMPONENT SOURCES

This needs fixing before any backend work, or you'll build a CMS on top of a fork.

There are **two unrelated component datasets**:

**`src/content/project01/components.ts`** — 58 entries, real manufacturers, tied to the engineering claims system:
```
manufacturer: "FOX"              status: "BASELINE"
manufacturer: "Hope Technology"  status: "BASELINE"
manufacturer: "DT Swiss"         status: "BASELINE"
manufacturer: "Maxxis" / "SRAM" / "Renthal"
```

**`src/lib/configurator/configurationData.ts`** — a separate list the configurator actually uses:
```
name: "GRIP2 Factory 160mm"
manufacturer: "DEVELOPMENT SPEC"     ← masked
model: "38 Factory Kashima"
description: "...tuned specifically to ALKOTA's 28.4% progressive linkage curve."
```

Three problems:
1. **The configurator doesn't use the real component registry.** It has its own parallel list.
2. **`manufacturer: "DEVELOPMENT SPEC"` masks real brands** that are named openly in `components.ts`. Pick one policy.
3. **`"28.4% progressive linkage curve"`** is a specific engineering assertion. Check it's registered in the claims system — if it isn't, it's exactly the class of fabricated specificity the build gate exists to catch.

**Fix: `components.ts` becomes the single source of truth. `configurationData.ts` is deleted and the build matrix drives selectable options.**

## 3.1 Two contradictions the configurator will bake in

`buildIdGenerator.ts` encodes `config.wheelFormat === "MX-29-275" ? "MX" : "29"`. So the configurator offers **mixed wheels** — while the homepage spec panel says **29/29 PRIMARY**. That contradiction has been open for months and the configurator is about to encode it into every build reference ever issued.

Same for frame sizes: homepage says M·L·XL, the order form offers S·M·L·XL, and `buildIdGenerator` uses `config.frameSize` directly.

**Resolve both before building.** A build reference is permanent — riders will quote `A01-L-MX-48213` back to you in 2028.

---

# 4. BACKEND ARCHITECTURE

Current schema has `registrations`, `project01_reservations`, `partner_organisations`, `customer_leads`, `demo_units`, `pdi_records`, `warranty_claims`, `service_records`.

**No component, configuration or saved-build tables exist.** And `ConfiguratorClient.tsx` makes zero Supabase calls — builds are generated client-side and discarded.

Proposed additions:

```
components                 -- the catalogue, managed in /studio
  id, system_id, name, manufacturer, model, description,
  engineering_status, weight_grams, claim_id (FK to claims registry),
  is_selectable, sort_order, image_ref, active, created_at, updated_at

component_options          -- which components are valid for which system
  system_id, component_id, is_default, availability_status

saved_builds
  id, build_reference (A01-L-MX-48213), region, frame_size,
  wheel_format, finish, selections JSONB, fit_inputs JSONB,
  email (nullable), registration_reference (nullable FK),
  source ('CONFIGURATOR'|'PARTNER'|'STUDIO'), created_at

build_events               -- audit trail
  build_id, event_type, payload, created_at
```

Then wire `registrations.saved_build_reference` — the column that already exists and nothing writes to.

**Order capture must feed the existing register, not create a parallel pipeline.** A saved build attaches to a registration. It does not become a second, competing intake route with its own status model.

---

# 5. PHASED BUILD PROMPTS

## PHASE 9A — DATA UNIFICATION + BACKEND

```
PROJECT: Alkota Cycles — Next.js 15 App Router, Supabase, R3F.

TASK: Unify component data and build the configurator backend. No 3D work in this
phase — data and persistence only.

=== TASK 1: SINGLE COMPONENT SOURCE OF TRUTH ===

Two unrelated component datasets exist:

  src/content/project01/components.ts     58 entries, real manufacturers
                                          (FOX, Hope Technology, DT Swiss, Maxxis,
                                          SRAM, Renthal), status BASELINE, tied to
                                          the engineering claims system

  src/lib/configurator/configurationData.ts   a SEPARATE list the configurator uses,
                                          with manufacturer masked as
                                          "DEVELOPMENT SPEC"

The configurator does not use the real registry. Fix this before any backend work.

  a) components.ts becomes the single source of truth.
  b) buildMatrix.ts drives which components are selectable per system.
  c) DELETE configurationData.ts. Migrate any genuinely unique data into
     components.ts first — report anything that has no equivalent before deleting.
  d) Resolve the manufacturer naming policy. components.ts names FOX and Hope
     Technology openly; configurationData.ts masks them as "DEVELOPMENT SPEC".
     REPORT BOTH and ask me which policy applies — do not choose. Naming a supplier
     is a factual claim about a commercial relationship.
  e) configurationData.ts contains: "tuned specifically to ALKOTA's 28.4% progressive
     linkage curve." Check whether 28.4% is registered in the claims system. If not,
     it is an unregistered engineering assertion — surface it, do not carry it over.

=== TASK 2: TWO BLOCKING CONTRADICTIONS ===

buildIdGenerator.ts encodes wheelFormat as "MX-29-275" → MX, else 29. So the
configurator offers MIXED WHEELS. The homepage spec panel states "29 / 29 PRIMARY".

Frame sizes: homepage says M·L·XL; the order form offers S, M, L, XL;
buildIdGenerator uses config.frameSize directly.

Build references are PERMANENT — riders will quote A01-L-MX-48213 back in 2028.

  a) Single-source both values from one constant consumed by the spec panel, the
     order form, the build matrix and the ID generator.
  b) STOP AND ASK ME which is correct for each. Do not guess, do not pick the more
     common one, do not average them.

=== TASK 3: SCHEMA ===

Migration adding:

  components          id, system_id, name, manufacturer, model, description,
                      engineering_status, weight_grams, claim_id, is_selectable,
                      sort_order, image_ref, active, timestamps
  component_options   system_id, component_id, is_default, availability_status
  saved_builds        id, build_reference UNIQUE, region, frame_size, wheel_format,
                      finish, selections JSONB, fit_inputs JSONB, email,
                      registration_reference FK, source, created_at
  build_events        build_id, event_type, payload JSONB, created_at

Requirements:
  - RLS on every table. saved_builds readable only by its owning session or an
    authenticated studio user. Write and run policy tests proving cross-user reads
    are denied.
  - components seeded FROM components.ts, not hand-entered. The seed script is the
    migration path; components.ts remains the versioned source and the database is
    the operational copy. Document which wins on conflict — I want components.ts to
    win until the studio editor is live, then the database.
  - NO price columns in this phase. Project 01 pricing is null and stays null.

=== TASK 4: WIRE saved_build_reference ===

registrations.saved_build_reference already exists and nothing writes to it.

Saved builds ATTACH to the register. Do NOT create a second intake pipeline with its
own status model — the /order register remains the single customer intake route.

=== RULES ===
- One component source. Zero component literals outside it.
- No fabricated components, no invented weights, no placeholder manufacturers.
- No prices anywhere.
- Tasks 1d, 1e and 2 require MY decision. Report and stop.

=== VERIFICATION ===
1. grep -rn "configurationData" src/ → zero hits; confirm file deleted
2. The migration report for anything unique to configurationData.ts
3. Manufacturer naming policy report (both lists, side by side)
4. Claims check on "28.4%"
5. Single-source proof: grep -rn "29 / 29\|MX-29-275\|frameSize" src/ showing one constant
6. Migration SQL + RLS policies + passing cross-user denial tests
7. Seed run output: component count in DB vs components.ts
8. Round trip: create a saved build, attach to a registration, read back
```

## PHASE 9B — STUDIO COMPONENT MANAGER

```
PROJECT: Alkota Cycles — /studio CMS. Depends on 9A.

TASK: Component and build management in the studio.

=== TASK 1: /studio/components ===

  - List all components: system, name, manufacturer, engineering status, selectable,
    claim linkage, active
  - Create, edit, deactivate. NEVER hard-delete — deactivate only, so historic saved
    builds continue to resolve. A build reference issued in 2026 must still render in
    2028 even if the component is long discontinued.
  - Bulk edit selectability and sort order
  - Every component links to a claim in the claims registry. A component with an
    unregistered engineering assertion in its description cannot be set active —
    enforce server-side, not with a disabled button.
  - Full audit trail: who changed what, when, previous value

=== TASK 2: /studio/build-matrix ===

Manage which systems are configurable and which components are valid for each.
Compatibility rules editable (e.g. a wheel format that constrains tyre options).
Changing the matrix must NOT retroactively alter existing saved builds — they are
immutable snapshots.

=== TASK 3: EXTEND /studio/builds ===

The route exists. Give it: saved build list, filters by region, size, wheel format
and finish, whether attached to a registration, and export.

Aggregate view — this is the commercially valuable part: which finishes, sizes and
component choices are actually being selected. That's genuine demand data ahead of
production planning, and it's the strongest argument for building the configurator
at all.

=== RULES ===
- Deactivate, never delete.
- Saved builds are immutable snapshots.
- Component activation gated on claims registration, enforced server-side.
- No mock components, no sample builds, no seeded demo data.

=== VERIFICATION ===
1. Screenshots of every studio screen including empty states
2. Attempt to activate a component with an unregistered claim — paste the server rejection
3. Deactivate a component used by an existing saved build; prove the build still resolves
4. Change the build matrix; prove an existing saved build is unchanged
5. Audit trail entries for a create, an edit and a deactivate
```

## PHASE 9C — 3D VIEWER

```
PROJECT: Alkota Cycles — R3F configurator. Depends on 9A.

TASK: Build the 3D configurator viewer.

CRITICAL CONTEXT — READ BEFORE DESIGNING ANYTHING
There is NO 3D model of Project 01. BikeModel.tsx is 218 lines of procedural
primitives — 52 meshes of torusGeometry, cylinderGeometry and boxGeometry. Zero
.glb/.gltf files exist in the repo.

Project 01 has NOT been prototyped. Prototype R&D is the NEXT programme phase, not
the current one.

THEREFORE: this is a SCHEMATIC TECHNICAL VIEWER, not a product render. It must be
explicitly labelled as development geometry. Do not attempt photorealism. Do not
model weld fillets, cable routing, decals, or any surface detail that asserts how the
finished bike looks. Every such detail would be a fabricated claim about an object
that does not exist.

DESIGN DIRECTION — treat this as engineering documentation in 3D:
  - Precise geometry, honest abstraction. Wireframe, ghosted surfaces, technical
    linework, measured annotation.
  - Visual language from the existing site: mono type, system numbering, the
    development-sheet and exploded-archive aesthetic already established.
  - Persistent on-canvas label: "R00 DEVELOPMENT GEOMETRY — SCHEMATIC REPRESENTATION.
    NOT A PRODUCT RENDER." Not a dismissible tooltip.

=== TASK 1: VIEWER ===
  - Orbit, zoom, pan. Sensible limits — no upside-down bike, no clipping through.
  - Named camera positions per system: drive side, non-drive, front, rear, top,
    and a close view for each configurable system
  - Exploded view transition — this is the signature interaction and it is native to
    the brand. Components separate along axes with leader lines and labels.
  - Selecting a component in the panel focuses and highlights it in 3D
  - Selecting a component in 3D selects it in the panel
  - Measurement/geometry overlay driven by real values from specification.ts. If a
    geometry value is unset, render nothing — never a placeholder dimension.

=== TASK 2: PERFORMANCE ===
  - Mobile first: 60fps target on mid-range Android, degrade gracefully
  - Instance and reuse geometry; the current 52 individual meshes will not scale
  - Lazy-load the canvas below the SSR shell — the /configure SSR content built
    earlier MUST survive. Verify server-rendered word count does not regress.
  - Respect prefers-reduced-motion: no auto-rotate, no transition animation
  - <noscript> and WebGL-unavailable fallback: the full spec table and component
    list must be readable without 3D. This is also the accessible path.

=== TASK 3: ACCESSIBILITY ===
A 3D canvas is invisible to assistive technology. The configuration panel is the
real interface and must be fully keyboard operable and screen-reader complete on its
own. The canvas is an enhancement, never the only route to a selection.

=== TASK 4: ASSET PIPELINE READINESS ===
Structure BikeModel so the primitive geometry can be swapped for a real GLB later
without rewriting the configurator. Define a model adapter interface: named mesh
slots per system, so a future GLB with matching node names drops in.

Document the required GLB node naming convention in docs/ so the eventual 3D asset
can be commissioned against a written spec.

=== RULES ===
- Schematic, not photoreal. No asserted surface detail.
- Persistent development-geometry labelling.
- SSR shell must not regress.
- No geometry value rendered that isn't in specification.ts.

=== VERIFICATION ===
1. curl -s $URL/uk/configure | wc -w → SSR word count, must not be below current
2. Screen recording: orbit, exploded view, component focus, panel↔3D selection sync
3. Mobile FPS measurement on a throttled profile
4. Keyboard-only walkthrough of a full configuration, no mouse
5. Screen reader pass on the configuration panel
6. JS-disabled and WebGL-disabled renders
7. prefers-reduced-motion behaviour
8. docs/ GLB node naming spec
```

## PHASE 9D — SAVED BUILDS + ORDER CAPTURE

```
PROJECT: Alkota Cycles. Depends on 9A, 9B, 9C.

TASK: Persist builds and capture order requests into the existing register.

=== TASK 1: SAVE + SHARE ===
  - Save a build → persist, return the A01-{SIZE}-{WHEEL}-{HASH} reference
  - Shareable URL resolving to a read-only view of that exact configuration
  - OG image per saved build showing size, wheel format, finish and reference
  - Saved builds are IMMUTABLE. Editing creates a NEW reference. A shared link must
    render the same configuration forever.

=== TASK 2: ORDER REQUEST CAPTURE ===

Feeds the EXISTING /order register. Not a parallel pipeline.

  - From a saved build: "Register this build" → the existing register flow with the
    configuration attached
  - From an existing registration: attach or update the saved build
  - Writes registrations.saved_build_reference
  - Confirmation email includes the build reference and configuration summary
  - Visible in /my-alkota

CRITICAL: no pricing anywhere in this flow. No total, no "from", no deposit, no
estimate. Project 01 pricing is unset. The register is explicitly non-contractual per
/terms — that framing must carry through unchanged.

=== TASK 3: PARTNER ROUTING ===
If a saved build's registrant falls inside a partner catchment (catchment.ts exists),
surface the build to that partner in the portal. Respects PARTNER_LEADS_ENABLED —
currently false, so build it gated and off.

=== TASK 4: FIT INTEGRATION ===
fitModel.ts exists and /fit is live (444 words). Feed fit inputs into the
configurator so size recommendation is consistent between the two.

Height and weight carry the purpose microcopy from the privacy work. Store canonical
metric, display in region units per units.ts. Weight optional.

=== RULES ===
- Saved builds immutable; edits create new references.
- Single intake pipeline — the register.
- No prices, totals, deposits or estimates.
- Partner routing gated behind the existing flag.

=== VERIFICATION ===
1. Save → reference → reload shared URL → identical configuration
2. Edit a saved build; prove a NEW reference is issued and the old URL is unchanged
3. Full round trip: configure → register → confirmation email → /my-alkota
4. SQL showing registrations.saved_build_reference populated
5. grep for price/total/deposit in the configurator and register flow → zero
6. Partner routing with the flag on in a test environment, then confirmed off
7. Fit → configurator size recommendation consistency
```

---

# 6. DECISIONS NEEDED BEFORE 9A

1. **Wheel format** — 29/29 or MX 29/27.5? Open since the first audit, now blocking. Build references are permanent.
2. **Frame sizes** — M·L·XL or S·M·L·XL?
3. **Manufacturer naming policy** — `components.ts` names FOX, Hope, DT Swiss, SRAM, Maxxis, Renthal openly. `configurationData.ts` masks them as "DEVELOPMENT SPEC". Naming a supplier publicly is a claim about a commercial relationship — do you have agreements in place, or are these engineering intentions? That determines the policy.
4. **Schematic or photoreal** — my strong recommendation is schematic now, photoreal at prototype. If you want photoreal, the question is whether Project 01 CAD is frozen, because commissioning against unfrozen CAD buys an asset that will be wrong.
5. **Is "28.4% progressive linkage curve" a registered claim?** If it came from real kinematics work, register it with evidence. If it was written to sound convincing, it needs to go.

---

## MY VIEW

The backend and data work (9A, 9B) is unambiguously worth doing now — it fixes a genuine data fork, it gives you demand signal ahead of production planning, and it makes `saved_build_reference` mean something.

On the 3D: build the schematic viewer. It's honest, it's cheaper, it's more distinctive, and it survives design change. Every competitor has a photoreal configurator of a bike you can buy today. None has an exploded technical view of a bike being designed in public — and that's the thing your whole brand is actually about.
