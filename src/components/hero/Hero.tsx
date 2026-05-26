"use client";

import { useEffect, useRef } from "react";

const navItems = [
  { label: "Work", count: 40 },
  { label: "Service", count: 4 },
  { label: "Experience", count: 9 },
  { label: "Moments", count: 120 },
  { label: "Contact", count: null },
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

function NavItem({ label, count }: { label: string; count: number | null }) {
  const ref = useCountUp(count);
  return (
    <a
      href={`#${label.toLowerCase()}`}
      className="flex items-center gap-1.5 text-sm font-medium text-black transition-opacity duration-200 hover:opacity-50"
    >
      {label}
      {count !== null && (
        <span className="text-xs font-normal text-black/35">
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
      style={{ animation: "slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both" }}
    >
      {/* camada colorida — base */}
      <img
        src="/profile.png"
        alt="Márcio Carvalho"
        className="h-[470px] w-auto object-cover object-top select-none"
      />
      {/* camada P&B — com máscara de cursor */}
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{ maskImage: "none", webkitMaskImage: "none" }}
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

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-white">

      {/* ───────────────── HEADER ───────────────── */}
      {/* aparece primeiro: delay 0s */}
      <header
        className="relative z-50 grid grid-cols-3 items-center px-10 pt-8"
        style={{ animation: "slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        <div className="flex items-center gap-2.5 w-fit rounded-full border border-stone-200 bg-white px-8 h-8 shadow-[0_2px_12px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.06)]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#496443]" />
          <span className="text-sm font-medium text-black">
            Available for New Project
          </span>
        </div>
        <nav className="flex items-center justify-center gap-10">
          {navItems.map((item) => (
            <NavItem key={item.label} label={item.label} count={item.count} />
          ))}
        </nav>
        <div className="flex justify-end">
          <button className="h-10 px-6 rounded-full bg-[#191919] text-sm font-medium text-white transition-opacity duration-300 hover:opacity-80">
            Let's Talk&nbsp;↗
          </button>
        </div>
      </header>

      {/* ───────────────── NOME ───────────────── */}
      {/* aparece segundo: delay 0.4s, z-10 (atrás da foto) */}
      <div
        className="absolute left-0 right-0 z-10 select-none flex justify-center"
        style={{
          top: "clamp(100px, 18vh, 160px)",
          animation: "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
        }}
      >
        <h1
          className="leading-none tracking-tight text-black"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(64px, 10vw, 160px)",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {/* primeira palavra — outline */}
          <span
            style={{
              WebkitTextStroke: "2px #111",
              color: "transparent",
              marginRight: "0.2em",
            }}
          >
            MÁRCIO
          </span>
          {/* segunda palavra — sólida */}
          <span>CARVALHO</span>
        </h1>
      </div>

      {/* ───────────────── FOTO ───────────────── */}
      {/* aparece terceiro: delay 0.9s, z-20 (na frente do nome) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
        <PhotoWithCursorColor />
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
}