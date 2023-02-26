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

	#### Mutations (POST, PUT, PATCH, DELETE)
	type Mutation {
		###Mutations for families
		"Create a new family"
		createFamily(params: FamilyCreateContent): FamilyMutationResponse

		"Update a family"
		updateFamily(id: ID!, params: FamilyUpdateContent): FamilyMutationResponse

		"Delete a family"
		deleteFamily(id: ID!): FamilyMutationResponse

		###Mutations for characters
		"Create a new character"
		createCharacter(params: CharacterCreateContent): CharacterMutationResponse

		"Update a character"
		updateCharacter(
			id: ID!
			params: CharacterUpdateContent
		): CharacterMutationResponse

		"Delete a character"
		deleteCharacter(id: ID!): CharacterMutationResponse

		###Mutations for capacities
		"Create a new capacity"
		createCapacity(params: CapacityCreateContent): CapacityMutationResponse

		"Update a capactity"
		updateCapacity(
			id: ID!
			params: CapacityUpdateContent
		): CapacityMutationResponse

		"Delete a capactity"
		deleteCapacity(id: ID!): CapacityMutationResponse
	}

	#### POST input types
	input FamilyCreateContent {
		name: String!
	}

	input CharacterCreateContent {
		name: String!
		picture: String!
		family_id: Int!
	}

	input CapacityCreateContent {
		name: String!
		description: String
	}

	#### PATCH / PUT Input types
	input FamilyUpdateContent {
		name: String
	}

	input CharacterUpdateContent {
		name: String
		picture: String
	}

	input CapacityUpdateContent {
		name: String
		description: String
	}

	#### POST, PATCH / PUT and DELETE Responses
	interface MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
	}

	type FamilyMutationResponse implements MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
		family: Family
	}

	type CharacterMutationResponse implements MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
		character: Character
	}

	type CapacityMutationResponse implements MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
		capacity: Capacity
	}
`

export default typeDefs
