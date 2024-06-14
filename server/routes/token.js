const express = require('express')

const router = express.Router()

const { createToken } = require('../controllers/token')

router.route('/').post(createToken)

module.exports = router
