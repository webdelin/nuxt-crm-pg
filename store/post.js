const posts = [
	{ title: 'Post 0', date: new Date(), views: 21, comments: [1, 2], id: 'id1' },
	{ title: 'Post 1', date: new Date(), views: 52, comments: [1, 2, 3, 4, 5], id: 'id2' },
	{ title: 'Post 2', date: new Date(), views: 112, comments: [1, 2, 3, 4, 5, 6, 7, 8, 9], id: 'id3' },
	{ title: 'Post 3', date: new Date(), views: 222, comments: [1, 2], id: 'id4' },
	{ title: 'Post 4', date: new Date(), views: 266, comments: [1, 2, 3, 4, 5], id: 'id5' },
	{ title: 'Post 5', date: new Date(), views: 302, comments: [1, 2, 3, 4, 5, 6, 7, 8, 9], id: 'id6' }
]
export const actions = {
	async fetchAdmin({ }) {
		return await new Promise(resolve => {
			setTimeout(() => {
				resolve(posts)
			}, 1000)
		})
	},
	async deleteItem({ }, id) {
		console.log('Post deleted')
	},
	async updatePost({ }, { id, title, text }) {
		return await new Promise(resolve => {
			setTimeout(() => {
				resolve(posts.find(p => p.id === id))
				console.log('Post Updated')
			}, 1000)
		})
	},

	async createPost({ commit }, { title, text, image }) {
		try {
			const fd = new FormData()

			fd.append('title', title)
			fd.append('text', text)
			fd.append('image', image, image.name)

			return await this.$axios.$post('/api/post/admin', fd)
		} catch (e) {
			commit('setError', e, { root: true })
			throw e
		}
	},
	async fetchAdminById({ }, id) {
		return await new Promise(resolve => {
			setTimeout(() => {
				resolve(posts.find(p => p.id === id))
			}, 1000)
		})
	}
}