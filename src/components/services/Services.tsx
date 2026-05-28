"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/src/data/service";
import { ServiceItem } from "@/src/components/services/ServiceItem";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen flex flex-col justify-center"
      style={{ background: "#f6f8f5", overflow: "hidden" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-10 lg:left-16 right-10 lg:right-16 h-px"
        style={{ background: "rgba(73,100,67,0.12)" }}
      />

      <div className="px-10 lg:px-16 py-16 w-full max-w-5xl">
        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "rgba(73,100,67,0.55)" }}
          >
            What I do
          </p>
          <h2
            className="leading-none tracking-tight mb-14"
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

        {/* List */}
        <div
          style={{
            borderTop: "1px solid rgba(73,100,67,0.15)",
          }}
        >
          {services.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}