export const actions = {

	async fetchUser({ commit }) {
		try {
			return await this.$axios.$get('/api/post')
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}

	},

	async fetchAdmin({ commit }) {
		try {
			return await this.$axios.$get('/api/post/admin')
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}

	},
	async deleteItem({ commit }, id) {
		try {
			await commit('setMessage', 'Post deleted', { root: true })
			return await this.$axios.$delete(`/api/post/admin/${id}`)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async updatePost({ commit }, { id, text, image }) {
		try {
			await this.$axios.$put(`/api/post/admin/${id}`, { text })
			return commit('setMessage', 'Post Updated', { root: true })
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},

	async createPost({ commit }, { title, text, image }) {
		try {
			const fd = new FormData()
			fd.append('title', title)
			fd.append('text', text)
			fd.append('image', image, image.name)
			await this.$axios.$post('/api/post/admin', fd)
			return commit('setMessage', 'Post Created', { root: true })
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async fetchAdminById({ commit }, id) {
		try {
			return await this.$axios.$get(`/api/post/admin/${id}`)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async fetchById({ commit }, id) {
		try {
			return await this.$axios.$get(`/api/post/${id}`)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},

	async addView({ commit }, { views, id }) {
		try {
			return await this.$axios.$put(`/api/post/add/view/${id}`, { views })

		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	}
}