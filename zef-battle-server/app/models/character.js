import Debug from 'debug'
const debug = Debug('Datamapper:characterDatamapper:log')

import client from '../database/index.js'

/**
 * Character model
 * @typedef {object} Character
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The character's name
 * @property {string} picture - The URL to the character's picture
 * @property {number} family_id - The id of the family to which the character belongs
 * @property {string} family_name - The name of the family to which the character belongs
 * @property {number} total_level - The total level of the character's capacities
 * @property {number} number_capacity - The quantity of capcities that the character has
 * @property {array<Capacity>} capacity - An array of each character's capacities
 */

/**
 * InputCharacter model
 * @typedef {object} InputCharacter
 * @property {string} name.required - The character's name
 * @property {string} picture - The URL to the character's picture
 * @property {number} family_id.required - The id of the family to which the character belongs
 */

export default {
	findAllInFamily: async (familyId) => {
		const result = await client.query(
			`SELECT * FROM "character_with_capacity" WHERE "family_id" = $1 ORDER BY "name"`,
			[familyId],
		)

		debug('findAllInFamily : ', result.rows)
		return result.rows
	},

	findRandom: async (quantity = 1) => {
		const result = await client.query(
			`SELECT * FROM "character" ORDER BY random() LIMIT $1;`,
			[quantity],
		)

		debug('findRandom : ', result.rows)
		return result.rows
	},

	findByPk: async (id) => {
		const result = await client.query(
			`SELECT * FROM "character" WHERE "id" = $1;`,
			[id],
		)

		debug('findByPk : ', result.rows)
		return result.rows[0]
	},

	findByPkWithCapacity: async (id) => {
		const result = await client.query(
			`SELECT * FROM "character_with_capacity" WHERE "id" = $1;`,
			[id],
		)

		debug('findByPk : ', result.rows)
		return result.rows[0]
	},

	isUnique: async (inputData, id) => {
		const values = [inputData.name]

		const preparedQuery = {
			text: `SELECT * FROM "character" WHERE "name" = $1;`,
			values,
		}

		if (id) {
			preparedQuery.text += ` AND id <> $${values.length + 1}`
			preparedQuery.values.push(id)
		}

		const result = await client.query(preparedQuery)

		if (result.rowCount === 0) return null

		debug('isUnique : ', result.rows[0])
		return result.rows[0]
	},

	insert: async (character) => {
		const fields = Object.keys(character).map((key) => `"${key}"`)
		const numberFields = Object.keys(character).map(
			(_, index) => `$${index + 1}`,
		)
		const values = Object.values(character)

		const result = await client.query(
			`INSERT INTO "character" (${fields}) VALUES (${numberFields}) RETURNING *;`,
			values,
		)

		debug('insert: ', result.rows[0])
		return result.rows[0]
	},

	update: async (id, character) => {
		const fields = Object.keys(character).map(
			(prop, index) => `"${prop}" = $${index + 1}`,
		)
		const values = Object.values(character)

		const result = await client.query(
			`UPDATE "character" SET ${fields} WHERE "id" = $${
				fields.length + 1
			} RETURNING *`,
			[...values, id],
		)

		debug('update : ', result.rows[0])
		return result.rows[0]
	},

	delete: async (id) => {
		const result = await client.query(
			`DELETE FROM "character" WHERE id = $1 RETURNING *`,
			[id],
		)

		debug('delete : ', !!result.rowCount, result.rows[0])
		return result.rows[0]
	},

	hasCapacity: async (characterId, capacityId) => {
		const result = await client.query(
			`SELECT * FROM "character_has_capacity" WHERE "character_id" = $1 AND "capacity_id" = $2`,
			[characterId, capacityId],
		)

		if (result.rowCount === 0) {
			return null
		}

		debug('hasCapacity : ', result.rows[0])
		return result.rows[0]
	},

	addAssociationBetweenCapacityAndCharacter: async (
		characterId,
		capacityId,
		level,
	) => {
		const result = await client.query(
			`INSERT INTO "character_has_capacity" ("character_id", "capacity_id", "level") VALUES ($1, $2, $3) RETURNING *;`,
			[characterId, capacityId, level],
		)

		debug('addAssociationBetweenCapacityAndCharacter : ', result.rows[0])
		return result.rows[0]
	},

	updateAssociationBetweenCapacityAndCharacter: async (
		characterId,
		capacityId,
		level,
	) => {
		const result = await client.query(
			`UPDATE "character_has_capacity" SET "level" = $3 WHERE "character_id" = $1 AND "capacity_id" = $2 RETURNING *`,
			[characterId, capacityId, level],
		)

		debug('updateAssociationBetweenCapacityAndCharacter : ', result.rows[0])
		return result.rows[0]
	},

	removeAssociationBetweenCapacityAndCharacter: async (
		characterId,
		capacityId,
	) => {
		const result = await client.query(
			`DELETE FROM "character_has_capacity" WHERE character_id = $1 AND capacity_id = $2`,
			[characterId, capacityId],
		)

		debug('removeAssociationBetweenCapacityAndCharacter : ', !!result.rowCount)
		return !!result.rowCount
	},
}
