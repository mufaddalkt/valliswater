"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OriginSection } from "@/components/sections/OriginSection";
import { PuritySection } from "@/components/sections/PuritySection";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { HorizontalCollection } from "@/components/sections/HorizontalCollection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { EditorialPhilosophy } from "@/components/sections/EditorialPhilosophy";
import { ShopGrid } from "@/components/sections/ShopGrid";
import { Footer } from "@/components/sections/Footer";
import { Preloader } from "@/components/ui/Preloader";

// Dynamic import for Three.js 3D Canvas with ssr: false
const BottleCanvas = dynamic(() => import("@/components/3d/BottleCanvas"), {
  ssr: false,
});

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {/* Luxury Intro Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Persistent Floating Navigation */}
      <Navbar />

      {/* Interactive 3D WebGL Bottle Canvas (Fixed across ScrollTrigger chapters) */}
      <BottleCanvas />

      {/* Scrollable Storytelling Chapters */}
      <main className="relative z-20 w-full overflow-hidden">
        {/* 01 HERO */}
        <HeroSection />

        {/* 02 ORIGIN */}
        <OriginSection />

        {/* 03 PURITY & MINERAL MATRIX */}
        <PuritySection />

        {/* 04 TRANSFORMATION & MACRO CRAFT */}
        <TransformationSection />

        {/* 05 HORIZONTAL SCROLL COLLECTION */}
        <HorizontalCollection />

        {/* 06 SUSTAINABILITY & CIRCULARITY */}
        <SustainabilitySection />

        {/* 07 EDITORIAL MANIFESTO */}
        <EditorialPhilosophy />

        {/* 08 COMMERCE SHOP & SIZE CONFIGURATOR */}
        <ShopGrid />

        {/* FOOTER */}
        <Footer />
      </main>
    </>
  );
}
