import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();

	return (
		<>
			<h2>Oops !</h2>
			<p>Une erreur s'est produite.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<Link to="/">Retourner à l'accueil</Link>
			<Link to="/">Revenir en arrière</Link>
		</>
	);
}
