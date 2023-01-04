import Debug from 'debug';
const debug = Debug('Datamapper:userDatamapper:log');

import client from '../database/index.js';

/**
 * User model
 * @typedef {object} User
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The user name (firstname or surname)
 * @property {number} victory_number - The number of victory battle
 * @property {string} role - The user role (player or admin)
 */

/**
 * InputUser model
 * @typedef {object} InputCapacity
 * @property {string} name.required - The user's name
 * @property {string} password.required - The user's password
 * @property {string} role - The user's role : player or admin
 */

/**
 * @typedef {object} Login
 * @property {string} login - name
 * @property {string} password
 */

export default {
	async findAll() {
		const result = await client.query(`SELECT * FROM "user" ORDER BY "name";`)

		debug('findAll : ', result.rows)
		return result.rows
	},

	async findByPk(id) {
		const result = await client.query(`SELECT * FROM "user" WHERE "id" = $1;`, [
			id,
		])

		debug('findByPk : ', result.rows)
		return result.rows[0]
	},

	async findByName(name) {
		const result = await client.query(`SELECT * FROM "user" WHERE "name" = $1;`, [
			name,
		])

		debug('findByName : ', result.rows)
		return result.rows[0]
	},

	async isUnique(userData, id) {
		const values = [userData.name]

		const preparedQuery = {
			text: `SELECT * FROM "user" WHERE "name" = $1;`,
			values,
		}

		if (id) {
			preparedQuery.text += ` AND id <> $${values.length + 1}`
			preparedQuery.values.push(id)
		}

		const result = await client.query(preparedQuery)

		if (result.rowCount === 0) {
			return null
		}

		debug('isUnique : ', result.rows[0])
		return result.rows[0]
	},

	async insert(user) {
		const result = await client.query(
			`INSERT INTO "user" ("name", "password") VALUES ($1, $2) RETURNING *;`,
			[user.name, user.password],
		)

		debug('insert : ', result.rows[0])
		return result.rows[0]
	},

	async update(id, user) {
		const fields = Object.keys(user).map(
			(prop, index) => `"${prop}" = $${index + 1}`,
		)
		const values = Object.values(user)

		const result = await client.query(
			`UPDATE "user" SET ${fields} WHERE "id" = $${
				fields.length + 1
			} RETURNING *`,
			[...values, id],
		)

		debug('update : ', result.rows[0])
		return result.rows[0]
	},

	async delete(id) {
		const result = await client.query(`DELETE FROM "user" WHERE id = $1`, [id])

		debug('delete : ', !!result.rowCount)
		return !!result.rowCount
	},
}
