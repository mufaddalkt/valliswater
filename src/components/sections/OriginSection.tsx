"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-utils";
import { Layers, ShieldAlert, Sparkles, Wind } from "lucide-react";

export function OriginSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const textItems = Array.from(textGroupRef.current?.children || []).filter(Boolean);
      if (textItems.length > 0) {
        gsap.from(textItems, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
          opacity: 0,
          x: -50,
          stagger: 0.15,
          ease: "power2.out",
        });
      }

      const statItems = Array.from(statsRef.current?.children || []).filter(Boolean);
      if (statItems.length > 0) {
        gsap.from(statItems, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
          opacity: 0,
          y: 40,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center px-6 sm:px-12 lg:px-20 py-24 z-20 pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Typography & Geological Story (Left 6-7 cols) */}
        <div
          ref={textGroupRef}
          className="lg:col-span-6 space-y-8 pointer-events-auto select-none"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-sky-400 font-medium">
              CHAPTER 01 // GEOLOGICAL GENESIS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.12em] uppercase font-light text-white leading-tight">
              WHERE PURITY
              <span className="block italic text-neutral-400 font-normal">
                BEGINS.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-lg font-sans">
            Born high above the cloud ceiling at 4,200 meters. Precipitation falls as virgin snow upon ancient crystalline granite glaciers, embarking on a 300-year gravity-driven journey through porous volcanic basalt.
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-lg font-sans">
            Far removed from human habitation and environmental contamination, the water rests in a subterranean vacuum chamber under immense subterranean hydrostatic pressure, naturally oxygenating while absorbing therapeutic ionic silica.
          </p>

          {/* Geological Telemetry Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 max-w-lg"
          >
            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono">
                <Wind className="w-3.5 h-3.5" />
                <span>ELEVATION</span>
              </div>
              <p className="text-2xl font-serif tracking-wide text-white">
                4,200 <span className="text-xs font-mono text-neutral-400">M</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-mono">
                Sub-alpine Crest
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>FILTRATION</span>
              </div>
              <p className="text-2xl font-serif tracking-wide text-white">
                300 <span className="text-xs font-mono text-neutral-400">YRS</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-mono">
                Volcanic Strata
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TEMPERATURE</span>
              </div>
              <p className="text-2xl font-serif tracking-wide text-white">
                2.4 <span className="text-xs font-mono text-neutral-400">°C</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-mono">
                Cryogenic Aquifer
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-sm space-y-1">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>NITRATES</span>
              </div>
              <p className="text-2xl font-serif tracking-wide text-white">
                0.0 <span className="text-xs font-mono text-neutral-400">MG/L</span>
              </p>
              <p className="text-[10px] text-neutral-400 font-mono">
                Undetectable Zero
              </p>
            </div>
          </div>
        </div>

        {/* Right side is intentionally open for the 3D bottle placement */}
        <div className="hidden lg:block lg:col-span-6" />
      </div>
    </section>
  );
}
