import { useState, useEffect } from 'react';
import { useRouteError, Link } from 'react-router-dom';

import Header from '../../layouts/main-layout/Header/Header';
import Main from '../../layouts/main-layout/Main/Main';

export default function ErrorPage() {
	const error = useRouteError();
	const [errorMessage, setErrorMessage] = useState('');

	const adaptErrorMessage = () => {
		const status = error.status;
		if (status === 404)
			return setErrorMessage(
				`Tu sembles être perdu, car cette page n'existe pas.`,
			);
		return setErrorMessage(`Quelque chose ne s'est pas passé correctement...`);
	};

	useEffect(() => {
		adaptErrorMessage();

		return () => setErrorMessage('');
	}, []);

	return (
		<div className="App">
			<Header />
			<Main>
				<h2>Oops !</h2>
				<p>Erreur {error.status}</p>
				<p>{errorMessage}</p>
				<p>
					<Link to="/">Retourner à l'accueil</Link>
				</p>
			</Main>
		</div>
	);
}
