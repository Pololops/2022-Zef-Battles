import { useContext } from 'react';
import { CardsContext } from '../../../contexts/cardsContext';

import App from '../../App/App';

export default function HomePage() {
	const { isLoading, errorMessage, families } = useContext(CardsContext);
	console.log(families);
	return (
		<>
			<h2>Page d'accueil</h2>
			<p>
				{isLoading && '...chargement en cours...'}
				{errorMessage !== '' && errorMessage}
			</p>
			<App />
		</>
	);
}
