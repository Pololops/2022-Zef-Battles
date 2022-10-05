import { createContext, useState } from 'react';
import { getFamilies } from '../apiClient/apiRequests.js';

export const CardsContext = createContext();

const CardsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [families, setFamilies] = useState([]);
	const [familyIds, setFamilyIds] = useState([]);
	const [infoMessage, setInfoMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const loadData = async () => {
		setIsLoading(true);

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

	return (
		<CardsContext.Provider
			value={{
				isLoading,
				families,
				familyIds,
				setFamilyIds,
				infoMessage,
				errorMessage,
				loadData,
			}}
		>
			{children}
		</CardsContext.Provider>
	);
};

export default CardsContextProvider;
