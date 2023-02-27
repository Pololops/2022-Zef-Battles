import jwt from 'jsonwebtoken'

const getSecretKey = () => process.env.SECRET_TOKEN_KEY

export const tokenGenerator = (user) => {
	return jwt.sign(
		{ 
			id: user.id,
			name: user.name,
			victory_number: user.victory_number,
			role: user.role,
		}, 
		getSecretKey(), {
			expiresIn: '1d',
		}
	)
}

// TODO : Update function for GraphQL and Apollo Server context
export const tokenVerifier = (request, _response, next) => {
	const token = getTokenFromHeader(request)

	jwt.verify(token, getSecretKey(), (error, decoded) => {
		if (error) {
			let message = ''
			if (new Date(error.expiredAt).getTime() < Date.now()) {
				message = 'Unauthorized: token expired'
			} else {
				message = 'Unauthorized: invalide token'
			}

			throw new ApiError(message, { statusCode: 401 })
		}

		request.connectedUser = decoded
		next()
	})
}

// TODO : Update function for GraphQL and Apollo Server context
const getTokenFromHeader = (request) => {
	const headerAuth =
		request.headers['x-access-token'] || request.headers.authorization

	if (!headerAuth)
		throw new ApiError('Unauthorized: token not found', {
			statusCode: 401,
		})

	return headerAuth.split('Bearer ')[1]
}
