export type Project = {
  id: number;
  type: "Real Project" | "Study" | "Hackathon";
  title: string;
  description: string;
  image?: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    type: "Real Project",
    title: "Rito",
    description:
      "Table setting e-commerce built from scratch — from Figma layout to deployment and Mercado Pago payment integration.",
    image: "/projects/rito.png",
    tags: ["React", "Django", "Python", "Figma", "Mercado Pago"],
  },
  {
    id: 2,
    type: "Real Project",
    title: "MobMetrics",
    description:
      "Modular platform for computing and visualizing urban mobility metrics, making it easier to understand how people and vehicles move through a city.",
    image: "/projects/mobmetrics.png",
    tags: ["Python", "Django", "Machine Learning", "Data Pipelines"],
    href: "https://github.com/Marcio-Carvalho27/MobMetrics",
  },
  {
    id: 3,
    type: "Hackathon",
    title: "SemeAI",
    description:
      "Plant recommendation system based on climate forecasting and soil analysis, developed to support family farmers in the state of Bahia.",
    tags: ["IA", "Machine Learning", "Python"],
    href: "https://github.com/LucasMota10/SemeAI-Hackathon",
  },
  {
    id: 4,
    type: "Real Project",
    title: "Portifólio",
    description: "Personal Portifolio, you are already on it.",
    image: "/projects/portifolio.png",
    tags: ["Next.js"],
    href: "https://marcio-carvalho27.com.br/",
  },
];