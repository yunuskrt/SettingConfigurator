const { acquireLock, releaseLock } = require('../controllers/lock')

const handleLock = (handler) => {
	return async (req, res, next) => {
		const userMail = req.query.userMail
		try {
			console.log(`${userMail} attempting to acquire lock`)
			await acquireLock(userMail) // throw error if lock cannot be acquired
			console.log(`${userMail} acquired lock`)
			await handler(req, res)
			await releaseLock(userMail) // throw error if lock cannot be released
			console.log(`${userMail} released lock`)
			next() // call next() to proceed to the next middleware/handler
		} catch (error) {
			console.error('Error during operation:', error)
			await releaseLock(userMail) // ensure the lock is released on error
			res.status(500).send({ error: error.message })
		}
	}
}

module.exports = { handleLock }
