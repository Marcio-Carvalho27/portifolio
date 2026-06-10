"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type HeroAboutRevealProps = {
  hero: ReactNode;
  about: ReactNode;
};

export function HeroAboutReveal({ hero, about }: HeroAboutRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.82],
    ["0%", "-100%"],
  );

  if (reduceMotion) {
    return (
      <div className="hero-about-reveal-reduced">
        {hero}
        {about}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="hero-about-reveal">
      <div className="hero-about-reveal-stage">
        <div className="hero-about-reveal-about">{about}</div>

        <motion.div
          className="hero-about-reveal-hero"
          style={{ y: heroY }}
        >
          {hero}
        </motion.div>
      </div>
    </div>
  );
}
