"use client";

import Image from "next/image";

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

      <div className="about-shell">
        <div className="about-grid">
          <div className={`about-visual ${visible ? "is-visible" : ""}`}>
            <div className="about-portrait">
              <Image
                src="/profile.png"
                alt="Marcio Carvalho"
                fill
                sizes="(max-width: 768px) 82vw, 360px"
                className="about-portrait-image"
                priority={false}
              />
            </div>
          </div>

          <div className={`about-copy ${visible ? "is-visible" : ""}`}>
            <div className={`about-header ${visible ? "is-visible" : ""}`}>
              <p className="section-kicker">{t("about.kicker")}</p>
              <h2 className="about-title">{t("about.title")}</h2>
            </div>

            <p>{t("about.paragraph1")}</p>

            <p>{t("about.paragraph2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
