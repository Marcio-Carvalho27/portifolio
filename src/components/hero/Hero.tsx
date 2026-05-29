"use client";

import { useEffect, useRef } from "react";

import { navItems } from "@/src/data/nav";
import { NavItem } from "@/src/components/common/NavItem";
import { PhotoWithCursorColor } from "@/src/components/hero/PhotoWithCursorColor";
import { ContactCards } from "@/src/components/contact/ContactCards";

const WPP_LINK =
  "https://wa.me/5575992607080?text=Ol%C3%A1%2C%20vi%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const content = contentRef.current;

      if (!section || !content) return;

      const scrollY = window.scrollY;
      const sectionH = section.offsetHeight;

      const progress = Math.min(
        1,
        Math.max(0, scrollY / sectionH)
      );

      const translateY = -(progress * 80);
      const opacity = 1 - progress * 1.8;
      const scale = 1 - progress * 0.06;
      const blur = progress * 12;

      content.style.transform =
        `translateY(${translateY}px) scale(${scale})`;

      content.style.opacity = String(Math.max(0, opacity));

      content.style.filter = `blur(${blur}px)`;
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#f6f8f5]"
    >
      <div
        ref={contentRef}
        className="absolute inset-0"
        style={{
          willChange: "transform, opacity, filter",
        }}
      >
        {/* HEADER */}
        <header
          className="relative z-50 grid items-center px-4 pt-8 lg:px-10"
          style={{
            gridTemplateColumns: "1fr auto 1fr",
            animation:
              "slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Badge */}
          <div className="flex h-8 w-fit items-center gap-2.5 overflow-hidden rounded-full border border-[#496443]/20 bg-white px-4 shadow-[0_2px_12px_rgba(73,100,67,0.10)] lg:px-8">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#496443]" />

            <span className="whitespace-nowrap text-xs font-medium text-[#496443] lg:text-sm">
              Available for New Project
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center justify-center gap-4 px-4 lg:gap-10">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                count={item.count}
              />
            ))}
          </nav>

          {/* Button */}
          <div className="flex justify-end">
            <a
              href={WPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-10
                items-center
                rounded-full
                bg-[#496443]
                px-4
                text-xs
                font-medium
                text-white
                transition-all
                duration-500
                hover:-translate-y-1
                hover:scale-[1.03]
                hover:opacity-90
                lg:px-6
                lg:text-sm
              "
            >
              <span className="text-white">
                Let&apos;s Talk ↗
              </span>
              
            </a>
          </div>
        </header>

        {/* TITLE */}
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
              fontSize: "clamp(56px, 10vw, 160px)",
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
              MARCIO
            </span>

            <span>CARVALHO</span>
          </h1>
        </div>

        {/* PHOTO */}
        <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2">
          <PhotoWithCursorColor />
        </div>

        {/* LEFT CONTENT */}
        <div
          className="absolute left-4 top-[78%] z-30 -translate-y-1/2 lg:left-14"
          style={{
            animation:
              "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both",
          }}
        >
          <h2
            className="font-semibold leading-[0.95] text-[#496443]"
            style={{
              fontSize: "clamp(20px, 3vw, 36px)",
            }}
          >
            Full Stack Developer
          </h2>

          <p className="mt-4 max-w-[420px] text-m leading-relaxed text-[#496443]/70">
            Building modern digital products — from websites
            to mobile apps.
          </p>

          <a
            href={WPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-4
              inline-flex
              items-center
              rounded-full
              bg-[#496443]
              px-7
              py-4
              text-sm
              font-medium
              text-white
              shadow-[0_6px_18px_rgba(73,100,67,0.25)]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:scale-[1.03]
              hover:shadow-[0_16px_40px_rgba(73,100,67,0.35)]
            "
          >
            <span className="text-white"> Get In Touch ↗ </span>
            
          </a>
        </div>

        <ContactCards />
      </div>

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
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 rgba(73,100,67,0),
              0 10px 30px rgba(73,100,67,0.06);
          }

          50% {
            box-shadow:
              0 0 30px rgba(73,100,67,0.08),
              0 16px 40px rgba(73,100,67,0.12);
          }
        }
      `}</style>
    </section>
  );
}