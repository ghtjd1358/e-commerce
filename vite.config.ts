import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // React 플러그인 추가
  resolve: {
    alias: {
      '@': '/src', // '@'을 '/src'로 설정
    },
  },
  build: {
    target: 'esnext', // 최신 브라우저 타겟
    minify: true, // 기본적으로 minify
    cssCodeSplit: true, // CSS 코드 스플리팅 기본값
  },
  server: {
    // 기본적으로 Vite는 개발 서버를 localhost:3000에서 실행
  },
});
