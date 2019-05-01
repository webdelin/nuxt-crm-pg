const Sequelize = require('sequelize')
const keys = require('../keys')
const sequelize = new Sequelize(keys.PGSQL_URI)

const Comment = sequelize.define('comments',
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
		post_id: {
			type: Sequelize.STRING
		},
		ean: {
			type: Sequelize.STRING,
			defaultValue: 0
		},
		like: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		}
	},
	{
		schema: 'public'
	}
)
Comment.sync({
	//force: true
})
module.exports = {
	sequelize,
	Comment
}