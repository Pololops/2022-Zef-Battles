// Middleware pour factoriser tous les try...catch des controllers et appeler dans les routers

/**
 * Controller wrapper to manage errors
 * @param {object} controller a controller to execute inside a try… catch… block
 * @returns {object} a controller as middleware function
 */
const controllerHandler = (controller) => async (request, response, next) => {
	try {
		await controller(request, response, next);
	} catch (error) {
		next(error);
	}
};

export default controllerHandler;
