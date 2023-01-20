import './App.scss';

import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/modalContext';
import { CardsContext } from '../../contexts/cardsContext';

import { getFamilies, getRandomCharacters } from '../../apiClient/apiRequests';

import { useOutlet } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage'
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

	const outlet = useOutlet()

	return (
		<div className="App">
			{ isVisible && <Modal /> }
			<Header />
			<Main>
				{outlet || <HomePage />}
			</Main>
		</div>
	);
}
