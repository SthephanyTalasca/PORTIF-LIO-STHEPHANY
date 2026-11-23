// Perguntas prontas do "Ask Sthephany AI".
// Aparecem como botões no chat e também respondem quando alguém digita algo parecido.
// Para editar: mude o texto em `answer`. Para criar outra pergunta, copie um bloco.
// `keywords` são as palavras que fazem a pergunta digitada cair nesta resposta.

import { site } from "./site";

export type FaqLink = { label: string; href: string; external?: boolean };

export type Faq = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  links?: FaqLink[];
};

const whatsapp: FaqLink = { label: "Chamar no WhatsApp", href: site.contacts.whatsapp, external: true };

export const faq: Faq[] = [
  {
    id: "hoje",
    question: "O que você faz hoje?",
    answer:
      "Hoje trabalho na Nibo construindo soluções com inteligência artificial: agentes, sistemas com LLMs, automações e aplicações web usadas no dia a dia da empresa. Também coordeno iniciativas internas de inovação em IA, faço mentorias e acompanho colaboradores que estão criando os próprios projetos.\n\nAntes disso atuei na área comercial, em Pré-Vendas, e depois em Customer Success. Por isso conheço por dentro o processo que as ferramentas que eu desenvolvo vão atender.",
    keywords: ["hoje", "atualmente", "trabalha", "atua", "cargo", "funcao", "comercial", "vendas"],
    links: [{ label: "Ver trajetória", href: "/#experiencia" }],
  },
  {
    id: "projetos",
    question: "Quais são seus principais projetos?",
    answer:
      "Os que mais gosto de mostrar:\n\n• Auditor Inteligente de Reuniões: avalia mais de 1.000 reuniões por mês com LLMs, usando uma rubrica de 13 pilares, e reduziu em 30% o custo de processamento de IA.\n• Agente Inteligente de Melhorias de Produto: agente no n8n, integrado ao Slack, que responde sobre melhorias do produto, com versão web para clientes.\n• Avaliador Comercial com IA: analisa reuniões comerciais com critérios de SPIN Selling, notas justificadas e dashboards.\n• Plataforma de Onboarding com IA: aprendizagem interna com IA, que gera questões e treina colaboradores.\n• Hackathon de IA: um programa de inovação para a empresa inteira, com 40 projetos criados.",
    keywords: ["principais", "projetos", "projeto", "portfolio", "trabalhos", "cases", "destaque", "criou", "desenvolveu"],
    links: [
      { label: "Auditor de Reuniões", href: "/projetos/auditor-inteligente-de-reunioes" },
      { label: "Hackathon de IA", href: "/projetos/hackathon-e-programa-de-inovacao-em-ia" },
      { label: "Todos os projetos", href: "/#projetos" },
    ],
  },
  {
    id: "diferencial",
    question: "Qual é o seu diferencial?",
    answer:
      "Conheço a operação de ponta a ponta. Já passei por Pré-Vendas, Vendas, Suporte e Customer Success, então entendo como cada área funciona e consigo desenhar fluxos e automações que fazem sentido para todas elas, não só para uma.\n\nAlém da parte técnica, sei mobilizar pessoas: criei um Hackathon de IA para a empresa inteira, com mais de 80 participantes e 40 projetos. Hoje coordeno os projetos de inovação da empresa e das áreas, e sou responsável por incentivar, orientar e destravar cada um até ele virar algo usado de verdade.",
    keywords: ["diferencial", "diferente", "destaca", "porque", "vantagem", "forte", "ponta"],
    links: [{ label: "Conhecer o Hackathon", href: "/#inovacao" }],
  },
  {
    id: "especialidades",
    question: "Quais são suas especialidades?",
    answer:
      "Minha base é inteligência artificial aplicada: LLMs, agentes, RAG, MCP e automações com n8n, APIs e integrações.\n\nAlém da IA, tenho vivência profunda em alguns mercados: o mundo contábil e dos contadores, o mundo da tecnologia e IA, e o mercado de climatização e ar-condicionado.\n\nMas a minha principal habilidade é a adaptação. Com o uso de inteligência artificial avançada e modelos de linguagem (LLMs), consigo entender rápido as regras de qualquer negócio e criar soluções sob medida para ele, seja qual for o segmento.",
    keywords: ["especialidades", "especialidade", "especialista", "areas", "mercados", "nichos", "segmentos", "sabe", "domina", "habilidades", "contabil", "contador", "ar", "condicionado", "climatizacao"],
    links: [{ label: "Ver especialidades", href: "/#especialidades" }],
  },
  {
    id: "freelance",
    question: "Você faz freelance?",
    answer:
      "Faço, sim! Se você tem um processo para automatizar, um agente de IA para criar ou uma aplicação para tirar do papel, é só me chamar no WhatsApp e a gente conversa sobre o projeto.",
    keywords: ["freelance", "freela", "freelancer", "servico", "servicos", "orcamento", "contratar", "projeto", "pj", "consultoria", "disponivel"],
    links: [whatsapp],
  },
  {
    id: "mentoria",
    question: "Você dá mentoria?",
    answer:
      "Dou, sim! Já fiz mais de 10 mentorias de IA, individuais e em grupo, ajudando pessoas a escolher ferramentas, destravar ideias e chegar a um protótipo funcionando. Para marcar a sua, é só me chamar no WhatsApp.",
    keywords: ["mentoria", "mentorias", "mentora", "mentor", "ensina", "aula", "aulas", "curso", "treinamento", "orientacao"],
    links: [whatsapp],
  },
];
