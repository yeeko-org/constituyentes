import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// import fs from 'fs'
// import path from 'path'
export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },

  // devtools: { enabled: true }
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/google-fonts',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.NUXT_SECRET_STORYBLOK_TOKEN,
        bridge: true,
        devtools: true,
        // enableSudoMode: true,
        apiOptions: {
          region: '' // Set 'US" if your space is created in US region (EU default)
        }
      }
    ]
  ],

  // set .pem and .key files to be served by vite and build https
  devServer: {
    https: {
      key: 'localhost-key.pem',
      cert: 'localhost.pem',
    },
    port: 3004
  },

  googleFonts: {
    families: {
      Montserrat: [400, 700, 900]
    }
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  app: {
    head: {
      titleTemplate: 'Observatorio Electoral Judicial (OEJ)',
      title: 'OEJ (Observatorio Electoral Judicial)',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {
          hid: 'description',
          name: 'description',
          content: 'Documentamos, analizamos y difundimos las decisiones, ' +
            'los problemas y toda la información relevante del proceso electoral ' +
            'del Poder Judicial 2024-2025'
        }
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
    }
  },

  compatibilityDate: '2025-02-03',
})