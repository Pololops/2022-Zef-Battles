export default async function getData(url, method) {
  const options = {
    ...method,
	 	headers: {
	 		Accept: 'application/json',
	 	},
	// 	// body: JSON.stringify(body),
	};

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
