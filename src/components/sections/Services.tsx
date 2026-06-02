"use client";

import { useState } from "react";

import { services } from "@/src/content/services";
import { useInView } from "@/src/hooks/useInView";

export function Services() {
  const { ref, visible } = useInView<HTMLElement>(0.2);
  const [opened, setOpened] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="services"
      className="site-section section-light section-full"
    >
      <div className="section-divider" />

      <div className="section-shell flex h-full flex-col">
        <div className={`section-header ${visible ? "is-visible" : ""}`}>
          <p className="section-kicker">What I do</p>
          <h2 className="section-title mb-10">/Service.</h2>
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
                    <p>{service.description}</p>
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
