export type FrameSize = "M" | "L" | "XL";
export type WheelFormat = "29-29" | "MX-29-275";
export type FinishOption = "GLACIER" | "GRAPHITE" | "CARBON" | "LAB";

export interface ComponentOption {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  description: string;
  priceDelta: number; // 0 for base
  weightDelta: number; // grams
  compatibilityTags?: string[];
}

export interface BikeConfiguration {
  platform: string;
  frameSize: FrameSize;
  wheelFormat: WheelFormat;
  finish: FinishOption;
  fork: ComponentOption;
  shock: ComponentOption;
  drivetrain: ComponentOption;
  brakes: ComponentOption;
  wheelset: ComponentOption;
  frontTyre: ComponentOption;
  rearTyre: ComponentOption;
  cockpit: ComponentOption;
  dropper: ComponentOption;
}

export interface BuildSummary {
  buildId: string;
  platform: string;
  frameSize: FrameSize;
  wheelFormat: string;
  finish: string;
  estimatedWeight: string; // "— kg"
  estimatedPrice: string; // "£—"
  status: string;
}
