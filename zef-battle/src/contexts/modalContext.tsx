import { createContext, useState } from 'react'

type Props = {
	children: React.ReactNode
}

type ModalContextType = {
  isModalVisible: boolean,
	setIsModalVisible: (arg: boolean) => void,
	modalContent: 'signin' | 'signup',
	setModalContent: (arg: 'signin' | 'signup') => void
}

const iModalContextState: ModalContextType = {
  isModalVisible: false,
  setIsModalVisible: () => {},
	modalContent: 'signin',
	setModalContent: () => {}
};

export const ModalContext = createContext(iModalContextState)

const ModalContextProvider = ({ children }: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(iModalContextState.isModalVisible)
	const [modalContent, setModalContent] = useState(iModalContextState.modalContent)

	return (
		<ModalContext.Provider value={{ isModalVisible, setIsModalVisible, modalContent, setModalContent }}>
			{children}
		</ModalContext.Provider>
	);
}

export default ModalContextProvider