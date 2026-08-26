"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MineralParticlesProps {
  visible: boolean;
  opacity?: number;
}

export function MineralParticles({ visible, opacity = 1 }: MineralParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate geometric mineral crystal instances (Silica tetrahedrons, Magnesium octahedrons, Calcium cubes)
  const particles = useMemo(() => {
    const items = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.5;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const scale = 0.04 + Math.random() * 0.08;
      const speed = 0.2 + Math.random() * 0.4;
      const rotSpeed = 0.5 + Math.random() * 1.5;
      const type = i % 3; // 0 = Octahedron (Mg), 1 = Tetrahedron/Icosahedron (Silica), 2 = Dodecahedron (Ca)

      items.push({ x, y, z, scale, speed, rotSpeed, type, theta, radius });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (!p) return;

      // Orbit around the bottle
      const curTheta = p.theta + t * p.speed * 0.3;
      child.position.x = Math.cos(curTheta) * (p.radius + Math.sin(t * 0.5 + i) * 0.3);
      child.position.z = Math.sin(curTheta) * (p.radius + Math.sin(t * 0.5 + i) * 0.3);
      child.position.y = p.y + Math.sin(t * p.speed + i) * 0.4;

      child.rotation.x += 0.01 * p.rotSpeed;
      child.rotation.y += 0.015 * p.rotSpeed;
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
          {p.type === 0 && <octahedronGeometry args={[1, 0]} />}
          {p.type === 1 && <tetrahedronGeometry args={[1, 0]} />}
          {p.type === 2 && <dodecahedronGeometry args={[1, 0]} />}
          <meshPhysicalMaterial
            roughness={0.1}
            transmission={0.9}
            ior={1.6}
            thickness={0.5}
            color={p.type === 0 ? "#78b4d6" : p.type === 1 ? "#ccebf4" : "#ffffff"}
            emissive={p.type === 0 ? "#124265" : p.type === 1 ? "#1b536b" : "#223344"}
            emissiveIntensity={0.4}
            transparent
            opacity={opacity * 0.85}
          />
        </mesh>
      ))}
    </group>
  );
}
