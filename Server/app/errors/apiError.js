/**
 * @typedef {object} ApiError
 * @property {string} status - Status
 * @property {number} statusCode - HTTP Status code
 * @property {string} message - Error message
 */
export default class ApiError extends Error {
	constructor(message, infos) {
		super(message);
		this.infos = infos;
	}
};
