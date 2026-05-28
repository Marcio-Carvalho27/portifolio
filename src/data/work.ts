// src/data/work.ts

export type Project = {
  id: number;
  case: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  href?: string; // optional — omit or leave undefined to disable the link
};

export const projects: Project[] = [
  {
    id: 1,
    case: "Case 01",
    title: "Rito",
    description:
      "Table setting e-commerce built from scratch — from Figma layout to deployment and Mercado Pago payment integration.",
    image: "/projects/rito.png",
    tags: ["React", "Django", "Python", "Figma", "Mercado Pago"],
    // no href — card is not clickable
  },
  {
    id: 2,
    case: "Case 02",
    title: "MobMetrics",
    description:
      "Modular platform for computing and visualizing urban mobility metrics, making it easier to understand how people and vehicles move through a city.",
    image: "/projects/mobmetrics.png",
    tags: ["Python", "Django", "Machine Learning", "Data Pipelines"],
    href: "https://github.com/Marcio-Carvalho27/MobMetrics",
  },
];