"use client";

import { useEffect, useRef, useState } from "react";

import { experiences } from "@/src/data/experience";

import { moments } from "@/src/data/moment";

import { MomentCard } from "./MomentCard";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const [visible, setVisible] = useState(false);

  const [activeExperience, setActiveExperience] =
    useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative h-screen overflow-hidden"
      style={{
        background: "#496443",
      }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-10 lg:left-16 right-10 lg:right-16 h-px"
        style={{
          background: "rgba(255,255,255,0.12)",
        }}
      />

      <div className="h-full flex flex-col px-10 lg:px-16 pt-14 pb-10">
        {/* Header */}
        <div
          className="shrink-0"
          style={{
            opacity: visible ? 1 : 0,

            transform: visible
              ? "translateY(0)"
              : "translateY(40px)",

            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Journey
          </p>

          <h2
            className="leading-none tracking-tight mb-8"
            style={{
              fontFamily: "'Oswald', sans-serif",

              fontSize: "clamp(36px, 5vw, 72px)",

              fontWeight: 700,

              color: "#ffffff",
            }}
          >
            /Experience.
          </h2>
        </div>

        {/* Experience List */}
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          {experiences.map((experience) => {
            const relatedMoments = moments.filter(
              (moment) =>
                moment.experienceId === experience.id
            );

            const isActive =
              activeExperience === experience.id;

            return (
              <div
                key={experience.id}
                onMouseEnter={() =>
                  setActiveExperience(experience.id)
                }
                onMouseLeave={() =>
                  setActiveExperience(null)
                }
                className="relative"
                style={{
                  borderTop:
                    "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {/* Row */}
                <div
                  className="flex items-center justify-between py-3 transition-all duration-500"
                  style={{
                    transform: isActive
                      ? "translateX(10px)"
                      : "translateX(0px)",
                  }}
                >
                  {/* Left */}
                  <div>
                    <h3
                      style={{
                        fontSize:
                          "clamp(20px,2vw,32px)",

                        fontWeight: 600,

                        letterSpacing: "-0.05em",

                        color: "#ffffff",
                      }}
                    >
                      {experience.company}
                    </h3>

                    <p
                      style={{
                        color:
                          "rgba(255,255,255,0.62)",

                        marginTop: "2px",

                        fontSize: "13px",
                      }}
                    >
                      {experience.role}
                    </p>
                  </div>

                  {/* Right */}
                  <p
                    style={{
                      color:
                        "rgba(255,255,255,0.52)",

                      fontSize: "12px",
                    }}
                  >
                    {experience.period}
                  </p>
                </div>

                {/* Floating Moments */}
                {isActive && (
                  <div className="pointer-events-none absolute inset-0">
                    {relatedMoments.map(
                      (moment, i) => (
                        <MomentCard
                          key={moment.id}
                          moment={moment}
                          index={i}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Border */}
          <div
            style={{
              borderTop:
                "1px solid rgba(255,255,255,0.12)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
