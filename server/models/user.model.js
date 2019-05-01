const Sequelize = require('sequelize')
const keys = require('../keys')
const sequelize = new Sequelize(keys.PGSQL_URI)

const User = sequelize.define('users',
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
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	},
	{
		schema: 'public'
	}
)
User.sync({
	//force: true
})
module.exports = {
	sequelize,
	User
}