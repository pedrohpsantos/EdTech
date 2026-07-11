// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query']
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // css: true processa CSS Modules nativamente no Vitest (retorna objeto com class names)
    // Antes falhava por import.meta.env undefined — agora resolvido com optional chaining em api.ts
    css: true,
    setupFiles: './src/setupTests.jsx',
    slowTestThreshold: 1000,
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'e2e/**', '.stryker-tmp/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 60,
        functions: 55,
        branches: 60,
        statements: 60
      }
    }
  },
})
