const { db } = require('../config/firebaseConfig')

const Configuration = db.collection('Configurations')

module.exports = { Configuration }
