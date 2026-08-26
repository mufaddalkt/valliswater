"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap-utils";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for custom data-cursor
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        const clickable = (e.target as HTMLElement)?.closest("button, a, input, select, [role='button']");
        if (clickable) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let setDotX: ((value: number) => void) | null = null;
    let setDotY: ((value: number) => void) | null = null;

    if (dotRef.current) {
      setDotX = gsap.quickSetter(dotRef.current, "x", "px") as (value: number) => void;
      setDotY = gsap.quickSetter(dotRef.current, "y", "px") as (value: number) => void;
    }

    let reqId: number;
    const render = () => {
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;

      if (!setDotX && dotRef.current) {
        setDotX = gsap.quickSetter(dotRef.current, "x", "px") as (value: number) => void;
        setDotY = gsap.quickSetter(dotRef.current, "y", "px") as (value: number) => void;
      }

      if (setDotX && setDotY) {
        setDotX(mouse.x);
        setDotY(mouse.y);
      }

      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: pos.x,
          y: pos.y,
        });
      }

      reqId = requestAnimationFrame(render);
    };

    reqId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(reqId);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-200 ${
          isHovered ? "w-2 h-2 bg-sky-400 scale-75" : "w-1.5 h-1.5 bg-neutral-900 dark:bg-white"
        }`}
      />

      {/* Fluid Trailing Ring with context badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none flex items-center justify-center transition-all duration-300 ${
          cursorText
            ? "w-24 h-24 bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-2xl scale-100"
            : isHovered
            ? "w-12 h-12 bg-sky-400/10 border border-sky-400/40 scale-100"
            : "w-8 h-8 border border-neutral-400/30 dark:border-white/20 scale-100"
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[10px] tracking-[0.2em] font-medium uppercase text-neutral-900 dark:text-white select-none whitespace-nowrap animate-pulse"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
