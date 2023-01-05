import jwt  from 'jsonwebtoken'
import ApiError from '../errors/apiError.js'

export const tokenVerifier = (request, _response, next) => {
  const headerAuth =
    request.headers['x-access-token'] || request.headers.authorization
  if (!headerAuth)
    throw new ApiError('Unauthorized: token not found', {
			statusCode: 401,
		})

  const token = headerAuth.split('Bearer ')[1]

  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, decoded) => {
    if (error)
      throw new ApiError('Unauthorized: invalid token', { statusCode: 401 })

    request.connectedUser = decoded
    next()
  })
}

export const tokenGenerator = (user) => {
	return jwt.sign(
		{ id: user.id, role: user.role },
		process.env.SECRET_TOKEN_KEY,
		{ expiresIn: '2h' },
	)
}