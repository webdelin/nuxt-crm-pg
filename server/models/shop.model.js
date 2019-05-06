const Sequelize = require('sequelize')
const keys = require('../keys')
const db = new Sequelize(keys.PGSQL_URI)

const Shop = db.define('shops',
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
		description: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		affili_shop_id: {
			type: Sequelize.STRING,
			allowNull: true
		},
		ean: {
			type: Sequelize.STRING,
			allowNull: true
		},
		affili_link: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	},
	{
		schema: 'public'
	}
)
Shop.sync({
	force: true
})
module.exports = {
	db,
	Shop
}