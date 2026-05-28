"use client";

import { contactCards } from "@/src/data/nav";

export function ContactCards() {
  return (
    <div
      className="absolute right-10 top-[82%] z-30 flex -translate-y-1/2 flex-col gap-4"
      style={{
        animation: "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both",
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