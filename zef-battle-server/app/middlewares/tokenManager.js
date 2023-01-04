import Debug from 'debug'
const debug = Debug('tokenManager:log')

import jwt  from 'jsonwebtoken'
import ApiError from '../errors/apiError.js'

export const tokenVerifier = (request, _response, next) => {
  const headerAuth =
    request.headers['x-access-token'] || request.headers.authorization
  if (!headerAuth)
    throw new ApiError('Accès refusé : Token introuvable', {
			statusCode: 401,
		})

  const token = headerAuth.split('Bearer ')[1]

  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, decoded) => {
    if (error)
      throw new ApiError('Accès refusé : Token invalide', { statusCode: 401 })

    request.body.user = decoded
    next()
  })
}

export const tokenGenerator = (user) => {
	return jwt.sign(
		{ userId: user.id },
		process.env.SECRET_TOKEN_KEY,
		{ expiresIn: '2h' },
	)
}