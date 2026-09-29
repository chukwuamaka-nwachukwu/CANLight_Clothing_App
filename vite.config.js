import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "canlight.ico",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],

      manifest: {
        id: "/",

        name: "CANLight Clothing",

        short_name: "CANLight",

        description:
          "CANLight Clothing — fashion that makes uniqueness special.",

        theme_color: "#000000",

        background_color: "#ffffff",

        display: "standalone",

        orientation: "portrait-primary",

        start_url: "/",

        scope: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },

          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        navigateFallback: "/index.html",

        cleanupOutdatedCaches: true,
      },

      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});