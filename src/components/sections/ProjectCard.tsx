"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

import { projects } from "@/src/content/projects";
import { useLanguage } from "@/src/context/LanguageContext";

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
}

export function ProjectCard({ project, index, visible }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();
  const hasLink = Boolean(project.href);

  const className = [
    "project-card",
    hasLink ? "is-linked" : "",
    hovered ? "is-hovered" : "",
    visible ? "is-visible" : "is-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  const sharedProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className,
    style: {
      transitionDelay: `${0.12 + index * 0.08}s`,
    } satisfies CSSProperties,
  };

  const cardContent = (
    <>
      <div className="project-card-media">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 44vw, 22vw"
            className="project-card-image"
          />
        ) : (
          <div className="project-card-fallback" />
        )}
      </div>

      <div className="project-card-overlay" />
      <div className="project-card-ring" />
      <span className="project-card-badge">{t(project.typeKey)}</span>

      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{t(project.descriptionKey)}</p>

        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag} className="tag tag-on-image">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {hasLink && (
        <span className="project-card-link-icon" aria-hidden>
          <ExternalLink size={16} />
        </span>
      )}
    </>
  );

  if (hasLink) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" {...sharedProps}>
        {cardContent}
      </a>
    );
  }

  return <div {...sharedProps}>{cardContent}</div>;
}
