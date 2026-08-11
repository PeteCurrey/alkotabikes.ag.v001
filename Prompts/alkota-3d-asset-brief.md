# PROJECT 01 — 3D ASSET PRODUCTION BRIEF
### Commissionable specification for realtime configurator + marketing renders

---

# 1. THE QUESTION THAT DETERMINES EVERYTHING

**Does Project 01 CAD exist, and is it frozen?**

Everything below branches on this. Answer honestly, because commissioning against unfrozen geometry buys an asset that will be wrong.

| | If CAD exists (SolidWorks / Fusion / Rhino / Onshape) | If it doesn't |
|---|---|---|
| Source | Export STEP from CAD | Model from drawings, sketches, geometry table |
| Accuracy | Dimensionally exact | Interpretation — a *depiction*, not the bike |
| Cost | Lower — geometry is given | Higher — modelling from scratch |
| Time | 4–6 weeks | 8–12 weeks |
| Honesty position | "R00 development geometry" — true | Much harder to justify |
| Rework risk on design change | Re-export and re-process | Re-model |

**If CAD isn't frozen, don't commission photoreal yet.** Commission the frame only, treat it as R00, and accept it will be reissued. Or run the schematic viewer until prototype.

---

# 2. ONE MASTER ASSET, TWO OUTPUTS

This is the thing most people get wrong and it doubles their costs. You are not commissioning "a 3D model" — you're commissioning a **master asset** that feeds two very different pipelines:

```
                    ┌── REALTIME (GLB)  → configurator, web, mobile
   MASTER ASSET ────┤    150–250k tris, compressed textures, <10MB
   (high-poly,      │
    full detail)    └── OFFLINE (renders) → marketing stills, hero imagery,
                         journal, OG images, print, dealer pack
                         Unlimited polys, 4K+ textures, ray-traced
```

Same source geometry, same materials, same UVs. The realtime version is a decimated, compressed derivative. **Specify both in the commission** — an artist who only budgets for one will charge you again for the other.

The offline render pipeline is the more immediately valuable of the two, incidentally. You need hero imagery now for the site, the journal, OG images and the partner pack. The configurator can follow.

---

# 3. THE UNDERRATED PROBLEM: THIRD-PARTY COMPONENTS

The frame is the easy part — you own the IP and the CAD. The configurator's *selectable* components are mostly other people's products:

```
FOX 38 Factory / RockShox ZEB Ultimate     fork
FOX Float X2                                shock
Hope Technology                             brakes, hubs
DT Swiss                                    wheelset
SRAM                                        drivetrain
Maxxis Assegai / DHR II                     tyres
Renthal                                     bar / stem
```

Three real obstacles:

**Licensing.** Models bought from CGTrader, TurboSquid or Sketchfab are usually licensed for rendering, *not* for redistribution inside a web application. Shipping a purchased GLB to browsers is redistribution. Read the licence — most standard licences prohibit it, and an editorial licence certainly does.

**Trademark.** Displaying a branded FOX fork in a configurator implies a supply relationship. This is the same question I raised on `components.ts` — do you have agreements with these suppliers, or are these engineering intentions? It needs answering before the geometry gets branded.

**Accuracy.** Modelling a Fox 38 from photographs produces something that looks like a Fox 38 and isn't. On a brand built on engineering precision, that's a poor trade.

**The right route: ask the suppliers.** Fox, RockShox, SRAM, Hope and DT Swiss all operate OEM programmes and routinely supply CAD under NDA to frame manufacturers. You are a legitimate frame manufacturer specifying their components. That conversation costs an email and solves licensing, accuracy and trademark in one move — and it opens the supplier relationship you'll need for production anyway.

**Fallback if a supplier won't play:** model the component accurately but unbranded, and label it generically in the configurator ("160mm air fork — specification pending"). Honest, legally clean, and consistent with pre-production status.

---

# 4. TECHNICAL SPECIFICATION

Send this section verbatim to whoever you commission.

## 4.1 Deliverables

1. **Master scene** — Blender `.blend` or `.max`, full-detail geometry, layered, all materials
2. **Realtime GLB** — the configurator asset, spec below
3. **Mobile GLB** — reduced LOD variant
4. **Render pack** — 12 marketing stills, listed in §4.6
5. **Turntable** — 360° sequence, both finishes
6. **Source textures** — layered PSD or substance files, 4K
7. **Documentation** — node naming map, material list, licence provenance for every asset used

## 4.2 Realtime GLB requirements

```
Format              glTF 2.0 binary (.glb)
Triangle budget     150,000–250,000 desktop · 80,000–120,000 mobile LOD
Geometry compression Meshopt (preferred) or Draco
Texture compression KTX2 / Basis Universal — NOT raw PNG or JPEG
Texture resolution  Frame 4K · components 2K · shared atlas where sensible
Material model      PBR metallic-roughness
Carbon finish       KHR_materials_anisotropy for correct UD weave directionality
Finish variants     KHR_materials_variants — one GLB carrying both Glacier White
                    and Naked Carbon, switched without reload
Total file size     Under 10MB desktop · under 4MB mobile
Up axis             Y-up, metres, origin at bottom-bracket centre
Scale               1 unit = 1 metre, real-world dimensions
```

`KHR_materials_variants` is the glTF extension built specifically for product configurators. Using it means finish switching is instant and requires no second download. Insist on it.

## 4.3 Mesh separation — the critical requirement

A single merged mesh is useless for a configurator. Every configurable system must be a **separate, independently toggleable node**:

```
P01_FRAME_MAIN            P01_FORK
P01_FRAME_SWINGARM        P01_SHOCK
P01_LINKAGE               P01_WHEEL_FRONT / P01_WHEEL_REAR
P01_HARDWARE_PIVOTS       P01_TYRE_FRONT / P01_TYRE_REAR
P01_HEADSET               P01_BRAKE_FRONT / P01_BRAKE_REAR
P01_SEATPOST              P01_DRIVETRAIN_CRANK / _DERAILLEUR / _CASSETTE / _CHAIN
P01_SADDLE                P01_BAR / P01_STEM / P01_GRIPS
```

**Naming convention is contractual, not cosmetic.** The configurator's model adapter resolves components by node name. A model delivered with `Cube.003` instead of `P01_FORK` is not fit for purpose — say so in the brief.

Each swappable component sits at a defined mount point with correct orientation, so alternates drop in without repositioning.

## 4.4 What must NOT be modelled

This matters as much as what must:

- **No decals, logos or graphics** on the frame unless the graphic package is finalised. A render carrying provisional branding becomes the de facto brand.
- **No third-party component branding** without supplier agreement (§3)
- **No surface detail asserting manufacturing method** — weld beads, mould lines, layup transitions — unless the process is confirmed
- **No invented details** to fill gaps. If cable routing isn't decided, model the frame without it and note the omission.

Every one of these would be a factual claim about an object that does not yet exist. The brief should state that the client operates a documented no-fabrication standard and that invented detail is grounds for rework.

## 4.5 Materials required

- Glacier White — architectural painted finish, semi-gloss
- Naked Carbon — raw UD carbon, anisotropic, clear-coat
- Anodised black hardware
- Grade 5 titanium (fasteners)
- AL7075-T6 machined billet
- Rubber (tyres, grips)
- Standard component materials — anodised, chrome, plastics

## 4.6 Render pack

Consistent studio lighting, neutral seamless, both finishes:

1. Drive side, three-quarter front — hero
2. Drive side, profile — the geometry shot
3. Non-drive side, profile
4. Front three-quarter, low angle
5. Rear three-quarter
6. Top-down
7. Detail: linkage and shock mount
8. Detail: head tube and headset
9. Detail: dropout and rear triangle
10. Detail: bottom bracket junction
11. **Exploded technical view** — the brand-signature image
12. Ghosted/wireframe overlay — engineering documentation style

Deliver 4K PNG with alpha, plus web-optimised WebP derivatives. Plus a 360° turntable at 5° increments for both finishes.

Lighting setup must be saved and reusable so future components render consistently without re-commissioning the studio.

---

# 5. WHO, COST, TIME

| Route | Cost | Time | Notes |
|---|---|---|---|
| Freelance hard-surface product artist | £2,500–6,000 | 4–8 weeks | Best value if you have CAD. Look for automotive/product portfolios, not games. |
| Specialist product-viz studio | £8,000–20,000 | 6–10 weeks | Better project management, render quality, more expensive. |
| Bike-industry-specialist studio | £10,000–25,000 | 6–12 weeks | Understands drivetrains and suspension without explanation. Fewer of them, worth finding. |
| In-house (Blender) | Time only | 3–6 months | Viable only if someone already has the skills. |

**Portfolio test when selecting:** ask for a previous configurator-ready GLB, not just pretty renders. Plenty of excellent render artists have never shipped a realtime asset, and the two disciplines are genuinely different. Ask specifically whether they've delivered `KHR_materials_variants` before.

**Pay in stages tied to deliverables:** grey-box blockout → high-poly master → materials and first renders → realtime GLB → final pack. Don't pay in full up front, and review at blockout — that's when geometry errors are cheap to fix.

---

# 6. PHASING SO YOU'RE NOT BLOCKED

The asset is 4–10 weeks out. The software work isn't blocked by it if you sequence properly.

**Now — Phase 9A and 9B (data + backend).** Nothing in the data unification, schema, saved builds or studio component manager depends on the 3D asset. This is the work that fixes the `configurationData.ts` fork and makes `saved_build_reference` mean something. Start it today.

**Now — commission the asset.** Frame first. It's the hero, it's what you own, it carries both finish options, and it's the one component whose geometry you control.

**Weeks 1–4 — build the model adapter** (Phase 9C Task 4). Define the node-name contract, build the loader against the existing primitive geometry, and make the swap a configuration change rather than a rewrite.

**Weeks 4–8 — supplier CAD conversations** run in parallel. These have their own lead time and are the long pole for the component library.

**On delivery — swap the asset layer.** If 9C was built to the adapter interface, the GLB drops in.

**Component library grows over time.** You don't need all seven third-party components on day one. Ship with the frame accurate and components as accurate unbranded geometry, then upgrade each as supplier CAD lands.

---

# 7. THE HONESTY POSITION STILL APPLIES

Even with a dimensionally exact CAD-derived model, Project 01 has not been prototyped. A photoreal render is a render of the *design*, not of a manufactured object.

Keep the labelling. Not a dismissible tooltip — a persistent, quiet line:

> **R00 DEVELOPMENT GEOMETRY.** Rendered from current engineering CAD. Not a photograph of a manufactured bicycle.

That sentence costs you nothing and buys you everything. It's the difference between "here's our bike" — which every brand says and which would be untrue — and "here's exactly where the design is today", which is your actual proposition and which nobody else can say.

It also protects you when the design changes, because you've already told everyone it would.

---

# 8. IMMEDIATE NEXT ACTIONS

1. **Confirm CAD status.** Exists? Frozen? What format? This determines the branch.
2. **Answer the supplier question.** Do you have agreements with FOX, Hope, DT Swiss, SRAM, Maxxis, Renthal — or are these engineering intentions? Determines whether components can be branded, in 3D and in `components.ts`.
3. **Email supplier OEM contacts** requesting CAD under NDA. Longest lead time, start first.
4. **Resolve wheel format and frame sizes.** The 3D asset has to be modelled to one answer, and build references are permanent.
5. **Commission the frame asset** against §4 of this document.
6. **Start Phase 9A** — it's not blocked by any of the above.

---

If you can tell me the CAD position and the supplier position, I can turn §4 into a tightened brief specific to your situation and draft the supplier CAD request emails.
