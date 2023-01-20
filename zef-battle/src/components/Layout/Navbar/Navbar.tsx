import './Navbar.scss'

import { useContext, useState } from 'react';

import { NavLink } from 'react-router-dom'
import { ModalContext } from '../../../contexts/modalContext'

const isConnected = (): boolean => {
	const token = localStorage.getItem('token')
	return !!token
}

export default function Navbar() {
	const { setIsVisible } = useContext(ModalContext)
	const [isLogin, setIsLogin] = useState(isConnected())

	const logout = (): void => {
		localStorage.clear()
		setIsLogin(false)
	}

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
					{
						!isLogin
						? <span
								className="navbar__link"
								onClick={() => setIsVisible(true)}
							>
								Connexion
							</span>
						:	<span
								className="navbar__link"
								onClick={logout}
							>
								Déconnexion
							</span>
					}
				</li>
			</ul>
		</nav>
	)
}
