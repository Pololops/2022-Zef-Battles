import Debug from 'debug';
const debug = Debug('Datamapper:characterDatamapper:log');

import client from '../database/index.js';

/**
 * @typedef {object} character
 * @property {number} familyId - The id of the field family_id in the table
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The character's name
 * @property {string} description - The character's description
 */

const characterDatamapper = {
	/**
	 * Get all families
	 * @returns {character[]} - All the families from the database order by name
	 */
	async findAllInFamily(familyId) {
		const result = await client.query(
			`SELECT * FROM "character" WHERE family_id = $1 ORDER BY "name";`,
			[familyId],
		);

		debug('findAllInFamily : ', result.rows);
		return result.rows;
	},

	/**
	 * Get one character by its id
	 * @param {number} characterId - The id of the wished character
	 * @returns {(character|undefined)} - The wished character or undefined if there is no character with this id in the database
	 */
	async findByPk(id) {
		const result = await client.query(
			`SELECT * FROM "character" WHERE "id" = $1;`,
			[id],
		);

		debug('findByPk : ', result.rows);
		return result.rows[0];
	},

	/**
	 * Find if a character exists with the name
	 * @param {object} inputData - The data provided
	 * @returns {(character|undefined)} - The wished character or undefined if there is no character with this name in the database
	 */
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

	/**
	 * Add one character in the database
	 * @param {InputCharacter} character - The data to insert
	 * @returns {character} - the added character into the database
	 */
	async insert(character) {
		const result = await client.query(
			`INSERT INTO "character" ("name", "description") VALUES ($1, $2) RETURNING *;`,
			[character.name, character.description],
		);

		debug('insert : ', result.rows[0]);
		return result.rows[0];
	},

	/**
	 * Modify one character in the database
	 * @param {number} id - The id of the character to update
	 * @param {InputCharacter} character - The data to insert
	 * @returns {character} - the added character into the database
	 */
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

	/**
	 * Delete one character in the database
	 * @param {number} id - The id of the character to delete
	 * @returns {boolean} - the result of the delete
	 */
	async delete(id) {
		const result = await client.query(`DELETE FROM "character" WHERE id = $1`, [
			id,
		]);

		debug('delete : ', !!result.rowCount);
		return !!result.rowCount;
	},
};

export default characterDatamapper;
