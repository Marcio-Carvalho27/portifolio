"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

  const marqueeRef =
    useRef<HTMLDivElement>(null);

  const ballRef =
    useRef<HTMLDivElement>(null);

  const paddleRef =
    useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);

  const animationRef =
    useRef<number | null>(null);

  const scoreRef = useRef(0);

  const bestScoreRef =
    useRef(0);

  const ballData = useRef({
    x: 0,
    y: 0,
    vx: 4,
    vy: -4,
  });

  const [started, setStarted] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const [bestScore, setBestScore] =
    useState(() => {
      if (typeof window === "undefined") {
        return 0;
      }

      return Number(localStorage.getItem("hero-best-score") ?? 0);
    });

  const letterHits =
    useRef<Record<number, number>>(
      {}
    );

  const brokenLetters =
    useRef<Set<number>>(
      new Set()
    );

  const letterTimeouts = useRef(
    new WeakMap<
      HTMLElement,
      ReturnType<typeof setTimeout>
    >()
  );

  const paddleWidth =
    typeof window !== "undefined"
      ? window.innerWidth < 768
        ? 90
        : 120
      : 120;

  // KEEP REFS UPDATED
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    bestScoreRef.current =
      bestScore;
  }, [bestScore]);

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
        Math.max(
          0,
          scrollY / sectionH
        )
      );

      const translateY =
        -(progress * 60);

      const opacity =
        1 - progress * 1.6;

      const scale =
        1 - progress * 0.04;

      const blur =
        progress * 8;

      content.style.transform = `
        translateY(${translateY}px)
        scale(${scale})
      `;

      content.style.opacity =
        String(
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
      if (!marqueeRef.current) {
        return;
      }

      marqueeRef.current.style.width =
        "min(100vw - 32px, 1200px)";
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

  // PADDLE MOUSE
  useEffect(() => {
    const handleMouseMove = (
      e: MouseEvent
    ) => {
      mouseX.current = e.clientX;

      if (paddleRef.current) {
        paddleRef.current.style.transform = `
          translateX(${
            e.clientX -
            paddleWidth / 2
          }px)
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
  }, [paddleWidth]);

  // TOUCH SUPPORT
  useEffect(() => {
    const handleTouchMove = (
      e: TouchEvent
    ) => {
      const touch =
        e.touches[0];

      mouseX.current =
        touch.clientX;

      if (paddleRef.current) {
        paddleRef.current.style.transform = `
          translateX(${
            touch.clientX -
            paddleWidth / 2
          }px)
        `;
      }
    };

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );
  }, [paddleWidth]);

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

    const handleClick = () => {
      setStarted(true);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "click",
      handleClick
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  // GAME LOOP
  useEffect(() => {
    const ball =
      ballData.current;

    if (
      ball.x === 0 &&
      ball.y === 0
    ) {
      ball.x =
        window.innerWidth / 2;

      ball.y =
        window.innerHeight - 120;
    }

    const animate = () => {
      const ballEl =
        ballRef.current;

      if (!ballEl) {
        animationRef.current =
          requestAnimationFrame(
            animate
          );

        return;
      }

      const paddleY =
        window.innerHeight - 80;

      const paddleX =
        mouseX.current -
        paddleWidth / 2;

      const paddleHeight = 12;

      // BEFORE START
      if (!started) {
        ball.x =
          paddleX +
          paddleWidth / 2 -
          5;

        ball.y =
          paddleY - 18;

        ballEl.style.transform = `
          translate3d(
            ${ball.x}px,
            ${ball.y}px,
            0
          )
        `;

        animationRef.current =
          requestAnimationFrame(
            animate
          );

        return;
      }

      ball.x += ball.vx;
      ball.y += ball.vy;

      // WALL COLLISION
      if (
        ball.x <= 0 ||
        ball.x >=
          window.innerWidth - 10
      ) {
        ball.vx *= -1;
      }

      if (ball.y <= 0) {
        ball.vy *= -1;
      }

      // PADDLE COLLISION
      if (
        ball.y + 10 >=
          paddleY &&
        ball.y <=
          paddleY +
            paddleHeight &&
        ball.x + 10 >=
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

        ball.vx += hit * 1.4;
      }

      // GAME OVER
      if (
        ball.y >
        window.innerHeight + 50
      ) {
        setStarted(false);

        setScore(0);

        letterHits.current = {};

        brokenLetters.current.clear();

        const letters =
          document.querySelectorAll(
            ".hero-letter"
          );

        letters.forEach((letter) => {
          const el =
            letter as HTMLElement;

          el.style.opacity = "1";

          el.style.transform =
            "scale(1)";

          el.style.filter = "none";
        });

        ball.vx = 4;
        ball.vy = -4;
      }

      // LETTER COLLISION
      const letters =
        document.querySelectorAll(
          ".hero-letter"
        );

      letters.forEach(
        (letter, index) => {
          if (
            brokenLetters.current.has(
              index
            )
          ) {
            return;
          }

          const rect =
            letter.getBoundingClientRect();

          const padding =
            window.innerWidth < 768
              ? 8
              : 18;

          const left =
            rect.left + padding;

          const right =
            rect.right - padding;

          const top =
            rect.top + padding;

          const bottom =
            rect.bottom - padding;

          const collided =
            ball.x + 10 > left &&
            ball.x < right &&
            ball.y + 10 > top &&
            ball.y < bottom;

          if (!collided) {
            return;
          }

          ball.vy *= -1;

          // SCORE
          const nextScore =
            scoreRef.current + 1;

          scoreRef.current =
            nextScore;

          setScore(nextScore);

          // BEST SCORE
          if (
            nextScore >
            bestScoreRef.current
          ) {
            bestScoreRef.current =
              nextScore;

            setBestScore(
              nextScore
            );

            localStorage.setItem(
              "hero-best-score",
              String(nextScore)
            );
          }

          // SPEED
          ball.vx *= 1.001;
          ball.vy *= 1.001;

          // LETTER LIFE
          const currentHits =
            (letterHits.current[
              index
            ] || 0) + 1;

          letterHits.current[
            index
          ] = currentHits;

          const el =
            letter as HTMLElement;

          const opacity =
            Math.max(
              0,
              1 -
                currentHits / 10
            );

          el.style.opacity =
            String(opacity);

          el.style.transform =
            "scale(1.14)";

          el.style.transition = `
            transform 120ms cubic-bezier(0.16,1,0.3,1),
            opacity 220ms ease,
            filter 220ms ease
          `;

          const previousTimeout =
            letterTimeouts.current.get(
              el
            );

          if (previousTimeout) {
            clearTimeout(
              previousTimeout
            );
          }

          letterTimeouts.current.set(
            el,
            setTimeout(() => {
              el.style.transform =
                "scale(1)";
            }, 120)
          );

          // BREAK LETTER
          if (
            currentHits >= 10
          ) {
            brokenLetters.current.add(
              index
            );

            el.style.opacity = "0";

            el.style.transform =
              "scale(0.6) rotate(8deg)";

            el.style.filter =
              "blur(8px)";
          }
        }
      );

      // LIMIT SPEED
      ball.vx = Math.max(
        -12,
        Math.min(12, ball.vx)
      );

      ball.vy = Math.max(
        -12,
        Math.min(12, ball.vy)
      );

      ballEl.style.transform = `
        translate3d(
          ${ball.x}px,
          ${ball.y}px,
          0
        )
      `;

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      if (
        animationRef.current
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [
    started,
    paddleWidth,
  ]);

  return (
    <section
      ref={sectionRef}
      className="site-section hero-section"
    >
      <div
        ref={ballRef}
        className="hero-ball"
      />

      <div
        ref={paddleRef}
        className="hero-paddle"
        style={{
          width: `${paddleWidth}px`,
        }}
      />

      <div className="hero-score">
        {!started && (
          <span>
            Press Enter / Tap
          </span>
        )}

        <span>
          Score {score}
        </span>

        <span>
          Best {bestScore}
        </span>
      </div>

      <div
        ref={contentRef}
        className="hero-content"
      >
        <div className="hero-content-inner">
          <h1 className="hero-title">
            {"MARCIO CARVALHO"
              .split("")
              .map(
                (char, index) => (
                  <span
                    key={index}
                    className={[
                      "hero-letter",
                      index < 6 && char !== " "
                        ? "hero-letter-outline"
                        : "",
                      char === " "
                        ? "hero-letter-space"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {char}
                  </span>
                )
              )}
          </h1>

          {/* STACKS */}
          <div
            ref={marqueeRef}
            className="hero-marquee"
          >
            <div className="hero-marquee-track">
              {[...STACKS, ...STACKS].map(
                (stack, index) => (
                  <div
                    key={`${stack}-${index}`}
                    className="hero-stack"
                  >
                    <span className="hero-stack-label">
                      {stack}
                    </span>

                    <span className="hero-stack-dot" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
