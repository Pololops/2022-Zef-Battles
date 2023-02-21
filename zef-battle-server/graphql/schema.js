import gql from 'graphql-tag'

const typeDefs = gql`#graphql
	#### Schemas
	type Family {
		id: ID!
		name: String!
	}

	#### GET Requests
	type Query {
		hello: String

		"List of families"
		families: [Family]
	}
`

export default typeDefs
