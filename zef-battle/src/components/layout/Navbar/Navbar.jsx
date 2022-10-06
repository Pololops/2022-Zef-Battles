import './Navbar.scss';

import { NavLink } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav>
			<ul className="navbar">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => {
							return isActive && 'active';
						}}
						end // prevent isActive = true when children routes are active
					>
						Accueil
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/families"
						className={({ isActive }) => {
							return isActive && 'active';
						}}
					>
						Cartes
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
