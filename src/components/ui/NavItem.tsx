"use client";

import { useEffect } from "react";

import { useCountUp } from "@/src/hooks/useCountUp";

interface NavItemProps {
  label: string;
  href: string;
  count: number | null;
  textColor: string;
}

const animatedItems = new Set<string>();

export function NavItem({
  label,
  href,
  count,
  textColor,
}: NavItemProps) {
  const alreadyAnimated = animatedItems.has(label);

  const ref = useCountUp(
    alreadyAnimated ? null : count
  );

  useEffect(() => {
    animatedItems.add(label);
  }, [label]);

  return (
    <a
      href={href}
      className="nav-item"
    >
      <span className={textColor}>
        {label}
      </span>

      {count !== null && (
        <span
          className={`nav-count ${textColor}`}
        >
          [
          <span ref={ref}>
            {alreadyAnimated ? count : 0}
          </span>
          ]
        </span>
      )}
    </a>
  );
}
