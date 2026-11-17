import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // 5173 belongs to the separate PixelHub project; this app always uses 5174.
    port: 5174,
    strictPort: true,
    // Send /api calls to Express so the browser only talks to one origin.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
