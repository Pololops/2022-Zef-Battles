import './Modal.scss'

import { useContext, useState, useEffect } from 'react';
import { LoginContext } from '../../../contexts/LoginContext'
import { ModalContext } from '../../../contexts/ModalContext'
import { MessageContext, MESSAGE } from '../../../contexts/MessageContext';

import { Button, Message } from '../../'

type ChildrenProps = (arg: React.MouseEventHandler) => React.ReactNode

type Props = {
	children: React.PropsWithChildren<ChildrenProps>
}

export default function Modal({ children }: Props) {
	const { messageContent, setMessageContent, messageToDisplay, setMessageToDisplay } = useContext(MessageContext)
	const { isModalVisible, setIsModalVisible, setModalContent } = useContext(ModalContext)
	const { isLogin } = useContext(LoginContext)

	const [isVisible, setIsVisible] = useState(false)

	const keyDownHandler: React.KeyboardEventHandler<HTMLElement> = (event) => {
		if (event.key === 'Escape') setIsModalVisible(false)
	}

	const closeHandler: React.MouseEventHandler<HTMLElement> = () => {
		setIsModalVisible(false)
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
	}

	useEffect(() => {
		setIsVisible(isModalVisible)
		return () => {
			setIsVisible(false)
			setModalContent('signin')
		}	
	}, [isModalVisible])
	
	return (
		<div 
			className={`modal ${isVisible ? 'modal--show' : 'modal--hide'}`} 
			onKeyDown={keyDownHandler}
		>
			{messageToDisplay === MESSAGE.MODAL && messageContent !== '' && <Message />}
			
			<div className="modal__content">
				{ !isLogin
					? children && children(closeHandler) 

					: <div className="buttons">
							<Button
								type="reset"
								label="Fermer"
								onClick={closeHandler}
							/>
						</div>
				}
			</div>
		</div>
	)
}
