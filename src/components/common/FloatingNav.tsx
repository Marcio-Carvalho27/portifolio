"use client";

import { Moon, Sun } from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { navItems } from "@/src/data/nav";

import { NavItem } from "@/src/components/common/NavItem";

import { useTheme } from "@/src/context/ThemeContext";

import { useLanguage } from "@/src/context/LanguageContext";

export function FloatingNav() {
  const [visible, setVisible] = useState(false);

  const [mounted, setMounted] = useState(false);

  const [pastHero, setPastHero] = useState(false);

  const [isExperienceSection, setIsExperienceSection] =
    useState(false);

  const hideTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const isHiding = useRef(false);

  const navRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();

  const { locale, toggleLocale, t } =
    useLanguage();

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);

      setVisible(true);
    }, 100);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const HERO_HEIGHT = window.innerHeight;

    const onScroll = () => {
      const scrollY = window.scrollY;

      const isNowPastHero =
        scrollY > HERO_HEIGHT * 0.85;

      setPastHero(isNowPastHero);

      if (!isNowPastHero) {
        isHiding.current = false;

        if (hideTimer.current) {
          clearTimeout(hideTimer.current);
        }

        setVisible(true);

        return;
      }

      if (!isHiding.current) {
        if (hideTimer.current) {
          clearTimeout(hideTimer.current);
        }

        hideTimer.current = setTimeout(() => {
          setVisible(false);

          isHiding.current = false;
        }, 1800);

        isHiding.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  // DETECTA SE ESTÁ NA EXPERIENCE
  useEffect(() => {
    const detectSection = () => {
      const experienceSection =
        document.getElementById(
          "experience"
        );

      if (!experienceSection) {
        return;
      }

      const rect =
        experienceSection.getBoundingClientRect();

      const navY = 80;

      const isInside =
        rect.top <= navY &&
        rect.bottom >= navY;

      setIsExperienceSection(
        isInside
      );
    };

    detectSection();

    window.addEventListener(
      "scroll",
      detectSection
    );

    window.addEventListener(
      "resize",
      detectSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        detectSection
      );

      window.removeEventListener(
        "resize",
        detectSection
      );
    };
  }, []);

  const handleMouseEnter = () => {
    isHiding.current = false;

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    setVisible(true);
  };

  const handleMouseLeave = () => {
    if (!pastHero) {
      return;
    }

    isHiding.current = true;

    hideTimer.current = setTimeout(() => {
      setVisible(false);

      isHiding.current = false;
    }, 800);
  };

  // COR DINÂMICA
  const dynamicTextColor =
    theme === "dark"
      ? "text-white"
      : isExperienceSection
      ? "text-white"
      : "text-black";

  const GlassPill = ({
    children,
    className = "",
    onClick,
    title,
    style = {},
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    title?: string;
    style?: React.CSSProperties;
  }) => (
    <div
      onClick={onClick}
      title={title}
      className={`
        relative overflow-hidden
        ${className}
      `}
      style={{
        backdropFilter: "blur(28px)",

        WebkitBackdropFilter:
          "blur(28px)",

        backgroundColor:
          "rgba(255,255,255,0.06)",

        border:
          "1px solid rgba(255,255,255,0.18)",

        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.35),
          0 4px 24px rgba(0,0,0,0.06)
        `,

        ...style,
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <>
      {pastHero && (
        <div
          className="
            fixed top-0 left-0 right-0
            z-[99] h-16
          "
          onMouseEnter={
            handleMouseEnter
          }
          onMouseLeave={
            handleMouseLeave
          }
        />
      )}

      <div
        ref={navRef}
        onMouseEnter={
          handleMouseEnter
        }
        onMouseLeave={
          handleMouseLeave
        }
        className="
          fixed top-5 left-1/2
          z-[100]
        "
        style={{
          opacity: visible ? 1 : 0,

          transform: `translateX(-50%) translateY(${
            visible
              ? "0px"
              : "-20px"
          })`,

          transition:
            "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",

          pointerEvents: visible
            ? "auto"
            : "none",
        }}
      >
        <div className="flex items-center gap-5">

          <GlassPill
            style={{
              borderRadius: 999,

              padding: "12px 32px",
            }}
          >
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavItem
                  key={item.key}
                  label={t(item.key)}
                  count={item.count}
                  textColor={
                    dynamicTextColor
                  }
                />
              ))}
            </nav>
          </GlassPill>

          <GlassPill
            onClick={toggleTheme}
            title={
              theme === "light"
                ? "Ativar dark mode"
                : "Ativar light mode"
            }
            className="
              cursor-pointer
              transition-transform
              duration-300
              hover:scale-110
            "
            style={{
              borderRadius: 999,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={`
                flex items-center justify-center
                transition-colors duration-300
                ${dynamicTextColor}
              `}
            >
              {theme === "light" ? (
                <Moon size={16} />
              ) : (
                <Sun size={16} />
              )}
            </span>
          </GlassPill>

          <GlassPill
            onClick={toggleLocale}
            title={
              locale === "en"
                ? "Mudar para Português"
                : "Switch to English"
            }
            className="
              cursor-pointer
              transition-transform
              duration-300
              hover:scale-110
            "
            style={{
              borderRadius: 999,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={`
                text-[10px]
                font-semibold
                tracking-wide
                transition-colors duration-300
                ${dynamicTextColor}
              `}
            >
              {locale === "en"
                ? "PT"
                : "EN"}
            </span>
          </GlassPill>

        </div>
      </div>
    </>
  );
}