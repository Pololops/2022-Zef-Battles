import ApiError from '../errors/apiError.js'

export const isAdmin = async (request, _response, next) => {
	const { role } = request.connectedUser

	if (role !== 'admin')
		throw new ApiError("Forbidden: you don't have permissions", {
			statusCode: 403,
		})

	next()
}

export const isLegitOrAdmin = async (request, _response, next) => {
	const { role, id } = request.connectedUser

	if (role !== 'admin' && parseInt(request.params.id) !== parseInt(id)) {
		throw new ApiError("Forbidden: you don't have permissions", {
			statusCode: 403,
		})
	}

	next()
}
