"use client";

import { ExternalLink } from "lucide-react";
import { LiaGithub, LiaLinkedinIn } from "react-icons/lia";

import { Button } from "@/src/components/ui/Button";
import { useLanguage } from "@/src/context/LanguageContext";
import { useInView } from "@/src/hooks/useInView";

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
  const { ref, visible } = useInView<HTMLElement>(0.2);
  const { t } = useLanguage();

  return (
    <section ref={ref} id="contact" className="site-section contact-section">
      <div className={`contact-panel ${visible ? "is-visible" : ""}`}>
        <div className="contact-content">
          <div className="contact-badge">
            <span className="contact-badge-dot" />
            <span className="contact-badge-text">
              {t("contact.badge")}
            </span>
          </div>

          <h2 className="contact-title">{t("contact.title")}</h2>

          <p className="contact-text">
            {t("contact.text")}
          </p>

          <Button asChild variant="unstyled" size="unstyled">
            <a
              href={WPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
            >
              <span>{t("contact.cta")}</span>
              <ExternalLink size={18} />
            </a>
          </Button>
        </div>

        <div className="contact-socials">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="contact-social"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
