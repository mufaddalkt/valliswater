"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-utils";
import { Compass } from "lucide-react";

export function EditorialPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quote1Ref = useRef<HTMLHeadingElement>(null);
  const quote2Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      if (quote1Ref.current) {
        tl.from(quote1Ref.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (quote2Ref.current) {
        tl.from(
          quote2Ref.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
          },
          "+=0.2"
        );
      }

      const bodyItems = Array.from(bodyRef.current?.children || []).filter(Boolean);
      if (bodyItems.length > 0) {
        tl.from(
          bodyItems,
          {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 py-32 z-20 pointer-events-none"
    >
      <div className="w-full max-w-5xl mx-auto space-y-16 pointer-events-auto select-none">
        {/* Subtle Chapter Marker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
          <span>CHAPTER 06 // EDITORIAL MANIFESTO</span>
          <span>VALAIS REGION · SWITZERLAND</span>
        </div>

        {/* Dramatic Editorial Split Statement */}
        <div className="space-y-6 text-center sm:text-left">
          <h2
            ref={quote1Ref}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-[0.14em] uppercase font-light text-white leading-none"
          >
            WATER IS SIMPLE.
          </h2>

          <h3
            ref={quote2Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-[0.14em] uppercase font-light italic text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-neutral-100 to-neutral-400 leading-none pt-2"
          >
            GETTING IT RIGHT ISN’T.
          </h3>
        </div>

        {/* Dual Column Editorial Essay */}
        <div
          ref={bodyRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 pt-8 text-neutral-300 font-light font-sans leading-relaxed text-sm sm:text-base border-t border-white/10"
        >
          <div className="space-y-4">
            <p className="text-white font-serif text-lg sm:text-xl tracking-wide italic">
              &quot;Most water is industrially processed, reverse-osmosis stripped, and artificially remineralized in steel vats. We believe that true luxury is patience.&quot;
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We did not build factories; we protected a geological sanctuary. For three centuries, snowmelt filters across miles of pristine mineral basalt under immense subterranean stillness.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              When water touches air or plastic, its delicate thermodynamic equilibrium is lost. That is why VALLIS is bottled directly in sub-zero alpine chambers, sealed in optical flint glass with titanium closures, and delivered under strict temperature control.
            </p>
            <div className="pt-4 flex items-center gap-4 text-xs font-mono text-sky-300">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>THE PURSUIT OF UNALTERED PERFECTION.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
