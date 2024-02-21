import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/vue', // Set the base path to '/vue/'

  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    middleware: [
      (req, res, next) => {
        console.log(`Request for: ${req.url}`);
        next();
      },
    ],
  },
})
