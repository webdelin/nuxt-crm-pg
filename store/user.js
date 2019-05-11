export const actions = {

	async create({ commit }, formData) {
		try {
			await this.$axios.$post('/api/auth/admin/create', formData)
			commit('setMessage', 'User Created', { root: true })
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

	async createUser({ commit }, data) {
		const candidate = await User.findOne(
			{
				where: {
					email: req.body.email
				}
			})
		if (candidate) {
			res.status(409).json({
				message: 'User exist'
			})
		} else {
			try {
				const salt = bcrypt.genSaltSync(10)
				const user = await User.create({
					username: req.body.username,
					email: req.body.email,
					password: bcrypt.hashSync(req.body.password, salt),
					role: 'user'//req.body.role,
				})
				res.status(201).json(user)
			} catch (e) {
				// User not Found
				res.status(404).json(e)
			}
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