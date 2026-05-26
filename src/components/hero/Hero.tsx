"use client";

import { useEffect, useRef } from "react";

import { LiaLinkedinIn, LiaGithub } from "react-icons/lia";

const navItems = [
  { label: "Work", count: 40 },
  { label: "Service", count: 4 },
  { label: "Experience", count: 9 },
  { label: "Moments", count: 120 },
  { label: "Contact", count: null },
];

const contactCards = [
  {
    label: "LinkedIn",
    username: "linkedin.com/in/marcio",
    href: "https://www.linkedin.com/in/marciocarvalho27/",
    icon: LiaLinkedinIn,
  },
  {
    label: "GitHub",
    username: "github.com/marcio",
    href: "https://github.com/Marcio-Carvalho27",
    icon: LiaGithub,
  },
];

function useCountUp(target: number | null, duration = 1200, delay = 800) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (target === null || !ref.current) return;

    const el = ref.current;

    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration / 16);

      const timer = setInterval(() => {
        start += step;

        if (start >= target) {
          el.textContent = target > 9 ? `${target}+` : `${target}`;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(start).toString();
        }
      }, 16);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return ref;
}

function NavItem({
  label,
  count,
}: {
  label: string;
  count: number | null;
}) {
  const ref = useCountUp(count);

  return (
    <a
      href={`#${label.toLowerCase()}`}
      className="flex items-center gap-1.5 text-sm font-medium text-[#496443] transition-opacity duration-200 hover:opacity-50"
    >
      {label}

      {count !== null && (
        <span className="text-xs font-normal text-[#496443]/50">
          [<span ref={ref}>0</span>]
        </span>
      )}
    </a>
  );
}

function PhotoWithCursorColor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const mask = maskRef.current;

    if (!container || !mask) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mask.style.maskImage = `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, black 100%)`;
      mask.style.webkitMaskImage = `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, black 100%)`;
    };

    const onLeave = () => {
      mask.style.maskImage = "none";
      mask.style.webkitMaskImage = "none";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[470px] w-auto"
      style={{
        animation:
          "slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both",
      }}
    >
      <img
        src="/profile.png"
        alt="Márcio Carvalho"
        className="h-[470px] w-auto object-cover object-top select-none"
      />

      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{ maskImage: "none", WebkitMaskImage: "none" }}
      >
        <img
          src="/profile.png"
          alt=""
          aria-hidden
          className="h-[470px] w-auto object-cover object-top grayscale select-none"
        />
      </div>
    </div>
  );
}

function ContactCards() {
  return (
    <div
      className="absolute right-10 top-[82%] z-30 flex -translate-y-1/2 flex-col gap-4"
      style={{
        animation:
          "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both",
      }}
    >
      {contactCards.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="
              group
              flex
              items-center
              gap-3
              rounded-full
              border
              border-[#496443]/20
              bg-[#496443]/5
              px-5
              py-3
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:bg-[#496443]/10
              hover:shadow-[0_8px_24px_rgba(73,100,67,0.15)]
            "
            style={{
              animation: "glowPulse 5s ease-in-out infinite",
            }}
          >
            <Icon className="h-4 w-4 text-[#496443]" />

            <span className="text-[15px] font-medium text-[#496443]">
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-[#f6f8f5]">
      <header
        className="relative z-50 grid grid-cols-3 items-center px-10 pt-8"
        style={{
          animation: "slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        <div className="flex h-8 w-fit items-center gap-2.5 rounded-full border border-[#496443]/20 bg-white px-8 shadow-[0_2px_12px_rgba(73,100,67,0.10)]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#496443]" />

          <span className="text-sm font-medium text-[#496443]">
            Available for New Project
          </span>
        </div>

        <nav className="flex items-center justify-center gap-10">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              count={item.count}
            />
          ))}
        </nav>

        <div className="flex justify-end">
          <button className="h-10 rounded-full bg-[#496443] px-6 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:opacity-90">
            Let's Talk ↗
          </button>
        </div>
      </header>

      <div
        className="absolute left-0 right-0 z-10 flex select-none flex-col items-center"
        style={{
          top: "clamp(100px, 18vh, 160px)",
          animation:
            "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
        }}
      >
        <h1
          className="leading-none tracking-tight text-[#496443]"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(64px, 10vw, 160px)",
            fontWeight: 700,
            whiteSpace: "nowrap",
            animation: "float 8s ease-in-out infinite",
          }}
        >
          <span
            style={{
              WebkitTextStroke: "2px #496443",
              color: "transparent",
              marginRight: "0.2em",
            }}
          >
            MÁRCIO
          </span>

          <span>CARVALHO</span>
        </h1>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2">
        <PhotoWithCursorColor />
      </div>

      <div
        className="absolute left-14 top-[78%] z-30 -translate-y-1/2"
        style={{
          animation:
            "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both",
        }}
      >
        <h2 className="text-[36px] font-semibold leading-[0.95] text-[#496443]">
          Full Stack Developer
        </h2>

        <p className="mt-4 max-w-[420px] text-m leading-relaxed text-[#496443]/70">
          Building modern digital products — from websites to mobile apps.
        </p>

        <button className="mt-4 rounded-full bg-[#496443] px-7 py-4 text-sm font-medium text-white shadow-[0_6px_18px_rgba(73,100,67,0.25)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_16px_40px_rgba(73,100,67,0.35)]">
          Let&apos;s collaborate ↗
        </button>
      </div>

      <ContactCards />

      <style>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-60px) scale(0.98);
            filter: blur(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

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

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.94);
            filter: blur(12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes glowPulse {
          0% {
            box-shadow:
              0 0 0 rgba(73,100,67,0),
              0 10px 30px rgba(73,100,67,0.06);
          }

          50% {
            box-shadow:
              0 0 30px rgba(73,100,67,0.08),
              0 16px 40px rgba(73,100,67,0.12);
          }

          100% {
            box-shadow:
              0 0 0 rgba(73,100,67,0),
              0 10px 30px rgba(73,100,67,0.06);
          }
        }
      `}</style>
    </section>
  );
}