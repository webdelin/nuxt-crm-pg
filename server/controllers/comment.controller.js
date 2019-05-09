const db = require('../keys/db.config')

const Comment = db.comment

module.exports.createComment = async (req, res) => {

	try {
		const comment = await Comment.create({
			title: req.body.title,
			text: req.body.text,
			post_id: req.body.post_id
		})

		res.status(201).json(comment)
	} catch (e) {
		res.status(500).json(e)
	}
}
