const {Post} = require('../models/post.model')

module.exports.createPost = async (req, res) => {
	console.log("Create Post");
	Post.create({
		title: req.params.title,
		text: req.params.text,
		image_src: `/${req.file.filename}`
	})
	try {
		await post.save()
		res.status(201).json({ post })
	} catch (e) {
		res.status(500).json(e)
	}
}
module.exports.updatePost = async (req, res) => {
	const postName = await Post.findOne(
		{
			where: {
				id: req.params.id
			}
		})
	if (postName) {
		const updated = {
			title: req.body.title,
			text: req.body.text
		}
		if (req.file) {
			updated.image = req.file.path
		}
		try {
			const post = await Post.update({
				$set: updated,
				new: true
			})
			res.status(200).json(category)
		} catch (e) {
			res.status(500).json(e)
		}
	} else {
		res.status(409).json({
			message: 'Post dont no exist'
		})
	}
}
module.exports.getAllPost = async (req, res) => {
	try {
		const posts = await Post.findAll().sort({ date: -1 })
		res.status(201).json(posts)
	} catch (e) {
		res.status(500).json(e)
	}
}
module.exports.getByIdPost = async (req, res) => {
	try {
		await Post.findOne(
			{
				where: {
					id: req.params.id
				}
			}).populate('comments').exec((error, post) => {
				res.json(post)
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