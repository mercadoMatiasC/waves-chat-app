import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '192.168.100.228',
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
})
