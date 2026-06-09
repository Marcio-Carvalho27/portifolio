export type ExperienceItem = {
  id: string;
  companyKey: string;
  roleKey: string;
  periodKey: string;
  summaryKey: string;
};

export const experiences: ExperienceItem[] = [
  {
    id: "outlier",
    companyKey: "experience.outlier.company",
    roleKey: "experience.outlier.role",
    periodKey: "experience.outlier.period",
    summaryKey: "experience.outlier.summary",
  },
  {
    id: "ufba",
    companyKey: "experience.ufba.company",
    roleKey: "experience.ufba.role",
    periodKey: "experience.ufba.period",
    summaryKey: "experience.ufba.summary",
  },
  {
    id: "engepack",
    companyKey: "experience.engepack.company",
    roleKey: "experience.engepack.role",
    periodKey: "experience.engepack.period",
    summaryKey: "experience.engepack.summary",
  },
];
