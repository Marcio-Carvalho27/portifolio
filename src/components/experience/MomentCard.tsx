"use client";

import { useEffect, useRef } from "react";

type Moment = {
  id: string;

  title: string;

  shortText?: string;

  description?: string;

  image?: string;
};

type Props = {
  moment: Moment;

  index: number;
};

export function MomentCard({
  moment,
  index,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let frame: number;

    const handleMouseMove = (
      e: MouseEvent
    ) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const lerp = (
      start: number,
      end: number,
      factor: number
    ) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      if (!cardRef.current) return;

      const offsetX =
        (index % 2 === 0 ? 1 : -1) * 55;

      const offsetY = index * 26;

      currentX = lerp(
        currentX,
        mouseX + offsetX,
        0.12
      );

      currentY = lerp(
        currentY,
        mouseY + offsetY,
        0.12
      );

      cardRef.current.style.transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
        rotate(${index % 2 === 0 ? "-7deg" : "5deg"})
      `;

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(frame);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 999,

        willChange: "transform",
      }}
    >
      {/* Polaroid */}
      <div
        style={{
          width: "140px",

          background: "#ffffff",

          padding: "8px 8px 14px",

          borderRadius: "2px",

          boxShadow:
            "0 10px 28px rgba(0,0,0,0.18)",
        }}
      >
        {/* Image */}
        <div
          style={{
            width: "100%",

            aspectRatio: "1 / 1.15",

            overflow: "hidden",

            background: "#d8d8d8",
          }}
        >
          {moment.image ? (
            <img
              src={moment.image}
              alt={moment.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(135deg,#8aa17f,#496443)",
              }}
            />
          )}
        </div>

        {/* Text */}
        <div
          style={{
            marginTop: "8px",

            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",

              fontWeight: 600,

              color: "#2b2b2b",

              letterSpacing: "-0.02em",

              lineHeight: 1.2,
            }}
          >
            {moment.title}
          </p>

          {moment.shortText && (
            <p
              style={{
                marginTop: "4px",

                fontSize: "9px",

                lineHeight: 1.3,

                color: "rgba(0,0,0,0.5)",
              }}
            >
              {moment.shortText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}