import { defineConfig } from "vite";
import { fileURLToPath } from 'url';
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";
import path from 'path';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminWebp from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteCompression({
      verbose : true,
      disable : false,
      algorithm: "brotliCompress",
      threshold: 10240, // 10KB
      ext: '.br',
    }),
    viteImagemin({
      plugins: {
        png: imageminPngquant({
          quality: [0.6, 0.8],
        }),
      },
      makeWebp: {
        plugins: {
          png: imageminWebp(),
          jpg: imageminWebp(),
          jpeg: imageminWebp(),
        },
      },
    }),
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),
  ],
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    target: 'es2015',
    minify: "terser",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes("firebase")) return "firebase";
            if (id.includes("@tanstack/react-query")) return "react-query";
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom",],
  },
  server: {
    port: 3000,
    open: true,
  },
});
