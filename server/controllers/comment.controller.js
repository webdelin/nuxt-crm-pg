const {Comment} = require('../models/comment.model')
const {Post} = require('../models/post.model')

module.exports.createComment = async (req, res) => {
	console.log("Create Comment");
	try {
		Comment.create({
			title: req.params.title,
			text: req.params.text,
			post_id: req.body.postId
		})
		const post = await Post.findOne({
			where: { id: req.body.id }
		})
		post.comments.push(Comment.id)
		res.status(201).json({ Comment })
	} catch (e) {
		res.status(500).json(e)
	}
}