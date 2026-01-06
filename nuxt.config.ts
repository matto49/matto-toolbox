// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/hints'
  ],

  // Architecture additions
  ssr: true,

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },
  experimental: {
    payloadExtraction: false
  },

  compatibilityDate: '2025-01-15',
  nitro: {
    compressPublicAssets: true
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'json-yaml': ['yaml'],
            'date-utils': ['date-fns']
          }
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
