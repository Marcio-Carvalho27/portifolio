"use client";

import { InteractiveLanyard } from "@/src/components/ui/InteractiveLanyard";

import { useLanguage } from "@/src/context/LanguageContext";
import { useInView } from "@/src/hooks/useInView";

export function About() {
  const { ref, visible } = useInView<HTMLElement>(0.18);

  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      id="about"
      className="site-section about-section section-full"
    >
      <div className="section-divider" />
      <InteractiveLanyard />

      <div className="about-shell">
        <div className="about-grid">
          <div
            className="about-visual"
            aria-hidden="true"
          />

          <div
            className={`about-copy ${
              visible ? "is-visible" : ""
            }`}
          >
            <div
              className={`about-header ${
                visible ? "is-visible" : ""
              }`}
            >
              <h2 className="about-title">
                {t("about.title")}
              </h2>
            </div>

            <p>{t("about.paragraph1")}</p>

            <p>{t("about.paragraph2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
