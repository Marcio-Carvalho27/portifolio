"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/src/data/work";
import { ProjectCard } from "@/src/components/work/ProjectCard";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let current = 0;
    let target = 0;
    let animationFrame: number;

    const lerp = (
      start: number,
      end: number,
      factor: number
    ) => {
      return start + (end - start) * factor;
    };

    const updateScroll = () => {
      const rect = section.getBoundingClientRect();

      const scrollableHeight =
        section.offsetHeight - window.innerHeight;

      const scrollProgress = Math.min(
        Math.max(-rect.top / scrollableHeight, 0),
        1
      );

      const maxTranslate =
        track.scrollWidth - window.innerWidth;

      target = maxTranslate * scrollProgress;

      current = lerp(current, target, 0.50);

      track.style.transform = `translate3d(${-current}px,0,0)`;

      setProgress(current / maxTranslate || 0);

      if (scrollProgress > 0.03) {
        setVisible(true);
      }

      animationFrame = requestAnimationFrame(updateScroll);
    };

    updateScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        height: `${projects.length * 110}vh`,
        position: "relative",
        background: "#f6f8f5",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Divider */}
        <div
          className="absolute top-0 left-10 lg:left-16 right-10 lg:right-16 h-px"
          style={{
            background: "rgba(73,100,67,0.12)",
          }}
        />

        {/* Header */}
        <div
          className="px-10 lg:px-16 pt-16 pb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0px)"
              : "translateY(40px)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{
              color: "rgba(73,100,67,0.55)",
            }}
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
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 px-10 lg:px-16 will-change-transform"
            style={{
              width: "max-content",
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                visible={visible}
              />
            ))}

            <div className="w-16 shrink-0" />
          </div>
        </div>

        {/* Progress */}
        <div className="px-10 lg:px-16 mt-10">
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "rgba(73,100,67,0.12)",
              overflow: "hidden",
              borderRadius: "999px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#2c2c2c",
                transformOrigin: "left",
                transform: `scaleX(${progress})`,
                transition: "transform 0.1s linear",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}