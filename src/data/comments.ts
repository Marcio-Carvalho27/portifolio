export interface Comment {
  id: string;
  name: string;
  handle: string;
  country: string;
  avatar: string; // caminho da foto
  text: string;
}

export const comments: Comment[] = [
  {
    id: "1",
    name: "Lucas Daltro Guedes",
    handle: "Production Planning and Control Coordinator",
    country: "Brasil",
    avatar: "/comments/lucas.png",
    text: `Tive a oportunidade de acompanhar de perto o desenvolvimento profissional de Márcio durante seu estágio na Coordenação de Planejamento e Controle da Produção - Gerência de Logística.

Durante o período, ele foi responsável por entregas de alto impacto para a área, com destaque para:

1. Desenvolvimento de um agente agrupador de notícias, que sumariza todas as notícias do Brasil relevantes ao nosso negócio;
2. Criação de uma ferramenta para cálculo de parâmetros de ressuprimento de itens de almoxarifado;
3. Endereçamento de produtos acabados nas estruturas de armazenagem para otimização da movimentação logística.

No aspecto técnico, destacou-se pelo forte domínio em desenvolvimento Python, manipulação de banco de dados e Machine Learning.

Márcio possui um excelente raciocínio lógico para entender e resolver problemas complexos. Ele é ágil, dinâmico e resolutivo.

O seu estágio na Logística tinha um objetivo de aprendizado mútuo: a Engepack usaria seu conhecimento técnico para implementar melhorias envolvendo IA, Machine Learning e Programação. Para Márcio, ele teve a oportunidade de usar casos reais para aplicar seus conhecimentos técnicos em escala industrial. Minha avaliação é que esse objetivo foi atingido de forma totalmente satisfatória, acima do esperado.`,
  },
  {
    id: "2",
    name: "Vazio",
    handle: "Cargo do Vazio",
    country: "Brasil",
    avatar: "/comments/vazio.png",
    text: "Comentário do Vazio aqui.",
  },
];