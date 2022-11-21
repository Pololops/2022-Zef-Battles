import { createContext, useState, useReducer } from 'react';
import reducer from './reducer';

export const CardsContext = createContext();

const CardsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [families, dispatch] = useReducer(reducer, []);

	return (
		<CardsContext.Provider
			value={{
				families,
				dispatch,
				isLoading,
				setIsLoading,
				errorMessage,
			}}
		>
			{children}
		</CardsContext.Provider>
	);
};

export default CardsContextProvider;
