import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'og-image.png'],

      // Web App Manifest
      manifest: {
        name: 'Anther Consulting Limited',
        short_name: 'Anther',
        description: 'Expert Accounting, Tax & Business Consulting in Nigeria',
        theme_color: '#1414F0',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'en',
        categories: ['business', 'finance', 'productivity'],
        icons: [
          {
            src: '/pwa-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/pwa-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Our Services',
            url: '/services',
            description: 'View all consulting services',
          },
          {
            name: 'Contact Us',
            url: '/contact-us',
            description: 'Get in touch with our team',
          },
          {
            name: 'Blog',
            url: '/blog',
            description: 'Insights & expert commentary',
          },
        ],
        screenshots: [],
      },

      // Service worker — pre-caches the shell + assets, serves stale-while-revalidate
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,webp,jpeg,jpg,png,woff2}'],
        runtimeCaching: [
          // Google Fonts — cache-first, long TTL
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // API — network-first, fall back to cache (blog posts readable offline)
          {
            urlPattern: /^https?:\/\/.*\/api\/blog.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-blog-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 },
              networkTimeoutSeconds: 5,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        // Don't cache admin routes
        navigateFallbackDenylist: [/^\/admin/],
      },

      devOptions: {
        enabled: true,  // show PWA prompt in dev too
      },
    }),
  ],

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
