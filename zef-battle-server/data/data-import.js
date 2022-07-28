import dotenv from 'dotenv';
dotenv.config();

import Debug from 'debug';
const debug = Debug('import-data');

import pg from 'pg';
const { Client } = pg;

import fs from 'fs';

const clientConfig = {
	connectionString: process.env.DATABASE_URL,
	// ssl: {
	// 	rejectUnauthorized: false,
	// },
};

const client = new Client(clientConfig);

const seedSql = fs.readFileSync('./data/data-seed.sql', 'utf-8');

(async () => {
	debug('Client connexion');
	await client.connect();

	debug('Database Seeding...');
	await client.query(seedSql);

	debug('Close connexion');
	await client.end();
})();
