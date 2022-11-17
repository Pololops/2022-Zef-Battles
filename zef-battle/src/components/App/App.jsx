import './App.scss';

import { useContext, useEffect } from 'react';
import { CardsContext } from '../../contexts/cardsContext';

import { getFamilies } from '../../apiClient/apiRequests';

import { Outlet } from 'react-router-dom';
import Header from '../layouts/main-layout/Header/Header';
import Main from '../layouts/main-layout/Main/Main';

export default function App() {
	const { families, setFamilies, setIsLoading } = useContext(CardsContext);

	useEffect(() => {
		if (families.length === 0) {
			setIsLoading(true);
			(async () => {
				const { statusCode, data } = await getFamilies(true);

				if (statusCode === 200) {
					setIsLoading(false);
					setFamilies(data);
				}
			})();
		}
	}, []);

	return (
		<div className="App">
			<Header />
			<Main>
				<Outlet />
			</Main>
		</div>
	);
}
