// Conteúdo da homepage: slides, indicadores, especialidades e timeline.
import type { IconName } from "@/components/Icon";

export type Slide = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  tags: string[];
  highlights?: string[];
  cta: { label: string; href: string; filter?: string };
  visual: "agent" | "workflow" | "saas" | "network";
};

export const slides: Slide[] = [
  {
    id: "ai-engineering",
    kicker: "AI Engineering",
    title: "Transformo inteligência artificial em soluções reais.",
    description:
      "Desenvolvimento de agentes, aplicações com LLMs, integrações e sistemas inteligentes.",
    tags: ["Gemini", "Claude", "LangChain", "MCP", "Python"],
    cta: { label: "Explorar projetos de IA", href: "/#projetos", filter: "ia" },
    visual: "agent",
  },
  {
    id: "automation",
    kicker: "Intelligent Automation",
    title: "Processos complexos. Automações inteligentes.",
    description:
      "Automações que conectam ferramentas, reduzem trabalho manual e melhoram operações.",
    tags: ["n8n", "APIs", "HubSpot", "Slack", "Google Apps Script"],
    cta: { label: "Ver automações", href: "/#projetos", filter: "automacao" },
    visual: "workflow",
  },
  {
    id: "full-stack",
    kicker: "Full Stack Development",
    title: "Da ideia ao software funcionando.",
    description:
      "Desenvolvimento de aplicações web, dashboards, interfaces, autenticação e bancos de dados.",
    tags: ["React", "Next.js", "JavaScript", "SQL", "Supabase", "Firebase"],
    cta: { label: "Ver aplicações", href: "/#projetos", filter: "fullstack" },
    visual: "saas",
  },
  {
    id: "innovation",
    kicker: "AI Innovation",
    title: "Tecnologia que multiplica pessoas.",
    description:
      "Liderança de iniciativas de IA, hackathons, mentorias e acompanhamento de projetos.",
    tags: ["Hackathon", "Mentorias", "Adoção de IA"],
    highlights: ["Quase 90 participantes", "40 projetos", "~25 iniciativas em desenvolvimento"],
    cta: { label: "Conhecer minha trajetória", href: "/#experiencia" },
    visual: "network",
  },
];

export type Metric = {
  value: string;
  countTo?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

// Somente indicadores reais. Não adicionar números sem comprovação.
export const metrics: Metric[] = [
  { value: "1.000+", countTo: 1000, suffix: "+", label: "reuniões analisadas por mês por sistema de IA" },
  { value: "30%", countTo: 30, suffix: "%", label: "de redução no custo de processamento de IA" },
  { value: "40", countTo: 40, label: "projetos criados no Hackathon" },
  { value: "~25", countTo: 25, prefix: "~", label: "iniciativas acompanhadas em desenvolvimento" },
  { value: "5–10", label: "projetos do Hackathon em uso ativo" },
  { value: "10+", countTo: 10, suffix: "+", label: "mentorias de IA realizadas" },
];

export type Skill = {
  title: string;
  icon: IconName;
  description: string;
  items: string[];
  size?: "lg" | "md";
};

export const skills: Skill[] = [
  {
    title: "Engenharia de IA",
    icon: "sparkles",
    description: "Sistemas com LLMs, agentes e avaliação de modelos aplicados a problemas reais.",
    items: ["LLMs", "Agentes", "Gemini", "Claude", "LangChain", "MCP", "RAG", "Prompt engineering", "Avaliação de modelos"],
    size: "lg",
  },
  {
    title: "Automação inteligente",
    icon: "workflow",
    description: "Fluxos que conectam ferramentas e removem trabalho manual repetitivo.",
    items: ["n8n", "Google Apps Script", "APIs REST", "Webhooks", "Slack", "HubSpot"],
  },
  {
    title: "Desenvolvimento Full Stack",
    icon: "code",
    description: "Aplicações web completas, da interface à integração com serviços.",
    items: ["Python", "JavaScript", "React", "Next.js", "Node.js", "HTML", "CSS"],
  },
  {
    title: "Bancos de dados",
    icon: "database",
    description: "Modelagem e uso de bancos relacionais e serviços gerenciados.",
    items: ["SQL", "PostgreSQL", "Supabase", "Firebase", "Firestore"],
  },
  {
    title: "Dados e Analytics",
    icon: "chart",
    description: "Dashboards e indicadores que apoiam decisões operacionais.",
    items: ["Power BI", "Metabase", "Looker Studio", "Tableau", "Dashboards", "Indicadores"],
  },
  {
    title: "AI Operations e Inovação",
    icon: "users",
    description: "Adoção de IA nas equipes, com processo, documentação e acompanhamento.",
    items: ["Governança de processos", "Mentorias", "Documentação", "Acompanhamento de projetos", "Adoção de IA", "Otimização de custos"],
    size: "lg",
  },
];

export type TimelineItem = { period: string; title: string; description: string; current?: boolean };

export const timeline: TimelineItem[] = [
  {
    period: "2022",
    title: "Início na Nibo",
    description: "Experiência em Pré-Vendas, processos comerciais, CRM e operações de negócio.",
  },
  {
    period: "2024",
    title: "Graduação em Marketing",
    description: "Conclusão da graduação pela Universidade Cruzeiro do Sul.",
  },
  {
    period: "2024 em diante",
    title: "Customer Success e soluções de IA",
    description: "Atuação em operações, desenvolvimento de ferramentas internas, integrações e automação.",
  },
  {
    period: "2025–2026",
    title: "Expansão em IA e desenvolvimento",
    description:
      "Desenvolvimento de sistemas com LLMs, agentes inteligentes, aplicações Full Stack e iniciativas internas de inovação.",
  },
  {
    period: "Atualmente",
    title: "Pós-graduação em Desenvolvimento Full Stack",
    description: "Formação em andamento na Descomplica.",
    current: true,
  },
];

export const about = {
  title: "Prazer, sou Sthephany.",
  paragraphs: [
    "Sou uma profissional apaixonada por transformar ideias em soluções tecnológicas. Minha trajetória combina conhecimento de negócios, desenvolvimento de software, inteligência artificial e automação de processos.",
    "Sou formada em Marketing pela Universidade Cruzeiro do Sul, com graduação concluída em 2024, e atualmente curso pós-graduação em Desenvolvimento Full Stack na Descomplica.",
    "Na Nibo, desenvolvo soluções com inteligência artificial, aplicações web, integrações e automações utilizadas em processos corporativos. Também acompanho iniciativas de inovação em IA, organizo mentorias e apoio colaboradores na construção de seus próprios projetos.",
    "Gosto de atuar em todas as etapas de uma solução: entender o problema, desenhar a arquitetura, escolher as tecnologias, desenvolver, testar, implementar e evoluir o produto.",
  ],
};

export const innovation = {
  title: "Hackathon de IA e acompanhamento de projetos",
  intro:
    "Uma iniciativa interna para colocar a IA nas mãos de quem conhece os problemas do dia a dia — e continuar ao lado das equipes depois do evento.",
  hackathon: [
    { value: "~90", label: "participantes" },
    { value: "40", label: "projetos apresentados" },
    { value: "~25", label: "projetos ainda em desenvolvimento" },
    { value: "5–10", label: "projetos em uso ativo" },
  ],
  roles: [
    { title: "Organização do Hackathon", text: "Estrutura do evento, formação dos times e apoio à apresentação dos projetos." },
    { title: "Mentorias individuais e coletivas", text: "Sessões para destravar ideias, escolher ferramentas e chegar a um protótipo." },
    { title: "Orientação técnica", text: "Suporte sobre ferramentas de IA e desenvolvimento de soluções." },
    { title: "Acompanhamento pós-evento", text: "Apoio contínuo às iniciativas que seguiram em desenvolvimento." },
  ],
  note:
    "Os números acima se referem aos projetos do Hackathon. Iniciativas que começaram depois do evento são acompanhadas separadamente.",
};
