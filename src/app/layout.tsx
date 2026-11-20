import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AskAI } from "@/components/AskAI";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/data/site";
import type { ReactNode } from "react";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — AI Engineering, Automação e Full Stack`, template: `%s · ${site.brand}` },
  description: site.subheadline,
  keywords: ["AI Engineer", "Engenharia de IA", "Automação", "n8n", "LLM", "Full Stack", "Next.js", "Sthephany Talasca"],
  authors: [{ name: site.name, url: site.contacts.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.brand,
    title: `${site.name} — ${site.headline}`,
    description: site.subheadline,
  },
  twitter: { card: "summary_large_image", title: site.brand, description: site.subheadline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#09090F", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <AskAI />
      </body>
    </html>
  );
}
