import dotenv from 'dotenv'
dotenv.config()

import Debug from 'debug'
const debug = Debug('Server:log')

const { ApolloServer } = require('apollo-server')

// import app from './app/app.js'

const port = process.env.PORT || 5000

app.listen(port).then(({ url }) => {
	debug(`🚀 Server started with GraphQL on ${url}`)
})
