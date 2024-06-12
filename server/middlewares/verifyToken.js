const { admin } = require('../config/firebaseConfig')
const verifyToken = async (req, res, next) => {
	try {
		// const token = req.headers.Authorization
		try {
			const decodedToken = await admin
				.auth()
				.verifyIdToken(req.headers.authorization)
			req.user = decodedToken
			next()
		} catch (error) {
			console.error(error)
			res.status(401).json({ error: error.message })
		}
	} catch (error) {
		console.error(error)
		res.status(400).end()
	}
}

module.exports = { verifyToken }
