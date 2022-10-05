import { useContext, useState, useEffect } from 'react';
import { CardsContext } from '../../../contexts/cardsContext';

import Cards from '../../layout/Cards/Cards';

export default function FamiliesPage() {
	const {
		isLoading,
		infoMessage,
		errorMessage,
		families,
		familyId,
	} = useContext(CardsContext);
	const [data, setData] = useState([])

	const getData = () => {
		if (familyId !== null) {
			const findFamily = families.find(({ id }) => id === familyId);
			if (findFamily) return setData(findFamily);
		}
			
		setData(families);
	}

	useEffect(() => {
		if (familyId !== null) getData();
	}, [familyId]);

	return (
		<>
			<h2>{familyId !== null ? 'Les Familles' : 'Une famille'}</h2>
			<p>
				{isLoading && '...chargement en cours...'}
				{infoMessage !== '' && infoMessage}
				{errorMessage !== '' && errorMessage}
			</p>
			{console.log(familyId, data)}
			{data.length > 0
				? !isLoading && <Cards data={data} isFamilyCard={false} />
				: !isLoading && <Cards data={families} isFamilyCard={true} />}
		</>
	);
}
