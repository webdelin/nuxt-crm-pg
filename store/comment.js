export const actions = {

	async createComment({ commit }, data) {
		try {
			await this.$axios.$post('/api/comment', data)
			return commit('setMessage', 'Comment Created', { root: true })
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},

}