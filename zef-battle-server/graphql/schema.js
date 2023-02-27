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

		"All users"
		users: [User]

		"One user"
		user(id: ID!): User
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

	type User {
		id: ID
		name: String!
		visctory_number: Int
		role: String
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

		###Mutations for users
		"Create a new user"
		login(params: Login): LoginMutationResponse

		"Create a new user"
		createUser(params: UserCreateContent): UserMutationResponse

		"Update a user"
		updateUser(id: ID!, params: UserUpdateContent): UserMutationResponse

		"Delete a user"
		deleteUser(id: ID!): UserMutationResponse
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

	input Login {
		name: String!
		password: String!
	}

	input UserCreateContent {
		name: String!
		password: String!
		role: String
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

	input UserUpdateContent {
		name: String
		password: String
		victory_number: Int
		role: String
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

	type UserMutationResponse implements MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
		user: User
	}

	type LoginMutationResponse implements MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
		token: String!
		user: User
	}
`

export default typeDefs
