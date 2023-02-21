import dotenv from 'dotenv'
dotenv.config()

import Debug from 'debug'
const debug = Debug('Server:log')

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import pool from './graphql/database/index.js'
import typeDefs from './graphql/schema.js'
import resolvers from './graphql/resolvers/index.js'
import Family from './graphql/datasources/family.js'
// import Character from './graphql/datasources/character.js'

const PORT = process.env.PORT ?? 5000

const config = {
	client: 'pg',
	connection: pool,
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

const { url } = await startStandaloneServer(server, {
	listen: { port: PORT },
	// context: async () => {
	// 	const { cache } = server
	// 	return {
	// 		dataSources: {
	// 			family: new Family({ cache, config }),
	// 		},
	// 	}
	// },
})

debug(`🚀 Server ready at ${url}`)
