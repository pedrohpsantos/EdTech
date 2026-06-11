import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Proxy opcional para dev local — descomente para usar o proxy
  // em vez de CORS direto. Com proxy ativo, altere VITE_API_URL
  // para string vazia no .env.
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //     },
  //   },
  // },
})
