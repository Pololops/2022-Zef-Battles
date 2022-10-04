import './Navbar.scss';

import { NavLink } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav>
			<ul className="navbar">
				<li>
					<NavLink to="/">Accueil</NavLink>
				</li>
				<li>
					<NavLink to="/families">Cartes</NavLink>
				</li>
			</ul>
		</nav>
	);
}
