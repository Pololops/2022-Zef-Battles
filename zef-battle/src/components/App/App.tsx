import './App.scss';

import { Dispatch, DispatchWithoutAction, useContext, useReducer } from 'react';
import { ModalContext } from '../../contexts/modalContext';

import { useOutlet, useLoaderData, Outlet, useOutletContext } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage'
import Modal from '../Layout/Modal/Modal'
import Header from '../Layout/Header/Header';
import Main from '../Layout/Main/Main';
import reducer from '../../contexts/reducer'

type Capacity = {
	id: number
	name: string
	level: number
	description: string
}
export type Character = {
	id: number
	name: string
	picture: string
	family_id: number
	family_name: string
	capacity: Capacity[]
	total_level: number
	number_capacity: number
}
export type Family = {
	[x: string]: any
	id: number
	name: string
	characters: Character[]
}
export type CardsContext = {
	cards: Family[]
	dispatch: Dispatch<{type: string, payload: any}>
}

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
