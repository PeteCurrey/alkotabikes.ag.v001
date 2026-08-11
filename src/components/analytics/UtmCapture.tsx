"use client";

import { useEffect } from "react";
import { captureUtmOnLanding } from "@/lib/leads/utm";

export default function UtmCapture() {
  useEffect(() => {
    captureUtmOnLanding();
  }, []);

  return null;
}
