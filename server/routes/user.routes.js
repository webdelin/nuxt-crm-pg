const passport = require('passport')
const { Router } = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/user.controller')
const router = Router()

// Admin
// /api/post/admin
router.post(
	'/admin/createUser', passport.authenticate('jwt', { session: false }),
	upload.single('image'),
	ctr.createUser
)
router.get(
	'/admin/', passport.authenticate('jwt', { session: false }),
	ctr.getAdminAllUser

)
router.put(
	'/admin/:id', passport.authenticate('jwt', { session: false }),
	ctr.updateUser
)
router.get(
	'/admin/:id', passport.authenticate('jwt', { session: false }),
	ctr.getByIdUser

)
router.delete(
	'/admin/:id', passport.authenticate('jwt', { session: false }),
	ctr.deleteUser

)

// Base
// /api/post
router.get('/', ctr.getAllUser)
router.get('/:id', ctr.getByIdUser)


module.exports = router