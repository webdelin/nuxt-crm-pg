module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				unique: true,
				allowNull: false
			},
			username: {
				type: Sequelize.STRING,
				required: true
			},
			image: {
				type: Sequelize.STRING
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
			},
			role: {
				type: Sequelize.ENUM,
				values: ['USER', 'READER', 'ADMIN', 'MANAGER']
			}
		})
	return User
}