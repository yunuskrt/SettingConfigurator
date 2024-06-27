const express = require('express')
const { db } = require('../config/firebaseConfig')

const acquireLock = async (userMail) => {
	const lockRef = db.collection('locks').doc('update-lock')
	const transactionRes = await db.runTransaction(async (t) => {
		const doc = await t.get(lockRef)
		if (!doc.exists) {
			throw new Error('Document not found')
		} else {
			const mutex = doc.data()
			if (mutex.isLocked) {
				throw new Error('Resource is already locked')
			} else {
				const date = new Date()
				const create_date = date.toISOString()

				await t.update(lockRef, {
					isLocked: true,
					lockedBy: userMail,
					lockedAt: create_date,
				})
				return 'Resource locked'
			}
		}
	})
}

const releaseLock = async (userMail) => {
	const lockRef = db.collection('locks').doc('update-lock')
	const transactionRes = await db.runTransaction(async (t) => {
		const doc = await t.get(lockRef)
		if (!doc.exists) {
			throw new Error('Document not found')
		} else {
			const mutex = doc.data()
			if (mutex.isLocked) {
				if (mutex.lockedBy === userMail) {
					await t.update(lockRef, {
						isLocked: false,
						lockedBy: '',
						lockedAt: '',
					})
					return 'Resource unlocked'
				} else {
					throw new Error('Resource locked by another user cannot be unlocked')
				}
			} else {
				throw new Error('Resource is not locked')
			}
		}
	})
}

module.exports = {
	acquireLock,
	releaseLock,
}
