import { useContext } from 'react';
import { CardsContext } from '../../../contexts/cardsContext';

import Cards from '../../layout/Cards/Cards';

export default function FamiliesPage() {
	const { isLoading, infoMessage, errorMessage, families, familyIds, setFamilyIds } =
		useContext(CardsContext);

	return (
		<>
			<h2>{familyIds.length === 0 ? 'Les Familles' : 'Une famille'}</h2>
			<p>
				{isLoading && '...chargement en cours...'}
				{infoMessage !== '' && infoMessage}
				{errorMessage !== '' && errorMessage}
			</p>

			{!isLoading && <Cards data={families} />}
		</>
	);
}
