const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

//'spa': No server - side rendering(only client - side navigation)
//'universal': Isomorphic application(server - side rendering + client - side navigation)

module.exports = {
	mode: 'universal',
  /*
  ** Headers of the page
  */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
			}
		]
	},

  /*
  ** Customize the progress-bar color
  */
	loading: { color: 'green' },

  /*
  ** Global CSS
  */
	css: [
		'~/assets/style/app.styl',
		'@/theme/index.sass'
	],

  /*
  ** Plugins to load before mounting the App
  */
	plugins: [
		'@/plugins/globals',
		'@/plugins/axios'
	],

  /*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
	],
  /*
  ** Axios module configuration
  */
	axios: {
		baseURL: 'https://www.examples.de' || 'http://localhost:3000'
		// See https://github.com/nuxt-community/axios-module#options
	},

  /*
  ** Build configuration
  */
	build: {
		transpile: ['vuetify/lib'],
		plugins: [new VuetifyLoaderPlugin()],
		loaders: {
			stylus: {
				import: ['~assets/style/variables.styl']
			}
		},
    /*
    ** You can extend webpack config here
    */
		extend(config, ctx) {
		}
	}
}
