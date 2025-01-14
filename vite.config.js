import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        viteCompression({
            algorithm: "brotliCompress",
            threshold: 5120,
            deleteOriginFile: false,
        }),
        visualizer({
            filename: './dist/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        sourcemap: true,
        outDir: "dist",
        minify: "terser",
        commonjsOptions: {
            include: [/firebase/, /node_modules/],
        },
        rollupOptions: {
            treeshake: true,
            output: {
                manualChunks: function (id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("firebase"))
                            return "firebase";
                        if (id.includes("@tanstack/react-query"))
                            return "react-query";
                        return "vendor";
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
        dedupe: ["react", "react-dom"],
    },
});
