import Debug from 'debug';
const debug = Debug('Datamapper:battleDatamapper:log');

import client from '../database/index.js';

/**
 * Battle model
 * @typedef {object} Battle
 * @property {number} id - The unique Pk id of the table
 * @property {string} start_date - The battle's start date
 * @property {number} wished_player_number - The quatity of wished user in the battle
 * @property {boolean} is_started - The status of the battle started or not started
 * @property {array<User>} players - Users in the battle
 */

/**
 * InputBattle model
 * @typedef {object} InputBattle
 * @property {number} wished_player_number - The quatity of wished user in the battle
 */

const battleDatamapper = {
	async findAll() {
		const result = await client.query(
			`SELECT * FROM "battle" ORDER BY "start_date";`,
		);

		debug('findAll : ', result.rows);
		return result.rows;
	},

	async findByPk(id) {
		const result = await client.query(
			`SELECT * FROM "battle" WHERE "id" = $1;`,
			[id],
		);

		debug('findByPk : ', result.rows);
		return result.rows[0];
	},

	// TODO BATTLE INSERT : ADD USERS...
	async insert(battle) {
		const result = await client.query(
			`INSERT INTO "battle" ("start_date", "wished_player_number") VALUES ($1, $2) RETURNING *;`,
			[battle.start_date, battle.wished_player_number],
		);

		debug('insert : ', result.rows[0]);
		return result.rows[0];
	},

	// TODO BATTLE UPDATE
	/* 
	async update(id, battle) {
		const fields = Object.keys(battle).map(
			(prop, index) => `"${prop}" = $${index + 1}`,
		);
		const values = Object.values(battle);

		const result = await client.query(
			`UPDATE "battle" SET ${fields} WHERE "id" = $${
				fields.length + 1
			} RETURNING *`,
			[...values, id],
		);

		debug('update : ', result.rows[0]);
		return result.rows[0];
	},
	*/

	async delete(id) {
		const result = await client.query(`DELETE FROM "battle" WHERE id = $1`, [
			id,
		]);

		debug('delete : ', !!result.rowCount);
		return !!result.rowCount;
	},
};

export default battleDatamapper;
