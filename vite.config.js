import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base URL для развёртывания
  base: process.env.GITHUB_PAGES ? '/CryptoApp/' : '/',

  // Оптимизация сборки
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: 'lightningcss',
  },

  // Оптимизация сервера разработки
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },

  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd'],
  },
});
