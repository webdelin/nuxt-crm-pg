const Comment = require('../models/comment.model')
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
	console.log("Create Comment");
	Comment.create({
		title: req.params.title,
		text: req.params.text,
		post_id: req.body.postId
	})
	try {
		await Comment.save()
		const post = await Post.findOne({
			where: { id: req.body.postId }
		}).push(comment.id)
		await post.save()
		res.status(201).json({ Comment })
	} catch (e) {
		res.status(500).json(e)
	}
}