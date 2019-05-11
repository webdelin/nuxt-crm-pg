const { Strategy, ExtractJwt } = require('passport-jwt')
const keys = require('../keys')
const db = require('../keys/db.config')
const User = db.user

//Auth: Bearer
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
	const candidate = await User.findOne(
		{
			where: {
				id: payload.userId
			}
		})
	try {
		if (candidate) {
			done(null, candidate)
		} else {
			done(null, false)
		}
	} catch (e) {
		console.error(e)
	}

	return req.session.userId = candidate.id
})