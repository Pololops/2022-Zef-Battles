import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../../../contexts/LoginContext'
import { MessageContext, MESSAGE } from '../../../contexts/MessageContext'
import { ModalContext } from '../../../contexts/ModalContext'

import './Navbar.scss'

export default function Navbar() {
	const { setMessageContent, setMessageToDisplay } = useContext(MessageContext)
	const { setIsModalVisible } = useContext(ModalContext)
	const { isLogin, logout } = useContext(LoginContext)

	const initAndShowModal: React.MouseEventHandler<HTMLElement> = () => {
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
		setIsModalVisible(true)
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
								onClick={initAndShowModal}
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
