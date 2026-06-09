"use client";

import type { CSSProperties } from "react";

import { TestimonialCard } from "@/src/components/testimonials/TestimonialCard";
import type { Testimonial } from "@/src/content/testimonials";

type TestimonialColumnProps = {
  testimonials: Testimonial[];
  columnIndex: number;
  duration: number;
  reverse?: boolean;
};

export function TestimonialColumn({
  testimonials,
  columnIndex,
  duration,
  reverse = false,
}: TestimonialColumnProps) {
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="testimonial-column">
      <div
        className={`testimonial-column-track ${reverse ? "is-reverse" : ""}`}
        // The track is duplicated; translating exactly half its height creates a seamless vertical loop.
        style={{ "--testimonial-duration": `${duration}s` } as CSSProperties}
      >
        {loopedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
            index={columnIndex * testimonials.length + index}
          />
        ))}
      </div>
    </div>
  );
}
