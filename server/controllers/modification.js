const express = require('express')
const { db } = require('../config/firebaseConfig')
const { v4: uuidv4 } = require('uuid')

const getModifications = async (req, res) => {
	try {
		const snapshot = await db
			.collection('modifications')
			.orderBy('create_date', 'desc')
			.get()

		const configurations = []
		snapshot.forEach((doc) => {
			configurations.push(doc.data())
		})

		res.status(200).json(configurations)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
const createModification = async (req, res) => {
	try {
		const date = new Date()
		const create_date = date.toISOString()

		const documentId = uuidv4()

		const createdBody = {
			id: documentId,
			...req.body,
			create_date,
		}

		await db.collection('modifications').doc(documentId).set(createdBody)
		res.status(201).json(createdBody)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	getModifications,
	createModification,
}
