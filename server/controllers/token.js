const express = require('express')
const { admin } = require('../config/firebaseConfig')

const createToken = async (req, res) => {
	try {
		const uid = 'some-uid'
		const customToken = await admin.auth().createCustomToken(uid)

		res.status(200).json({ token: idToken })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = { createToken }
