"use client";

import { useState } from "react";

import { services } from "@/src/content/services";
import { useLanguage } from "@/src/context/LanguageContext";
import { useInView } from "@/src/hooks/useInView";

export function Services() {
  const { ref, visible } = useInView<HTMLElement>(0.2);
  const [opened, setOpened] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      id="services"
      className="site-section section-light section-full"
    >
      <div className="section-divider" />

      <div className="section-shell flex h-full flex-col">
        <div className={`section-header ${visible ? "is-visible" : ""}`}>
          <p className="section-kicker">{t("services.kicker")}</p>
          <h2 className="section-title mb-10">{t("services.title")}</h2>
        </div>

        <div className="services-list">
          {services.map((service, index) => {
            const isOpen = opened === index;

            return (
              <article
                key={service.id}
                onMouseEnter={() => setOpened(index)}
                onMouseLeave={() => setOpened(null)}
                className={[
                  "service-row",
                  visible ? "is-visible" : "",
                  isOpen ? "is-open" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  transitionDelay: `0s, ${0.15 + index * 0.1}s, ${
                    0.15 + index * 0.1
                  }s`,
                }}
              >
                <div className="service-row-inner">
                  <div className="service-description">
                    <p>{t(service.descriptionKey)}</p>
                  </div>

                  <h3 className="service-title">{t(service.titleKey)}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
