import { createContext, useState } from 'react'

type Props = {
	children: React.ReactNode
}

type ModalContextType = {
  isModalVisible: boolean,
	setIsModalVisible: (newValue: boolean) => void
}

const iModalContextState: ModalContextType = {
  isModalVisible: false,
  setIsModalVisible: () => {}
};

export const ModalContext = createContext(iModalContextState)

const ModalContextProvider = ({ children }: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(iModalContextState.isModalVisible)

	return (
		<ModalContext.Provider value={{ isModalVisible, setIsModalVisible }}>
			{children}
		</ModalContext.Provider>
	);
}

export default ModalContextProvider