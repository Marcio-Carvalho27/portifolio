"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Testimonial } from "@/src/content/testimonials";
import { useLanguage } from "@/src/context/LanguageContext";

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
};

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`testimonial-card testimonial-card-${testimonial.height}`}
      initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, rotateX: 1.5, transition: { duration: 0.35 } }
      }
    >
      <div className="testimonial-card-glow" aria-hidden />
      <div className="testimonial-author">
        <div className="testimonial-avatar" aria-hidden>
          {testimonial.avatar}
        </div>

        <div>
          <h3 className="testimonial-name">{testimonial.name}</h3>
          <p className="testimonial-meta">
            {t(testimonial.countryKey)} / {testimonial.username}
          </p>
        </div>
      </div>

      <p className="testimonial-text">{t(testimonial.textKey)}</p>
    </motion.article>
  );
}
