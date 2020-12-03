export default {
    // Target (https://go.nuxtjs.dev/config-target)
    target: 'static',

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Stars and Stripe',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@/assets/styles/main.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/style-resources',
        '@nuxtjs/fontawesome',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/strapi',
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: process.env.STRAPI_URL,
    },

    strapi: {
        entities: ['products', 'types', 'orders'],
    },

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: `/auth/local`,
                        method: 'post',
                        propertyName: 'jwt',
                    },
                    user: {
                        url: `/users/me`,
                        method: 'get',
                        propertyName: false,
                    },
                    logout: false,
                },
            },
        },
    },

    styleResources: {
        scss: [
            '~/assets/styles/abstracts/_variables.scss',
            '~/assets/styles/abstracts/_mixins.scss',
        ],
    },

    fontawesome: {
        icons: {
            solid: [
                'faCartPlus',
                'faShoppingCart',
                'faPlus',
                'faMinus',
                'faTimes',
                'faArrowLeft',
                'faUser',
            ],
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},
};
