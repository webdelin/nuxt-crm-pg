const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const keys = require('./keys')
const app = express()

const sequelize = new Sequelize(keys.PGSQL_URI)
sequelize
	.authenticate()
	.then(function (err) {
		console.log('Connection PGSQL_URI successfully.')
	})
	.catch(function (err) {
		console.log('Unable to connect to the PGSQL_URI:', err)
	});

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

module.exports = app