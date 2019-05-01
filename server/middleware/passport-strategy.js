const { Strategy, ExtractJwt } = require('passport-jwt')
const { Sequelize } = require('sequelize')
const keys = require('../keys')
const { User } = require('../models/user.model')

//Auth: Bearer
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {

	try {
		const candidate = await User.findOne(
			{
				where: {
					id: payload.userId
				}
			})
		if (candidate) {
			done(null, candidate)
		} else {
			done(null, false)
		}
	} catch (e) {
		errorHandler(res, e)
	}

})