const passport = require('passport')
const { Router } = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/post.controller')
const router = Router()

// Admin
// /api/post/admin
router.post(
	'/admin/',
	upload.single('image'),
	ctr.createPost
)
router.get(
	'/admin/',
	ctr.getAdminAllPost

)
router.put(
	'/admin/:id',
	ctr.updatePost
)
router.get(
	'/admin/:id',
	ctr.getByIdPost

)
router.delete(
	'/admin/:id',
	ctr.deletePost

)

// Base
// /api/post
router.get('/', ctr.getAllPost)
router.get('/:id', ctr.getByIdPost)
router.put('/add/view/:id', ctr.addViewPost)


module.exports = router