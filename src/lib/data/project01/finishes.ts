/**
 * ALKOTA Performance Engineering — Launch Finishes
 */

export interface FinishColorway {
  id: "GLACIER" | "CARBON";
  code: string;
  name: string;
  subtitle: string;
  description: string;
  imagePath: string;
  swatchHex: string;
  borderHex: string;
}

export const CANONICAL_FINISHES: FinishColorway[] = [
  {
    id: "GLACIER",
    code: "01",
    name: "GLACIER WHITE",
    subtitle: "Alpine Precision Finish",
    description: "Sculpted alpine white finish designed to emphasize carbon tube profiles and titanium hardware accents.",
    imagePath: "/images/project01-glacier-white.png",
    swatchHex: "#F4F6F7",
    borderHex: "#A8C6D8",
  },
  {
    id: "CARBON",
    code: "02",
    name: "NAKED CARBON",
    subtitle: "Raw Composite Structure",
    description: "Exposed 3K unidirectional carbon composite layup with a lightweight matte protective clear coat.",
    imagePath: "/images/project01-naked-carbon.png",
    swatchHex: "#16191C",
    borderHex: "#3A4148",
  },
];
