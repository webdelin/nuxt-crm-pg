const { Router } = require('express')
const passport = require('passport')
const { createUser } = require('../controllers/user.controller')
const router = Router()

// /api/user/admin/create
router.post('/admin/create', createUser)

module.exports = router