export default async function fetchAPI(url, method, body) {
	const options = {
		method: method ?? 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	if (body) options.body = JSON.stringify(body);

	try {
		const response = await fetch(url, options);

		if (response.status === 404) throw new Error('Données introuvable');

		return await response.json();
	} catch (error) {
		return error.message;
	}
}
