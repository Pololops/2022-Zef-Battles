import './App.scss';

import { useContext, useReducer } from 'react';
import { ModalContext } from '../../contexts/modalContext';

import { useOutlet, useLoaderData, Outlet, useOutletContext } from 'react-router-dom';
import reducer from '../../contexts/reducer'
import { Modal, Header, Main, HomePage } from '../'

export default function App() {
	const { allCards: { data } } = useLoaderData() as { allCards: { data: Family[] } }
  const [cards, dispatch] = useReducer(reducer, data);

	const { isVisible } = useContext(ModalContext);
	const outlet = useOutlet()

	return (
		<div className="App">
			{ isVisible && <Modal /> }
			<Header />
			<Main>
				{ outlet ? <Outlet context={{ cards, dispatch }}/> : <HomePage /> }
			</Main>
		</div>
	);
}

export function useCards() {
  return useOutletContext<CardsContext>();
}
