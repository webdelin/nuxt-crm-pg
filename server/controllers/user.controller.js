const fs = require('fs')
const db = require('../keys/db.config')
const bcrypt = require('bcrypt')
const User = db.user

module.exports.createUser = async (req, res) => {
	//console.log('SELECT: ' + req.body.role)
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
				role: req.body.role
			})
			res.status(201).json(user)
		} catch (e) {
			// User not Found
			res.status(404).json(e)
		}
	}
}

module.exports.updateUser = async (req, res) => {
	return User.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			return user
				.update({
					username: req.body.username || user.username,
					email: req.body.email || user.email,
					password: bcrypt.hashSync(req.body.password, salt) || user.password,
					role: req.body.role || user.role
				})
				.then(() => res.status(200).send(user))
				.catch((error) => res.status(500).send(error))
		})
		.catch((error) => res.status(500).send(error))
}

module.exports.getAdminAllUser = async (req, res) => {
	try {
		const users = await User.findAll({ order: [['createdAt', 'DESC']] })
		res.status(201).json(users)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAllUser = async (req, res) => {
	try {
		const users = await User.findAll({ order: [['createdAt', 'DESC']] })
		res.status(201).json(users)
	} catch (e) {
		res.status(500).json(e)
	}
}
module.exports.getByIdUser = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.params.id
			}
		})
		res.status(201).json(user)

	} catch (e) {
		res.status(500).json(e)
	}
}
module.exports.deleteUser = async (req, res) => {
	return User.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			if (user.image) {
				fs.unlink('./storage/users' + user.image, (err) => {
					if (err) {
						return res.status(404).send(err).json({
							message: 'cannot delete image'
						})
					}
				})

			}
			return user.destroy()
		})
		.catch((error) => res.status(500).send(error))
}