import { createContext, useState, useReducer } from 'react';
import reducer from './reducer';

type Props = {
	children: React.ReactNode
}

type CardsContextType = {
  isLoading: boolean,
	setIsLoading: (newValue: boolean) => void,
	errorMessage: string,
	setErrorMessage: (newValue: string) => void,
	families: [],
	dispatch: React.Dispatch<{type: string, payload: unknown}>
}

const iCardsContextState: CardsContextType = {
  isLoading: false,
  setIsLoading: () => {},
	errorMessage: '',
	setErrorMessage: () => {},
	families: [],
	dispatch: () => {}
};

export const CardsContext = createContext(iCardsContextState);

const CardsContextProvider = ({ children }: Props) => {
	const [isLoading, setIsLoading] = useState(iCardsContextState.isLoading);
	const [errorMessage, setErrorMessage] = useState(iCardsContextState.errorMessage);
	const [families, dispatch] = useReducer(reducer, []);

	return (
		<CardsContext.Provider
			value={{
				families,
				dispatch,
				isLoading,
				setIsLoading,
				errorMessage,
				setErrorMessage
			}}
		>
			{children}
		</CardsContext.Provider>
	);
};

export default CardsContextProvider;
