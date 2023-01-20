import './Modal.scss'

import { useContext, useState, KeyboardEventHandler, FormEventHandler } from 'react';
import { ModalContext } from '../../../contexts/modalContext'

import Button from '../../Forms/Button/Button'
import Input from '../../Forms/Input/Input'
import Message from '../../Forms/Message/Message'

import { login as loginRequest } from "../../../apiClient/apiRequests";

export default function ModalLog() {
	const { setIsVisible } = useContext(ModalContext)

	const [loginInputValue, setLoginInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const loginInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorMessage('')
		setLoginInputValue(event.target.value)
	}

	const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorMessage('')
		setPasswordInputValue(event.target.value)
	}

	const submitHandler: FormEventHandler = async (event) => {
		event.preventDefault();

		if (loginInputValue.length === 0 ) return setErrorMessage('Tu as oublié de saisir ton pseudo.')
		if (passwordInputValue.length === 0) return setErrorMessage('Tu as oublié de saisir ton mot de passe.')

		try {
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
		} else {
			if (statusCode === 400) return setErrorMessage('Ce pseudo et ce mot de passe ne sont pas corrects.')
		}
		} catch (error) {
			// console.log(error)
		}
	}

	const keyDownHandler: KeyboardEventHandler<HTMLElement> = (event) => {
		if (event.key === 'Escape') setIsVisible(false)
		if (event.key === 'Enter') submitHandler(event)
	}
	
	return (
		<div className="modal">
			<form className="modal__content" method="post" onKeyDown={keyDownHandler} onSubmit={submitHandler}>
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
				{errorMessage !== '' && <Message message={errorMessage} />}
				<div className="modal__content__buttons">
					<Button
						type="reset"
						label="Fermer"
						onClick={() => setIsVisible(false)}
					/>
					<Button
						type="submit"
						label="Valider"
						onClick={submitHandler}
					/>
				</div>
			</form>
		</div>
	)
}
