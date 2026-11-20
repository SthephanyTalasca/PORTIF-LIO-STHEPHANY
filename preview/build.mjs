const { build } = await import("esbuild").catch(() => import("/opt/npm-tools/node_modules/esbuild/lib/main.js"));
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const r = await build({
  entryPoints: [path.join(root, "preview/main.tsx")],
  bundle: true, minify: true, write: false, format: "iife", jsx: "automatic", target: "es2020",
  nodePaths: [path.join(root, "node_modules"), "/opt/npm-tools/node_modules"],
  alias: { "next/link": path.join(root, "preview/shims/link.tsx"), "@": path.join(root, "src") },
  define: { "process.env.NEXT_PUBLIC_SITE_URL": '""', "process.env.NEXT_PUBLIC_FORM_ENDPOINT": '""', "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
});
const js = r.outputFiles[0].text.replace(/<\/script/g, "<\\/script");
const css = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");
const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>STHEPHANY.DEV — prévia</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>${css}</style></head><body><div id="root"></div><script>${js}</script></body></html>`;
fs.mkdirSync(path.join(root, "preview/dist"), { recursive: true });
fs.writeFileSync(path.join(root, "preview/dist/index.html"), html);
console.log("ok", (html.length / 1024).toFixed(0) + "KB");
