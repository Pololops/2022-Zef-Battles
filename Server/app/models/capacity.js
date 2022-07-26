import Debug from 'debug';
const debug = Debug('Datamapper:capacityDatamapper:log');

import client from '../database/index.js';

/**
 * Capacity model
 * @typedef {object} Capacity
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The capacity's name
 * @property {string} description - The capacity's description
 */

/**
 * InputCapacity model
 * @typedef {object} InputCapacity
 * @property {string} name.required - The capacity's name
 * @property {string} description - The capacity's description
 */

const capacityDatamapper = {
	async findAll() {
		const result = await client.query(
			`SELECT * FROM "capacity" ORDER BY "name";`,
		);

		debug('findAll : ', result.rows);
		return result.rows;
	},

	async findByPk(id) {
		const result = await client.query(
			`SELECT * FROM "capacity" WHERE "id" = $1;`,
			[id],
		);

		debug('findByPk : ', result.rows);
		return result.rows[0];
	},

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

	async insert(capacity) {
		const result = await client.query(
			`INSERT INTO "capacity" ("name", "description") VALUES ($1, $2) RETURNING *;`,
			[capacity.name, capacity.description],
		);

		debug('insert : ', result.rows[0]);
		return result.rows[0];
	},

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

	async delete(id) {
		const result = await client.query(`DELETE FROM "capacity" WHERE id = $1`, [
			id,
		]);

		debug('delete : ', !!result.rowCount);
		return !!result.rowCount;
	},
};

export default capacityDatamapper;
