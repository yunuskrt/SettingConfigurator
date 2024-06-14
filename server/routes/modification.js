const express = require('express')

const router = express.Router()

const {
	getModifications,
	createModification,
} = require('../controllers/modification')

router.route('/').post(createModification).get(getModifications)

module.exports = router
