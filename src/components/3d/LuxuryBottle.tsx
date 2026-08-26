"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ProductItem } from "@/lib/products";

interface LuxuryBottleProps {
  product: ProductItem;
  mousePos: { x: number; y: number };
  isHovered: boolean;
}

// Cached textures to avoid on-the-fly allocations
const labelTextureCache = new Map<string, THREE.CanvasTexture>();

function getOrCreateLabelTexture(volume: string): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  if (labelTextureCache.has(volume)) {
    return labelTextureCache.get(volume)!;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, 1024, 1024);

    // Subtle frosted label background
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(160, 200, 704, 624);

    // Border outline - ultra fine luxury stroke
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(170, 210, 684, 604);

    // Inner decorative hairline
    ctx.strokeStyle = "rgba(180, 220, 240, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(185, 225, 654, 574);

    // Brand Monogram Seal
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "300 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("EST. 2026", 512, 290);

    // Brand Name
    ctx.font = "600 76px 'Italiana', 'Cormorant Garamond', serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("VALLIS", 512, 380);

    // Subtitle
    ctx.font = "300 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "rgba(210, 235, 248, 0.9)";
    ctx.fillText("ARTESIAN GLACIAL WATER", 512, 430);

    // Divider line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.moveTo(340, 480);
    ctx.lineTo(684, 480);
    ctx.stroke();

    // Elevation & Purity telemetry
    ctx.font = "400 22px 'Space Grotesk', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fillText("ALTITUDE 4,200 M", 512, 535);

    ctx.font = "300 18px 'Space Grotesk', monospace";
    ctx.fillStyle = "rgba(180, 220, 240, 0.75)";
    ctx.fillText("pH 7.88  ·  TDS 18 mg/L  ·  SILICA 48 mg", 512, 575);

    // Volume mark
    ctx.font = "600 28px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(volume || "500 ML", 512, 660);

    ctx.font = "300 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("BOTTLED AT THE SOURCE · SWISS ALPS", 512, 710);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  labelTextureCache.set(volume, texture);
  return texture;
}

export function LuxuryBottle({ product, mousePos, isHovered }: LuxuryBottleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bottleMeshRef = useRef<THREE.Mesh>(null);
  const fluidMeshRef = useRef<THREE.Mesh>(null);
  const capMeshRef = useRef<THREE.Mesh>(null);
  const labelMeshRef = useRef<THREE.Mesh>(null);

  const labelTexture = useMemo(() => {
    return getOrCreateLabelTexture(product.volume);
  }, [product.volume]);

  // Construct procedural lathe points for realistic glass silhouette
  const { glassGeometry, fluidGeometry, capGeometry, labelGeometry } = useMemo(() => {
    const h = 4.2 * product.heightRatio;
    const rBody = 1.05 * product.widthRatio;
    const rNeck = 0.36 * product.neckRatio;
    const rLip = 0.42 * product.neckRatio;
    const shoulderStart = h * 0.58;
    const neckStart = h * 0.82;

    // Glass points profile
    const points: THREE.Vector2[] = [];
    // Concave bottom punt
    points.push(new THREE.Vector2(0.01, -h * 0.48));
    points.push(new THREE.Vector2(rBody * 0.35, -h * 0.42));
    points.push(new THREE.Vector2(rBody * 0.85, -h * 0.48));
    points.push(new THREE.Vector2(rBody, -h * 0.46));
    // Main cylindrical body
    points.push(new THREE.Vector2(rBody, -h * 0.4));
    points.push(new THREE.Vector2(rBody, shoulderStart - h * 0.5));
    // Tapering shoulder curve
    const shoulderSteps = 16;
    for (let i = 1; i <= shoulderSteps; i++) {
      const t = i / shoulderSteps;
      const curY = shoulderStart - h * 0.5 + (neckStart - shoulderStart) * Math.sin(t * Math.PI * 0.5);
      const curR = rBody - (rBody - rNeck) * Math.sin(t * Math.PI * 0.5);
      points.push(new THREE.Vector2(curR, curY));
    }
    // Neck
    points.push(new THREE.Vector2(rNeck, h * 0.46));
    // Lip finish & threading
    points.push(new THREE.Vector2(rLip, h * 0.47));
    points.push(new THREE.Vector2(rLip, h * 0.5));
    points.push(new THREE.Vector2(rNeck * 0.85, h * 0.5)); // inner bore

    const glassGeom = new THREE.LatheGeometry(points, 64);
    glassGeom.computeVertexNormals();

    // Internal Fluid profile
    const fluidPoints: THREE.Vector2[] = [];
    const fluidH = h * 0.86;
    const fluidR = rBody * 0.94;
    const fluidNeckR = rNeck * 0.88;

    fluidPoints.push(new THREE.Vector2(0.01, -h * 0.45));
    fluidPoints.push(new THREE.Vector2(fluidR * 0.8, -h * 0.45));
    fluidPoints.push(new THREE.Vector2(fluidR, -h * 0.43));
    fluidPoints.push(new THREE.Vector2(fluidR, shoulderStart - h * 0.5));
    // Shoulder curve for fluid
    for (let i = 1; i <= shoulderSteps; i++) {
      const t = i / shoulderSteps;
      const curY = shoulderStart - h * 0.5 + (neckStart - shoulderStart) * Math.sin(t * Math.PI * 0.5);
      const curR = fluidR - (fluidR - fluidNeckR) * Math.sin(t * Math.PI * 0.5);
      if (curY <= fluidH - h * 0.5) {
        fluidPoints.push(new THREE.Vector2(curR, curY));
      }
    }
    fluidPoints.push(new THREE.Vector2(0.01, fluidH - h * 0.5)); // fluid surface meniscus

    const fluidGeom = new THREE.LatheGeometry(fluidPoints, 64);
    fluidGeom.computeVertexNormals();

    // Titanium Cap
    const capGeom = new THREE.CylinderGeometry(rLip * 1.06, rLip * 1.06, 0.45, 48);

    // Label cylinder overlay
    const labelH = h * 0.38;
    const labelR = rBody * 1.008;
    const labelGeom = new THREE.CylinderGeometry(
      labelR,
      labelR,
      labelH,
      48,
      1,
      true,
      -Math.PI * 0.4,
      Math.PI * 0.8
    );

    return {
      glassGeometry: glassGeom,
      fluidGeometry: fluidGeom,
      capGeometry: capGeom,
      labelGeometry: labelGeom,
    };
  }, [product.heightRatio, product.widthRatio, product.neckRatio]);

  // Condensation micro droplets (instanced particles on the glass surface)
  const dropletData = useMemo(() => {
    const count = 48;
    const positions: [number, number, number][] = [];
    const scales: number[] = [];
    const r = 1.05 * product.widthRatio * 1.01;
    const h = 4.2 * product.heightRatio;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.sin(i * 99) * 0.5);
      const y = -h * 0.35 + (i / count) * (h * 0.65);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      positions.push([x, y, z]);
      scales.push(0.018 + (i % 5) * 0.007);
    }
    return { positions, scales };
  }, [product.heightRatio, product.widthRatio]);

  // Continuous subtle idle floating and mouse tilt physics
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Subtle idle floating & breathing motion
    const idleFloat = Math.sin(t * 0.9) * 0.04;
    const idleRotate = t * 0.12;

    // Mouse responsiveness
    const targetRotX = (mousePos.y * 0.25);
    const targetRotY = idleRotate + (mousePos.x * 0.4);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      Math.min(1, delta * 3.5)
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      Math.min(1, delta * 3.5)
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      idleFloat,
      Math.min(1, delta * 3.5)
    );
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* 1. Procedural Optical Flint Glass Shell */}
      <mesh
        ref={bottleMeshRef}
        geometry={glassGeometry}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          roughness={0.04}
          metalness={0.02}
          reflectivity={0.92}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          color="#ffffff"
          transparent
          opacity={0.84}
          depthWrite={true}
        />
      </mesh>

      {/* 2. Pure Artesian Glacial Fluid Mesh */}
      <mesh ref={fluidMeshRef} geometry={fluidGeometry}>
        <meshStandardMaterial
          roughness={0.02}
          metalness={0.05}
          color={product.sparkling ? "#d0f0fa" : "#e4f6fc"}
          transparent
          opacity={0.78}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Luxury Brushed Titanium Cap with Knurled Finish */}
      <mesh
        ref={capMeshRef}
        geometry={capGeometry}
        position={[0, 4.2 * product.heightRatio * 0.485, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={product.sparkling ? "#30404d" : "#caced4"}
          metalness={0.95}
          roughness={0.22}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Cap Monogram Top Engraving */}
      <mesh position={[0, 4.2 * product.heightRatio * 0.485 + 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.34 * product.neckRatio, 32]} />
        <meshStandardMaterial
          color="#e8ecf0"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* 4. Luxury Monolithic Front Label with Translucent Silk-screen */}
      {labelTexture && (
        <mesh
          ref={labelMeshRef}
          geometry={labelGeometry}
          position={[0, -0.1 * product.heightRatio, 0]}
        >
          <meshBasicMaterial
            map={labelTexture}
            transparent
            opacity={0.95}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* 5. Realistic Condensation Droplets */}
      {dropletData.positions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[dropletData.scales[idx], 12, 12]} />
          <meshStandardMaterial
            roughness={0.05}
            metalness={0.1}
            color="#ffffff"
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
