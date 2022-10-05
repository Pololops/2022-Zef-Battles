import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardsContext } from '../../../contexts/cardsContext';

import Cards from '../../layout/Cards/Cards';

export default function FamiliesPage() {
	const { isLoading, infoMessage, errorMessage, families } =
		useContext(CardsContext);
	const { id } = useParams();
	const [characters, setCharacters] = useState([]);
	const [familyName, setFamilyName] = useState('');

	const getFamilyCharacters = () => {
		const familyId = Number(id);
		const findFamily = families.find((family) => family.id === familyId);
		if (findFamily) {
			setFamilyName(findFamily.name);
			setCharacters(findFamily.characters);
		}
	};

	useEffect(() => {
		(async () => {
			if (id) {
				await getFamilyCharacters();
			}
		})();

		return () => {
			setFamilyName('');
			setCharacters([]);
		}
	}, [families, id]);

	return (
		<>
			<h2>{id ? `La famille ${familyName}` : 'Les Familles'}</h2>
			<p>
				{isLoading && '...chargement en cours...'}
				{infoMessage !== '' && infoMessage}
				{errorMessage !== '' && errorMessage}
			</p>
			{id 
				? !isLoading && <Cards data={characters} isFamilyCard={false} />
				: !isLoading && <Cards data={families} isFamilyCard={true} />}
		</>
	);
}
