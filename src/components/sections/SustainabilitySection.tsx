"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-utils";
import { Leaf, Recycle, ShieldCheck, Sparkles } from "lucide-react";

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.from(metricsRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "top 15%",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-28 z-20 pointer-events-none"
    >
      <div className="w-full max-w-6xl mx-auto space-y-16 pointer-events-auto select-none">
        {/* Editorial Title */}
        <div ref={titleRef} className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-sky-400 font-medium flex items-center justify-center gap-2">
            <Recycle className="w-3.5 h-3.5" />
            CHAPTER 05 // CIRCULAR PRESERVATION
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.14em] uppercase font-light text-white leading-tight">
            NATURE TAKES CENTURIES.
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-neutral-100 to-neutral-400 font-normal">
              WE LEAVE ZERO TRACE.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto font-sans leading-relaxed">
            Our extraction is capped at less than 0.05% of the aquifer&apos;s natural replenishment rate. Every vessel is forged for infinite circular reuse.
          </p>
        </div>

        {/* Dramatic Animated Big Typography Metrics */}
        <div
          ref={metricsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {/* Metric 1 */}
          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-sm space-y-3 hover:border-sky-400/40 transition-colors">
            <span className="text-6xl sm:text-7xl font-serif text-white font-light tracking-tight block">
              100<span className="text-3xl text-sky-400 font-mono">%</span>
            </span>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-sky-300 block font-semibold">
              INFINITE SILICA
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
              Forged from monolithic pure flint glass. Infinitely recyclable with zero loss of molecular optical clarity.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-sm space-y-3 hover:border-sky-400/40 transition-colors">
            <span className="text-6xl sm:text-7xl font-serif text-white font-light tracking-tight block">
              0.00<span className="text-3xl text-sky-400 font-mono">%</span>
            </span>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-sky-300 block font-semibold">
              PLASTIC FREE
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
              Aerospace titanium cap closures and plant-based cellulose seals. Zero microplastics across the supply line.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-sm space-y-3 hover:border-sky-400/40 transition-colors">
            <span className="text-6xl sm:text-7xl font-serif text-white font-light tracking-tight block">
              0.05<span className="text-3xl text-sky-400 font-mono">%</span>
            </span>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-sky-300 block font-semibold">
              ANNUAL HARVEST
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
              Strictly limited seasonal harvest safeguarding subterranean water table pressure for future generations.
            </p>
          </div>

          {/* Metric 4 */}
          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-sm space-y-3 hover:border-sky-400/40 transition-colors">
            <span className="text-6xl sm:text-7xl font-serif text-white font-light tracking-tight block">
              NET 0<span className="text-2xl text-sky-400 font-mono">CO₂</span>
            </span>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-sky-300 block font-semibold">
              ZERO CARBON
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
              Powered entirely by hydro-electric mountain generators and regional electric temperature-controlled fleet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
