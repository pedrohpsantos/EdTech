import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin que mocka CSS imports durante testes Vitest (process.env.VITEST é definido pelo runner)
// Isso previne SyntaxError quando o JSDOM tenta parsear arquivos .css como JavaScript
const vitestCssMock = {
  name: 'vitest-css-mock',
  enforce: 'pre',
  resolveId(id) {
    if (process.env.VITEST && /\.(css|less|scss|sass)(\?.*)?$/.test(id)) {
      return '\0vitest-css-mock:' + id
    }
  },
  load(id) {
    if (id.startsWith('\0vitest-css-mock:')) {
      // Retorna um módulo JS válido que age como CSS Module object
      return 'export default new Proxy({}, { get: (_, key) => typeof key === "string" ? key : undefined })'
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitestCssMock],
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
