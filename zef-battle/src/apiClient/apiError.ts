import type { ReturnType } from './apiRequests';
export type ApiErrorConstructor = {
	statusCode: number
	message: string
}

class ApiError {
	private _statusCode: number
	private _message: string
	constructor({ statusCode, message }: ApiErrorConstructor) {
		this._statusCode = statusCode
		this._message = message
	}

	get format(): ReturnType {
		return {
			status: 'Error',
			statusCode: this._statusCode,
			data: this._message
		}
	}
};

export default ApiError;