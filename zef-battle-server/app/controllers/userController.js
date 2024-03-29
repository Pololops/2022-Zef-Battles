import Debug from 'debug'
const debug = Debug('Controller:userController:log')

import {
	compare as bcryptCompare,
	genSalt as bcryptGenSalt,
	hash as bcryptHash,
} from 'bcrypt'

import ApiError from '../errors/apiError.js'

import userDatamapper from '../models/user.js'
import { tokenGenerator } from '../middlewares/tokenManager.js'

export default {
	getAll: async (_request, response) => {
		const users = await userDatamapper.findAll()

		debug('getAll : ', users)
		return response.status(200).json(users)
	},

	getByPk: async (request, response) => {
		const id = parseInt(request.params.userId)
		const user = await userDatamapper.findByPk(id)
		if (!user || user.id !== id)
			throw new ApiError('This user does not exist', {
				statusCode: 404,
			})

		debug('getAll : ', user)
		return response.status(200).json({
			id: user.id,
			name: user.name,
			victory_number: user.victory_number,
			role: user.role
		})
	},

	create: async (request, response) => {
		if (request.body.password !== request.body.repeat_password) {
			throw new ApiError('Both passwords must be the same', {
				statusCode: 400,
			})
		}

		const user = await userDatamapper.isUnique(request.body)
		if (user) {
			throw new ApiError('This user name already exists', {
				statusCode: 409,
			})
		}

		const bcryptSalt = await bcryptGenSalt(10)
		const encryptedPassword = await bcryptHash(
			request.body.password,
			bcryptSalt,
		)
		request.body.password = encryptedPassword

		const savedUser = await userDatamapper.insert(request.body)

		debug('create : ', savedUser)

		// AutoLogin User
		const generatedToken = tokenGenerator(savedUser)

		return response.status(200).json({
			token: generatedToken,
			user: {
				id: savedUser.id,
				name: savedUser.name,
				victory_number: savedUser.victory_number,
				role: savedUser.role,
			},
		})
	},

	update: async (request, response) => {
		const id = parseInt(request.params.userId)

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

		const bcryptSalt = await bcryptGenSalt(10)
		const encryptedPassword = await bcryptHash(
			request.body.password,
			bcryptSalt,
		)
		request.body.password = encryptedPassword

		const userToSave = {
			name: request.body.name,
			password: request.body.password,
		}
		if (request.connectedUser.role === 'admin') {
			userToSave.role = request.body.role
		}

		const savedUser = await userDatamapper.update(id, userToSave)

		debug('update : ', savedUser)
		return response.status(200).json(savedUser)
	},

	delete: async (request, response) => {
		const id = parseInt(request.params.userId)
		const deletedUser = await userDatamapper.delete(id)

		if (!deletedUser)
			throw new ApiError('This user does not exists', { statusCode: 404 })

		debug('delete : ', deletedUser)
		return response.status(204).json()
	},

	login: async (request, response) => {
		const foundUser = await userDatamapper.findByName(request.body.login)
		if (
			!foundUser || 
			!(await bcryptCompare(request.body.password, foundUser.password))
		)
			throw new ApiError('Login and password are not correct', {
				statusCode: 400,
			})

		const generatedToken = tokenGenerator(foundUser)

		return response.status(200).json({
			token: generatedToken,
			user: {
				id: foundUser.id,
				name: foundUser.name,
				victory_number: foundUser.victory_number,
				role: foundUser.role,
			},
		})
	},
}
