import { createContext, useState } from 'react';
import { getFamilies } from '../apiClient/apiRequests.js';

export const CardsContext = createContext({
	families: [],
	isLoading: false,
	errorMessage: '',
});

const CardsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [families, setFamilies] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const loadData = async () => {
		setIsLoading(true);

		try {
			const data = await getFamilies(true);

			if (typeof data === 'string') return setErrorMessage(data);

			if (data && data !== undefined) {
				setFamilies(data);
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
				setFamilies,
				errorMessage,
				loadData,
			}}
		>
			{children}
		</CardsContext.Provider>
	);
};

export default CardsContextProvider;
