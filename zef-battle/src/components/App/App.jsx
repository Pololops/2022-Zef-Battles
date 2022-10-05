import './App.scss';

import { useContext, useEffect } from 'react';
import { CardsContext } from '../../contexts/cardsContext';

import { Outlet } from 'react-router-dom';
import Header from '../layout/Header/Header';
import Main from '../layout/Main/Main';

export default function App() {
	const { loadData } = useContext(CardsContext);

	useEffect(() => {
		(async () => {
			await loadData();
		})();
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
