"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/src/components/sections/ProjectCard";
import { projects } from "@/src/content/projects";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(section);

    let current = 0;
    let target = 0;
    let animationFrame = 0;

    const updateScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      const scrollProgress = Math.min(
        Math.max(-rect.top / scrollableHeight, 0),
        1
      );
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);

      target = maxTranslate * scrollProgress;
      current += (target - current) * 0.08;

      if (window.innerWidth > 768) {
        track.style.transform = `translate3d(${-current}px,0,0)`;
      }

      setProgress(maxTranslate ? current / maxTranslate : 0);
      animationFrame = requestAnimationFrame(updateScroll);
    };

    updateScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-section"
      style={{ height: `${projects.length * 110}vh` }}
    >
      <div className="work-sticky">
        <div className="section-divider" />

        <div
          className={`section-header section-shell ${
            visible ? "is-visible" : ""
          }`}
        >
          <p className="section-kicker">Portfolio</p>
          <h2 className="section-title">/Work.</h2>
        </div>

        <div className="work-track-wrap">
          <div ref={trackRef} className="work-track">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                visible={visible}
              />
            ))}

            <div className="work-spacer" />
          </div>
        </div>

        <div className="work-progress">
          <div
            className="work-progress-bar"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  );
}
