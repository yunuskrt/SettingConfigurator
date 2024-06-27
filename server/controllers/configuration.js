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
const getJsonConfigurations = async (req, res) => {
	try {
		const query = req.query
		const snapshot = await db
			.collection('configurations')
			.orderBy('create_date', 'asc')
			.get()

		const configurations = []
		snapshot.forEach((doc) => {
			configurations.push(doc.data())
		})
		if ('country' in query) {
			const log = {}
			const country = query.country
			configurations.forEach((configuration) => {
				let keyVal = ''
				let valueVal = ''
				if (country in configuration.key.countryValues) {
					keyVal = configuration.key.countryValues[country]
				} else {
					keyVal = configuration.key.defaultValue
				}
				if (country in configuration.value.countryValues) {
					valueVal = configuration.value.countryValues[country]
				} else {
					valueVal = configuration.value.defaultValue
				}
				log[keyVal] = valueVal
			})
			res.status(200).json(log)
		} else if ('show' in query && query.show === 'all') {
			res.status(200).json(configurations)
		} else {
			const log = {}
			configurations.forEach((configuration) => {
				log[configuration.key.defaultValue] = configuration.value.defaultValue
			})
			res.status(200).json(log)
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
const getParameterConfiguration = async (req, res) => {
	try {
		// get doc by id
		const { id } = req.params
		const bodyData = req.body

		const configRef = db.collection('configurations').doc(id)
		const doc = await configRef.get()
		if (!doc.exists) {
			res.status(404).json({ error: 'Document not found' })
		} else {
			const docData = doc.data()

			const defaultKeyValue = docData.key.defaultValue
			const defaultValueValue = docData.value.defaultValue
			const defaultDescriptionValue = docData.description.defaultValue

			// predefined allowed countries - initialize with default value
			const countryDB = {
				es: {
					code: 'es',
					country: 'Spain',
					key: defaultKeyValue,
					value: defaultValueValue,
					description: defaultDescriptionValue,
				},
				fr: {
					code: 'fr',
					country: 'France',
					key: defaultKeyValue,
					value: defaultValueValue,
					description: defaultDescriptionValue,
				},
				it: {
					code: 'it',
					country: 'Italy',
					key: defaultKeyValue,
					value: defaultValueValue,
					description: defaultDescriptionValue,
				},
				tr: {
					code: 'tr',
					country: 'Turkey',
					key: defaultKeyValue,
					value: defaultValueValue,
					description: defaultDescriptionValue,
				},
				us: {
					code: 'us',
					country: 'United States',
					key: defaultKeyValue,
					value: defaultValueValue,
					description: defaultDescriptionValue,
				},
			}

			// update country values
			const countryKeyValues = docData.key.countryValues
			Object.keys(countryKeyValues).forEach((code) => {
				countryDB[code].key = countryKeyValues[code]
			})

			const countryValueValues = docData.value.countryValues
			Object.keys(countryValueValues).forEach((code) => {
				countryDB[code].value = countryValueValues[code]
			})

			const countryDescriptionValues = docData.description.countryValues
			Object.keys(countryDescriptionValues).forEach((code) => {
				countryDB[code].description = countryDescriptionValues[code]
			})
			const data = {
				countryBased: Object.values(countryDB),
				default: {
					key: defaultKeyValue,
					value: defaultValueValue,
					description: defaultDescriptionValue,
				},
			}
			res.status(200).json(data)
		}
	} catch (error) {
		console.log({ error: error.message })
		res.status(500).json({ error: error.message })
	}
}
const removeCountryFromParameter = async (req, res) => {
	try {
		// get doc by id
		const { id } = req.params
		const code = req.body.code

		const configRef = db.collection('configurations').doc(id)
		const doc = await configRef.get()

		if (!doc.exists) {
			res.status(404).json({ error: 'Document not found' })
		} else {
			// remove country from countryValues
			const docData = doc.data()
			let descriptionCountryValues = docData.description.countryValues
			let keyCountryValues = docData.key.countryValues
			let valueCountryValues = docData.value.countryValues

			delete descriptionCountryValues[code]
			delete keyCountryValues[code]
			delete valueCountryValues[code]

			await configRef.update({
				description: {
					countryValues: descriptionCountryValues,
					defaultValue: docData.description.defaultValue,
				},
				key: {
					countryValues: keyCountryValues,
					defaultValue: docData.key.defaultValue,
				},
				value: {
					countryValues: valueCountryValues,
					defaultValue: docData.value.defaultValue,
				},
			})
			res.status(204).end()
		}
	} catch (error) {
		console.log({ error: error.message })
		res.status(500).json({ error: error.message })
	}
}
const editCountryParameter = async (req, res) => {
	try {
		const { id } = req.params
		const { countryCode, key, value, description } = req.body
		const configRef = db.collection('configurations').doc(id)
		const doc = await configRef.get()
		if (!doc.exists) {
			res.status(404).json({ error: 'Document not found' })
		} else {
			const docData = doc.data()

			let descriptionCountryValues = docData.description.countryValues
			let keyCountryValues = docData.key.countryValues
			let valueCountryValues = docData.value.countryValues

			descriptionCountryValues[countryCode] = description
			keyCountryValues[countryCode] = key
			valueCountryValues[countryCode] = value

			const updateData = {
				description: {
					countryValues: descriptionCountryValues,
					defaultValue: docData.description.defaultValue,
				},
				key: {
					countryValues: keyCountryValues,
					defaultValue: docData.key.defaultValue,
				},
				value: {
					countryValues: valueCountryValues,
					defaultValue: docData.value.defaultValue,
				},
			}
			await configRef.update(updateData)
			res.status(200).json(docData)
		}
	} catch (error) {
		console.log({ error: error.message })
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
	getJsonConfigurations,
	getParameterConfiguration,
	removeCountryFromParameter,
	editCountryParameter,
	getCountryConfigurations,
	createConfiguration,
	deleteConfiguration,
	updateConfiguration,
}
