"use client";

import { useState } from "react";
import { projects } from "@/src/data/work";

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
}

export function ProjectCard({ project, index, visible }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const hasLink = !!project.href;

  const sharedProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className: "relative shrink-0 rounded-[24px] overflow-hidden block",
    style: {
      width: "clamp(300px, 34vw, 520px)",
      height: "clamp(380px, 58vh, 580px)",
      cursor: hasLink ? "pointer" : "default",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)",
      filter: visible ? "blur(0px)" : "blur(6px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
                   transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
                   filter 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s,
                   box-shadow 0.5s ease`,
      boxShadow: hovered
        ? "0 24px 60px rgba(73,100,67,0.22), 0 4px 16px rgba(73,100,67,0.12)"
        : "0 8px 32px rgba(73,100,67,0.10), 0 2px 8px rgba(73,100,67,0.06)",
    } as React.CSSProperties,
  };

  const inner = (
    <>
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 50%, #2a2a2a 100%)",
            }}
          />
        )}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.04) 100%)",
          opacity: hovered ? 1 : 0.88,
        }}
      />

      {/* Border ring */}
      <div
        className="absolute inset-0 rounded-[24px] pointer-events-none transition-all duration-400"
        style={{ border: hovered ? "1px solid rgba(73,100,67,0.35)" : "1px solid rgba(73,100,67,0.15)" }}
      />

      {/* Type badge — topo esquerdo */}
      <div className="absolute top-5 left-5">
        <span
          className="text-xs font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(0,0,0,0.52)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(8px)",
          }}
        >
          {project.type}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7">
        <h3
          className="text-white font-bold leading-tight mb-2.5 transition-transform duration-500"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(22px, 2.6vw, 34px)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-white/75 text-sm leading-relaxed mb-5 max-w-[340px] transition-all duration-500"
          style={{ transform: hovered ? "translateY(-4px)" : "translateY(0)" }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium rounded-full px-3 py-1"
              style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(6px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow — only when there's a link */}
      {hasLink && (
        <div
          className="absolute top-5 right-5 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0,0) scale(1)" : "translate(-5px,5px) scale(0.8)",
          }}
        >
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(0,0,0,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-white text-sm">↗</span>
          </div>
        </div>
      )}
    </>
  );

  if (hasLink) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" {...sharedProps}>
        {inner}
      </a>
    );
  }

  return <div {...sharedProps}>{inner}</div>;
}