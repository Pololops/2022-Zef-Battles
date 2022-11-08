export default async function fetchAPI(url, method, data, dataType) {
	const timeBeforeAbort = 4000;
	const controller = new AbortController();
	const { signal } = controller;
	const timeout = setTimeout(() => controller.abort(), timeBeforeAbort);

	const options = {
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

		return await response.json();
	} catch (error) {
		if (error.name === 'AbortError') return 'Operation timeout !';

		return error.message;
	} finally {
		clearTimeout(timeout);
	}
}
