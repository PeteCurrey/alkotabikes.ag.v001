"use client";

import React from "react";
import { ContactShadows } from "@react-three/drei";

const ambientLight = "ambientLight" as any;
const directionalLight = "directionalLight" as any;
const pointLight = "pointLight" as any;

export default function Environment() {
  return (
    <>
      {/* Studio Ambient & Key Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={2048}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <pointLight position={[0, 4, 0]} intensity={0.8} color="#A8C6D8" />
      <pointLight position={[0, -2, 0]} intensity={0.3} color="#647789" />

      {/* Ground Contact Shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.7}
        scale={6}
        blur={2.5}
        far={4}
        color="#0B0D0F"
      />
    </>
  );
}
