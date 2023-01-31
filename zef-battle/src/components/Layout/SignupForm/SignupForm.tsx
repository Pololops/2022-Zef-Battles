import { useState } from 'react'
import { Link } from 'react-router-dom'
import { postUser } from "../../../apiClient/apiRequests"

import { useModalContext } from '../../../contexts/ModalContext'
import { useMessageContext, MESSAGE } from '../../../contexts/MessageContext'
import { useLoginContext } from '../../../contexts/LoginContext'

import { Button, Input, Form } from '../..'

type Props = {
	onClose: React.MouseEventHandler<HTMLElement>
}

export default function SignupForm({ onClose }: Props) {
	const { setModalContent } = useModalContext()
	const { setMessageContent, setMessageToDisplay } = useMessageContext()
	const { setIsLogin } = useLoginContext()

	const [nicknameInputValue, setNicknameInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [repeatPasswordInputValue, setRepeatPasswordInputValue] = useState('')

	const inputHandler = (inputType: 'nickname' | 'password' | 'repeatPassword') => (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (inputType === 'nickname') {
			setMessageToDisplay(MESSAGE.NONE)
			setMessageContent('')
			return setNicknameInputValue(event.target.value)
		}

		if (inputType === 'password') {
			setMessageToDisplay(MESSAGE.NONE)
			setMessageContent('')
			return setPasswordInputValue(event.target.value)
		}

		if (inputType === 'repeatPassword') {
			setMessageToDisplay(MESSAGE.NONE)
			setMessageContent('')
			return setRepeatPasswordInputValue(event.target.value)
		}
	}

	const submitHandler: React.FormEventHandler = async (event) => {
		event.preventDefault();

		if (nicknameInputValue.length === 0 ) {
			setMessageToDisplay(MESSAGE.MODAL)
			return setMessageContent('Tu dois renseigner un pseudo.')
		}

		if (passwordInputValue.length < 8) {
			setMessageToDisplay(MESSAGE.MODAL)
			return setMessageContent(`Tu dois rensigner un mot de passe d'au moins 8 charactères.`)
		}

		if (repeatPasswordInputValue !== passwordInputValue) {
			setMessageToDisplay(MESSAGE.MODAL)
			return setMessageContent('Les deux mots de passe ne sont pas identiques, tu as du faire une faute de frappe.')
		}

		const { status, statusCode, data } = await postUser({
			name: nicknameInputValue,
			password: passwordInputValue,
			repeat_password: repeatPasswordInputValue,
		});

		if (status !== 'OK') {
			setMessageToDisplay(MESSAGE.MODAL)

			if (statusCode === 409) {
				return setMessageContent('Ce pseudo est déjà utilisé, tu dois en choisir un autre.')
			}

			if (statusCode === 400) {
				return setMessageContent('Les deux mots de passe ne sont pas identiques, tu as du faire une faute de frappe.')
			}

			return setMessageContent(`Une erreur s'est produite, peux-tu réessayer ?`)
		}

		localStorage.setItem('token', data.token)
		localStorage.setItem('userName', data.user.name)
		localStorage.setItem('userVictory', data.user.victory_number.toString())
		localStorage.setItem('userRole', data.user.role)
		setIsLogin(true)

		setMessageToDisplay(MESSAGE.MODAL)
		setMessageContent(`Bienvenue ${data.user.name}`)
	}

	const clickSigninLinkHandler: React.MouseEventHandler = (event) => {
		event.preventDefault()
		setModalContent('signin')
	}
	
	return (
		<>
			<Form className="" onSubmit={submitHandler} name="signup">
				<Input
					type="text"
					name="name"
					placeholder="Ton pseudo de connexion"
					isFocus={true}
					value={nicknameInputValue}
					onChange={(event) => inputHandler('nickname')(event)}
					autoComplete={false}
					required={true}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Un mot de passe"
					value={passwordInputValue}
					onChange={(event) => inputHandler('password')(event)}
					autoComplete={false}
					required={true}
				/>
				<Input
					type="password"
					name="password-repeat"
					placeholder="Répète ton mot de passe"
					value={repeatPasswordInputValue}
					onChange={(event) => inputHandler('repeatPassword')(event)}
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

			<Link to={''} onClick={clickSigninLinkHandler}><span>Tu as déjà un compte ?</span> <span>Clique ici pour t'y connecter.</span></Link>
		</>
	)
}
