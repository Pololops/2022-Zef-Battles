import gql from 'graphql-tag'

const typeDefs = gql`
	#graphql
	#### GET Requests
	type Query {
		"All families"
		families: [Family]

		"One family "
		family(id: ID!): Family

		"One character"
		character(id: ID!): Character

		"All capacities"
		capacities: [Capacity]

		"One capacity"
		capacity(id: ID!): Capacity
	}

	#### Get Schemas
	type Family {
		id: ID
		name: String
		characters: [Character]
	}

	type Character {
		id: ID
		name: String
		picture: String
		character_capacities: [CharacterCapacity]
		family_id: Int
		family: Family
	}

	type Capacity {
		id: ID
		name: String
		description: String
		capacity_characters: [CharacterCapacity]
	}

	type CharacterCapacity {
		id: ID
		level: Int
		character_id: Int
		capacity_id: Int
		character: Character
		capacity: Capacity
	}
`

export default typeDefs
