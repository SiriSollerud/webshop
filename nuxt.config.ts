// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/image'],
  typescript: {
    strict: true
  },
  app: {
    keepalive: true,
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Montserrat:wght@500;600;700&display=swap'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  colorMode: {
    preference: 'light'
  },
  image: {
    format: ['webp'],
    quality: 80
  }
})
