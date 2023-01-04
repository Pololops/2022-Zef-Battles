import Debug from 'debug'
const debug = Debug('Controller:userController:log')

import ApiError from '../errors/apiError.js'

import userDatamapper from '../models/user.js'
import { tokenGenerator } from '../middlewares/tokenManager.js'

export default {
	// TODO : debug the getAll user method to prevent players from running it
	getAll: async (_request, response) => {
		const users = await userDatamapper.findAll()

		debug('getAll : ', users)
		return response.status(200).json(users)
	},

	create: async (request, response) => {
		const user = await userDatamapper.isUnique(request.body)
		if (user) {
			throw new ApiError('This user name already exists', {
				statusCode: 400,
			})
		}

		const savedUser = await userDatamapper.insert(request.body)

		debug('create : ', savedUser)
		return response.status(200).json(savedUser)
	},

	// TODO : debug the update user method with token verifier and admin or the right player
	update: async (request, response) => {
		const id = parseInt(request.params.id)

		const user = await userDatamapper.findByPk(id)
		if (!user)
			throw new ApiError('This user does not exists', { statusCode: 404 })

		if ((request.body.name, id)) {
			const existingUser = await userDatamapper.isUnique(request.body)
			if (existingUser && user.name !== request.body.name) {
				throw new ApiError('Another user already exists with this name', {
					statusCode: 400,
				})
			}
		}

		const savedUser = await userDatamapper.update(id, request.body)

		debug('update : ', savedUser)
		return response.status(200).json(savedUser)
	},

	// TODO : debug the delete user method to prevent players from running it
	delete: async (request, response) => {
		const deletedUser = await userDatamapper.delete(parseInt(request.params.id))

		if (!deletedUser)
			throw new ApiError('This user does not exists', { statusCode: 404 })

		debug('delete : ', deletedUser)
		return response.status(204).json()
	},

	login: async (request, response) => {
		const foundUser = await userDatamapper.findByName(request.body.login)
		if (!foundUser)
			throw new ApiError('Login and password are not correct', {
				statusCode: 400,
			})

		const generatedToken = tokenGenerator(foundUser)

		return response.status(200).json({
			token: generatedToken,
			user: {
				id: foundUser.id,
				name: foundUser.name,
			},
		})
	},
}
