import { useContext, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CardsContext } from '../../../contexts/cardsContext';

import './CardsPage.scss';

import Cards from '../../layouts/cards-layout/Cards/Cards';

export default function FamiliesPage() {
	const { isLoading, errorMessage, families } = useContext(CardsContext);
	const { id } = useParams();
	const [characters, setCharacters] = useState([]);
	const [familyName, setFamilyName] = useState('');
	const [familyId, setFamilyId] = useState(0);

	const getFamilyCharacters = useMemo(
		() => async () => {
			const familyId = Number(id);
			const findFamily = await families.find((family) => family.id === familyId);
			if (findFamily) {
				setFamilyName(findFamily.name);
				setFamilyId(findFamily.id);
				setCharacters(findFamily.characters);
			}
		},
		[families, id],
	);

	useEffect(() => {
		if (id) {
			getFamilyCharacters();
		}
	}, [getFamilyCharacters, id]);

	return (
		<>
			<h2>{id ? `La famille ${familyName}` : 'Les Familles'}</h2>
			<p>
				{isLoading && '...chargement en cours...'}
				{errorMessage !== '' && errorMessage}
			</p>
			{errorMessage === '' && (
				<div className="cards">
					{id
						? !isLoading && (
								<Cards
									data={characters}
									isFamilyCard={false}
									familyName={familyName}
									familyId={familyId}
								/>
						  )
						: !isLoading && <Cards data={families} isFamilyCard={true} />}
				</div>
			)}
		</>
	);
}
