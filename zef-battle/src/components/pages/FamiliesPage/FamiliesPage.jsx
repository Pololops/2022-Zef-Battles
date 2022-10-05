import { useContext, useEffect } from 'react';
import { CardsContext } from '../../../contexts/cardsContext';

import Cards from '../../layout/Cards/Cards';

export default function FamiliesPage() {
	const { isLoading, infoMessage, errorMessage, data } =
		useContext(CardsContext);

	return (
		<>
			<h2>Page des personnages</h2>
			<p>
				{isLoading && '...chargement en cours...'}
				{infoMessage !== '' && infoMessage}
				{errorMessage !== '' && errorMessage}
			</p>

			{!isLoading && <Cards data={data} />}
		</>
	);
}
