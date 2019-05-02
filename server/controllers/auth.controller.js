const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user.model')
const keys = require('../keys')

module.exports.login = async (req, res) => {
	const candidate = await User.findOne(
		{
			where: {
				email: req.body.email
			}
		})
	if (candidate) {
		//Check Password
		const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
		if (isPasswordCorrect) {
			try {
				const token = jwt.sign({
					email: candidate.email,
					userId: candidate.id
				}, keys.JWT, { expiresIn: 60 * 60 })
				res.status(200).json({ token })
			} catch (e) {
				res.status(500).json(e)
			}

		} else {
			res.status(404).json({ message: 'Check Login' })
		}
	} else {
		// User not Found
		res.status(404).json({
			message: "User not Found"
		})
	}
}

module.exports.createUser = async (req, res) => {

	const candidate = await User.findOne(
		{
			where: {
				email: req.body.email
			}
		})
	if (candidate) {
		res.status(409).json({
			message: 'User exist'
		})
	} else {
		try {
			const salt = bcrypt.genSaltSync(10)
			const user = await User.create({
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, salt)
			})
			res.status(201).json(user)
		} catch (e) {
			// User not Found
			res.status(404).json(e)
		}
	}

}