const express = require('express')
const { db } = require('../config/firebaseConfig')
const { v4: uuidv4 } = require('uuid')

const getConfigurations = async (req, res) => {
	try {
		const snapshot = await db
			.collection('configurations')
			.orderBy('create_date', 'asc')
			.get()

		const configurations = []
		snapshot.forEach((doc) => {
			configurations.push(doc.data())
		})
		const formattedConfigurations = configurations.map((param) => {
			return {
				id: param.id,
				key: param.key.defaultValue,
				value: param.value.defaultValue,
				description: param.description.defaultValue,
				create_date: param.create_date,
			}
		})

		res.status(200).json(formattedConfigurations)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
const getCountryConfigurations = async (req, res) => {
	try {
		const { id } = req.params

		// predefined allowed countries
		const countryDB = ['fr', 'it', 'es', 'tr', 'us']

		if (!countryDB.includes(id)) {
			res.status(404).json({ error: 'Country not found' })
		} else {
			const snapshot = await db
				.collection('configurations')
				.orderBy('create_date', 'asc')
				.get()

			const configurations = []
			snapshot.forEach((doc) => {
				configurations.push(doc.data())
			})

			const formattedConfigurations = configurations.map((param) => {
				return {
					id: param.id,
					key: Object.keys(param.key.countryValues).includes(id)
						? param.key.countryValues[id]
						: param.key.defaultValue,
					value: Object.keys(param.value.countryValues).includes(id)
						? param.value.countryValues[id]
						: param.value.defaultValue,
					description: Object.keys(param.description.countryValues).includes(id)
						? param.description.countryValues[id]
						: param.description.defaultValue,
					create_date: param.create_date,
				}
			})
			res.status(200).json(formattedConfigurations)
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
const createConfiguration = async (req, res) => {
	try {
		const date = new Date()
		const create_date = date.toISOString()

		const documentId = uuidv4()

		const createdBody = {
			id: documentId,
			...req.body,
			create_date,
		}

		await db.collection('configurations').doc(documentId).set(createdBody)

		res.status(201).json(createdBody)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteConfiguration = async (req, res) => {
	try {
		const { id } = req.params

		await db.collection('configurations').doc(id).delete()

		res.status(204).end()
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const updateConfiguration = async (req, res) => {
	try {
		// get doc by id
		const { id } = req.params
		const bodyData = req.body

		const configRef = db.collection('configurations').doc(id)
		const doc = await configRef.get()
		if (!doc.exists) {
			res.status(404).json({ error: 'Document not found' })
		} else {
			// update document
			const docData = doc.data()
			let updateData = {}
			const keys = ['key', 'value', 'description']
			if (bodyData.type === 'all') {
				keys.forEach((key) => {
					if (bodyData[key] !== docData[key].defaultValue) {
						updateData[key] = {
							countryValues: docData[key].countryValues,
							defaultValue: bodyData[key],
						}
					}
				})
			}
			// update only country values
			else {
				const country = bodyData.country
				keys.forEach((key) => {
					const keyCountryValues = Object.keys(docData[key].countryValues)
					if (
						!keyCountryValues.includes(country) ||
						docData[key].countryValues[country] !== bodyData[key]
					) {
						updateData[key] = {
							countryValues: {
								...docData[key].countryValues,
								[country]: bodyData[key],
							},
							defaultValue: docData[key].defaultValue,
						}
					}
					// else exists with same value
				})
			}
			console.log(updateData)
			await db.collection('configurations').doc(id).update(updateData)
			res.status(200).json(updateData)
		}
	} catch (error) {
		console.log({ error: error.message })
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	getConfigurations,
	getCountryConfigurations,
	createConfiguration,
	deleteConfiguration,
	updateConfiguration,
}
