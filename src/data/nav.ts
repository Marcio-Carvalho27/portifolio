import { LiaLinkedinIn, LiaGithub } from "react-icons/lia";

import { projects } from "./work";
import { services } from "./service";
import { experiences } from "./experience";

export const navItems = [
  {
    key: "nav.about",
    count: null,
  },
  {
    key: "nav.work",
    count: projects.length,
  },
  {
    key: "nav.experience",
    count: experiences.length,
  },
  {
    key: "nav.services",
    count: services.length,
  },
  {
    key: "nav.contact",
    count: null,
  },
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