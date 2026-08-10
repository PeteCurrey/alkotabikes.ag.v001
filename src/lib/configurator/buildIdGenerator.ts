import { PROJECT_01_FRAME_SIZES, Project01FrameSize } from "@/lib/constants/project01";

export interface BuildIdInput {
  frameSize: string;
  wheelFormat: string;
  finish: string;
  forkId?: string;
  shockId?: string;
  drivetrainId?: string;
  brakesId?: string;
  wheelsId?: string;
  selections?: Record<string, string>;
}

export function generateBuildId(config: BuildIdInput): string {
  const validSizes = PROJECT_01_FRAME_SIZES as readonly string[];
  const sizeCode = validSizes.includes(config.frameSize) ? config.frameSize : "L";
  const isMX = config.wheelFormat === "MX-29-275" || config.wheelFormat === "MX" || config.wheelFormat === "29 / 27.5 MX";
  const wheelCode = isMX ? "MX" : "29";
  
  // Compute deterministic 5-digit seed hash from selections or individual IDs
  const fork = config.forkId || config.selections?.fork || "fork-fox38-factory";
  const shock = config.shockId || config.selections?.shock || "shock-fox-floatx2-factory";
  const dt = config.drivetrainId || config.selections?.drivetrain || "drivetrain-sram-xx-eagle-axs";
  const brakes = config.brakesId || config.selections?.brakes || "brake-front-hope-evov6ti";
  const wheels = config.wheelsId || config.selections?.wheels || "wheels-dt-swiss-exc1200";

  const seedString = `${fork}-${shock}-${dt}-${brakes}-${wheels}-${config.finish}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const numericCode = Math.abs(hash % 90000) + 10000;

  return `A01-${sizeCode}-${wheelCode}-${numericCode}`;
}
