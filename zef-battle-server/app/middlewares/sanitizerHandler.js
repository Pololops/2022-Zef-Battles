import Debug from 'debug';
const debug = Debug('Sanitizer:log');

import xss from 'xss';

import ApiError from '../errors/apiError.js';

/**
 * A middleware that sanitize data to prevent XSS.
 * @param {string} prop - The request object's property name to validate (body | params | query)
 * @returns {Function} - A middleware for express that sanitize the request.body|params|query data.
 * Returns an 400 error if the purification failed.
 */
const sanitize = (prop) => async (request, _, next) => {
	try {
		debug('Request input data : ', request[prop]);

		Object.entries(request[prop]).forEach(
			([key, value]) => (request[prop][key] = xss(value)),
		);

		debug('Request sanitize output data : ', request[prop]);

		next();
	} catch (error) {
		next(new ApiError(error.message, { statusCode: 400 }));
	}
};

export default sanitize;
