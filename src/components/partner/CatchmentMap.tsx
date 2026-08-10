"use client";

import React, { useEffect, useState } from "react";

interface CatchmentMapProps {
  latitude: number;
  longitude: number;
  radiusMiles: number;
  businessName: string;
}

export default function CatchmentMap({
  latitude,
  longitude,
  radiusMiles,
  businessName,
}: CatchmentMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dynamically inject Leaflet CSS stylesheet if not present
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-80 bg-alkota-carbon border border-white/15 flex items-center justify-center font-mono text-xs text-alkota-slate">
        LOADING CATCHMENT MAP...
      </div>
    );
  }

  const radiusMetres = radiusMiles * 1609.344;

  return (
    <div className="w-full space-y-2">
      <div className="w-full h-80 bg-alkota-carbon border border-white/15 overflow-hidden relative z-0">
        <ClientLeafletMap
          latitude={latitude}
          longitude={longitude}
          radiusMetres={radiusMetres}
          businessName={businessName}
          radiusMiles={radiusMiles}
        />
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] text-alkota-slate uppercase">
        <span>Map provider: Leaflet / OpenStreetMap</span>
        <span>Centroid: {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°W</span>
      </div>
    </div>
  );
}

function ClientLeafletMap({
  latitude,
  longitude,
  radiusMetres,
  businessName,
  radiusMiles,
}: {
  latitude: number;
  longitude: number;
  radiusMetres: number;
  businessName: string;
  radiusMiles: number;
}) {
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamic import for Leaflet React components to avoid SSR issues
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
    ]).then(([ReactLeaflet, L]) => {
      setMapComponents({
        MapContainer: ReactLeaflet.MapContainer,
        TileLayer: ReactLeaflet.TileLayer,
        Marker: ReactLeaflet.Marker,
        Popup: ReactLeaflet.Popup,
        Circle: ReactLeaflet.Circle,
        L,
      });
    });
  }, []);

  if (!MapComponents) {
    return (
      <div className="w-full h-full bg-alkota-carbon flex items-center justify-center font-mono text-xs text-alkota-slate">
        INITIALISING GEOGRAPHIC CENTROID...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Circle } = MapComponents;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <div className="font-mono text-xs text-black">
            <strong>{businessName}</strong>
            <div>Catchment Radius: {radiusMiles} miles</div>
          </div>
        </Popup>
      </Marker>
      <Circle
        center={[latitude, longitude]}
        radius={radiusMetres}
        pathOptions={{
          color: "#ff3b00", // Alkota signal orange
          fillColor: "#ff3b00",
          fillOpacity: 0.15,
          weight: 2,
        }}
      />
    </MapContainer>
  );
}
