import Debug from 'debug';
const debug = Debug('Datamapper:familyDatamapper:log');

import client from '../database/index.js';

/**
 * @typedef {object} Family
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The family's name
 */

const familyDatamapper = {
	/**
	 * Get all families
	 * @returns {family[]} - All the families from the database order by name
	 */
	async findAll() {
		const result = await client.query(
			`SELECT * FROM "family" ORDER BY "name";`,
		);

		debug('findAll : ', result.rows);
		return result.rows;
	},

	/**
	 * Get one family by its id
	 * @param {number} familyId - The id of the wished family
	 * @returns {(family|undefined)} - The wished family or undefined if there is no family with this id in the database
	 */
	async findByPk(id) {
		const result = await client.query(
			`SELECT * FROM "family" WHERE "id" = $1;`,
			[id],
		);

		debug('findByPk : ', result.rows);
		return result.rows[0];
	},

	/**
	 * Find if a family exists with the name
	 * @param {object} inputData - The data provided
	 * @returns {(family|undefined)} - The wished family or undefined if there is no family with this name in the database
	 */
	async isUnique(inputData) {
		const result = await client.query(
			`SELECT * FROM "family" WHERE "name" = $1;`,
			[inputData.name],
		);

		debug('isUnique : ', result.rows[0]);
		return result.rows[0];
	},

	/**
	 * Add one family in the database
	 * @param {InputFamily} family - The data to insert
	 * @returns {family} - the added family into the database
	 */
	async insert(family) {
		const result = await client.query(
			`INSERT INTO "family" ("name") VALUES ($1) RETURNING *;`,
			[family.name],
		);

		debug('insert : ', result.rows[0]);
		return result.rows[0];
	},

	/**
	 * Modify one family in the database
	 * @param {number} id - The id of the family to update
	 * @param {InputFamily} family - The data to insert
	 * @returns {family} - the added family into the database
	 */
	async update(id, family) {
		const result = await client.query(
			`UPDATE "family" SET "name" = $1 WHERE "id" = $2 RETURNING *`,
			[family.name, id],
		);

		debug('update : ', result.rows[0]);
		return result.rows[0];
	},

	/**
	 * Delete one family in the database
	 * @param {number} id - The id of the family to delete
	 * @returns {boolean} - the result of the delete
	 */
	async delete(id) {
		const result = await client.query(`DELETE FROM "family" WHERE id = $1`, [
			id,
		]);

		debug('delete : ', !!result.rowCount);
		return !!result.rowCount;
	},
};

export default familyDatamapper;
