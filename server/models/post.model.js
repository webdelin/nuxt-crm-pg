module.exports = (sequelize, Sequelize) => {
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
		image: {
			type: Sequelize.STRING
		},
		views: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
    user_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM,
      values: ['readed', 'in_check', 'checked', 'disabled']
    },
		active: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}
  })
  return Post
}