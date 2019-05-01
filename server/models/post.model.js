const Sequelize = require('sequelize')
const keys = require('../keys')
const sequelize = new Sequelize(keys.PGSQL_URI)

const Post = sequelize.define('posts',
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
			type: Sequelize.STRING,
			allowNull: true
		},
		image: {
			type: Sequelize.STRING
		}
	},
	{
		schema: 'public'
	}
)
User.sync({
	force: true
})
module.exports = {
	sequelize,
	Post
}