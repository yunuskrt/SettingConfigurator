const cors = require('cors')

const express = require('express')
const app = express()

// middlewares
const { verifyToken } = require('./middlewares/verifyToken')
// routes
const configurationRouter = require('./routes/configuration')
const modificationRouter = require('./routes/modification')

app.use(express.json())
app.use(cors())

app.use(verifyToken)

app.use('/api/v1/configuration', configurationRouter)
app.use('/api/v1/modification', modificationRouter)

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
