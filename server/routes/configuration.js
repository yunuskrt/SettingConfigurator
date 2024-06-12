const express = require('express')

const router = express.Router()

const {
	getConfigurations,
	createConfiguration,
} = require('../controllers/configuration')

router.route('/').post(createConfiguration).get(getConfigurations)

module.exports = router
