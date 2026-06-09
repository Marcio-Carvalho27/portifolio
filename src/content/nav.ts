import { projects } from "./projects";
import { services } from "./services";
import { experiences } from "./experience";
import { testimonialColumns } from "./testimonials";

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
    key: "nav.services",
    href: "#services",
    count: services.length,
  },
  {
    key: "nav.testimonials",
    href: "#testimonials",
    count: testimonialColumns.flat().length,
  },
  {
    key: "nav.experience",
    href: "#experience",
    count: experiences.length,
  },
  {
    key: "nav.contact",
    href: "#contact",
    count: null,
  },
];
