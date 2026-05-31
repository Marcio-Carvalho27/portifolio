"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useTheme } from "@/src/context/ThemeContext";

const STACKS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind",
  "PostgreSQL",
  "Power BI",
  "Docker",
  "AWS",
];

export function Hero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const titleRef =
    useRef<HTMLHeadingElement>(null);

  const marqueeRef =
    useRef<HTMLDivElement>(null);

  const ballRef =
    useRef<HTMLDivElement>(null);

  const paddleRef =
    useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);

  const [started, setStarted] =
    useState(false);

  const { theme } = useTheme();

  // SCROLL EFFECT
  useEffect(() => {
    const onScroll = () => {
      const section =
        sectionRef.current;

      const content =
        contentRef.current;

      if (!section || !content) {
        return;
      }

      const scrollY = window.scrollY;

      const sectionH =
        section.offsetHeight;

      const progress = Math.min(
        1,
        Math.max(0, scrollY / sectionH)
      );

      const translateY =
        -(progress * 80);

      const opacity =
        1 - progress * 1.8;

      const scale =
        1 - progress * 0.06;

      const blur =
        progress * 12;

      content.style.transform = `
        translateY(${translateY}px)
        scale(${scale})
      `;

      content.style.opacity = String(
        Math.max(0, opacity)
      );

      content.style.filter = `
        blur(${blur}px)
      `;
    };

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  // MARQUEE WIDTH
  useEffect(() => {
    const updateWidth = () => {
      if (
        !titleRef.current ||
        !marqueeRef.current
      ) {
        return;
      }

      marqueeRef.current.style.width = `
        ${titleRef.current.offsetWidth}px
      `;
    };

    updateWidth();

    window.addEventListener(
      "resize",
      updateWidth
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateWidth
      );
  }, []);

  // PADDLE
  useEffect(() => {
    const handleMouseMove = (
      e: MouseEvent
    ) => {
      mouseX.current = e.clientX;

      if (paddleRef.current) {
        paddleRef.current.style.transform = `
          translateX(${e.clientX - 60}px)
        `;
      }
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  // START GAME
  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Enter") {
        e.preventDefault();

        e.stopPropagation();

        setStarted(true);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  // BALL PHYSICS
  useEffect(() => {
    let frame: number;

    const ball = {
      x: window.innerWidth / 2,
      y: window.innerHeight - 110,

      vx: 4,
      vy: -4,

      size: 10,
    };

    const animate = () => {
      const ballEl = ballRef.current;

      if (!ballEl) {
        frame =
          requestAnimationFrame(
            animate
          );

        return;
      }

      const paddleY =
        window.innerHeight - 80;

      const paddleX =
        mouseX.current - 60;

      const paddleWidth = 120;

      const paddleHeight = 12;

      // BALL STUCK BEFORE START
      if (!started) {
        ball.x =
          paddleX +
          paddleWidth / 2 -
          ball.size / 2;

        ball.y =
          paddleY - 18;

        ballEl.style.transform = `
          translate3d(
            ${ball.x}px,
            ${ball.y}px,
            0
          )
        `;

        frame =
          requestAnimationFrame(
            animate
          );

        return;
      }

      ball.x += ball.vx;
      ball.y += ball.vy;

      // WALLS
      if (
        ball.x <= 0 ||
        ball.x >=
          window.innerWidth -
            ball.size
      ) {
        ball.vx *= -1;
      }

      if (ball.y <= 0) {
        ball.vy *= -1;
      }

      // PADDLE COLLISION
      if (
        ball.y + ball.size >=
          paddleY &&
        ball.y <=
          paddleY + paddleHeight &&
        ball.x + ball.size >=
          paddleX &&
        ball.x <=
          paddleX + paddleWidth
      ) {
        ball.vy =
          -Math.abs(ball.vy);

        const hit =
          (ball.x -
            (paddleX +
              paddleWidth / 2)) /
          (paddleWidth / 2);

        ball.vx += hit * 1.8;
      }

      // RESET
      if (
        ball.y >
        window.innerHeight + 50
      ) {
        setStarted(false);

        ball.vx =
          (Math.random() - 0.5) * 8;

        ball.vy = -5;
      }

      // LETTER COLLISION
      const letters =
        document.querySelectorAll(
          ".hero-letter"
        );

      letters.forEach((letter) => {
        const rect =
          letter.getBoundingClientRect();

        const padding = 18;

        const left =
          rect.left + padding;

        const right =
          rect.right - padding;

        const top =
          rect.top + padding;

        const bottom =
          rect.bottom - padding;

        if (
          ball.x + ball.size >
            left &&
          ball.x < right &&
          ball.y + ball.size >
            top &&
          ball.y < bottom
        ) {
          const prevX =
            ball.x - ball.vx;

          const prevY =
            ball.y - ball.vy;

          const fromLeft =
            prevX + ball.size <= left;

          const fromRight =
            prevX >= right;

          const fromTop =
            prevY + ball.size <= top;

          const fromBottom =
            prevY >= bottom;

          if (
            fromLeft ||
            fromRight
          ) {
            ball.vx *= -1;
          }

          if (
            fromTop ||
            fromBottom
          ) {
            ball.vy *= -1;
          }

          if (fromTop) {
            ball.y =
              top - ball.size - 1;
          }

          if (fromBottom) {
            ball.y =
              bottom + 1;
          }

          if (fromLeft) {
            ball.x =
              left - ball.size - 1;
          }

          if (fromRight) {
            ball.x =
              right + 1;
          }

          // LETTER POP EFFECT
          const el =
            letter as HTMLElement;

          el.style.transform =
            "scale(1.18)";

          el.style.transition =
            "transform 120ms cubic-bezier(0.16,1,0.3,1)";

          clearTimeout(
            (el as any).__scaleTimeout
          );

          (el as any).__scaleTimeout =
            setTimeout(() => {
              el.style.transform =
                "scale(1)";
            }, 120);
        }
      });

      // LIMIT SPEED
      ball.vx = Math.max(
        -8,
        Math.min(8, ball.vx)
      );

      ball.vy = Math.max(
        -8,
        Math.min(8, ball.vy)
      );

      ballEl.style.transform = `
        translate3d(
          ${ball.x}px,
          ${ball.y}px,
          0
        )
      `;

      frame =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    return () =>
      cancelAnimationFrame(frame);
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="
        relative h-screen overflow-hidden
        bg-[#F7F7F5]
        transition-colors duration-500
        dark:bg-[#141412]
      "
    >
      {/* BALL */}
      <div
        ref={ballRef}
        className="
          pointer-events-none
          absolute left-0 top-0
          z-50
          h-[10px] w-[10px]
          rounded-full
        "
        style={{
          background:
            theme === "dark"
              ? "#E8E8E4"
              : "#496443",

          boxShadow:
            theme === "dark"
              ? "0 0 20px rgba(232,232,228,0.45)"
              : "0 0 20px rgba(73,100,67,0.45)",
        }}
      />

      {/* PADDLE */}
      <div
        ref={paddleRef}
        className="
          pointer-events-none
          absolute bottom-10 left-0
          z-40
          h-[12px] w-[120px]
          rounded-full
          backdrop-blur-xl
        "
        style={{
          background:
            theme === "dark"
              ? "rgba(232,232,228,0.14)"
              : "rgba(73,100,67,0.14)",

          border:
            theme === "dark"
              ? "1px solid rgba(232,232,228,0.25)"
              : "1px solid rgba(73,100,67,0.25)",
        }}
      />

      {/* START TEXT */}
      {!started && (
        <div
          className="
            absolute bottom-32 left-1/2
            z-50 -translate-x-1/2
            text-xs uppercase tracking-[0.3em]
            text-[#496443]/60
            dark:text-[#E8E8E4]/60
          "
        >
          Press Enter
        </div>
      )}

      <div
        ref={contentRef}
        className="
          absolute inset-0
          flex flex-col items-center justify-center
        "
        style={{
          willChange:
            "transform, opacity, filter",
        }}
      >
        <div
          className="
            relative z-20
            flex flex-col items-center
            text-center
          "
        >
          {/* NAME */}
          <div
            style={{
              animation:
                "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
            }}
          >
            <h1
              ref={titleRef}
              className="
                leading-none tracking-tight
                text-[#496443]
                transition-colors duration-500
                dark:text-[#E8E8E4]
              "
              style={{
                fontFamily:
                  "'Oswald', sans-serif",

                fontSize:
                  "clamp(64px, 11vw, 180px)",

                fontWeight: 700,

                whiteSpace: "nowrap",

                animation:
                  "float 8s ease-in-out infinite",
              }}
            >
              {"MARCIO CARVALHO"
                .split("")
                .map(
                  (char, index) => (
                    <span
                      key={index}
                      className="
                        hero-letter
                        inline-block
                      "
                      style={{
                        WebkitTextStroke:
                          char !== " "
                            ? theme ===
                              "dark"
                              ? "2px #E8E8E4"
                              : "2px #496443"
                            : undefined,

                        color:
                          char !== " "
                            ? index < 6
                              ? "transparent"
                              : undefined
                            : undefined,

                        marginRight:
                          char === " "
                            ? "0.3em"
                            : undefined,
                      }}
                    >
                      {char}
                    </span>
                  )
                )}
            </h1>
          </div>

          {/* STACKS */}
          <div
            ref={marqueeRef}
            className="
              relative mt-8 overflow-hidden
            "
            style={{
              animation:
                "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both",
            }}
          >
            <div
              className="
                flex w-max items-center gap-8
                whitespace-nowrap
              "
              style={{
                animation:
                  "marquee 18s linear infinite",
              }}
            >
              {[...STACKS, ...STACKS].map(
                (stack, index) => (
                  <div
                    key={`${stack}-${index}`}
                    className="
                      flex items-center gap-8
                    "
                  >
                    <span
                      className="
                        text-sm font-medium uppercase tracking-[0.25em]
                        text-[#496443]/60
                        transition-colors duration-500
                        dark:text-[#E8E8E4]/60
                      "
                    >
                      {stack}
                    </span>

                    <span
                      className="
                        h-1 w-1 rounded-full
                        bg-[#496443]/40
                        transition-colors duration-500
                        dark:bg-[#E8E8E4]/40
                      "
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.96);
            filter: blur(10px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}