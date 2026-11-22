// Informações gerais do site. Edite aqui para atualizar textos e contatos.

// Prefixo de caminho quando o site roda em subpasta (GitHub Pages). Vazio na Vercel.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const site = {
  brand: "STHEPHANY.DEV",
  name: "Sthephany Talasca",
  role: "AI Engineer · AI Automation · Full Stack Developer",
  headline: "Transformando inteligência artificial em soluções reais.",
  subheadline:
    "Desenvolvo agentes inteligentes, automações, aplicações web e soluções com IA generativa que conectam sistemas, simplificam processos e geram impacto operacional.",
  location: "Barra Velha, Santa Catarina, Brasil",
  tagline: "Building intelligent solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sthephany.dev",
  locale: "pt-BR",
  // Coloque seu PDF em /public/curriculo.pdf
  resumeUrl: `${basePath}/curriculo.pdf`,
  // Preencha NEXT_PUBLIC_FORM_ENDPOINT para ativar o formulário (ex.: Formspree)
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  contacts: {
    email: "sthephanyestudos@gmail.com",
    linkedin: "https://linkedin.com/in/sthephany-vargas-037515232",
    whatsapp: "https://wa.me/5547991678074",
    github: "https://github.com/Sthephanytalasca",
  },
} as const;

export const nav = [
  { label: "Início", href: "/#inicio" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Especialidades", href: "/#especialidades" },
  { label: "Sobre mim", href: "/#sobre" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Contato", href: "/#contato" },
] as const;
