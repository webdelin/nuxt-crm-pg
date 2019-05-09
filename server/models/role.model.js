module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define('roles', {
    id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
			allowNull: false
    },
	  name: {
		  type: Sequelize.STRING
	  },
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM,
      values: ['team1', 'team2', 'team3']
		}
	})
	
	return Role
}