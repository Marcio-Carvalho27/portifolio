"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent as ReactTransitionEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ProjectCard } from "@/src/components/sections/ProjectCard";
import { projects } from "@/src/content/projects";
import { useLanguage } from "@/src/context/LanguageContext";

const PROJECT_COUNT = projects.length;
const MIDDLE_SET_START = PROJECT_COUNT;
const DRAG_THRESHOLD = 50;
const FLING_VELOCITY = 0.65;
const VELOCITY_STALE_AFTER = 100;
const MAX_FLING_STEPS = Math.min(PROJECT_COUNT, 4);
const AUTOPLAY_DELAY = 15_000;

function useInViewOnce<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Work() {
  const { ref, visible } = useInViewOnce<HTMLElement>(0.12);
  const { t } = useLanguage();
  const [trackIndex, setTrackIndex] = useState(MIDDLE_SET_START);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [transitionDuration, setTransitionDuration] = useState(500);
  const [autoplayCycle, setAutoplayCycle] = useState(0);
  const dragStartX = useRef(0);
  const dragDistance = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const dragVelocity = useRef(0);
  const suppressClick = useRef(false);
  const transitionFrame = useRef<number | null>(null);
  const carouselProjects = useMemo(
    () => [...projects, ...projects, ...projects],
    []
  );
  const activeIndex =
    ((trackIndex % PROJECT_COUNT) + PROJECT_COUNT) % PROJECT_COUNT;

  useEffect(() => {
    return () => {
      if (transitionFrame.current !== null) {
        cancelAnimationFrame(transitionFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDragging || isAnimating) return;

    const autoplayTimer = window.setTimeout(() => {
      setTransitionEnabled(true);
      setTransitionDuration(500);
      setIsAnimating(true);
      setTrackIndex((current) => current + 1);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(autoplayTimer);
  }, [autoplayCycle, isAnimating, isDragging]);

  const restartAutoplay = () => {
    setAutoplayCycle((current) => current + 1);
  };

  const previousProject = () => {
    if (isDragging || isAnimating) return;
    restartAutoplay();
    setTransitionEnabled(true);
    setTransitionDuration(500);
    setIsAnimating(true);
    setTrackIndex((current) => current - 1);
  };

  const nextProject = () => {
    if (isDragging || isAnimating) return;
    restartAutoplay();
    setTransitionEnabled(true);
    setTransitionDuration(500);
    setIsAnimating(true);
    setTrackIndex((current) => current + 1);
  };

  const goToProject = (index: number) => {
    if (isDragging || isAnimating || index === activeIndex) return;
    restartAutoplay();
    setTransitionEnabled(true);
    setTransitionDuration(500);
    setIsAnimating(true);
    setTrackIndex(MIDDLE_SET_START + index);
  };

  const handleTransitionEnd = (
    event: ReactTransitionEvent<HTMLDivElement>
  ) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    ) {
      return;
    }

    setIsAnimating(false);
    setIsSpinning(false);
    const resetIndex = MIDDLE_SET_START + activeIndex;
    if (trackIndex === resetIndex) return;

    setTransitionEnabled(false);
    setTrackIndex(resetIndex);
    transitionFrame.current = requestAnimationFrame(() => {
      transitionFrame.current = requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      isAnimating ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    const now = performance.now();
    dragStartX.current = event.clientX;
    dragDistance.current = 0;
    lastPointerX.current = event.clientX;
    lastPointerTime.current = now;
    dragVelocity.current = 0;
    suppressClick.current = false;
    restartAutoplay();
    setTransitionEnabled(false);
    setIsSpinning(false);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const distance = event.clientX - dragStartX.current;
    const now = performance.now();
    const elapsed = now - lastPointerTime.current;

    if (elapsed > 0) {
      const instantaneousVelocity =
        (event.clientX - lastPointerX.current) / elapsed;
      dragVelocity.current =
        dragVelocity.current * 0.65 + instantaneousVelocity * 0.35;
    }

    lastPointerX.current = event.clientX;
    lastPointerTime.current = now;
    dragDistance.current = distance;
    suppressClick.current = Math.abs(distance) > 8;
    setDragOffset(distance);
  };

  const finishDrag = (cancelled = false) => {
    if (!isDragging) return;

    const distance = dragDistance.current;
    const timeSinceLastMove = performance.now() - lastPointerTime.current;
    const velocity =
      timeSinceLastMove <= VELOCITY_STALE_AFTER
        ? dragVelocity.current
        : 0;
    const isFastFling =
      !cancelled && Math.abs(velocity) >= FLING_VELOCITY;
    const shouldChange =
      !cancelled &&
      (Math.abs(distance) >= DRAG_THRESHOLD || isFastFling);
    setIsDragging(false);
    setDragOffset(0);
    setTransitionEnabled(true);
    setTransitionDuration(500);

    if (Math.abs(distance) > 0) {
      setIsAnimating(true);
    }

    if (shouldChange) {
      const direction = isFastFling
        ? velocity < 0
          ? 1
          : -1
        : distance < 0
          ? 1
          : -1;
      const steps = isFastFling
        ? Math.min(
            MAX_FLING_STEPS,
            Math.max(2, Math.ceil(Math.abs(velocity) * 2.4))
          )
        : 1;

      setIsSpinning(isFastFling);
      setTransitionDuration(420 + steps * 90);
      setTrackIndex((current) => current + direction * steps);
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    finishDrag();
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  return (
    <section ref={ref} id="work" className="site-section work-section">
      <div className="work-carousel-shell">
        <div className={`work-header ${visible ? "is-visible" : ""}`}>
          <div className="work-section-divider" />
          <div className="work-heading-row">
            <h2 className="section-title work-title">{t("work.title")}</h2>

            <div className="work-controls" aria-label="Project carousel">
              <button
                type="button"
                onClick={previousProject}
                className="work-control"
                aria-label={t("work.previous")}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextProject}
                className="work-control"
                aria-label={t("work.next")}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`work-carousel-viewport ${
            isDragging ? "is-dragging" : ""
          } ${isSpinning ? "is-spinning" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => finishDrag(true)}
          onClickCapture={handleClickCapture}
          onDragStart={(event) => event.preventDefault()}
        >
          <div
            className="work-carousel-track"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(calc(50% - var(--work-card-width) / 2 - ${trackIndex} * (var(--work-card-width) + var(--work-slide-gap)) + ${dragOffset}px))`,
              transition: transitionEnabled
                ? `transform ${transitionDuration}ms cubic-bezier(0.16, 0.84, 0.2, 1)`
                : "none",
            }}
          >
            {carouselProjects.map((project, index) => {
              const projectIndex = index % PROJECT_COUNT;

              return (
                <div
                  key={`${project.id}-${index}`}
                  className={`work-carousel-slide ${
                    index === trackIndex ? "is-active" : ""
                  }`}
                >
                  <ProjectCard
                    project={project}
                    index={projectIndex}
                    visible={visible}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="work-footer">
          <span className="work-counter">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <div className="work-progress">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={`work-progress-segment ${
                  index === activeIndex ? "is-active" : ""
                }`}
                onClick={() => goToProject(index)}
                aria-label={`${t("work.goTo")} ${index + 1}`}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
