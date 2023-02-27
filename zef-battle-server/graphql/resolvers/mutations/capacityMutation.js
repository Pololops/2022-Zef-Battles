import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'

export default {
	createCapacity: async (_, { params }, { dataSources }) => {
		const foundCapacity = await dataSources.capacity.isUnique(params.name)
		if (foundCapacity.length > 0) {
			throw new GraphQLError(
				`A capacity with the name ${params.name} already exists`,
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

		const capacity = await dataSources.capacity.insert(params)
		return {
			code: 200,
			success: true,
			message: 'The capacity was successfully created',
			capacity: capacity[0],
		}
	},

	updateCapacity: async (_, { id, params }, { dataSources }) => {
		const capacity = await dataSources.capacity.update(id, params)

		if (capacity.length === 0) {
			throw new GraphQLError(`Capacity with id = ${id} not found`, {
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
			message: 'The capacity was successfully updated',
			capacity: capacity[0],
		}
	},

	deleteCapacity: async (_, { id }, { dataSources }) => {
		const capacity = await dataSources.capacity.delete(id)

		if (!capacity) {
			throw new GraphQLError(`Capacity with id = ${id} not found`, {
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
			message: `Capacity with id = ${id} was successfully deleted`,
		}
	},
}
