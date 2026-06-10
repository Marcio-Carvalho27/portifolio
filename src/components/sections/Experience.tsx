"use client";

import { useState } from "react";

import { experiences } from "@/src/content/experience";
import { useLanguage } from "@/src/context/LanguageContext";
import { useInView } from "@/src/hooks/useInView";

export function Experience() {
  const { ref, visible } = useInView<HTMLElement>(0.15);
  const [activeExperience, setActiveExperience] = useState(
    experiences.at(-1)?.id ?? experiences[0].id
  );
  const { t } = useLanguage();
  const activeIndex = Math.max(
    0,
    experiences.findIndex((experience) => experience.id === activeExperience)
  );
  const selectedExperience = experiences[activeIndex];

  return (
    <section
      ref={ref}
      id="experience"
      className="site-section section-full experience-section"
    >
      <div className="experience-grid" aria-hidden />
      <div className="experience-orbit experience-orbit-one" aria-hidden />
      <div className="experience-orbit experience-orbit-two" aria-hidden />

      <div className="section-shell experience-shell">
        <div className={`experience-header ${visible ? "is-visible" : ""}`}>
          <div>
            <p className="section-kicker">{t("experience.kicker")}</p>
            <h2 className="section-title">{t("experience.title")}</h2>
          </div>
          <span className="experience-header-index" aria-hidden>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(experiences.length).padStart(2, "0")}
          </span>
        </div>

        <div className={`experience-stage ${visible ? "is-visible" : ""}`}>
          <nav className="experience-timeline" aria-label={t("experience.title")}>
            <span className="experience-timeline-line" aria-hidden />

            {experiences.map((experience, index) => {
              const isActive = activeExperience === experience.id;

              return (
                <button
                  key={experience.id}
                  type="button"
                  className={`experience-marker ${
                    isActive ? "is-active" : ""
                  }`}
                  onClick={() => setActiveExperience(experience.id)}
                  onMouseEnter={() => setActiveExperience(experience.id)}
                  onFocus={() => setActiveExperience(experience.id)}
                  aria-pressed={isActive}
                >
                  <span className="experience-marker-dot" aria-hidden />
                  <span className="experience-marker-copy">
                    <span className="experience-marker-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="experience-marker-company">
                      {t(experience.companyKey)}
                    </span>
                    <span className="experience-marker-period">
                      {t(experience.periodKey)}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <article
            key={selectedExperience.id}
            className="experience-feature"
          >
            <div className="experience-feature-top">
              <span className="experience-feature-label">
                {t(selectedExperience.periodKey)}
              </span>
              <span className="experience-feature-status" aria-hidden>
                <span />
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="experience-feature-copy">
              <p className="experience-feature-role">
                {t(selectedExperience.roleKey)}
              </p>
              <h3 className="experience-feature-company">
                {t(selectedExperience.companyKey)}
              </h3>
              <p className="experience-feature-summary">
                {t(selectedExperience.summaryKey)}
              </p>
            </div>

            <div className="experience-feature-footer">
              <span>{t("experience.kicker")}</span>
              <div className="experience-feature-progress" aria-hidden>
                {experiences.map((experience) => (
                  <span
                    key={experience.id}
                    className={
                      experience.id === selectedExperience.id
                        ? "is-active"
                        : ""
                    }
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
