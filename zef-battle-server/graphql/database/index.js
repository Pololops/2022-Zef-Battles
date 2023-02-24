import dotenv from 'dotenv'
dotenv.config()

// import Debug from 'debug'
// const debug = Debug('DB:log')

import pg from 'pg'
const { Pool } = pg

const config = {
	connectionString: process.env.DATABASE_URL,
}

const pool = new Pool(config)
export default pool
