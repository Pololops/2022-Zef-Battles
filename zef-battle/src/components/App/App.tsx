import './App.scss';

import { useContext, useEffect } from 'react';
import { ModalContext } from '../../contexts/modalContext';
import { CardsContext } from '../../contexts/cardsContext';

import { getFamilies } from '../../apiClient/apiRequests';

import { Outlet } from 'react-router-dom';
import Modal from '../Layout/Modal/Modal'
import Header from '../Layout/Header/Header';
import Main from '../Layout/Main/Main';

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
