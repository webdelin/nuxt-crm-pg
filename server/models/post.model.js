const Sequelize = require('sequelize')
const keys = require('../keys')
const db = new Sequelize(keys.PGSQL_URI)

const Post = db.define('posts',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		text: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		image: {
			type: Sequelize.STRING
		},
		views: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		}
	},
	{
		schema: 'public'
	}
)
Post.sync()
// Post.sync({
// 	force: true
// })
module.exports = {
	db,
	Post
}