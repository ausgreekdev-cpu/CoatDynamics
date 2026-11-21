import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@painter/ui': path.resolve(import.meta.dirname, '../../packages/ui/src/index.ts'),
      '@painter/core': path.resolve(import.meta.dirname, '../../packages/core/src/index.ts'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Painter Contracting SaaS',
        short_name: 'PainterSaaS',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [{ src: '/vite.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
    }),
  ],
})
