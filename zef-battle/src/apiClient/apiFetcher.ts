interface FetchOptions {
	method: string,
	headers: {[key: string]: string},
	body?: BodyInit | null | undefined
}

type fetchApi = {
	statusCode: number,
	data: {[key: string]: unknown}[] | null
} | string;

export default async function fetchAPI(
	url: string, 
	method?: string, 
	data?: BodyInit | null | undefined, 
	dataType?: string
): Promise<fetchApi> {
	const timeBeforeAbort = 4000;
	const controller = new AbortController();
	const { signal } = controller;
	const timeout = setTimeout(() => controller.abort(), timeBeforeAbort);

	const options: FetchOptions = {
		method: method ?? 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	if (method !== 'GET' && method !== 'DELETE' && data) {
		if (dataType && dataType === 'formData') {
			options.headers.Accept = 'application/json, text/plain, */*';
			delete options.headers['Content-Type']; // = 'Content-Type': 'multipart/form-data'
			options.body = data;
		} else {
			options.body = JSON.stringify(data);
		}
	}

	try {
		const response = await fetch(url, {
			...options,
			signal,
		});

		if (response.status === 404) throw new Error('Données introuvable');

		return {
			statusCode: response.status,
			data: response.status !== 204 ? await response.json() : null,
		};
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === 'AbortError') return 'Operation timeout !';

			return error.message;
		} else {
			return `Une erreur s'est produite`;
		}
	} finally {
		clearTimeout(timeout);
	}
}
