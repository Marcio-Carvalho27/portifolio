"use client";

import { useState } from "react";
import { Service } from "@/src/data/service";

interface ServiceItemProps {
  service: Service;
  index: number;
  visible: boolean;
}

export function ServiceItem({ service, index, visible }: ServiceItemProps) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.08}s,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.08}s`,
        borderBottom: "1px solid rgba(73,100,67,0.15)",
      }}
    >
      {/* Row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-7 text-left group"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        <h3
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(22px, 3vw, 42px)",
            fontWeight: 700,
            color: open ? "#496443" : "#1a1a1a",
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {service.title}
        </h3>

        {/* Icon */}
        <div
          className="flex items-center justify-center shrink-0 ml-6"
          style={{
            width: "clamp(32px, 3vw, 44px)",
            height: "clamp(32px, 3vw, 44px)",
            borderRadius: "50%",
            border: `1px solid ${open ? "rgba(73,100,67,0.5)" : "rgba(73,100,67,0.2)"}`,
            background: open ? "rgba(73,100,67,0.1)" : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "clamp(14px, 1.4vw, 20px)",
              color: "#496443",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              lineHeight: 1,
            }}
          >
            ↗
          </span>
        </div>
      </button>

      {/* Expanded content */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="pb-8 flex flex-col gap-4">
            <p
              className="max-w-xl"
              style={{
                color: "rgba(26,26,26,0.65)",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                lineHeight: 1.7,
              }}
            >
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium rounded-full px-3 py-1"
                  style={{
                    background: "rgba(73,100,67,0.08)",
                    border: "1px solid rgba(73,100,67,0.2)",
                    color: "#496443",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}