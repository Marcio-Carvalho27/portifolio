export type Project = {
  id: number;
  typeKey: "project.type.real" | "project.type.study" | "project.type.hackathon";
  title: string;
  descriptionKey: string;
  image?: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    typeKey: "project.type.real",
    title: "Rito",
    descriptionKey: "project.rito.description",
    image: "/projects/rito.png",
    tags: ["React", "Django", "Python", "Figma", "Mercado Pago"],
  },
  {
    id: 2,
    typeKey: "project.type.real",
    title: "MobMetrics",
    descriptionKey: "project.mobmetrics.description",
    image: "/projects/mobmetrics.png",
    tags: ["Python", "Django", "Machine Learning", "Data Pipelines"],
    href: "https://github.com/Marcio-Carvalho27/MobMetrics",
  },
  {
    id: 3,
    typeKey: "project.type.hackathon",
    title: "SemeAI",
    descriptionKey: "project.semeai.description",
    tags: ["AI", "Machine Learning", "Python"],
    href: "https://github.com/LucasMota10/SemeAI-Hackathon",
  },
  {
    id: 4,
    typeKey: "project.type.real",
    title: "Portfolio",
    descriptionKey: "project.portfolio.description",
    image: "/projects/portifolio.png",
    tags: ["Next.js"],
    href: "https://marcio-carvalho27.com.br/",
  },
];
