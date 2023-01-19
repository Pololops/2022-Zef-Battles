import './Navbar.scss'

import { useContext } from 'react'

import { NavLink } from 'react-router-dom'
import { ModalContext } from '../../../contexts/modalContext'

export default function Navbar() {
	const { setIsVisible } = useContext(ModalContext)

	return (
		<nav>
			<ul className="navbar">
				<li>
					<NavLink
						to="/"
						className={`navbar__link ${(isActive: boolean) => {
							return isActive ? 'active' : undefined
						}}`}
						end // prevent isActive = true when children routes are active
					>
						Accueil
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/families"
						className={`navbar__link ${(isActive: boolean) => {
							return isActive ? 'active' : undefined
						}}`}
					>
						Cartes
					</NavLink>
				</li>
				<li>
					<span
						className="navbar__link"
						onClick={() => setIsVisible(true)}					>
						Connexion
					</span>
				</li>
			</ul>
		</nav>
	)
}
