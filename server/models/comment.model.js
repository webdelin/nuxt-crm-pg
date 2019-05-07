const Sequelize = require('sequelize')
const keys = require('../keys')
const db = new Sequelize(keys.PGSQL_URI)

const Comment = db.define('comments',
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
			unique: false
		},
		text: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		post_id: {
			type: Sequelize.TEXT
		},
		ean: {
			type: Sequelize.STRING,
			allowNull: true
		},
		like: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		rating: {
			type: Sequelize.DECIMAL(0, 0)
		},
		active: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {
			associate: function (models) {
				Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'posts' });
			}
		}
	},
	{
		schema: 'public'
	}
)
Comment.sync()
// Comment.sync({
// 	force: true
// })
module.exports = {
	db,
	Comment
}