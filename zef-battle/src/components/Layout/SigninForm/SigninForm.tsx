import './SigninForm.scss'

import { useContext, useState } from 'react';
import { login as loginRequest } from "../../../apiClient/apiRequests";

import { MessageContext, MESSAGE } from '../../../contexts/MessageContext';
import { LoginContext } from '../../../contexts/LoginContext'

import { Button, Input, Form } from '../..'

type Props = {
	onClose: React.MouseEventHandler<HTMLElement>
}

export default function SigninForm({ onClose }: Props) {
	const { setMessageContent, setMessageToDisplay } = useContext(MessageContext)
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

	const submitHandler: React.FormEventHandler = async (event) => {
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

		setMessageToDisplay(MESSAGE.MODAL)
		setMessageContent(`Bienvenue ${data.user.name}`)
	}
	
	return (
		<Form className="" onSubmit={submitHandler} name="signin">
			<Input
				type="text"
				name="name"
				placeholder="Mon pseudo de connexion"
				isFocus={true}
				value={loginInputValue}
				onChange={loginInputHandler}
				autoComplete={false}
				required={true}
			/>
			<Input
				type="password"
				name="password"
				placeholder="Mon mot de passe"
				value={passwordInputValue}
				onChange={passwordInputHandler}
				autoComplete={false}
				required={true}
			/>
			<div className="buttons">
				<Button
					type="reset"
					label="Fermer"
					onClick={onClose}
				/>
				<Button
					type="submit"
					label="Valider"
					onClick={submitHandler}
				/>
			</div>
		</Form>
	)
}
