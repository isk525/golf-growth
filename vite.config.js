import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['icon.svg'],
    manifest: {
      name: 'Golf Growth', short_name: 'Golf Growth',
      description: '3人で共有できるゴルフ成長スコアブック',
      theme_color: '#059669', background_color: '#f3f6f2', display: 'standalone',
      icons: [{src:'pwa-192.png',sizes:'192x192',type:'image/png'},{src:'pwa-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]
    }
  })]
})
