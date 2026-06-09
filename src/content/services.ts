export type Service = {
  id: number;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: 1,
    titleKey: "services.web.title",
    descriptionKey: "services.web.description",
    tags: ["React", "Next.js", "Node.js", "Django"],
  },
  {
    id: 2,
    titleKey: "services.mobile.title",
    descriptionKey: "services.mobile.description",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    id: 3,
    titleKey: "services.design.title",
    descriptionKey: "services.design.description",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    id: 4,
    titleKey: "services.backend.title",
    descriptionKey: "services.backend.description",
    tags: ["Python", "Django", "PostgreSQL", "REST"],
  },
];
