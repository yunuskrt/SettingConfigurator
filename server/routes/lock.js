const express = require('express')

const router = express.Router()

const { acquireLock, releaseLock } = require('../controllers/lock')

router.route('/acquire').post(async (req, res) => {
	const userMail = req.body.userMail
	try {
		console.log(`${userMail} attempting to acquire lock`)
		await acquireLock(userMail) // throws error if lock cannot be acquired
		console.log(`${userMail} acquired lock`)
		res.status(200).json({ success: `${userMail} acquired lock` })
	} catch (error) {
		console.error('Error acquiring lock:', error)
		res.status(500).json({ error: error.message })
	}
})

router.route('/release').post(async (req, res) => {
	const userMail = req.body.userMail
	try {
		console.log(`${userMail} attempting to release lock`)
		await releaseLock(userMail) // throw error if lock cannot be released
		console.log(`${userMail} released lock`)
		res.status(200).json({ success: `${userMail} released lock` })
	} catch (error) {
		console.error('Error releasing lock:', error)
		res.status(500).json({ error: error.message })
	}
})

module.exports = router
