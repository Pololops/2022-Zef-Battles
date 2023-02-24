import dotenv from 'dotenv'
dotenv.config()

import Debug from 'debug'
const debug = Debug('Server:log')

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
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
})

const PORT = process.env.PORT ?? 5000

const { url } = await startStandaloneServer(server, {
	context: async () => {
		const { cache } = server
		return {
			dataSources: {
				family: new Family({ cache, dbConfig }),
				character: new Character({ cache, dbConfig }),
				capacity: new Capacity({ cache, dbConfig }),
			},
		}
	},
	listen: { port: PORT },
})
debug(`🚀  Server ready at ${url}`)
