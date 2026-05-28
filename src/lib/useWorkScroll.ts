"use client";

import { useEffect, useRef, useState } from "react";

export function useWorkScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const velRef     = useRef(0);
  const rafRef     = useRef<number>(0);
  const [visible,  setVisible]  = useState(false);
  const [progress, setProgress] = useState(0);

  /* ── Entrance observer ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  /* ── Smooth inertia loop ── */
  const startInertia = () => {
    cancelAnimationFrame(rafRef.current);
    const track = trackRef.current;
    if (!track) return;

    const loop = () => {
      if (Math.abs(velRef.current) < 0.4) {
        velRef.current = 0;
        return;
      }
      track.scrollLeft += velRef.current;
      velRef.current   *= 0.90;
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  /* ── Wheel → horizontal with inertia ── */
  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      if (rect.top > 1 || rect.bottom < window.innerHeight - 1) return;

      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;

      const atStart = track.scrollLeft <= 0       && e.deltaY < 0;
      const atEnd   = track.scrollLeft >= max - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;

      e.preventDefault();
      velRef.current += e.deltaY * 0.55;
      startInertia();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Drag to scroll ── */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    cancelAnimationFrame(rafRef.current);
    velRef.current = 0;

    track.style.cursor = "grabbing";
    const startX      = e.pageX;
    const startScroll = track.scrollLeft;
    let   lastX       = e.pageX;
    let   lastVel     = 0;

    const onMove = (ev: MouseEvent) => {
      const dx = ev.pageX - startX;
      track.scrollLeft = startScroll - dx;
      lastVel = ev.pageX - lastX;
      lastX   = ev.pageX;
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    };

    const onUp = () => {
      track.style.cursor = "grab";
      velRef.current = -lastVel * 1.4;
      startInertia();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  };

  return {
    sectionRef,
    trackRef,
    visible,
    progress,
    handleMouseDown,
    handleScroll,
  };
}