import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import legacy from '@vitejs/plugin-legacy'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  base: '/portafolio/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    sitemap({
      hostname: 'https://oscarduran1.github.io/portafolio',
      // Define aquí las rutas de tu aplicación
      dynamicRoutes: [
        '/portafolio/',
        '/portafolio/about',
        '/portafolio/contact',
      ],
      // Opcional: Genera también el robots.txt
      robots: [{
        userAgent: '*',
        allow: '/',
      }]
    })
  ],
})
