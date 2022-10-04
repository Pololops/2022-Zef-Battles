import './App.scss';

import { Outlet } from 'react-router-dom';
import Header from '../layout/Header/Header';
import Main from '../layout/Main/Main';

export default function App() {
	return (
		<div className="App">
			<Header />
			<Main>
				<Outlet />
			</Main>
		</div>
	);
}
