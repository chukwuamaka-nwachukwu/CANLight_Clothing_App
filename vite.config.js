import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      /* =====================================================
         STATIC FILES TO INCLUDE
      ===================================================== */

      includeAssets: [
        "favicon.ico",
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/icon-512-maskable.png",
      ],

      /* =====================================================
         PWA MANIFEST
      ===================================================== */

      manifest: {
        id: "/",

        name: "CANLight Clothing",

        short_name: "CANLight",

        description:
          "CANLight Clothing — fashion that makes uniqueness special.",

        start_url: "/",

        scope: "/",

        display: "standalone",

        orientation: "portrait-primary",

        background_color: "#ffffff",

        theme_color: "#111827",

        lang: "en",

        categories: [
          "shopping",
          "fashion",
        ],

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },

          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },

          {
            src: "/icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      /* =====================================================
         WORKBOX
      ===================================================== */

      workbox: {
        navigateFallback: "/index.html",

        cleanupOutdatedCaches: true,

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}"
        ],
      },

      /* =====================================================
         DEVELOPMENT
      ===================================================== */

      devOptions: {
        enabled: true,

        type: "module",
      },
    }),
  ],
});