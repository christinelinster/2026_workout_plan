import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: mode === 'pages' ? '/2026_workout_plan/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    outDir: mode === 'pages' ? 'dist-pages' : 'dist',
    assetsDir: mode === 'pages' ? 'workout-assets' : 'assets',
  },
}));
