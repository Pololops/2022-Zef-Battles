import { createContext, useState } from 'react';

export const CardsContext = createContext({
	families: [],
	isLoading: false,
	errorMessage: '',
});

const CardsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [families, setFamilies] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	return (
		<CardsContext.Provider
			value={{
				isLoading,
				families,
				setFamilies,
				setIsLoading,
				errorMessage,
			}}
		>
			{children}
		</CardsContext.Provider>
	);
};

export default CardsContextProvider;
