import { LiaLinkedinIn, LiaGithub } from "react-icons/lia";
import { projects } from "./work";

export const navItems = [
  { label: "Work", count: projects.length },
  { label: "Service", count: 4 },
  { label: "Experience", count: 3 },
  { label: "Moments", count: 5 },
  { label: "Contact", count: null },
];

export const contactCards = [
  {
    label: "LinkedIn",
    username: "linkedin.com/in/marcio",
    href: "https://www.linkedin.com/in/marciocarvalho27/",
    icon: LiaLinkedinIn,
  },
  {
    label: "GitHub",
    username: "github.com/marcio",
    href: "https://github.com/Marcio-Carvalho27",
    icon: LiaGithub,
  },
];