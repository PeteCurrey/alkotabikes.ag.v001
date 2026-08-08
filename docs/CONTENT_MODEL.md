# ALKOTA PERFORMANCE ENGINEERING — CONTENT MODEL & INFORMATION ARCHITECTURE

## 1. TEMPORARY NAMING & STATEMENT POLICY
Because the website is created before final production bicycles are manufactured:
1. **Model Identifier**: Flagship platform is referred to internally as **PROJECT 01**.
2. **Fact Guarantee**: No claims regarding Swiss engineering, race victories, 10,000 test hours, aerospace patents, or rider testimonials are included unless empirical evidence is supplied.
3. **Data Placeholders**: Em-dashes (`—`) are used for unconfirmed numerical values such as weight (`— kg`), pricing (`£—`), and geometry metrics.

---

## 2. PHOTOGRAPHIC WORLDS & IMAGE STRUCTURE
All visual content adheres to 5 photographic domains:

1. **/public/media/bikes/project-01/** — Clean bicycle studio photography, side profiles, carbon weave closeups, high negative space.
2. **/public/media/riding/** — Authentic high-altitude mountain terrain, rock, alpine weather, high speed.
3. **/public/media/engineering/** — CAD models, FEA simulations, prototype frame jigs, telemetry graphs, load test rigs.
4. **/public/media/workshop/** — Matte charcoal cabinetry, long organized tool walls, architectural concrete, linear overhead lighting, precision assembly.
5. **/public/media/landscape/** — Sparse atmospheric cloud, cold granite tones, high altitude scale.

---

## 3. ROUTE MAP & CONTENT RESPONSIBILITIES

| Route | Title | Key Components |
|---|---|---|
| `/` | Flagship Homepage | 12-section cinematic story, Hotspot viewer, 4 pillars, Workshop feature, Process timeline, Configurator preview |
| `/bikes` | Platform Overview | Project 01 overview, engineering philosophy, configuration CTA |
| `/bikes/project-01` | Flagship Product Detail | Complete chassis overview, geometry placeholder grid, inline configurator launch |
| `/configure` | Interactive 3D & 2D Configurator | 13-step build system, deterministic Build ID, R3F WebGL view, 2D fallback, live specs |
| `/engineering` | Engineering Centre Hub | Technical pillars, CAD viewer placeholder, suspension telemetry graphics |
| `/engineering/chassis` | Chassis Architecture | Frame packaging, stiffness targets, serviceability, internal cable routing |
| `/engineering/kinematics` | Suspension Kinematics | Interactive leverage ratio, anti-squat, pedal kickback SVG telemetry charts |
| `/engineering/materials` | Composite & Metals | Interactive material swatches (UD Carbon, 7075-T6 Aluminium, Titanium hardware) |
| `/engineering/testing` | Validation Laboratory | Simulation vs real-world telemetry, frame fatigue testing, trail iteration log |
| `/journal` | Field Notes | Technical editorial articles & deep dives |
| `/journal/[slug]` | Field Notes Article | Single editorial reader view |
| `/about` | Philosophy & Company | Purpose statement, engineering methodology, design studio vision |
| `/support` | Owner Support Portal | Documentation hub, technical guides, warranty portal |
| `/dealers` | Experience Partners | Handpicked performance center directory |
| `/contact` | Direct Contact | Engineering inquiry form & media contact |
| `/design-system` | Developer Showcase | Live UI tokens, typography test, annotations, component state gallery |
