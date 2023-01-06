import './Modal.scss'

import { useContext, useState } from 'react'
import { ModalContext } from '../../../../contexts/modalContext'

import Button from '../../form-layout/Button/Button'
import Input from '../../form-layout/Input/Input'

export default function ModalLog() {
	const { setIsVisible } = useContext(ModalContext)

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const loginInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setLogin(event.target.value)
	const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)

	return (
		<div className="modal">
			<div className="modal__content">
				<Input
					type="text"
					name="name"
					placeholder="Mon pseudo de connexion"
					isFocus={true}
					value={login}
					onChange={loginInputHandler}
					autoComplete={false}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Mon mot de passe"
					value={password}
					onChange={passwordInputHandler}
					autoComplete={false}
				/>
				<div className="modal__content__buttons">
					<Button
						type="reset"
						label="Fermer"
						onClick={() => setIsVisible(false)}
					/>
					<Button
						type="submit"
						label="Valider"
					/>
				</div>
			</div>
		</div>
	)
}
