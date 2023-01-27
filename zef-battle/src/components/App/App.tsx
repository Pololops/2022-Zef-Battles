import { useContext, useReducer } from 'react';
import { useOutlet, useLoaderData, Outlet, useOutletContext } from 'react-router-dom';
import reducer from '../../reducer/reducer'

import { ModalContext } from '../../contexts/ModalContext';
import { Modal, Header, Navbar, Main, HomePage } from '../'

import './App.scss';

export function useCards() {
  return useOutletContext<CardsContext>();
}

export default function App() {
	const { allCards: { data } } = useLoaderData() as { allCards: { data: Family[] } }
	const { isModalVisible } = useContext(ModalContext)
	
  const [cards, dispatch] = useReducer(reducer, data)

	const outlet = useOutlet()

	return (
		<div className="App">
			{ isModalVisible && <Modal /> }
			<Header>
				<>
					<h1 className="header__title">Zef's Battles</h1>
					<Navbar />
				</>
			</Header>
			<Main>
				{ outlet ? <Outlet context={{ cards, dispatch }}/> : <HomePage /> }
			</Main>
		</div>
	);
}
