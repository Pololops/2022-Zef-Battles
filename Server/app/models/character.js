import Debug from 'debug';
const debug = Debug('Datamapper:characterDatamapper:log');

import client from '../database/index.js';

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

const characterDatamapper = {
	async findAllInFamily(familyId) {
		const result = await client.query(
			`SELECT * FROM "character_with_capacity" WHERE "family_id" = $1 ORDER BY "name"`,
			[familyId],
		);

		debug('findAllInFamily : ', result.rows);
		return result.rows;
	},

	async findByPk(id) {
		const result = await client.query(
			`SELECT * FROM "character_with_capacity" WHERE "id" = $1;`,
			[id],
		);

		debug('findByPk : ', result.rows);
		return result.rows[0];
	},

	async isUnique(inputData, id) {
		const values = [inputData.name];

		const preparedQuery = {
			text: `SELECT * FROM "character" WHERE "name" = $1;`,
			values,
		};

		if (id) {
			preparedQuery.text += ` AND id <> $${values.length + 1}`;
			preparedQuery.values.push(id);
		}
		const result = await client.query(preparedQuery);

		if (result.rowCount === 0) {
			return null;
		}

		debug('isUnique : ', result.rows[0]);
		return result.rows[0];
	},

	async insertInFamily(character) {
		const fields = Object.keys(character).map((key) => `"${key}"`);
		const numberFields = Object.keys(character).map(
			(_, index) => `$${index + 1}`,
		);
		const values = Object.values(character);

		const result = await client.query(
			`INSERT INTO "character" (${fields}) VALUES (${numberFields}) RETURNING *;`,
			values,
		);

		debug('insertInFamily : ', result.rows[0]);
		return result.rows[0];
	},

	async update(id, character) {
		const fields = Object.keys(character).map(
			(prop, index) => `"${prop}" = $${index + 1}`,
		);
		const values = Object.values(character);

		const result = await client.query(
			`UPDATE "character" SET ${fields} WHERE "id" = $${
				fields.length + 1
			} RETURNING *`,
			[...values, id],
		);

		debug('update : ', result.rows[0]);
		return result.rows[0];
	},

	async delete(id) {
		const result = await client.query(`DELETE FROM "character" WHERE id = $1`, [
			id,
		]);

		debug('delete : ', !!result.rowCount);
		return !!result.rowCount;
	},
};

export default characterDatamapper;
