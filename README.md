# STHEPHANY.DEV — Portfólio

Portfólio de **Sthephany Talasca** — AI Engineering · AI Automation · Full Stack.
Next.js (App Router) + React + TypeScript, com design system próprio em CSS.

## Estrutura de pastas

```
sthephany-dev/
├── public/                     # arquivos estáticos (currículo, fotos, capturas)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # fontes, metadata/SEO, header, footer, assistente
│   │   ├── page.tsx            # homepage
│   │   ├── globals.css         # design system completo (cores, componentes, responsivo)
│   │   ├── projetos/[slug]/    # página individual de cada case (gerada estaticamente)
│   │   ├── sitemap.ts          # /sitemap.xml
│   │   ├── robots.ts           # /robots.txt
│   │   └── not-found.tsx       # página 404
│   ├── components/
│   │   ├── Header.tsx          # header fixo + menu mobile acessível
│   │   ├── HeroCarousel.tsx    # carrossel de 4 slides (setas, teclado, swipe)
│   │   ├── SlideVisual.tsx     # visualizações conceituais dos slides
│   │   ├── Metrics.tsx         # faixa de resultados com contagem animada
│   │   ├── Projects.tsx        # grid Bento filtrável + card de projeto
│   │   ├── ProjectArt.tsx      # ilustrações conceituais dos projetos
│   │   ├── ProjectDetail.tsx   # layout dos cases + diagrama de arquitetura
│   │   ├── Skills.tsx          # Bento de especialidades
│   │   ├── About.tsx           # Sobre mim + Timeline
│   │   ├── Playground.tsx      # AI Playground (4 demos com dados fictícios)
│   │   ├── Innovation.tsx      # mural do Hackathon / iniciativas
│   │   ├── Contact.tsx         # botões + formulário (ativado por variável de ambiente)
│   │   ├── AskAI.tsx           # "Ask Sthephany AI"
│   │   ├── Footer.tsx, Icon.tsx, Reveal.tsx, HomePage.tsx
│   ├── data/
│   │   ├── site.ts             # nome, contatos, links, URL do currículo
│   │   ├── content.ts          # slides, indicadores, especialidades, timeline, sobre
│   │   └── projects.ts         # TODOS os projetos (fonte única dos cards e cases)
│   └── lib/
│       ├── knowledge.ts        # base e busca do assistente (só conteúdo público)
│       └── events.ts           # carrossel → filtros de projetos
├── .github/workflows/          # deploy automático no GitHub Pages
├── preview/                    # gerador da prévia estática (não vai para produção)
└── .env.example
```

## Rodar localmente

Requisitos: Node.js 18.18+ (recomendado 20 ou 22).

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3000
```

Build de produção: `npm run build && npm start`.

## Deploy na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Em vercel.com → **Add New → Project** → importe o repositório (a Vercel detecta Next.js sozinha).
3. Em **Environment Variables**, adicione `NEXT_PUBLIC_SITE_URL` com o domínio final (ex.: `https://sthephany.dev`).
4. Clique em **Deploy**. Para domínio próprio: **Settings → Domains**.

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` gera uma versão estática do site e publica em
`https://<usuario>.github.io/PORTIF-LIO-STHEPHANY/` a cada push na `main`.

1. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (só uma vez).
2. Faça merge na `main` (ou rode o workflow em **Actions → Deploy no GitHub Pages → Run workflow**).

Sem esse passo, o Pages mostra apenas o README em vez do site.

## Antes de publicar (checklist)

- [x] **Currículo:** coloque o PDF em `public/curriculo.pdf` (todos os botões “Baixar currículo” apontam para ele).
- [x] **Foto:** `public/foto.jpg` (recorte 4:5), exibida em `src/components/About.tsx`.
- [ ] **Textos dos cases:** os campos `context`, `challenges` e `participation` em `src/data/projects.ts` são rascunhos feitos a partir das informações confirmadas. Revise cada um.
- [ ] **Confidencialidade:** confirme com a empresa o que pode ser divulgado antes de trocar ilustrações por capturas reais.
- [ ] **Formulário:** veja a seção abaixo. Sem configuração, ele fica desativado e indica e-mail/WhatsApp — nunca simula envio.

## Adicionar um projeto

Abra `src/data/projects.ts`, copie um objeto do array `projects` e ajuste:

| Campo | Para que serve |
|---|---|
| `id`, `slug` | identificador e URL (`/projetos/<slug>`) |
| `category` / `categories` | categoria exibida / categorias usadas nos filtros (`ia`, `automacao`, `fullstack`, `dados`, `inovacao`) |
| `summary`, `description` | texto do card / texto do case |
| `context`, `objective`, `solution`, `participation`, `challenges` | seções do case |
| `technologies`, `results`, `architecture` | tags, resultados comprovados e diagrama |
| `images` | galeria (veja abaixo) |
| `status`, `privateCode`, `featured`, `highlight`, `size` | selo de status, aviso de código privado, destaque, indicador do card, card largo (`"lg"`) |
| `visual` | qual ilustração conceitual usar |

O card, o filtro, a página do case, o sitemap e o assistente passam a incluir o projeto automaticamente.

## Adicionar imagens reais

1. Salve a captura autorizada em `public/projetos/<slug>/tela-1.png`.
2. No projeto, em `images`, use:
   `{ src: "/projetos/<slug>/tela-1.png", alt: "Descrição da tela", caption: "Captura autorizada.", conceptual: false }`
3. A galeria do case passa a exibir a imagem com lazy loading.

## Ativar o formulário de contato

1. Crie um formulário em um serviço real (ex.: [Formspree](https://formspree.io)).
2. Defina `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/SEU_ID` no `.env.local` e na Vercel.
3. Pronto: o formulário envia de verdade e mostra sucesso ou erro conforme a resposta.

## Ask Sthephany AI

O assistente responde **somente** com o conteúdo de `src/data` — faz uma busca local no navegador, sem API e sem enviar perguntas a servidores. Para evoluir para um LLM no futuro:
crie uma rota `src/app/api/ask/route.ts`, guarde a chave em variável de ambiente **no servidor** (nunca no frontend), envie como contexto apenas o texto de `buildDocs()` e instrua o modelo a recusar o que não estiver nesse contexto.

## Decisões técnicas

- **CSS próprio em vez de Tailwind/Framer Motion:** o design system inteiro está em `globals.css` com variáveis CSS, e as animações usam CSS + IntersectionObserver. Resultado: zero dependências além de Next/React, bundle menor e `prefers-reduced-motion` respeitado em tudo. Se quiser Tailwind, ele convive com este CSS sem conflito.
- **Acessibilidade:** link “pular para o conteúdo”, carrossel com `aria-roledescription`, slides inativos com `inert`, navegação por teclado (setas), foco visível, menu mobile com `Esc`, filtros com `aria-pressed`.
- **SEO:** metadata por página, Open Graph, sitemap, robots, HTML semântico e páginas de case geradas estaticamente.
- **Internacionalização futura:** todos os textos estão em `src/data`; para outro idioma, duplique os arquivos por locale e adicione um segmento `[locale]` nas rotas.

## Prévia estática

`node preview/build.mjs` gera um HTML único com o site (roteamento por `#`) — útil para visualizar sem rodar o Next. Requer `esbuild`, `react` e `react-dom` instalados.
