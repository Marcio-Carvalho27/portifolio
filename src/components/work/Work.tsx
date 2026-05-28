"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/work";

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hasLink = !!project.href;

  const sharedProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className: "relative shrink-0 rounded-[24px] overflow-hidden block",
    style: {
      width: "clamp(300px, 34vw, 520px)",
      height: "clamp(380px, 58vh, 580px)",
      cursor: hasLink ? "pointer" : "default",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)",
      filter: visible ? "blur(0px)" : "blur(6px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
                   transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
                   filter 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
                   box-shadow 0.5s ease`,
      boxShadow: hovered
        ? "0 24px 60px rgba(73,100,67,0.22), 0 4px 16px rgba(73,100,67,0.12)"
        : "0 8px 32px rgba(73,100,67,0.10), 0 2px 8px rgba(73,100,67,0.06)",
    } as React.CSSProperties,
  };

  const inner = (
    <>
      {/* Background image */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "#000" }}
        />
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.04) 100%)",
          opacity: hovered ? 1 : 0.88,
        }}
      />

      {/* Border ring */}
      <div
        className="absolute inset-0 rounded-[24px] pointer-events-none transition-all duration-400"
        style={{ border: hovered ? "1px solid rgba(73,100,67,0.35)" : "1px solid rgba(73,100,67,0.15)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7">
        <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-2" style={{ color: "#7fba78" }}>
          {project.case}
        </span>
        <h3
          className="text-white font-bold leading-tight mb-2.5 transition-transform duration-500"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(22px, 2.6vw, 34px)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-white/75 text-sm leading-relaxed mb-5 max-w-[340px] transition-all duration-500"
          style={{ transform: hovered ? "translateY(-4px)" : "translateY(0)" }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium rounded-full px-3 py-1"
              style={{
                background: "rgba(73,100,67,0.28)",
                border: "1px solid rgba(73,100,67,0.45)",
                color: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(6px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow — only when there's a link */}
      {hasLink && (
        <div
          className="absolute top-5 right-5 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0,0) scale(1)" : "translate(-5px,5px) scale(0.8)",
          }}
        >
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{
              background: "rgba(73,100,67,0.55)",
              border: "1px solid rgba(73,100,67,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-white text-sm">↗</span>
          </div>
        </div>
      )}
    </>
  );

  /* Render as <a> when link exists, plain <div> otherwise */
  if (hasLink) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" {...sharedProps}>
        {inner}
      </a>
    );
  }

  return <div {...sharedProps}>{inner}</div>;
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const velRef     = useRef(0);           // current inertia velocity
  const rafRef     = useRef<number>(0);   // rAF id
  const [visible, setVisible]   = useState(false);
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
      velRef.current   *= 0.90; // friction — higher = glides longer
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
      // Add to velocity — feels like momentum build-up
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
      // Throw with the drag velocity
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

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen flex flex-col justify-center"
      style={{ background: "#f6f8f5", overflow: "hidden" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-10 lg:left-16 right-10 lg:right-16 h-px"
        style={{ background: "rgba(73,100,67,0.12)" }}
      />

      {/* Header */}
      <div
        className="px-10 lg:px-16 pt-16 pb-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-sm font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(73,100,67,0.55)" }}>
          Portfólio
        </p>
        <h2
          className="leading-none tracking-tight"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 700,
            color: "#496443",
          }}
        >
          /Work.
        </h2>
      </div>

      {/* Carousel */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        className="flex gap-5 px-10 lg:px-16 pb-10 work-track"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} visible={visible} />
        ))}
        <div className="shrink-0 w-6" />
      </div>

      {/* Progress — single clean dot-track */}
      <div
        className="px-10 lg:px-16 mb-14"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}
      >
        <div className="flex items-center gap-3">
          {projects.map((_, i) => {
            const segSize = 1 / projects.length;
            const segStart = i * segSize;
            const segEnd   = segStart + segSize;
            const fill = Math.min(1, Math.max(0, (progress - segStart) / segSize));
            // last segment fills to end
            const isFull = progress >= segEnd - 0.001;
            const isActive = progress >= segStart && progress < segEnd;

            return (
              <div
                key={i}
                className="relative rounded-full overflow-hidden flex-1"
                style={{ height: "2px", background: "rgba(73,100,67,0.12)" }}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: isFull ? "100%" : isActive ? `${fill * 100}%` : i < Math.floor(progress * projects.length) ? "100%" : "0%",
                    background: "#2c2c2c",
                    transition: "width 0.12s linear",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .work-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}