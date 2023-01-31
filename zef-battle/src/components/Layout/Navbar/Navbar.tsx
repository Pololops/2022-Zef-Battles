import { NavLink } from 'react-router-dom'
import { useLoginContext } from '../../../contexts/LoginContext'
import { useMessageContext, MESSAGE } from '../../../contexts/MessageContext'
import { useModalContext } from '../../../contexts/ModalContext'

import './Navbar.scss'

export default function Navbar() {
	const { setMessageContent, setMessageToDisplay } = useMessageContext()
	const { setIsModalVisible } = useModalContext()
	const { isLogin, logout } = useLoginContext()

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
