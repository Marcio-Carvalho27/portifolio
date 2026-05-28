"use client";

import { useCountUp } from "@/src/lib/useCountUp";

interface NavItemProps {
  label: string;
  count: number | null;
}

export function NavItem({ label, count }: NavItemProps) {
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