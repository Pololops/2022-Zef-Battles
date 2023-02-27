import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'

import { compare, genSalt, hash } from 'bcrypt'
import { tokenGenerator } from '../../services/tokenManager.js'

export default {
	login: async (_, { params }, { dataSources }) => {
		const user = await dataSources.user.findByName(params.name)

		if (
			user.length === 0 ||
			!(await compare(params.password, user[0].password))
		) {
			throw new GraphQLError(`Login and/or password are not correct`, {
				extensions: {
					code: ApolloServerErrorCode.BAD_REQUEST,
					http: {
						status: 400,
					},
				},
			})
		}

		const generatedToken = tokenGenerator(user)

		return {
			code: 200,
			success: true,
			message: 'Successfully login',
			token: generatedToken,
			user: user[0],
		}
	},

	createUser: async (_, { params }, { dataSources }) => {
		const foundUser = await dataSources.user.findByName(params.name)
		if (foundUser.length > 0) {
			throw new GraphQLError(
				`A user with the name ${params.name} already exists`,
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

		const salt = await genSalt(10)
		const encryptedPassword = await hash(params.password, salt)
		params.password = encryptedPassword

		const user = await dataSources.user.insert(params)

		//? AutoLogin User
		const generatedToken = tokenGenerator(user)

		return {
			code: 200,
			success: true,
			message: 'The user was successfully created',
			token: generatedToken,
			user: user[0],
		}
	},

	updateUser: async (_, { id, params }, { dataSources }) => {
		const user = await dataSources.user.findByPk(id)

		if (params.name) {
			const existingUser = await dataSources.user.isUnique(params)

			if (existingUser.length > 0) {
				throw new GraphQLError(
					`A user with the name ${params.name} already exists`,
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
		}

		if (params.password) {
			const salt = await genSalt(10)
			const encryptedPassword = await hash(params.password, salt)
			params.password = encryptedPassword
		}

		return {
			code: 200,
			success: true,
			message: 'The user was successfully updated',
			user: user[0],
		}
	},

	deleteUser: async (_, { id }, { dataSources }) => {
		const user = await dataSources.user.delete(id)

		if (!user) {
			throw new GraphQLError(`User with id = ${id} not found`, {
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
			message: `User with id = ${id} was successfully deleted`,
		}
	},
}
