import Debug from 'debug';
const debug = Debug('Validator:log');

import ApiError from '../errors/apiError.js' 

/**
 * A middleware genrator for the validation of an object pass in request property.
 * @param {string} prop - The request object's property name to validate
 * @param {Joi.object} schema - The Joi's validation schema
 * @returns {Function} - A middleware for express that validate the request body using the schema in parameter.
 * Returns an 400 error if the validation failed.
 */
const validate = (prop, schema) => async (request, _, next) => {
    try {
        debug(request[prop]);
        await schema.validateAsync(request[prop]);
        next();
    } catch (error) {
        next(new ApiError(error.details[0].message, { statusCode: 400 }));
    }
};

export default validate;
