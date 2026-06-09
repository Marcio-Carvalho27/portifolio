export type Testimonial = {
  id: string;
  name: string;
  countryKey: string;
  username: string;
  avatar: string;
  textKey: string;
  height: "compact" | "regular" | "tall";
};

export const testimonialColumns: Testimonial[][] = [
  [
    {
      id: "ana",
      name: "Ana Ribeiro",
      countryKey: "testimonials.ana.country",
      username: "@anaribeiro",
      avatar: "AR",
      textKey: "testimonials.ana.text",
      height: "regular",
    },
    {
      id: "michael",
      name: "Michael Turner",
      countryKey: "testimonials.michael.country",
      username: "@mturner",
      avatar: "MT",
      textKey: "testimonials.michael.text",
      height: "tall",
    },
    {
      id: "beatriz",
      name: "Beatriz Lima",
      countryKey: "testimonials.beatriz.country",
      username: "@bialima",
      avatar: "BL",
      textKey: "testimonials.beatriz.text",
      height: "compact",
    },
  ],
  [
    {
      id: "lucas",
      name: "Lucas Almeida",
      countryKey: "testimonials.lucas.country",
      username: "@lucasalmeida",
      avatar: "LA",
      textKey: "testimonials.lucas.text",
      height: "tall",
    },
    {
      id: "sofia",
      name: "Sofia Martins",
      countryKey: "testimonials.sofia.country",
      username: "@sofiam",
      avatar: "SM",
      textKey: "testimonials.sofia.text",
      height: "regular",
    },
    {
      id: "daniel",
      name: "Daniel Costa",
      countryKey: "testimonials.daniel.country",
      username: "@danielcosta",
      avatar: "DC",
      textKey: "testimonials.daniel.text",
      height: "compact",
    },
  ],
  [
    {
      id: "emma",
      name: "Emma Wilson",
      countryKey: "testimonials.emma.country",
      username: "@emmawilson",
      avatar: "EW",
      textKey: "testimonials.emma.text",
      height: "regular",
    },
    {
      id: "rafael",
      name: "Rafael Souza",
      countryKey: "testimonials.rafael.country",
      username: "@rafaelsouza",
      avatar: "RS",
      textKey: "testimonials.rafael.text",
      height: "compact",
    },
    {
      id: "claire",
      name: "Claire Dubois",
      countryKey: "testimonials.claire.country",
      username: "@claired",
      avatar: "CD",
      textKey: "testimonials.claire.text",
      height: "tall",
    },
  ],
];
