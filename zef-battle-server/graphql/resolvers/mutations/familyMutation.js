import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'

export default {
	createFamily: async (_, { params }, { dataSources }) => {
		const foundFamily = await dataSources.family.findByName(params.name)
		if (foundFamily.length > 0) {
			throw new GraphQLError(
				`A family with the name ${params.name} already exists`,
				{
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
						http: {
							status: 404,
						},
					},
				},
			)
		}

		const family = await dataSources.family.insert(params)
		return {
			code: 200,
			success: true,
			message: 'The family was successfully created',
			family: family[0],
		}
	},

	updateFamily: async (_, { id, params }, { dataSources }) => {
		const family = await dataSources.family.update(id, params)

		if (family.length === 0) {
			throw new GraphQLError(`Family with id = ${id} not found`, {
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
			message: 'The family was successfully updated',
			family: family[0],
		}
	},

	deleteFamily: async (_, { id }, { dataSources }) => {
		const family = await dataSources.family.delete(id)

		if (!family) {
			throw new GraphQLError(`Family with id = ${id} not found`, {
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
			message: `Family with id = ${id} was successfully deleted`,
		}
	},
}
