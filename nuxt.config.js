export default {
  // Global page headers
  head: {
    title: 'product-inventory-portal',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' }
    ]
  },

  // Global CSS
  css: [
    '~/assets/css/main.css' // Add global styles
  ],

  // Plugins to run before rendering page
  plugins: [
    '~/plugins/axios.js' // Custom plugin for Axios (optional)
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  // Modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  // Axios module configuration
  axios: {
    baseURL: 'http://77.37.45.2:8091/api/v1/' // API base URL
  },

  // Build Configuration
  build: {
    // Add custom Webpack configurations if needed
  }
};
