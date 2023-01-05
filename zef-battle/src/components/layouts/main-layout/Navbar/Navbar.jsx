import './Navbar.scss';

import { useContext } from 'react'

import { NavLink, Link } from 'react-router-dom'
import { ModalContext } from '../../../../contexts/modalContext'

export default function Navbar() {
	const { setIsVisible } = useContext(ModalContext)

	return (
		<nav>
			<ul className="navbar">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => {
							return isActive ? 'active' : undefined
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
							return isActive ? 'active' : undefined
						}}
					>
						Cartes
					</NavLink>
				</li>
				<li>
					<Link
						className=""
						onClick={() => setIsVisible(true)}
					>
						Connexion
					</Link>
				</li>
			</ul>
		</nav>
	)
}
