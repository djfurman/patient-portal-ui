import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/demo': {
        target: 'http://localhost:3500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/demo/, '/demo')
      },
      '/ws': {
        target: 'ws://localhost:3500',
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, '/ws')
      }
    }
  }
})
