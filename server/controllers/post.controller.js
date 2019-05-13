const fs = require('fs')
const db = require('../keys/db.config')
const jwtDecode = require('jwt-decode')

const Post = db.post

module.exports.createPost = async (req, res) => {
	//bekomme user id
	const token = req.headers.authorization
	const jwtData = jwtDecode(token)

	try {
		const post = await Post.create({
			title: req.body.title,
			text: req.body.text,
			image: `/${req.file.filename}`,
			user_id: jwtData.userId
		})

		res.status(201).json(post)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.updatePost = async (req, res) => {
	return Post.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(post => {
			if (!post) {
				return res.status(404).send({
					message: 'Post Not Found',
				});
			}
			return post
				.update({
					text: req.body.text || post.text
				})
				.then(() => res.status(200).send(post))
				.catch((error) => res.status(500).send(error))
		})
		.catch((error) => res.status(500).send(error))
}

module.exports.getAdminAllPost = async (req, res) => {
	try {
		const posts = await Post.findAll({ order: [['createdAt', 'DESC']] })
		res.status(201).json(posts)
	} catch (e) {
		res.status(500).json(e)
	}
}

module.exports.getAllPost = async (req, res) => {
	try {
		const posts = await Post.findAll({ order: [['createdAt', 'DESC']] })
		res.status(201).json(posts)
	} catch (e) {
		res.status(500).json(e)
	}
}
module.exports.getByIdPost = async (req, res) => {
	try {
		const post = await Post.findOne({
			where: {
				id: req.params.id
			}
		})
		res.status(201).json(post)

	} catch (e) {
		res.status(500).json(e)
	}
}
module.exports.deletePost = async (req, res) => {
	const post = await Post.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(post => {
			if (!post) {
				return res.status(404).send({
					message: 'Post Not Found',
				});
			}

			if (post.image) {
				fs.unlink('./storage' + post.image, (err) => {
					if (err) {
						return res.status(404).send(err).json({
							message: 'cannot delete image'
						})
					}
				})
			}
			return post.destroy()
		})
		.catch((error) => res.status(500).send(error))
}
module.exports.addViewPost = async (req, res) => {
	return Post.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(post => {
			if (!post) {
				return res.status(404).send({
					message: 'Post Not Found',
				});
			}
			return post
				.update({
					views: ++req.body.views
				})
				.then(() => res.status(200).send(post))
				.catch((error) => res.status(500).send(error))
		})
		.catch((error) => res.status(500).send(error))

}