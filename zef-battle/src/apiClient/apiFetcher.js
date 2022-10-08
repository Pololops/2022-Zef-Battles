export default async function fetchAPI(url, method, body) {
	const options = {
		...method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

  if (body) options.body = JSON.stringify(body);

	try {
		const response = await fetch(url, options);
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}
