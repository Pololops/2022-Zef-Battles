import { useEffect, useState } from 'react';

import { getFamilies } from '../../../apiClient/apiRequests.js';

import Cards from '../../layout/Cards/Cards';

export default function FamiliesPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [families, setFamilies] = useState([]);
	const [infoMessage, setInfoMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleData = async () => {
		try {
			const data = await getFamilies();

			if (data && data !== undefined) {
				if (data.length > 0) {
					setFamilies(data);
				} else {
					setInfoMessage('Aucun élément trouvé !');
				}
			}
		} catch (error) {
			setErrorMessage(`Une erreur inconnue est survenue`);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			await handleData();
		})();
	}, []);

	return (
		<>
			<h2>Page des personnages</h2>
			<p>
				{isLoading && '...chargement en cours...'}
				{infoMessage !== '' && infoMessage}
				{errorMessage !== '' && errorMessage}
			</p>

			{!isLoading && <Cards data={families} />}
		</>
	);
}
