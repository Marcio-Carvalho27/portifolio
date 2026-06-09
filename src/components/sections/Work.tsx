"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/src/components/sections/ProjectCard";
import { projects } from "@/src/content/projects";
import { useLanguage } from "@/src/context/LanguageContext";

function useInViewOnce<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Work() {
  const { ref, visible } = useInViewOnce<HTMLElement>(0.12);
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const previousProject = () => {
    setActiveIndex((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );
  };

  const nextProject = () => {
    setActiveIndex((current) =>
      current === projects.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section ref={ref} id="work" className="site-section work-section">
      <div className="work-carousel-shell">
        <div className={`work-header ${visible ? "is-visible" : ""}`}>
          <div className="work-section-divider" />
          <div className="work-heading-row">
            <h2 className="section-title work-title">{t("work.title")}</h2>

            <div className="work-controls" aria-label="Project carousel">
              <button
                type="button"
                onClick={previousProject}
                className="work-control"
                aria-label={t("work.previous")}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextProject}
                className="work-control"
                aria-label={t("work.next")}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="work-carousel-viewport">
          <div
            className="work-carousel-track"
            style={{
              transform: `translateX(calc(50% - var(--work-card-width) / 2 - ${activeIndex} * (var(--work-card-width) + var(--work-slide-gap))))`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`work-carousel-slide ${
                  index === activeIndex ? "is-active" : ""
                }`}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  visible={visible}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="work-footer">
          <span className="work-counter">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <div className="work-progress">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={`work-progress-segment ${
                  index === activeIndex ? "is-active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`${t("work.goTo")} ${index + 1}`}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
