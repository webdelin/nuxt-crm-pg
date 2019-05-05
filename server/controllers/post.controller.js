const { Post } = require('../models/post.model')

module.exports.createPost = async (req, res) => {
	try {
		Post.create({
			title: req.body.title,
			text: req.body.text,
			image: `/${req.file.filename}`
		})
		res.status(201).json(Post)
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
	try {
		const posts = await Post.destroy(
			{
				where: {
					id: req.params.id
				}
			})
		res.status(201).json({ message: 'Removed' })
	} catch (e) {
		res.status(500).json(e)
	}
}
module.exports.addViewPost = async (req, res) => {
	const postName = await Post.findOne(
		{
			where: {
				id: req.params.id
			}
		})
	if (postName) {
		const updated = {
			views: ++req.body.views
		}
		try {
			const post = await Post.update({
				$set: updated,
				new: true
			})
			res.status(200).json(post)
		} catch (e) {
			res.status(500).json(e)
		}
	} else {
		res.status(409).json({
			message: 'Post dont no exist'
		})
	}
}