"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/src/data/service";
import { ServiceItem } from "@/src/components/services/ServiceItem";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-screen overflow-hidden flex flex-col"
      style={{
        background: "#f6f8f5",
      }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-10 lg:left-16 right-10 lg:right-16 h-px"
        style={{
          background: "rgba(73,100,67,0.12)",
        }}
      />

      {/* Container */}
      <div className="flex flex-col h-full px-10 lg:px-16 pt-16 pb-10">
        {/* Header */}
        <div
          className="shrink-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
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
            What I do
          </p>

          <h2
            className="leading-none tracking-tight mb-10"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 700,
              color: "#496443",
            }}
          >
            /Service.
          </h2>
        </div>

        {/* Services */}
        <div
          className="flex-1 flex flex-col justify-center overflow-hidden"
          style={{
            borderTop: "1px solid rgba(73,100,67,0.15)",
          }}
        >
          {services.map((service, i) => {
            const isOpen = opened === i;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setOpened(i)}
                onMouseLeave={() => setOpened(null)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  borderBottom: "1px solid rgba(73,100,67,0.15)",

                  flex: isOpen ? 1.8 : 1,

                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(32px)",

                  transitionProperty: "flex, opacity, transform",
                  transitionDuration: "0.7s, 0.8s, 0.8s",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: `0s, ${0.15 + i * 0.1}s, ${0.15 + i * 0.1}s`,
                }}
              >
                <div
                  className="h-full flex items-center justify-end"
                  style={{
                    padding: "0 8px",
                    gap: "32px",
                  }}
                >
                  {/* Left - description (aparece no hover) */}
                  <div
                    style={{
                      width: isOpen ? "40%" : "0%",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <p
                      style={{
                        color: "rgba(73,100,67,0.7)",
                        lineHeight: 1.6,
                        fontSize: "15px",
                        textAlign: "right",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Right - título */}
                  <div
                    style={{
                      transform: isOpen ? "translateX(0)" : "translateX(8px)",
                      transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                      flexShrink: 0,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(22px,2vw,34px)",
                        fontWeight: 600,
                        color: "#496443",
                        letterSpacing: "-0.03em",
                        textAlign: "right",
                      }}
                    >
                      {service.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}