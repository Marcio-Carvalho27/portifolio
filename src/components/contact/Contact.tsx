"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LiaGithub, LiaLinkedinIn } from "react-icons/lia";

const WPP_LINK =
  "https://wa.me/5575992607080?text=Ol%C3%A1%2C%20vi%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marciocarvalho27/",
    icon: LiaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/Marcio-Carvalho27",
    icon: LiaGithub,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-[#496443] p-5"
    >
      {/* Glow */}
      <div className="absolute left-[-10%] top-[-10%] h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[320px] w-[320px] rounded-full bg-black/10 blur-3xl" />

      {/* Card */}
      <div
        className="relative flex h-full w-full max-w-[1600px] flex-col overflow-hidden rounded-[36px] border border-black/5 bg-white px-6 py-8 shadow-2xl md:px-10 lg:px-14"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0px)"
            : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Center Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f8f8f8] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#496443]" />

            <span className="text-[12px] font-medium tracking-wide text-black/75">
              AVAILABLE FOR NEW PROJECT
            </span>
          </div>

          {/* Title */}
          <h2
            className="mt-8 max-w-[760px] font-semibold uppercase tracking-[-0.07em] text-black"
            style={{
              fontSize: "clamp(42px, 5vw, 88px)",
              lineHeight: 0.92,
            }}
          >
            HAVE A PROJECT
            <br />
            IN MIND?
          </h2>

          {/* Description */}
          <p
            className="mt-6 max-w-[700px] text-black/60"
            style={{
              fontSize: "clamp(14px, 1vw, 17px)",
              lineHeight: 1.9,
            }}
          >
            Together, we can create something modern, functional and
            impactful. Let&apos;s build an experience that truly stands
            out.
          </p>

          {/* Button */}
          <a
            href={WPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-full
              px-8
              py-4
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-[1.02]
            "
            style={{
              background: "#496443",
              boxShadow: "0 12px 30px rgba(73,100,67,0.30)",
            }}
          >
            <span className="text-white">Contact Me</span>
            

            <span className="text-base text-white">↗</span>
          </a>
        </div>

        {/* Bottom Socials */}
        <div className="relative z-10 flex w-full items-center justify-center gap-4 pb-2">
          {socialLinks.map((item) => {
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
              >
                <Icon className="h-5 w-5 text-[#496443]" />

                <span className="text-[15px] font-medium text-[#496443]">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}