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

const { handleLock } = require('../middlewares/handleLock')

router
	.route('/:id')
	.delete(deleteConfiguration)
	.patch(
		handleLock(async (req, res) => {
			try {
				const { id } = req.params
				const bodyData = req.body
				await updateConfiguration(id, bodyData)
				res
					.status(200)
					.json({ success: 'Document updated within the transaction' })
			} catch (error) {
				res.status(500).json({ error: error.message })
			}
		})
	)
router.route('/').post(createConfiguration).get(getConfigurations)
router.route('/country/:id').get(getCountryConfigurations)
router
	.route('/parameter/:id')
	.get(getParameterConfiguration)
	.delete(removeCountryFromParameter)
	.patch(
		handleLock(async (req, res) => {
			try {
				const { id } = req.params
				const bodyData = req.body
				await editCountryParameter(id, bodyData)
				res.status(200).json({
					success: 'Country value of document updated within the transaction',
				})
			} catch (error) {
				res.status(500).json({ error: error.message })
			}
		})
	)
router.route('/json').get(getJsonConfigurations)
module.exports = router
