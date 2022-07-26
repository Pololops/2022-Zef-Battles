import Debug from 'debug';
const debug = Debug('Datamapper:familyDatamapper:log');

import client from '../database/index.js';

/**
 * Family model
 * @typedef {object} Family
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The family's name
 */

/**
 * InputFmily model
 * @typedef {object} InputFamily
 * @property {string} name.required - The family's name
 */

const familyDatamapper = {
	async findAll() {
		const result = await client.query(
			`SELECT * FROM "family" ORDER BY "name";`,
		);

		debug('findAll : ', result.rows);
		return result.rows;
	},

	async findByPk(id) {
		const result = await client.query(
			`SELECT * FROM "family" WHERE "id" = $1;`,
			[id],
		);

		debug('findByPk : ', result.rows);
		return result.rows[0];
	},

	async isUnique(inputData) {
		const result = await client.query(
			`SELECT * FROM "family" WHERE "name" = $1;`,
			[inputData.name],
		);

		debug('isUnique : ', result.rows[0]);
		return result.rows[0];
	},

	async insert(family) {
		const result = await client.query(
			`INSERT INTO "family" ("name") VALUES ($1) RETURNING *;`,
			[family.name],
		);

		debug('insert : ', result.rows[0]);
		return result.rows[0];
	},

	async update(id, family) {
		const result = await client.query(
			`UPDATE "family" SET "name" = $1 WHERE "id" = $2 RETURNING *`,
			[family.name, id],
		);

		debug('update : ', result.rows[0]);
		return result.rows[0];
	},

	async delete(id) {
		const result = await client.query(`DELETE FROM "family" WHERE id = $1`, [
			id,
		]);

		debug('delete : ', !!result.rowCount);
		return !!result.rowCount;
	},
};

export default familyDatamapper;
