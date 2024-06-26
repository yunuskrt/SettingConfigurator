const express = require('express')

const router = express.Router()

const {
	getConfigurations,
	getParameterConfiguration,
	removeCountryFromParameter,
	editCountryParameter,
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
router
	.route('/parameter/:id')
	.get(getParameterConfiguration)
	.delete(removeCountryFromParameter)
	.patch(editCountryParameter)

module.exports = router
