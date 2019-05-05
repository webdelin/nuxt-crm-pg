const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const commentRoutes = require('./routes/comment.routes')
const keys = require('./keys')
const app = express()

const db = new Sequelize(keys.PGSQL_URI)
db.authenticate()
	.then(() => {
		console.log('Connection PGSQL_URI successfully.')
	})
	.catch((err) => {
		console.log('Unable to connect to the PGSQL_URI:', err)
	});

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app