type APIFetcherArgumentsType = {
	url: string
	method?: 'GET' | 'POST' | 'UPDATE' | 'DELETE'
	body?: BodyInit
	dataType?: 'formData'
}

type FetchOptions = {
	method: string,
	headers: {[key: string]: string},
	body?: BodyInit,
	signal?: AbortSignal
}

const fetchAPI = async ({
	url, 
	method, 
	body, 
	dataType
}: APIFetcherArgumentsType) => {
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

	if (method !== 'GET' && method !== 'DELETE' && body) {
		if (dataType && dataType === 'formData') {
			options.headers.Accept = 'application/json, text/plain, text/html, */*';
			delete options.headers['Content-Type']; // = 'Content-Type': 'multipart/form-data'
			options.body = body;
		} else {
			options.body = JSON.stringify(body);
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
			if (error.name === 'AbortError') {
				return {
					statusCode: 408,
					data: 'Operation timeout !'
				};
			}
		} 

		return {
				statusCode: 500,
				data: 'Une erreur est survenue !',
			};
	} finally {
		clearTimeout(timeout);
	}
}

export default fetchAPI;
