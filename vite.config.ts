import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  base: '/portafolio/',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    tailwindcss(),
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
