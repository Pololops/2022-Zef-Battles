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
 * @property {number} number_of_players - The total number of players in each battle
 * @property {array<User>} players - Users in the battle
 */

/**
 * InputBattle model
 * @typedef {object} InputBattle
 * @property {number} wished_player_number - The quatity of wished user in the battle
 */

export default {
	async findAll(userId = 0, isPlayingInBattle = false) {
		let existsOrNot = 'NOT EXISTS';
		if (userId !== 0 && isPlayingInBattle === true) {
			existsOrNot = 'EXISTS';
		}

		const result = await client.query(
			`SELECT * FROM "battle_with_user" WHERE ${existsOrNot}(
				SELECT * FROM jsonb_array_elements("players") as "player" WHERE ("player"->>'id')::INT = $1
			);`,
			[userId],
		);

		debug('findAll : ', userId, isPlayingInBattle, existsOrNot, result.rows);
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

	// TODO : adapt insert method to battle
	/*
	async insert(battle) {
		const result = await client.query(
			`INSERT INTO "battle" ("start_date", "wished_player_number") VALUES ($1, $2) RETURNING *;`,
			[battle.start_date, battle.wished_player_number],
		);

		debug('insert : ', result.rows[0]);
		return result.rows[0];
	},
	*/

	// TODO : adapt update method to battle
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
