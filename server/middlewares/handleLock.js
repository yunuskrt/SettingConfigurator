const { acquireLock, releaseLock, freeLock } = require('../controllers/lock')

const handleLock = (handler) => {
	return async (req, res, next) => {
		const userMail = req.query.userMail
		try {
			try {
				//console.log(`${userMail} attempting to acquire lock`)
				await acquireLock(userMail) // throw error if lock cannot be acquired
				//console.log(`${userMail} acquired lock`)
				await handler(req, res)
				await releaseLock(userMail) // throw error if lock cannot be released
				//console.log(`${userMail} released lock`)
				next() // proceed to the next middleware/handler
			} catch (error) {
				console.log({ error: error.message })
				await freeLock() // ensure the lock is released on error
				res.status(500).json({ error: error.message })
			}
		} catch (error) {
			res.status(400).end()
		}
	}
}

module.exports = { handleLock }
