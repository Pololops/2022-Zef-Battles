import ApiError from './apiError'

type RequestAPIConstructor = {
	url: string
	method?: 'GET' | 'POST' | 'UPDATE' | 'DELETE'
	body?: unknown
	hasFormdata?: boolean
}

class RequestAPI {
	private TIME_BEFORE_ABORT: number = 7000

	private url: string
	private hasFormdata: boolean
	private method: 'GET' | 'POST' | 'UPDATE' | 'DELETE'
	private headers: { [key: string]: string }
	private body?: unknown
	private abortController: AbortController
	private abortTimeOut: ReturnType<typeof setTimeout>

	constructor({url, method = 'GET', body, hasFormdata = false}: RequestAPIConstructor) {
		this.url = url
		this.method = method
		this.hasFormdata = hasFormdata ?? false
		this.headers = this.setHeaders()
		this.body = this.setBody(body)
		this.abortController = this.getAbortController()
		this.abortTimeOut = this.setTimeOutBeforeAbort(this.abortController)
	}

	async fetch() {
		try {
			const response = await fetch(this.url, {
				method: this.method,
				headers: this.headers,
				body: this.body as BodyInit,
				signal: this.abortController.signal
			});

			if (!response.ok) throw new ApiError(await response.json())

			return {
				status: 'OK',
				statusCode: response.status,
				data: response.status !== 204 && await response.json(),
			};
		} catch (error) {
			if (error instanceof ApiError) return error.format

			return new ApiError({
				statusCode: 500,
				message: 'Une erreur inconnue est survenue !'
			}).format
		} finally {
			clearTimeout(this.abortTimeOut)
		}
	}

	setBody<T>(body: T): string | T | undefined {
		if (!body) return undefined
		return this.isFormdataBody() ? body : JSON.stringify(body)
	}

	isFormdataBody(): boolean {
		const hasFormdata = this.hasFormdata
		return (this.isPostOrPatchRequest() && hasFormdata)
	}

	isPostOrPatchRequest(): boolean {
		const method = this.method
		return (method !== 'GET' && method !== 'DELETE')
	}

	setHeaders(): { [key: string]: string }{
		const newHeaders: { [key: string]: string } = {
			Accept: this.isFormdataBody() ? 'application/json, text/plain, text/html, */*' : 'application/json'
		}
		if (!this.isFormdataBody()) newHeaders['Content-Type'] = 'application/json'

		return { ...this.headers, ...newHeaders }
	}

	getAbortController(): AbortController {
		const controller = new AbortController();
		return controller
	}

	setTimeOutBeforeAbort(controller: AbortController) {
		return setTimeout(() => controller.abort(), this.TIME_BEFORE_ABORT)
	}
}

export default RequestAPI
