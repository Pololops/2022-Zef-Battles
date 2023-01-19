import Debug from 'debug'
const debug = Debug('Middleware:tokenManager:log')

import jwt from 'jsonwebtoken'
import ApiError from '../errors/apiError.js'

const getSecretKey = () => process.env.SECRET_TOKEN_KEY

export const tokenGenerator = (user) => {
	return jwt.sign({ id: user.id, role: user.role }, getSecretKey(), {
		expiresIn: '1d',
	})
}

export const tokenVerifier = (request, _response, next) => {
	const token = getTokenFromHeader(request)

	jwt.verify(token, getSecretKey(), (error, decoded) => {
		if (error) {
			debug('ERROR EXPIRED AT : ', error.expiredAt)
			// const expirationDate = new Date(decoded.exp * 1000).getTime()
			if (new Date(error.expiredAt).getTime() < Date.now())
				throw new ApiError('Unauthorized: token expired', { statusCode: 401 })

			throw new ApiError('Unauthorized: invalide token', { statusCode: 401 })
		}

		request.connectedUser = decoded
		next()
	})
}

const getTokenFromHeader = (request) => {
	const headerAuth =
		request.headers['x-access-token'] || request.headers.authorization

	if (!headerAuth)
		throw new ApiError('Unauthorized: token not found', {
			statusCode: 401,
		})

	return headerAuth.split('Bearer ')[1]
}
