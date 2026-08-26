"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LuxuryBottle } from "./LuxuryBottle";
import { MineralParticles } from "./MineralParticles";
import { StudioLighting } from "./StudioLighting";
import { useCart } from "@/context/CartContext";
import { gsap, ScrollTrigger } from "@/lib/gsap-utils";

interface SceneManagerProps {
  mousePos: { x: number; y: number };
  isHovered: boolean;
}

function SceneManager({ mousePos, isHovered }: SceneManagerProps) {
  const { activeProduct } = useCart();
  const bottleGroupRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMinerals, setShowMinerals] = useState(false);

  // GSAP ScrollTrigger timeline sync
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          setShowMinerals(self.progress > 0.28 && self.progress < 0.58);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Compute smooth interpolated transform targets based on scrollProgress
  useFrame((state, delta) => {
    if (!bottleGroupRef.current) return;

    const p = scrollProgress;
    let targetX = 0;
    let targetY = -0.15;
    let targetZ = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let targetScale = 1.08;

    if (p < 0.18) {
      // 01 HERO: Centered, prominent, breathing
      const t = p / 0.18;
      targetX = THREE.MathUtils.lerp(0, 1.8, t);
      targetY = THREE.MathUtils.lerp(-0.15, -0.25, t);
      targetZ = THREE.MathUtils.lerp(0, -0.2, t);
      targetRotY = THREE.MathUtils.lerp(0, -0.65, t);
      targetRotX = THREE.MathUtils.lerp(0, 0.08, t);
      targetScale = THREE.MathUtils.lerp(1.08, 1.02, t);
    } else if (p < 0.4) {
      // 02 ORIGIN: Glided to the right
      const t = (p - 0.18) / 0.22;
      targetX = THREE.MathUtils.lerp(1.8, -1.8, t);
      targetY = THREE.MathUtils.lerp(-0.25, 0.05, t);
      targetZ = THREE.MathUtils.lerp(-0.2, 0.3, t);
      targetRotY = THREE.MathUtils.lerp(-0.65, 0.55, t);
      targetRotX = THREE.MathUtils.lerp(0.08, -0.05, t);
      targetScale = THREE.MathUtils.lerp(1.02, 1.05, t);
    } else if (p < 0.62) {
      // 03 PURITY / MINERALS: Left aligned, elevated, with particles
      const t = (p - 0.4) / 0.22;
      targetX = THREE.MathUtils.lerp(-1.8, 0.0, t);
      targetY = THREE.MathUtils.lerp(0.05, -0.75, t);
      targetZ = THREE.MathUtils.lerp(0.3, 1.75, t);
      targetRotY = THREE.MathUtils.lerp(0.55, -1.15, t);
      targetRotX = THREE.MathUtils.lerp(-0.05, -0.15, t);
      targetScale = THREE.MathUtils.lerp(1.05, 1.25, t);
    } else if (p < 0.8) {
      // 04 TRANSFORMATION: Dramatic Macro close-up
      const t = (p - 0.62) / 0.18;
      targetX = THREE.MathUtils.lerp(0.0, 0.0, t);
      targetY = THREE.MathUtils.lerp(-0.75, -0.15, t);
      targetZ = THREE.MathUtils.lerp(1.75, 0.1, t);
      targetRotY = THREE.MathUtils.lerp(-1.15, 0.0, t);
      targetRotX = THREE.MathUtils.lerp(-0.15, 0.0, t);
      targetScale = THREE.MathUtils.lerp(1.25, 1.0, t);
    } else {
      // 05 COLLECTION / SHOP / SUSTAINABILITY: Calm showcase position
      targetX = 0.0;
      targetY = -0.15;
      targetZ = 0.1;
      targetRotY = 0.0;
      targetRotX = 0.0;
      targetScale = 1.0;
    }

    // Smooth lerp to targets
    const lerpFactor = delta * 4.2;
    bottleGroupRef.current.position.x = THREE.MathUtils.lerp(
      bottleGroupRef.current.position.x,
      targetX,
      lerpFactor
    );
    bottleGroupRef.current.position.y = THREE.MathUtils.lerp(
      bottleGroupRef.current.position.y,
      targetY,
      lerpFactor
    );
    bottleGroupRef.current.position.z = THREE.MathUtils.lerp(
      bottleGroupRef.current.position.z,
      targetZ,
      lerpFactor
    );

    bottleGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      bottleGroupRef.current.rotation.x,
      targetRotX,
      lerpFactor
    );
    bottleGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      bottleGroupRef.current.rotation.y,
      targetRotY,
      lerpFactor
    );

    bottleGroupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(bottleGroupRef.current.scale.x, targetScale, lerpFactor)
    );
  });

  return (
    <>
      <StudioLighting />
      <group ref={bottleGroupRef}>
        <LuxuryBottle
          product={activeProduct}
          mousePos={mousePos}
          isHovered={isHovered}
        />
        <MineralParticles visible={showMinerals} opacity={1} />
      </group>
    </>
  );
}

export default function BottleCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    >
      <div
        className="w-full h-full pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="ROTATE 3D"
      >
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
          shadows
        >
          <SceneManager mousePos={mousePos} isHovered={isHovered} />
        </Canvas>
      </div>
    </div>
  );
}
