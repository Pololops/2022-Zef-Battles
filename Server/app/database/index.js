import dotenv from 'dotenv';
dotenv.config();

import Debug from 'debug';
const debug = Debug('SQL:log');

import pg from 'pg';
const { Pool } = pg;

const config = {
	connectionString: process.env.DATABASE_URL,
};

// if (process.env.NODE_ENV === 'production') {
// 	config.ssl = {
// 		rejectUnauthorized: false,
// 	};
// }

const pool = new Pool(config);

const client = {
	originalClient: pool,

	async query(...params) {
		debug('SQL request : ', ...params);

		return this.originalClient.query(...params);
	},
};

export default client;
