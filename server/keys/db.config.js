const env = require('./env')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(env.database, env.username, env.password, {
	host: env.host,
	dialect: env.dialect,
	pool: {
		max: env.max,
		min: env.pool.min,
		acquire: env.pool.acquire,
		idle: env.pool.idle
	},
	define: {
		underscored: true
	},
	storage: __dirname + '/../database/database.sqlite'
})
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/user.model')(sequelize, Sequelize)
db.comment = require('../models/comment.model')(sequelize, Sequelize)
db.post = require('../models/post.model')(sequelize, Sequelize)
db.role = require('../models/role.model')(sequelize, Sequelize)

// db.user.hasMany(db.role)
// db.role.belongsTo(db.user)

// db.comment.belongsTo(db.post.id)
// db.post.hasMany(db.comment.id)
// db.post.belongsTo(db.user.id)
// db.user.hasMany(db.post.id)

module.exports = db