"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, ChevronDown, Compass, Droplet, Mountain } from "lucide-react";
import { gsap } from "@/lib/gsap-utils";
import { soundManager } from "@/lib/audio";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });

      tl.from(telemetryRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          headlineRef.current?.children || [],
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          subheadRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToOrigin = () => {
    soundManager.playChime(1000);
    document.getElementById("origin")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShop = () => {
    soundManager.playChime(1200);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 sm:px-12 pt-28 sm:pt-36 pb-12 z-20 pointer-events-none"
    >
      {/* Top Origin Telemetry Badge */}
      <div
        ref={telemetryRef}
        className="flex items-center gap-6 sm:gap-10 text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400 border border-white/10 px-6 py-2.5 rounded-full bg-white/[0.02] backdrop-blur-md pointer-events-auto"
      >
        <span className="flex items-center gap-2 text-sky-300">
          <Mountain className="w-3.5 h-3.5" />
          4,200M SUB-ALPINE
        </span>
        <span className="hidden md:inline-flex items-center gap-2">
          <Droplet className="w-3.5 h-3.5 text-sky-400" />
          TDS 18 MG/L
        </span>
        <span className="hidden sm:inline-flex items-center gap-2">
          <Compass className="w-3.5 h-3.5" />
          46°01&apos;N 7°44&apos;E
        </span>
      </div>

      {/* Main Hero Dramatic Minimal Typography */}
      <div className="w-full max-w-5xl text-center my-auto pointer-events-auto select-none space-y-6">
        <div ref={headlineRef} className="space-y-1 sm:space-y-3">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif tracking-[0.18em] uppercase font-light text-white leading-none drop-shadow-2xl">
            PURE
          </h1>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-[0.22em] uppercase font-light text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-sky-200 to-neutral-400 leading-none">
            BY NATURE.
          </h2>
        </div>

        <div ref={subheadRef} className="max-w-xl mx-auto pt-2">
          <p className="text-sm sm:text-base md:text-lg font-light text-neutral-300 tracking-[0.1em] font-sans leading-relaxed">
            Water, refined to its purest expression through 300 years of glacial basalt filtration.
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pointer-events-auto"
        >
          <button
            onClick={scrollToOrigin}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-sky-200 transition-all duration-300 text-xs font-mono tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-3 group shadow-2xl"
            data-cursor="EXPLORE"
          >
            <span>DISCOVER THE WATER</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={scrollToShop}
            className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white/60 bg-black/30 backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300 text-xs font-mono tracking-[0.25em] uppercase font-light"
            data-cursor="SHOP"
          >
            SHOP COLLECTION
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center gap-3 pointer-events-auto">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
          SCROLL TO IMMERSE
        </span>
        <button
          onClick={scrollToOrigin}
          className="p-2 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300 animate-bounce"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
