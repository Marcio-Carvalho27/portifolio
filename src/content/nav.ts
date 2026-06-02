import { projects } from "./projects";
import { services } from "./services";
import { experiences } from "./experience";

export const navItems = [
  {
    key: "nav.about",
    href: "#about",
    count: null,
  },
  {
    key: "nav.work",
    href: "#work",
    count: projects.length,
  },
  {
    key: "nav.experience",
    href: "#experience",
    count: experiences.length,
  },
  {
    key: "nav.services",
    href: "#services",
    count: services.length,
  },
  {
    key: "nav.contact",
    href: "#contact",
    count: null,
  },
];
