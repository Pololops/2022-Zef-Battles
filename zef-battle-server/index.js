import dotenv from 'dotenv'
dotenv.config()

import Debug from 'debug'
const debug = Debug('Server:log')

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import typeDefs from './graphql/schema.js'
import resolvers from './graphql/resolvers/index.js'

import client from './graphql/database/index.js'

import {
	Family,
	Character,
	Capacity,
	CharacterCapacity,
	User
} from './graphql/datasources/index.js'

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
				family: new Family({ knexConfig: client, cache }),
				character: new Character({ knexConfig: client, cache }),
				capacity: new Capacity({ knexConfig: client, cache }),
				characterCapacity: new CharacterCapacity({ knexConfig: client, cache }),
				user: new User({ knexConfig: client, cache }),
			},
		}
	},
	listen: { port: PORT },
})
debug(`🚀  Server ready at ${url}`)
