import { createContext, useState, useContext } from 'react'

type ContextProps = {
  isModalVisible: boolean,
	setIsModalVisible: (arg: boolean) => void,
	modalContent: 'signin' | 'signup',
	setModalContent: (arg: 'signin' | 'signup') => void
}

const initialContext: ContextProps = {
  isModalVisible: false,
  setIsModalVisible: () => {},
	modalContent: 'signin',
	setModalContent: () => {}
};

const ModalContext = createContext<ContextProps | null>(null)

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
	const [isModalVisible, setIsModalVisible] = useState(initialContext.isModalVisible)
	const [modalContent, setModalContent] = useState(initialContext.modalContent)

	return (
		<ModalContext.Provider value={{ isModalVisible, setIsModalVisible, modalContent, setModalContent }}>
			{children}
		</ModalContext.Provider>
	);
}

export const useModalContext = () => {
	const value = useContext(ModalContext)

	if (value === null) {
		throw new Error('You need to wrap this component with <ModalProvider>')
	}

	return value
}
