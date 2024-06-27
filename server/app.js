const cors = require('cors')
require('dotenv').config()
const express = require('express')
const app = express()

// middlewares
const { verifyToken } = require('./middlewares/verifyToken')
// routes
const configurationRouter = require('./routes/configuration')
const modificationRouter = require('./routes/modification')
const tokenRouter = require('./routes/token')
const lockRouter = require('./routes/lock')

app.use(express.json())
app.use(cors())

// app.use(verifyToken)
app.use((req, res, next) => {
	if (req.path === '/api/v1/generateToken') {
		return next()
	}
	verifyToken(req, res, next)
})

app.use('/api/v1/generateToken', tokenRouter)

app.use('/api/v1/configuration', configurationRouter)
app.use('/api/v1/modification', modificationRouter)

app.use('/api/v1/lock', lockRouter)

const port = process.env.PORT || 3000

const start = async () => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		)
	} catch (error) {
		console.log(error)
	}
}

start()
