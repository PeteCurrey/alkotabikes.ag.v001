"use client";

/**
 * SchematicViewerWrapper
 *
 * Lazy boundary for ConfiguratorCanvas. Always imported with:
 *   dynamic(() => import("@/components/three/SchematicViewerWrapper"), { ssr: false })
 *
 * This ensures the Canvas never runs during SSR, preserving the server-rendered
 * spec shell word count and preventing hydration mismatches.
 */

import React from "react";
import ConfiguratorCanvas, { ConfiguratorCanvasProps } from "./ConfiguratorCanvas";

export type { ConfiguratorCanvasProps };

export default function SchematicViewerWrapper(props: ConfiguratorCanvasProps) {
  return <ConfiguratorCanvas {...props} />;
}
