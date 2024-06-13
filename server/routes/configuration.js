const express = require('express')

const router = express.Router()

const {
	getConfigurations,
	getCountryConfigurations,
	createConfiguration,
	deleteConfiguration,
	updateConfiguration,
} = require('../controllers/configuration')

router
	.route('/:id')
	.delete(deleteConfiguration)
	.patch(updateConfiguration)
	.get(getCountryConfigurations)
router.route('/').post(createConfiguration).get(getConfigurations)

module.exports = router
