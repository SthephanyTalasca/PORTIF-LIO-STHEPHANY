/** @type {import('next').NextConfig} */

// Build para GitHub Pages: o workflow define GITHUB_PAGES=true e NEXT_PUBLIC_BASE_PATH
// (ex.: "/PORTIF-LIO-STHEPHANY"). Na Vercel ou localmente, nada disso é usado.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: isPages ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  ...(isPages && { output: "export", trailingSlash: true, basePath }),
};

export default nextConfig;
