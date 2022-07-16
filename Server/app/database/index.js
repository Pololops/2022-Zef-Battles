import pg from 'pg';
const { Pool } = pg;

const config = {
	connectionString: process.env.DATABASE_URL,

	// SSL config to connect to database on Heroku
	// ssl: {
	//     rejectUnauthorized: false,
	// },
};

const pool = new Pool(config);

module.exports = pool;
