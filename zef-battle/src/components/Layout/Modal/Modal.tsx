import './Modal.scss'

import { useContext, useState, KeyboardEventHandler, FormEventHandler } from 'react';
import { ModalContext } from '../../../contexts/ModalContext'
import { MessageContext, MESSAGE } from '../../../contexts/MessageContext';
import { LoginContext } from '../../../contexts/LoginContext'

import { login as loginRequest } from "../../../apiClient/apiRequests";
import { Button, Input, Message } from '../../'

export default function ModalLog() {
	const { messageContent, setMessageContent, messageToDisplay, setMessageToDisplay } = useContext(MessageContext)
	const { setIsModalVisible } = useContext(ModalContext)
	const { setIsLogin } = useContext(LoginContext)

	const [loginInputValue, setLoginInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')

	const loginInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
		setLoginInputValue(event.target.value)
	}

	const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
		setPasswordInputValue(event.target.value)
	}

	const submitHandler: FormEventHandler = async (event) => {
		event.preventDefault();

		if (loginInputValue.length === 0 ) {
			setMessageToDisplay(MESSAGE.MODAL)
			return setMessageContent('Tu as oublié de saisir ton pseudo.')
		}

		if (passwordInputValue.length === 0) {
			setMessageToDisplay(MESSAGE.MODAL)
			return setMessageContent('Tu as oublié de saisir ton mot de passe.')
		}

		const { status, data } = await loginRequest({
			login: loginInputValue,
			password: passwordInputValue
		});

		if (status !== 'OK') {
			setMessageToDisplay(MESSAGE.MODAL)
			return setMessageContent('Ce pseudo et ce mot de passe ne sont pas corrects.')
		}

		localStorage.setItem('token', data.token)
		localStorage.setItem('userName', data.user.name)
		localStorage.setItem('userVictory', data.user.victory_number.toString())
		localStorage.setItem('userRole', data.user.role)

		setIsLogin(true)
		setIsModalVisible(false);
	}

	const closeAndResetModal = () => {
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
		setIsModalVisible(false)
	}

	const keyDownHandler: KeyboardEventHandler<HTMLElement> = (event) => {
		if (event.key === 'Escape') setIsModalVisible(false)
		if (event.key === 'Enter') submitHandler(event)
	}
	
	return (
		<div className="modal">
			{messageToDisplay === MESSAGE.MODAL && messageContent !== '' && <Message />}

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
				<div className="modal__content__buttons">
					<Button
						type="reset"
						label="Fermer"
						onClick={closeAndResetModal}
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
