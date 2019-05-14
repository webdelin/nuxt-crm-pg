const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const userRoutes = require('./routes/user.routes')
const commentRoutes = require('./routes/comment.routes')
const app = express()

// const db = require('./keys/db.config')
// // force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and Resync with { force: true }')
// 	const salt = bcrypt.genSaltSync(10)
// 	db.user.create({
// 		username: "admin",
// 		email: "admin@admin.de",
// 		password: bcrypt.hashSync('123456', salt),
// 		role: "ADMIN"
// 	})
// })

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app