import dotenv from 'dotenv'
dotenv.config()

import Debug from 'debug'
const debug = Debug('Server:log')

import { ApolloServer } from 'apollo-server'
import typeDefs from './graphql/schema.js'
import resolvers from './graphql/resolvers/index.js'

import pool from './graphql/database/index.js'

import { Family, Character, Capacity } from './graphql/datasources/index.js'

const dbConfig = {
	client: 'pg',
	connection: pool,
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		family: new Family(dbConfig),
		character: new Character(dbConfig),
		capacity: new Capacity(dbConfig),
	}),
})

const PORT = process.env.PORT ?? 5000

server
	.listen(PORT)
	.then(() => debug(`✅ Server started at : http://localhost:${PORT}`))
