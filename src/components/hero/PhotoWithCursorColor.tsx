"use client";

import { useEffect, useRef } from "react";

export function PhotoWithCursorColor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const mask = maskRef.current;

    if (!container || !mask) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mask.style.maskImage = `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, black 100%)`;
      mask.style.webkitMaskImage = `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, black 100%)`;
    };

    const onLeave = () => {
      mask.style.maskImage = "none";
      mask.style.webkitMaskImage = "none";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[470px] w-auto"
      style={{
        animation: "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both",
      }}
    >
      <img
        src="/profile.png"
        alt="Márcio Carvalho"
        className="h-[470px] w-auto object-cover object-top select-none"
      />

      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{ maskImage: "none", WebkitMaskImage: "none" }}
      >
        <img
          src="/profile.png"
          alt=""
          aria-hidden
          className="h-[470px] w-auto object-cover object-top grayscale select-none"
        />
      </div>
    </div>
  );
}