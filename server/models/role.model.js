const Sequelize = require('sequelize')
const keys = require('../keys')
const sequelize = new Sequelize(keys.PGSQL_URI)

const Role = sequelize.define('roles',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING
		}
	},
	{
		schema: 'public'
	}
)
Role.sync({
	//force: true
})
module.exports = {
	sequelize,
	Role
}