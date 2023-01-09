import './Modal.scss'

import { useContext, useState } from 'react';
import { ModalContext } from '../../../../contexts/modalContext'

import Button from '../../form-layout/Button/Button'
import Input from '../../form-layout/Input/Input'

import { login as loginRequest } from "../../../../apiClient/apiRequests";

export default function ModalLog() {
	const { setIsVisible } = useContext(ModalContext)

	const [loginInputValue, setLoginInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')

	const loginInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setLoginInputValue(event.target.value)
	const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setPasswordInputValue(event.target.value)
	const submitButtonHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		if (loginInputValue.length > 0 && passwordInputValue.length > 0) {
			const { statusCode, data } = await loginRequest({
				login: loginInputValue,
				password: passwordInputValue
			});

			if (statusCode === 200 && typeof data !== 'string') {
				localStorage.setItem('token', data.token)
				localStorage.setItem('userName', data.user.name)
				localStorage.setItem('userVictory', data.user.victory_number.toString())
				localStorage.setItem('userRole', data.user.role)

				setIsVisible(false);
			}
		}

		
	}

	return (
		<div className="modal">
			<form className="modal__content">
				<Input
					type="text"
					name="name"
					placeholder="Mon pseudo de connexion"
					isFocus={true}
					value={loginInputValue}
					onChange={loginInputHandler}
					autoComplete={false}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Mon mot de passe"
					value={passwordInputValue}
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
						onClick={submitButtonHandler}
					/>
				</div>
			</form>
		</div>
	)
}
