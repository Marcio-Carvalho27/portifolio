"use client";

import { projects } from "@/src/data/work";
import { ProjectCard } from "@/src/components/work/ProjectCard";
import { useWorkScroll } from "@/src/lib/useWorkScroll";

export function Work() {
  const {
    sectionRef,
    trackRef,
    visible,
    progress,
    handleMouseDown,
    handleScroll,
  } = useWorkScroll();

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
        <p
          className="text-sm font-semibold tracking-[0.25em] uppercase mb-3"
          style={{ color: "rgba(73,100,67,0.55)" }}
        >
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

      {/* Progress bar */}
      <div
        className="px-10 lg:px-16 mb-14"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}
      >
        <div className="flex items-center gap-3">
          {projects.map((_, i) => {
            const segSize  = 1 / projects.length;
            const segStart = i * segSize;
            const segEnd   = segStart + segSize;
            const fill     = Math.min(1, Math.max(0, (progress - segStart) / segSize));
            const isFull   = progress >= segEnd - 0.001;
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
                    width: isFull
                      ? "100%"
                      : isActive
                      ? `${fill * 100}%`
                      : i < Math.floor(progress * projects.length)
                      ? "100%"
                      : "0%",
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