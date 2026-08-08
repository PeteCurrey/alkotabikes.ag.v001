# ALKOTA PERFORMANCE ENGINEERING — BRAND SYSTEM & DESIGN TOKENS

## 1. BRAND CORE & POSITIONING
ALKOTA is positioned as an elite performance engineering entity that designs and manufactures high-end mountain bicycles. Rather than resembling a conventional cycling ecommerce store, outdoor apparel site, or lifestyle blog, the visual identity is modeled on:
- Porsche GT product presentation & motorsport engineering
- Red Bull Advanced Technologies & aerospace development labs
- Modern architectural showrooms & high-end industrial design studios

### Central Belief
**Performance is engineered.**

---

## 2. VISUAL TERRITORIES

### 60% — Alpine Precision (Dominant Public World)
- **Palette**: Glacier White (`#F4F6F7`), Snow (`#ECEFF1`), Cool Ice (`#A8C6D8`), Slate (`#737C84`).
- **Characteristics**: Crisp architectural negative space, light neutral backgrounds, brushed metallic hardware, high-contrast imagery of high-altitude mountain landscapes.

### 25% — Industrial Performance (Engineering Credibility)
- **Palette**: Graphite (`#282D31`), Architectural Concrete, Carbon Black (`#0B0D0F`).
- **Characteristics**: Machined aluminium, raw carbon fiber layup, CNC componentry, organized black technical cabinetry, precision assembly fixtures.

### 15% — Test Lab (Dark Technical Layer)
- **Palette**: Carbon Black (`#0B0D0F`), Pitch Black (`#050607`), Technical Signal (`#C8FF00`).
- **Characteristics**: Graphite dark environments, telemetry overlays, CAD schematics, suspension leverage curves, precision measurement grids.

---

## 3. COLOR TOKENS
```css
:root {
  --alkota-white: #F4F6F7;
  --alkota-snow: #ECEFF1;
  --alkota-slate: #737C84;
  --alkota-graphite: #282D31;
  --alkota-carbon: #0B0D0F;
  --alkota-black: #050607;
  --alkota-ice: #A8C6D8;
  --alkota-signal: #C8FF00; /* Use extremely sparingly for active data / annotations */
}
```

---

## 4. TYPOGRAPHY SYSTEM
- **Display**: Space Grotesk (Wide, precise grotesk for headlines and section banners)
- **Body**: Inter (Clean, highly legible neutral sans-serif for editorial narrative)
- **Technical/Data**: IBM Plex Mono (Monospaced typography for CAD callouts, revision IDs, measurements, telemetry)

---

## 5. TECHNICAL GRAPHIC LANGUAGE
Restrained technical annotations placed around imagery and interface panels:
- `PROJECT / 01`
- `CHASSIS / DEVELOPMENT`
- `FRAME / REV 001`
- `MATERIAL / UD CARBON`
- `STATUS / DEVELOPMENT`
- Measurement ticks (`+`, `[ ]`, `ø`), coordinate indicators, and subtle crosshairs.

---

## 6. MOTION PRINCIPLES
- **Physics**: Smooth, controlled, decelerated transitions (ease-out-cubic / custom bezier).
- **Restrictions**: No bouncy physics, no spinning icons, no excessive scale animations.
- **Accessibility**: Strict respect for `prefers-reduced-motion`.
