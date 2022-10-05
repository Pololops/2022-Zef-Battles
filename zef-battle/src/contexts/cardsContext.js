import { createContext, useState } from 'react';
import { getFamilies } from '../apiClient/apiRequests.js';

export const CardsContext = createContext();

const CardsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [infoMessage, setInfoMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const loadData = async () => {
		setIsLoading(true);

		try {
			const response = await getFamilies();

			if (response && response !== undefined) {
				if (response.length > 0) {
					setData(response);
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
				data,
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
