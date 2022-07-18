import Debug from 'debug';
const debug = Debug('Datamapper:capacityDatamapper:log');

import client from '../database/index.js';

/**
 * @typedef {object} capacity
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The capacity's name
 * @property {string} description - The capacity's description
 */

const capacityDatamapper = {
	/**
	 * Get all families
	 * @returns {capacity[]} - All the families from the database order by name
	 */
	async findAll() {
		const result = await client.query(
			`SELECT * FROM "capacity" ORDER BY "name";`,
		);

		debug('findAll : ', result.rows);
		return result.rows;
	},

	/**
	 * Get one capacity by its id
	 * @param {number} capacityId - The id of the wished capacity
	 * @returns {(capacity|undefined)} - The wished capacity or undefined if there is no capacity with this id in the database
	 */
	async findByPk(id) {
		const result = await client.query(
			`SELECT * FROM "capacity" WHERE "id" = $1;`,
			[id],
		);

		debug('findByPk : ', result.rows);
		return result.rows[0];
	},

	/**
	 * Find if a capacity exists with the name
	 * @param {object} inputData - The data provided
	 * @returns {(capacity|undefined)} - The wished capacity or undefined if there is no capacity with this name in the database
	 */
	async isUnique(inputData, id) {
		const values = [inputData.name];

		const preparedQuery = {
			text: `SELECT * FROM "capacity" WHERE "name" = $1;`,
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
	 * Add one capacity in the database
	 * @param {Inputcapacity} capacity - The data to insert
	 * @returns {capacity} - the added capacity into the database
	 */
	async insert(capacity) {
		const result = await client.query(
			`INSERT INTO "capacity" ("name", "description") VALUES ($1, $2) RETURNING *;`,
			[capacity.name, capacity.description],
		);

		debug('insert : ', result.rows[0]);
		return result.rows[0];
	},

	/**
	 * Modify one capacity in the database
	 * @param {number} id - The id of the capacity to update
	 * @param {Inputcapacity} capacity - The data to insert
	 * @returns {capacity} - the added capacity into the database
	 */
	async update(id, capacity) {
		const fields = Object.keys(capacity).map(
			(prop, index) => `"${prop}" = $${index + 1}`,
		);
		const values = Object.values(capacity);

		const result = await client.query(
			`UPDATE "capacity" SET ${fields} WHERE "id" = $${
				fields.length + 1
			} RETURNING *`,
			[...values, id],
		);

		debug('update : ', result.rows[0]);
		return result.rows[0];
	},

	/**
	 * Delete one capacity in the database
	 * @param {number} id - The id of the capacity to delete
	 * @returns {boolean} - the result of the delete
	 */
	async delete(id) {
		const result = await client.query(`DELETE FROM "capacity" WHERE id = $1`, [
			id,
		]);

		debug('delete : ', !!result.rowCount);
		return !!result.rowCount;
	},
};

export default capacityDatamapper;
