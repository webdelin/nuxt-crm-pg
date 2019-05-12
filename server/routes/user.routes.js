const passport = require('passport')
const { Router } = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/user.controller')
const router = Router()

// Admin
// /api/post/admin
router.post(
	'/admin/',
	upload.single('image'),
	ctr.createUser
)
router.get(
	'/admin/',
	ctr.getAdminAllUser

)
router.put(
	'/admin/:id',
	ctr.updateUser
)
router.get(
	'/admin/:id',
	ctr.getByIdUser

)
router.delete(
	'/admin/:id',
	ctr.deleteUser

)

// Base
// /api/post
router.get('/', ctr.getAllUser)
router.get('/:id', ctr.getByIdUser)


module.exports = router