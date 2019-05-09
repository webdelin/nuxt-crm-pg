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
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
 
db.user = require('../models/user.model')(sequelize, Sequelize)
db.comment = require('../models/comment.model')(sequelize, Sequelize)
db.post = require('../models/post.model')(sequelize, Sequelize)
db.role = require('../models/role.model')(sequelize, Sequelize)

db.user.hasMany(db.role)
db.role.belongsTo(db.user)

db.comment.belongsTo(db.post)
db.post.hasMany(db.comment)
db.post.belongsTo(db.user)
db.user.hasMany(db.post)

module.exports = db