import { useEffect, useState } from 'react';

const timeBeforeAbort = 7000;
const controller = new AbortController();
const { signal } = controller;

const useFetch = (url, method, body, dataType) => {
	const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const timeoutBeforeAbort = setTimeout(() => controller.abort(), timeBeforeAbort);

  const fetchOptions = {
    method: method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  
  const fetchOptionsCustomizer = () => {
    if (method !== 'GET' && method !== 'DELETE' && body) {
      if (dataType && dataType === 'formData') {
        fetchOptions.headers.Accept = 'application/json, text/plain, */*';
        delete fetchOptions.headers['Content-Type']; // = 'Content-Type': 'multipart/form-data'
        
        fetchOptions.body = body;
      } else {
        fetchOptions.body = JSON.stringify(body);
      }
    }
  }

	const fetchData = async () => {  
		try {
      fetchOptionsCustomizer();

			const response = await fetch(url, {
				...fetchOptions,
				signal,
			});

			if (response.status === 404) return setError('Données introuvable');

			return setData(response.json());
		} catch (error) {
			if (error.name === 'AbortError') return setError('Operation timeout !');

			return setError(error.message);
		} finally {
			clearTimeout(timeoutBeforeAbort);
		}
  }

  useEffect(() => {
    if (!url) return;

    setData((async () => await fetchData())());
  }, [url])

  return data;
};

export default useFetch;
