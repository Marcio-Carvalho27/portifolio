"use client";

import { useEffect } from "react";

import { useCountUp } from "@/src/lib/useCountUp";

interface NavItemProps {
  label: string;
  count: number | null;
  textColor: string;
}

const animatedItems = new Set<string>();

export function NavItem({
  label,
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
      href={`#${label.toLowerCase()}`}
      className="
        flex items-center gap-1.5
        text-sm font-medium
        transition-colors duration-300
        hover:opacity-50
      "
    >
      <span className={textColor}>
        {label}
      </span>

      {count !== null && (
        <span
          className={`
            text-xs
            font-normal
            transition-colors duration-300
            ${textColor}
          `}
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