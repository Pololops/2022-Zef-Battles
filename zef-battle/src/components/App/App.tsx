import { useContext, useReducer } from 'react';
import { useOutlet, useLoaderData, Outlet, useOutletContext } from 'react-router-dom';
import reducer from '../../reducer/reducer'
import useDelayUnmount from '../../hooks/useDelayUnmount'

import { ModalContext } from '../../contexts/ModalContext';
import { Modal, Header, Navbar, Main, HomePage, SigninForm, SignupForm } from '../'

import './App.scss';

export function useCards() {
  return useOutletContext<CardsContext>();
}

export default function App() {
	const { allCards: { data } } = useLoaderData() as { allCards: { data: Family[] } }
	const { isModalVisible, modalContent } = useContext(ModalContext)

	const shouldRenderModal = useDelayUnmount(isModalVisible, 300)
	
  const [cards, dispatch] = useReducer(reducer, data)

	const outlet = useOutlet()

	return (
		<div className="App">
			<Header>
				<>
					<h1 className="header__title">Zef's Battles</h1>
					<Navbar />
				</>
			</Header>
			<Main>
				{ outlet ? <Outlet context={{ cards, dispatch }}/> : <HomePage /> }
			</Main>

			{ shouldRenderModal && 
				<Modal>
					{(onClose: React.MouseEventHandler) => (
						<>
							{modalContent === 'signin' && <SigninForm onClose={onClose} />}
							{modalContent === 'signup' && <SignupForm onClose={onClose} />}
						</>
      		)}
				</Modal>
			}
		</div>
	);
}
