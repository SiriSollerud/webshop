// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  typescript: {
    strict: true
  },
  app: {
    // For scroll behavior
    keepalive: true,
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
})
