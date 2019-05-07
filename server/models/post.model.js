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
		},
		comments: {
			type: Sequelize.ARRAY({
				type: Sequelize.TEXT
			})
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		classMethods: {
			associate: function (models) {
				Post.hasMany(models.Comment, { as: "comments" });
			}
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