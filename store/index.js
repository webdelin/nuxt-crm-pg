export const state = () => ({
	error: null,
	message: null
})

export const actions = {
	nuxtServerInit({ dispatch }) {
		dispatch('auth/autoLogin')
	}
}

export const mutations = {
	setError(state, error) {
		state.error = error
	},
	clearError(state) {
		state.error = null
	},
	setMessage(state, message) {
		state.message = message
	},
	clearMessage(state) {
		state.message = null
	}
}

export const getters = {
	error: state => state.error,
	message: state => state.message
}