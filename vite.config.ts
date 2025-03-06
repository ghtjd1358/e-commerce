import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: false,
    }),
  ],
  
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});
