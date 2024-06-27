const express = require('express')

const router = express.Router()

const {
	getConfigurations,
	getJsonConfigurations,
	getParameterConfiguration,
	removeCountryFromParameter,
	editCountryParameter,
	getCountryConfigurations,
	createConfiguration,
	deleteConfiguration,
	updateConfiguration,
} = require('../controllers/configuration')

router.route('/:id').delete(deleteConfiguration).patch(updateConfiguration)
router.route('/').post(createConfiguration).get(getConfigurations)
router.route('/country/:id').get(getCountryConfigurations)
router
	.route('/parameter/:id')
	.get(getParameterConfiguration)
	.delete(removeCountryFromParameter)
	.patch(editCountryParameter)
router.route('/json').get(getJsonConfigurations)
module.exports = router
