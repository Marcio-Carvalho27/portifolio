"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NavItem } from "@/src/components/ui/NavItem";
import { navItems } from "@/src/content/nav";
import { useLanguage } from "@/src/context/LanguageContext";
import { useTheme } from "@/src/context/ThemeContext";

interface GlassPillProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}

function GlassPill({
  children,
  className = "",
  onClick,
  title,
}: GlassPillProps) {
  return (
    <div
      onClick={onClick}
      title={title}
      className={`glass-pill ${className}`}
    >
      <div className="glass-pill-content">{children}</div>
    </div>
  );
}

export function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isExperienceSection, setIsExperienceSection] = useState(false);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHiding = useRef(false);

  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const isNowPastHero = window.scrollY > window.innerHeight * 0.85;

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

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const detectSection = () => {
      const experienceSection = document.getElementById("experience");

      if (!experienceSection) {
        return;
      }

      const rect = experienceSection.getBoundingClientRect();
      const navY = 80;

      setIsExperienceSection(rect.top <= navY && rect.bottom >= navY);
    };

    detectSection();

    window.addEventListener("scroll", detectSection, { passive: true });
    window.addEventListener("resize", detectSection);

    return () => {
      window.removeEventListener("scroll", detectSection);
      window.removeEventListener("resize", detectSection);
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

  const dynamicTextColor =
    theme === "dark" || isExperienceSection || !pastHero
      ? "text-white"
      : "text-black";

  if (!mounted) {
    return null;
  }

  return (
    <>
      {pastHero && (
        <div
          className="floating-nav-hit-area"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="floating-nav"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: `translateX(-50%) translateY(${
            visible ? "0px" : "-20px"
          })`,
        }}
      >
        <div className="floating-nav-inner">
          <GlassPill className="floating-nav-links">
            <nav className="floating-nav-menu">
              {navItems.map((item) => (
                <NavItem
                  key={item.key}
                  label={t(item.key)}
                  count={item.count}
                  textColor={dynamicTextColor}
                />
              ))}
            </nav>
          </GlassPill>

          <GlassPill
            onClick={toggleTheme}
            title={
              theme === "light" ? "Ativar dark mode" : "Ativar light mode"
            }
            className="floating-nav-action"
          >
            <span className={dynamicTextColor}>
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </span>
          </GlassPill>

          <GlassPill
            onClick={toggleLocale}
            title={locale === "en" ? "Mudar para Portugues" : "Switch to English"}
            className="floating-nav-action"
          >
            <span className={`text-[10px] font-semibold ${dynamicTextColor}`}>
              {locale === "en" ? "PT" : "EN"}
            </span>
          </GlassPill>
        </div>
      </div>
    </>
  );
}
