import Debug from 'debug';
const debug = Debug('ErrorHandler:log');

/**
 * Middleware that respond to a next method with an error as argument
 * @param {object} err Error class
 * @param {object} res Express response object
 */
const errorHandler = (err, res) => {
	let { message } = err;
	let statusCode = err.infos?.statusCode;

	if (!statusCode || Number.isNaN(Number(statusCode))) {
		statusCode = 500;
	}

	if (!statusCode || statusCode !== 404) {
		// logger.error(err);
	} else {
		debug(err);
	}

	return res.status(statusCode).json({
		status: 'error',
		statusCode,
		message,
	});
};

export default errorHandler;
