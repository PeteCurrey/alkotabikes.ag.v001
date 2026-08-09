"use client";

import React, { createContext, useContext } from "react";
import { Region, getRegion, RegionCode } from "@/lib/regions";

interface RegionContextType {
  region: Region;
  regionCode: RegionCode;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({
  regionCode,
  children,
}: {
  regionCode: RegionCode;
  children: React.ReactNode;
}) {
  const region = getRegion(regionCode);

  return (
    <RegionContext.Provider value={{ region, regionCode }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion(): RegionContextType {
  const context = useContext(RegionContext);
  if (!context) {
    // Default fallback if used outside provider
    return {
      region: getRegion("us"),
      regionCode: "us",
    };
  }
  return context;
}
