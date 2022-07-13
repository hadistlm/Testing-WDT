export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Testing-WDT',
    // title: 'Testing-WDT',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/auth.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    ['cookie-universal-nuxt', { parseJSON: true }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://vast-citadel-16840.herokuapp.com'
  },

  auth: {
    localStorage: false,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/dashboard',
    },
    strategies: {
      local: {
        autoLogout: true,
        scheme: 'refresh',
        token: {
          property: 'token', // property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          // global: true,
          maxAge: false, // 1 day
          // required: true,
          // type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: false,
        },
        refreshToken: {
          property: 'token',
          data: 'token',
          maxAge: false,
        },
        endpoints: {
          login: { url: '/api/v1/login', method: 'post' },
          refresh: { url: '/auth/refresh-token', method: 'post' },
          logout: { url: '/api/v1/logout', method: 'post' },
          user: false,
        },
      },
      cookie: {
        options: {
          secure: true,
          // maxAge: 1200000,
          maxAge: false,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Middleware
  router: {
    base: '/Testing-WDT/',
    middleware: ['auth'],
  }
}
