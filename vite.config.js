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
                        var module_1 = id.split("node_modules/").pop().split("/")[0];
                        if (id.includes("firebase")) {
                            return "firebase";
                        }
                        return "vendor-".concat(module_1); // 기타 node_modules 모듈을 개별적으로 분리
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
