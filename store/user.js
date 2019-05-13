export const actions = {

	async createUser({ commit }, formData) {
		try {
			return await this.$axios.$post('/api/user/admin/createUser', formData)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async fetchAdmin({ commit }) {
		try {
			return await this.$axios.$get('/api/user/admin')
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}

	},
	async deleteUser({ commit }, id) {
		try {
			await commit('setMessage', 'User deleted', { root: true })
			return await this.$axios.$delete(`/api/user/admin/${id}`)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async updateUser({ commit }, data) {
		try {
			await this.$axios.$put(`/api/user/admin/${id}`, data)
			return commit('setMessage', 'User Updated', { root: true })
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async fetchAdminById({ commit }, id) {
		try {
			return await this.$axios.$get(`/api/user/admin/${id}`)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async fetchById({ commit }, id) {
		try {
			return await this.$axios.$get(`/api/user/${id}`)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	}
}