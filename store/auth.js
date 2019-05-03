import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
	token: false
})

export const mutations = {
	setToken(state, token) {
		state.token = token
	},
	clearToken(state) {
		state.token = null
	}
}

export const actions = {
	async login({ commit, dispatch }, formData) {
		try {
			//$axios.$post sendet an store auth
			const { token } = await this.$axios.$post('/api/auth/admin/login', formData)
			dispatch('setToken', token)
			commit('setMessage', 'Login Success', { root: true })
		} catch (e) {
			commit('setError', 'Check Login ' + e, { root: true })
			throw e
		}
	},
	async create({ commit }, formData) {
		try {
			await this.$axios.$post('/api/auth/admin/create', formData)
			commit('setMessage', 'User Created', { root: true })
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	setToken({ commit }, token) {
		this.$axios.setToken(token, 'Bearer')
		commit('setToken', token)
		Cookies.set('jwt-token', token)
	},
	logout({ commit }) {
		this.$axios.setToken(false)
		commit('clearToken')
		Cookies.remove('jwt-token')
	},
	autoLogin({ dispatch }) {
		const cookieStr = process.browser
			? document.cookie
			: this.app.context.req.headers.cookie

		const cookies = Cookie.parse(cookieStr || '') || {}
		const token = cookies['jwt-token']
		if (isJwtValid(token)) {
			dispatch('setToken', token)
		} else {
			dispatch('logout')
		}
	}
}

export const getters = {
	isAuthenticated: state => Boolean(state.token),
	token: state => state.token
}

function isJwtValid(token) {
	if (!token) {
		return false
	}

	const jwtData = jwtDecode(token) || {}
	const expires = jwtData.exp || 0

	return (new Date().getTime() / 1000) < expires
}