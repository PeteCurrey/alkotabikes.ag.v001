import { BikeConfiguration } from "./types";

export function generateBuildId(config: BikeConfiguration): string {
  const sizeCode = config.frameSize;
  const wheelCode = config.wheelFormat === "MX-29-275" ? "MX" : "29";
  const finishCode = config.finish.substring(0, 3);
  
  // Compute deterministic 5-digit seed hash from selected component IDs
  const seedString = `${config.fork.id}-${config.shock.id}-${config.drivetrain.id}-${config.brakes.id}-${config.wheelset.id}-${config.finish}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const numericCode = Math.abs(hash % 90000) + 10000;

  return `A01-${sizeCode}-${wheelCode}-${numericCode}`;
}
