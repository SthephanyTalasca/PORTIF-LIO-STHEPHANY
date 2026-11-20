// Estrutura de dados dos projetos. Para adicionar um projeto, copie um objeto,
// troque o id/slug e preencha os campos. Os componentes leem tudo daqui.
//
// IMPORTANTE: os textos de "contexto", "desafios" e "participação" são rascunhos
// escritos a partir das informações confirmadas. Revise antes de publicar e não
// adicione métricas ou funcionalidades sem comprovação.

export type Category = "ia" | "automacao" | "fullstack" | "dados" | "inovacao";

export const categories: { id: Category | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "ia", label: "Agentes de IA" },
  { id: "automacao", label: "Automações" },
  { id: "fullstack", label: "Full Stack" },
  { id: "dados", label: "Dados" },
  { id: "inovacao", label: "Inovação" },
];

export type ProjectVisual =
  | "auditor"
  | "agent"
  | "evaluator"
  | "onboarding"
  | "pipeline"
  | "postmeeting"
  | "roleplay"
  | "hackathon";

export type ArchitectureStep = { label: string; detail: string };

export type ProjectImage = {
  src?: string; // caminho em /public quando houver captura autorizada
  alt: string;
  caption: string;
  conceptual: boolean;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: Category; // categoria principal (exibida no card)
  categories: Category[]; // usadas nos filtros
  summary: string;
  description: string[];
  context: string;
  objective: string;
  solution: string[];
  participation: string;
  technologies: string[];
  results: { value?: string; label: string }[];
  challenges: string[];
  architecture: ArchitectureStep[];
  images: ProjectImage[];
  status: string;
  privateCode: boolean;
  featured: boolean;
  visual: ProjectVisual;
  highlight?: string; // indicador curto no card, apenas quando comprovado
  size?: "lg" | "md";
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "auditor-inteligente-de-reunioes",
    title: "Auditor Inteligente de Reuniões",
    category: "ia",
    categories: ["ia", "dados", "fullstack"],
    summary:
      "Avaliação de reuniões com LLMs, rubrica de 13 pilares e calibração humana, integrada aos processos internos.",
    description: [
      "Sistema de avaliação de reuniões com LLMs, baseado em uma rubrica de 13 pilares, com calibração humana e integração com processos internos.",
      "O custo de IA foi reduzido em 30% com roteamento entre modelos e processamento em lote.",
    ],
    context:
      "Avaliar manualmente a qualidade de um grande volume de reuniões exige tempo e torna difícil manter critérios consistentes entre avaliadores.",
    objective:
      "Analisar reuniões em escala com critérios padronizados, mantendo pessoas no processo para calibrar e validar as avaliações.",
    solution: [
      "Rubrica estruturada em 13 pilares aplicada por LLM a cada reunião.",
      "Calibração humana para alinhar as notas do modelo ao julgamento da equipe.",
      "Roteamento entre modelos e processamento em lote para controlar custo.",
      "Painéis de acompanhamento dos resultados.",
    ],
    participation:
      "Desenvolvimento da solução, da definição do fluxo de avaliação à integração com os processos internos e à otimização de custos.",
    technologies: ["Gemini API", "Google Apps Script", "Supabase", "Firebase/Firestore", "React", "Chart.js", "Vercel"],
    results: [
      { value: "1.000+", label: "reuniões analisadas por mês" },
      { value: "30%", label: "de redução no custo de IA com roteamento entre modelos e lote" },
    ],
    challenges: [
      "Manter a consistência das avaliações do modelo ao longo de uma rubrica extensa.",
      "Equilibrar qualidade e custo ao processar um volume mensal alto.",
    ],
    architecture: [
      { label: "Reuniões", detail: "Registros de reuniões a avaliar" },
      { label: "Orquestração", detail: "Apps Script e processamento em lote" },
      { label: "Roteamento de modelos", detail: "Gemini API" },
      { label: "Rubrica 13 pilares", detail: "Notas + calibração humana" },
      { label: "Armazenamento", detail: "Supabase / Firestore" },
      { label: "Dashboards", detail: "React + Chart.js na Vercel" },
    ],
    images: [
      { alt: "Ilustração conceitual de um painel de avaliação de reuniões", caption: "Ilustração conceitual — não é captura do sistema real.", conceptual: true },
    ],
    status: "Em operação",
    privateCode: true,
    featured: true,
    visual: "auditor",
    highlight: "1.000+ reuniões/mês",
    size: "lg",
  },
  {
    id: 2,
    slug: "agente-inteligente-de-melhorias",
    title: "Agente Inteligente de Melhorias de Produto",
    category: "ia",
    categories: ["ia", "automacao"],
    summary:
      "Agente conversacional no n8n, integrado ao Slack, que responde sobre melhorias do produto — com versão web para clientes.",
    description: [
      "Agente conversacional desenvolvido no n8n, integrado ao Slack e a fontes de informação sobre melhorias do produto.",
      "Permite consultas por menções em canais e por mensagens privadas. Consulta informações de aproximadamente cinco canais internos e do site oficial da Nibo.",
      "Inclui uma versão web voltada a clientes, construída com HTML, CSS e Firebase.",
    ],
    context:
      "Informações sobre melhorias do produto ficam distribuídas em diferentes canais, o que dificulta encontrar rapidamente o que mudou.",
    objective:
      "Centralizar o acesso a essas informações em um agente que responde onde as pessoas já trabalham — o Slack — e também na web.",
    solution: [
      "Fluxo de agente no n8n acionado por menções em canais e mensagens privadas.",
      "Consulta a cerca de cinco canais internos e ao site oficial da Nibo.",
      "Versão web para clientes com HTML, CSS e Firebase.",
      "Regras que restringem a divulgação de informações internas, dados confidenciais e conteúdos sobre instabilidades.",
    ],
    participation: "Desenvolvimento do agente, das integrações e da versão web.",
    technologies: ["n8n", "Slack API", "Gemini", "Firebase", "HTML", "CSS"],
    results: [{ label: "Chatbot disponível no Slack (canais e mensagens privadas) e em versão web para clientes" }],
    challenges: [
      "Definir regras de resposta que impedem a exposição de informações internas e confidenciais.",
      "Atender públicos diferentes — equipe interna e clientes — com o mesmo conhecimento.",
    ],
    architecture: [
      { label: "Slack / Web", detail: "Menções, DMs e chat web" },
      { label: "Workflow n8n", detail: "Orquestração do agente" },
      { label: "Fontes", detail: "~5 canais internos + site oficial" },
      { label: "LLM", detail: "Gemini" },
      { label: "Regras de segurança", detail: "Filtro de conteúdo restrito" },
      { label: "Resposta", detail: "Slack API / Firebase" },
    ],
    images: [
      { alt: "Ilustração conceitual de um agente conversacional no Slack", caption: "Ilustração conceitual — não é captura do sistema real.", conceptual: true },
    ],
    status: "Projeto corporativo",
    privateCode: true,
    featured: true,
    visual: "agent",
    highlight: "Chatbot interno e web",
  },
  {
    id: 3,
    slug: "avaliador-comercial-com-ia",
    title: "Avaliador Comercial com IA",
    category: "fullstack",
    categories: ["fullstack", "ia", "dados"],
    summary:
      "Aplicação que analisa reuniões comerciais com critérios de SPIN Selling, notas justificadas e dashboards.",
    description: [
      "Aplicação para análise de reuniões comerciais com critérios de SPIN Selling, notas justificadas e dashboards.",
      "Inclui autenticação com Google OAuth e restrições de acesso.",
    ],
    context:
      "Dar feedback estruturado sobre reuniões comerciais depende de critérios claros e de tempo para revisar cada conversa.",
    objective:
      "Oferecer análises padronizadas com base em SPIN Selling, com justificativa para cada nota, em uma aplicação com acesso controlado.",
    solution: [
      "Avaliação por IA com critérios de SPIN Selling e notas justificadas.",
      "Dashboards para acompanhar os resultados.",
      "Login com Google OAuth e restrições de acesso.",
    ],
    participation: "Desenvolvimento full stack da aplicação, da autenticação à análise com IA e aos dashboards.",
    technologies: ["Next.js", "Supabase", "Gemini API", "Google OAuth", "Vercel"],
    results: [{ label: "Análise com IA e dashboards com acesso autenticado" }],
    challenges: [
      "Transformar uma metodologia comercial em critérios avaliáveis por um modelo.",
      "Controlar quem pode acessar cada análise.",
    ],
    architecture: [
      { label: "Usuário", detail: "Login Google OAuth" },
      { label: "App Next.js", detail: "Interface e rotas protegidas" },
      { label: "Análise", detail: "Gemini API + critérios SPIN" },
      { label: "Banco", detail: "Supabase" },
      { label: "Dashboards", detail: "Notas justificadas" },
    ],
    images: [
      { alt: "Ilustração conceitual de um dashboard de análise comercial", caption: "Ilustração conceitual — não é captura do sistema real.", conceptual: true },
    ],
    status: "Projeto corporativo",
    privateCode: true,
    featured: true,
    visual: "evaluator",
    highlight: "Análise com IA",
  },
  {
    id: 4,
    slug: "plataforma-de-onboarding-com-ia",
    title: "Plataforma de Onboarding com IA",
    category: "fullstack",
    categories: ["fullstack", "ia"],
    summary:
      "Plataforma interna de aprendizagem com IA para geração de questões e treinamento de colaboradores.",
    description: [
      "Plataforma interna de aprendizagem, com recursos de IA para geração de questões e treinamento de colaboradores.",
    ],
    context:
      "Treinar novos colaboradores exige materiais atualizados e formas de verificar o aprendizado.",
    objective: "Apoiar o onboarding com uma plataforma própria e questões geradas com IA.",
    solution: [
      "Plataforma web de aprendizagem.",
      "Geração de questões com a Anthropic API.",
      "Publicação na Vercel com dados no Firebase.",
    ],
    participation: "Desenvolvimento da plataforma e da integração com IA.",
    technologies: ["JavaScript", "Firebase", "Anthropic API", "Vercel"],
    results: [{ value: "~50", label: "colaboradores treinados" }],
    challenges: ["Gerar questões úteis e coerentes com o conteúdo de treinamento."],
    architecture: [
      { label: "Colaborador", detail: "Acessa a trilha" },
      { label: "Front-end", detail: "JavaScript na Vercel" },
      { label: "Geração de questões", detail: "Anthropic API" },
      { label: "Dados", detail: "Firebase" },
    ],
    images: [
      { alt: "Ilustração conceitual de uma plataforma de aprendizagem", caption: "Ilustração conceitual — não é captura do sistema real.", conceptual: true },
    ],
    status: "Em uso",
    privateCode: true,
    featured: true,
    visual: "onboarding",
    highlight: "~50 colaboradores treinados",
  },
  {
    id: 5,
    slug: "pipeline-inteligente-de-transcricoes",
    title: "Pipeline Inteligente de Transcrições",
    category: "automacao",
    categories: ["automacao", "dados"],
    summary:
      "Automação que organiza transcrições de reuniões, identifica responsáveis e integra registros às ferramentas de operação.",
    description: [
      "Automação para organizar transcrições de reuniões, identificar responsáveis e integrar registros a ferramentas de operação.",
    ],
    context: "Transcrições de reuniões se acumulam sem organização e sem ligação com os registros da operação.",
    objective: "Organizar automaticamente as transcrições e conectá-las às ferramentas usadas pela equipe.",
    solution: [
      "Leitura de eventos do Google Calendar e arquivos do Google Drive.",
      "Identificação dos responsáveis por cada reunião.",
      "Integração dos registros ao HubSpot via API.",
    ],
    participation: "Desenvolvimento da automação e das integrações.",
    technologies: ["Google Apps Script", "Google Drive", "Google Calendar", "HubSpot API", "APIs REST"],
    results: [{ label: "Transcrições organizadas e integradas às ferramentas de operação" }],
    challenges: ["Relacionar corretamente cada transcrição à reunião e aos responsáveis."],
    architecture: [
      { label: "Google Calendar", detail: "Reuniões" },
      { label: "Google Drive", detail: "Transcrições" },
      { label: "Apps Script", detail: "Organização e responsáveis" },
      { label: "HubSpot API", detail: "Registros na operação" },
    ],
    images: [
      { alt: "Ilustração conceitual de um pipeline de documentos", caption: "Ilustração conceitual — não é captura do sistema real.", conceptual: true },
    ],
    status: "Projeto corporativo",
    privateCode: true,
    featured: false,
    visual: "pipeline",
  },
  {
    id: 6,
    slug: "automacoes-de-pos-reuniao",
    title: "Automações de Pós-Reunião",
    category: "automacao",
    categories: ["automacao"],
    summary: "Fluxos que organizam informações após reuniões, criam tarefas e apoiam o acompanhamento operacional.",
    description: [
      "Fluxos para organizar informações após reuniões, criar tarefas e apoiar o acompanhamento operacional.",
    ],
    context: "Depois de cada reunião, informações e próximos passos precisam ser registrados manualmente.",
    objective: "Reduzir o trabalho manual de pós-reunião e garantir o acompanhamento das tarefas.",
    solution: [
      "Workflows no n8n disparados após as reuniões.",
      "Criação de tarefas e organização de informações no Google Workspace e no HubSpot.",
    ],
    participation: "Desenho e desenvolvimento dos fluxos.",
    technologies: ["n8n", "Google Workspace", "HubSpot", "APIs"],
    results: [{ label: "Tarefas e informações de pós-reunião organizadas por automação" }],
    challenges: ["Integrar ferramentas diferentes em um fluxo confiável."],
    architecture: [
      { label: "Reunião", detail: "Gatilho" },
      { label: "n8n", detail: "Workflow" },
      { label: "Google Workspace", detail: "Informações" },
      { label: "HubSpot", detail: "Tarefas e acompanhamento" },
    ],
    images: [
      { alt: "Ilustração conceitual de um fluxo de automação", caption: "Ilustração conceitual — não é captura do sistema real.", conceptual: true },
    ],
    status: "Projeto corporativo",
    privateCode: true,
    featured: false,
    visual: "postmeeting",
  },
  {
    id: 7,
    slug: "simulador-de-roleplay-com-ia",
    title: "Simulador de Roleplay com IA",
    category: "ia",
    categories: ["ia"],
    summary: "Ferramenta de simulação de conversas para apoiar o treinamento de profissionais de Pré-Vendas.",
    description: [
      "Ferramenta de simulação de conversas com IA para apoiar o treinamento de profissionais de Pré-Vendas.",
    ],
    context: "Praticar conversas de Pré-Vendas costuma depender da disponibilidade de outra pessoa para simular o cliente.",
    objective: "Oferecer um ambiente de prática com conversas simuladas por IA.",
    solution: ["Simulação de conversas com IA voltada ao treinamento de Pré-Vendas."],
    participation: "Desenvolvimento da ferramenta.",
    technologies: ["IA generativa"],
    results: [{ label: "Projeto de IA aplicada ao treinamento" }],
    challenges: ["Tornar a simulação útil para a prática de conversas reais."],
    architecture: [
      { label: "Profissional", detail: "Pratica a conversa" },
      { label: "Simulador", detail: "Interface de roleplay" },
      { label: "IA generativa", detail: "Interpreta o cliente" },
    ],
    images: [
      { alt: "Ilustração conceitual de uma conversa simulada", caption: "Ilustração conceitual — não é captura do sistema real.", conceptual: true },
    ],
    status: "Projeto corporativo",
    privateCode: true,
    featured: false,
    visual: "roleplay",
  },
  {
    id: 8,
    slug: "hackathon-e-programa-de-inovacao-em-ia",
    title: "Hackathon e Programa de Inovação em IA",
    category: "inovacao",
    categories: ["inovacao"],
    summary:
      "Iniciativa interna com quase 90 participantes e 40 projetos, com mentorias e acompanhamento depois do evento.",
    description: [
      "Iniciativa interna com quase 90 participantes e 40 projetos desenvolvidos.",
      "Cerca de 25 projetos permanecem em desenvolvimento, e aproximadamente 5 a 10 soluções estão em uso ativo.",
    ],
    context: "Para a IA ser adotada de verdade, as pessoas que conhecem os problemas precisam conseguir construir soluções.",
    objective: "Estimular a criação de projetos com IA e apoiar as equipes até as soluções chegarem ao uso.",
    solution: [
      "Organização do Hackathon.",
      "Acompanhamento das iniciativas após o evento.",
      "Mentorias individuais e coletivas.",
      "Suporte técnico e orientação sobre ferramentas.",
    ],
    participation:
      "Organização, acompanhamento de iniciativas, incentivo à criação de projetos, mentorias e suporte técnico a colaboradores.",
    technologies: ["Ferramentas de IA generativa", "Mentoria técnica"],
    results: [
      { value: "~90", label: "participantes" },
      { value: "40", label: "projetos desenvolvidos" },
      { value: "~25", label: "projetos em desenvolvimento" },
      { value: "5–10", label: "soluções em uso ativo" },
    ],
    challenges: ["Manter o ritmo das iniciativas depois do evento.", "Apoiar pessoas com níveis técnicos diferentes."],
    architecture: [
      { label: "Ideias", detail: "Problemas reais das equipes" },
      { label: "Hackathon", detail: "40 projetos" },
      { label: "Mentorias", detail: "Individuais e coletivas" },
      { label: "Acompanhamento", detail: "~25 em desenvolvimento" },
      { label: "Uso ativo", detail: "5 a 10 soluções" },
    ],
    images: [
      { alt: "Ilustração conceitual de uma rede de projetos", caption: "Ilustração conceitual — não é registro do evento.", conceptual: true },
    ],
    status: "Iniciativa contínua",
    privateCode: false,
    featured: true,
    visual: "hackathon",
    highlight: "40 projetos",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const categoryLabel = (c: Category) => categories.find((x) => x.id === c)?.label ?? c;

export function relatedProjects(project: Project, limit = 3) {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: p.categories.filter((c) => project.categories.includes(c)).length }))
    .sort((a, b) => b.score - a.score || a.p.id - b.p.id)
    .slice(0, limit)
    .map((x) => x.p);
}
