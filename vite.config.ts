import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // tsconfig의 경로를 Vite에서 자동으로 인식
    // visualizer({ open: true }), // 번들 분석 리포트를 자동으로 오픈
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
    },
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const module = id.split("node_modules/").pop().split("/")[0];
            if (id.includes('firebase')) {
              return 'firebase'; 
            }
            return `vendor-${module}`; // 기타 node_modules 모듈을 개별적으로 분리
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", // src 경로를 @로 간단히 사용 가능
    },
  },
});
