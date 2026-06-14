import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "mfe_vue",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount",
      },
      shared: {
        vue: { singleton: true, requiredVersion: "^3.0.0" },
      },
    }),
  ],
  build: {
    // Required for vite-plugin-federation
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3002,
    cors: true,
    origin: "http://localhost:3002",
  },
  preview: {
    port: 3002,
    cors: true,
  },
});
