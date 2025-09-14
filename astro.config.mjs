// @ts-check
import { defineConfig } from 'astro/config';
import VitePWA from "@vite-pwa/astro";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  scopedStyleStrategy: 'class',
  adapter: vercel({}),
  output: 'server',
  base: '/',
  integrations: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        '/assets/favicon.png',
        '/assets/cubes-192.png',
        '/assets/cubes-512.png'
      ],
      manifest: {
        name: "Jamb",
        short_name: "Jamb",
        description: "Progressive Web App",
        theme_color: "#afe4e9",
        background_color: "#f8faff",
        display: "standalone",
        start_url: "/",
        orientation: 'portrait',
        icons: [
          {
            src: "/assets/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
