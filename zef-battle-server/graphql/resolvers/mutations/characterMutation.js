import Debug from 'debug'
const debug = Debug('Graphql:Mutations:log')

import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'

export default {
	createCharacter: async (_, { params }, { dataSources }) => {
		const family = await dataSources.family.findByPk(params.family_id)
		if (family.length === 0) {
			throw new GraphQLError(`Family with id = ${params.family_id} not found`, {
				extensions: {
					code: ApolloServerErrorCode.BAD_USER_INPUT,
					http: {
						status: 404,
					},
					validationErrors,
				},
			})
		}

		const foundCharacter = await dataSources.character.findByName(params)
		if (foundCharacter.length > 0) {
			throw new GraphQLError(
				`A character with the name ${params.name} already exists`,
				{
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
						http: {
							status: 400,
						},
					},
				},
			)
		}

		const character = await dataSources.character.insert(params)
		return {
			code: 200,
			success: true,
			message: 'The character was successfully created',
			character: character[0],
		}
	},

	updateCharacter: async (_, { id, params }, { dataSources }) => {
		const character = await dataSources.character.update(id, params)

		if (character.length === 0) {
			throw new GraphQLError(`Character with id = ${id} not found`, {
				extensions: {
					code: ApolloServerErrorCode.BAD_USER_INPUT,
					http: {
						status: 404,
					},
				},
			})
		}

		return {
			code: 200,
			success: true,
			message: 'The character was successfully updated',
			character: character[0],
		}
	},

	deleteCharacter: async (_, { id }, { dataSources }) => {
		const character = await dataSources.character.delete(id)

		if (!character) {
			throw new GraphQLError(`Character with id = ${id} not found`, {
				extensions: {
					code: ApolloServerErrorCode.BAD_USER_INPUT,
					http: {
						status: 404,
					},
				},
			})
		}

		return {
			code: 200,
			success: true,
			message: `Character with id = ${id} was successfully deleted`,
		}
	},
}
