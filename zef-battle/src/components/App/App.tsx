import './App.scss';

import { useContext, useEffect } from 'react';
import { CardsContext } from '../../contexts/cardsContext';

import { getFamilies } from '../../apiClient/apiRequests';

import { Outlet } from 'react-router-dom';
import Header from '../layouts/main-layout/Header/Header';
import Main from '../layouts/main-layout/Main/Main';

export default function App() {
	const { families, setIsLoading, dispatch } = useContext(CardsContext);

	useEffect(() => {
		if (families.length === 0) {
			setIsLoading(true);
			(async () => {
				const { statusCode, data } = await getFamilies(true);

				if (statusCode && statusCode === 200) {
					setIsLoading(false);
					dispatch({ type: 'GET_CARDS', payload: data });
				}
			})();
		}
	}, [dispatch, families, setIsLoading]);

	return (
		<div className="App">
			<Header />
			<Main>
				<Outlet />
			</Main>
		</div>
	);
}
