export type Service = {
  id: number;
  title: string;
  description: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Full-stack web applications built from scratch — from UI design to deployment, with focus on performance and clean architecture.",
    tags: ["React", "Next.js", "Node.js", "Django"],
  },
  {
    id: 2,
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps for iOS and Android, with smooth interfaces and native-like experience.",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    id: 3,
    title: "UI/UX Design",
    description:
      "Clear and scalable interfaces designed for real users — wireframes, prototypes, and final assets ready for development.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    id: 4,
    title: "API & Backend",
    description:
      "Robust REST APIs, database modeling, and server-side logic built to scale.",
    tags: ["Python", "Django", "PostgreSQL", "REST"],
  },
];