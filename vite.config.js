import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
export default defineConfig({
    plugins: [
        react(),
<<<<<<< HEAD
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
=======
        tsconfigPaths(), // tsconfig의 경로를 Vite에서 자동으로 인식
        viteCompression({
            algorithm: "gzip", // gzip 방식 사용
            threshold: 10240, // 10kB 이상의 파일만 압축
            deleteOriginFile: false, // 원본 파일 유지
        }),
    ],
    server: {
        port: 3000, // 서버 포트 설정
        open: true, // 브라우저 자동 열기
    },
    build: {
        sourcemap: true, // Sourcemap 생성
        outDir: "dist", // 빌드 아웃풋 디렉토리
        minify: "terser", // Terser를 사용해 코드 압축
        terserOptions: {
            compress: {
                drop_console: true,
            },
>>>>>>> 0aaab452c9db7468bce7d4b18c4abaaf9c08f616
        },
        rollupOptions: {
            treeshake: true,
            output: {
                manualChunks: function (id) {
                    if (id.includes("node_modules")) {
<<<<<<< HEAD
                        if (id.includes("firebase"))
                            return "firebase";
                        if (id.includes("@tanstack/react-query"))
                            return "react-query";
                        return "vendor";
=======
                        var module_1 = id.split("node_modules/").pop().split("/")[0];
                        if (id.includes("firebase")) {
                            return "firebase";
                        }
                        return "vendor-".concat(module_1); // 기타 node_modules 모듈을 개별적으로 분리
>>>>>>> 0aaab452c9db7468bce7d4b18c4abaaf9c08f616
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
<<<<<<< HEAD
            "@": "/src",
        },
        dedupe: ["react", "react-dom"],
=======
            "@": "/src", // src 경로를 @로 간단히 사용 가능
        },
>>>>>>> 0aaab452c9db7468bce7d4b18c4abaaf9c08f616
    },
});
