import './Modal.scss'

import { useState, useEffect } from 'react';
import { useLoginContext } from '../../../contexts/LoginContext'
import { useModalContext } from '../../../contexts/ModalContext'
import { useMessageContext, MESSAGE } from '../../../contexts/MessageContext';

import { Button, Message } from '../../'

type ChildrenProps = (arg: React.MouseEventHandler) => React.ReactNode

type Props = {
	children: React.PropsWithChildren<ChildrenProps>
}

export default function Modal({ children }: Props) {
	const { messageContent, setMessageContent, messageToDisplay, setMessageToDisplay } = useMessageContext()
	const { isModalVisible, setIsModalVisible, setModalContent } = useModalContext()
	const { isLogin } = useLoginContext()

	const [isVisible, setIsVisible] = useState(false)

	const keyDownHandler: React.KeyboardEventHandler<HTMLElement> = (event) => {
		if (event.key === 'Escape') setIsModalVisible(false)
	}

	const closeHandler: React.MouseEventHandler<HTMLElement> = () => {
		setIsModalVisible(false)
		setMessageToDisplay(MESSAGE.NONE)
		setMessageContent('')
	}
	const ChildrenWithProps = children(closeHandler)


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
					? ChildrenWithProps 

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
