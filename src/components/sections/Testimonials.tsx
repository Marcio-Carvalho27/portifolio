"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/src/components/animations/Reveal";
import { TestimonialColumn } from "@/src/components/testimonials/TestimonialColumn";
import { testimonialColumns } from "@/src/content/testimonials";
import { useLanguage } from "@/src/context/LanguageContext";

const columnDurations = [34, 42, 38];

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="site-section testimonials-section">
      <div className="testimonials-bg-grid" aria-hidden />
      <div className="testimonials-rim" aria-hidden />

      <div className="testimonials-shell">
        <Reveal className="testimonials-header">
          <p className="section-kicker section-kicker-on-dark">
            {t("testimonials.kicker")}
          </p>
          <h2 className="section-title section-title-on-dark testimonials-title">
            {t("testimonials.title")}
          </h2>
          <p className="testimonials-intro">{t("testimonials.intro")}</p>
        </Reveal>

        <motion.div
          className="testimonials-stage"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="testimonials-mask">
            {testimonialColumns.map((column, index) => (
              <TestimonialColumn
                key={index}
                testimonials={column}
                columnIndex={index}
                duration={columnDurations[index]}
                reverse={index === 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
