import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
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
