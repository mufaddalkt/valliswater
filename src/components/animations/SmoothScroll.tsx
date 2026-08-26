"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap-utils";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Integrate with GSAP ticker
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    const unsubscribe = () => {
      lenis.destroy();
    };

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
