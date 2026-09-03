import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({base:'./',plugins:[react(),VitePWA({registerType:'autoUpdate',manifest:{name:'Golf Growth',short_name:'Golf Growth',theme_color:'#059669',background_color:'#fafbf9',display:'standalone',icons:[{src:'icon.svg',sizes:'any',type:'image/svg+xml'}]}})]})
