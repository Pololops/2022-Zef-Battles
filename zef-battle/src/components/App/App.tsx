import './App.scss';

import { useContext, useEffect } from 'react';
import { ModalContext } from '../../contexts/modalContext';
import { CardsContext } from '../../contexts/cardsContext';

import { getFamilies } from '../../apiClient/apiRequests';

import { Outlet } from 'react-router-dom';
import Modal from '../layouts/main-layout/Modal/Modal'
import Header from '../layouts/main-layout/Header/Header';
import Main from '../layouts/main-layout/Main/Main';

export default function App() {
	const { families, setIsLoading, dispatch } = useContext(CardsContext);
	const { isVisible } = useContext(ModalContext);

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
			{ isVisible && <Modal /> }
			<Header />
			<Main>
				<Outlet />
			</Main>
		</div>
	);
}
