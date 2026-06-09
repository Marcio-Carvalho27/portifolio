"use client";

import { useState } from "react";

import { experiences } from "@/src/content/experience";
import { useLanguage } from "@/src/context/LanguageContext";
import { useInView } from "@/src/hooks/useInView";

export function Experience() {
  const { ref, visible } = useInView<HTMLElement>(0.15);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      id="experience"
      className="site-section section-primary section-full"
    >
      <div className="section-divider section-divider-on-dark" />

      <div className="section-shell flex h-full flex-col">
        <div className={`section-header ${visible ? "is-visible" : ""}`}>
          <p className="section-kicker section-kicker-on-dark">
            {t("experience.kicker")}
          </p>
          <h2 className="section-title section-title-on-dark mb-8">
            {t("experience.title")}
          </h2>
        </div>

        <div className="experience-list">
          {experiences.map((experience, index) => {
            const isActive = activeExperience === experience.id;

            return (
              <article
                key={experience.id}
                onMouseEnter={() => setActiveExperience(experience.id)}
                onMouseLeave={() => setActiveExperience(null)}
                className={[
                  "experience-row",
                  visible ? "is-visible" : "",
                  isActive ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  transitionDelay: `${0.15 + index * 0.1}s`,
                }}
              >
                <div className="experience-row-content">
                  <div>
                    <h3 className="experience-company">
                      {t(experience.companyKey)}
                    </h3>
                    <p className="experience-role">{t(experience.roleKey)}</p>
                    <p className="experience-summary">
                      {t(experience.summaryKey)}
                    </p>
                  </div>

                  <p className="experience-period">{t(experience.periodKey)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
