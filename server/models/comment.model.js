module.exports = (sequelize, Sequelize) => {
const Comment = sequelize.define('comments',
	{
    id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false
    },
    post_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		text: {
			type: Sequelize.TEXT,
			allowNull: false
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
    status: {
      type: Sequelize.ENUM,
      values: ['approved', 'rejected', 'review']
    }
  })

  return Comment
}