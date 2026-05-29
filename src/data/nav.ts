import { LiaLinkedinIn, LiaGithub } from "react-icons/lia";
import { projects } from "./work";
import { services } from "./service";
import { experiences } from "./experience";


export const navItems = [
  { label: "Work", count: projects.length },
  { label: "Experience", count: experiences.length },
  { label: "Services", count: services.length },
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