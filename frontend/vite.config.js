import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin inline para mockar arquivos CSS em testes (Vitest)
const cssModuleMockPlugin = {
  name: 'css-module-mock',
  enforce: 'pre',
  resolveId(id) {
    if (/\.(css|less|scss|sass)$/.test(id)) {
      return '\0virtual:css-mock'
    }
  },
  load(id) {
    if (id === '\0virtual:css-mock') {
      return 'export default new Proxy({}, { get: (_, key) => key })'
    }
  }
}

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
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    setupFiles: './src/setupTests.js',
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'e2e/**'],
    plugins: [cssModuleMockPlugin],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  },
})
