import { projects } from "./projects";
import { services } from "./services";
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
