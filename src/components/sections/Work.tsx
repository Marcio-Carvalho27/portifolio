"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/src/components/sections/ProjectCard";
import { projects } from "@/src/content/projects";
import { useLanguage } from "@/src/context/LanguageContext";
import { useInView } from "@/src/hooks/useInView";

export function Work() {
  const { ref, visible } = useInView<HTMLElement>(0.12);
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const progress = useMemo(() => {
    return (activeIndex + 1) / projects.length;
  }, [activeIndex]);

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
      <div className="section-divider" />

      <div className="work-carousel-shell">
        <div className={`work-header ${visible ? "is-visible" : ""}`}>
          <p className="section-kicker">{t("work.kicker")}</p>
          <div className="work-heading-row">
            <h2 className="section-title">{t("work.title")}</h2>

            <div className="work-controls" aria-label="Project carousel">
              <button
                type="button"
                onClick={previousProject}
                className="work-control"
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextProject}
                className="work-control"
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="work-carousel-viewport">
          <div
            className="work-carousel-track"
            style={{ transform: `translateX(calc(${activeIndex} * -100%))` }}
          >
            {projects.map((project, index) => (
              <div key={project.id} className="work-carousel-slide">
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
            <div
              className="work-progress-bar"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
