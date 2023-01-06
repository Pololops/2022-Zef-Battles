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

const bcryptSalt = await bcryptGenSalt(10)

export default {
	getAll: async (_request, response) => {
		const users = await userDatamapper.findAll()

		debug('getAll : ', users)
		return response.status(200).json(users)
	},

	getByPk: async (request, response) => {
		const user = await userDatamapper.findByPk(parseInt(request.params.id))
		if (!user)
			throw new ApiError('This user does not exist', {
				statusCode: 404,
			})

		if (user.id !== parseInt(request.params.id))
			throw new ApiError('This user does not exist', {
				statusCode: 404,
			})

		debug('getAll : ', user)
		return response.status(200).json(user)
	},

	create: async (request, response) => {
		const user = await userDatamapper.isUnique(request.body)
		if (user) {
			throw new ApiError('This user name already exists', {
				statusCode: 400,
			})
		}

		const encryptedPassword = await bcryptHash(
			request.body.password,
			bcryptSalt,
		)
		request.body.password = encryptedPassword

		const savedUser = await userDatamapper.insert(request.body)

		debug('create : ', savedUser)
		return response.status(200).json(savedUser)
	},

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

		const encryptedPassword = await bcryptHash(user.password, bcryptSalt)

		const userToSave = {
			name: request.body.name,
			password: encryptedPassword,
		}
		if (request.connectedUser.role === 'admin') {
			userToSave.role = request.body.role
		}

		const savedUser = await userDatamapper.update(id, userToSave)

		debug('update : ', savedUser)
		return response.status(200).json(savedUser)
	},

	delete: async (request, response) => {
		const deletedUser = await userDatamapper.delete(parseInt(request.params.id))

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
