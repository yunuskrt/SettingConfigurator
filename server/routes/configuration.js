const express = require('express')

const router = express.Router()

const {
	getConfigurations,
	createConfiguration,
	deleteConfiguration,
	updateConfiguration,
} = require('../controllers/configuration')

router.route('/:id').delete(deleteConfiguration).patch(updateConfiguration)
router.route('/').post(createConfiguration).get(getConfigurations)

module.exports = router
