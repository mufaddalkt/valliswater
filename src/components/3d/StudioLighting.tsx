"use client";

import React from "react";

export function StudioLighting() {
  return (
    <>
      {/* 1. Soft Ambient Light for base illumination */}
      <ambientLight intensity={0.8} color="#f0f6fa" />

      {/* 2. Key Studio Light with soft shadows */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* 3. Cool Glacial Rim Light for crisp edge highlights */}
      <directionalLight
        position={[-5, 3, -4]}
        intensity={2.8}
        color="#98d5f5"
      />

      {/* 4. Top Soft Fill Light */}
      <directionalLight
        position={[0, 8, 0]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* 5. Back Light for glass refraction luminescence */}
      <pointLight
        position={[0, 1, -3.5]}
        intensity={3.5}
        distance={10}
        color="#c0e8fa"
      />

      {/* 6. Soft ground reflection caustic shadow catcher */}
      <mesh
        position={[0, -2.6, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[16, 16]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </>
  );
}
