const Sequelize = require('sequelize')
const keys = require('../keys')
const db = new Sequelize(keys.PGSQL_URI)

const User = db.define('users',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		schema: 'public'
	}
)
User.sync()
module.exports = {
	db,
	User
}