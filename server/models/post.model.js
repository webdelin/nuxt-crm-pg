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
			type: Sequelize.TEXT,
			allowNull: true
		},
		image_src: {
			type: Sequelize.STRING
		},
		views: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		comments: {
			type: Sequelize.ARRAY(Sequelize.TEXT)
		}
	},
	{
		schema: 'public'
	}
)
Post.sync({
	//force: true
})
module.exports = {
	sequelize,
	Post
}