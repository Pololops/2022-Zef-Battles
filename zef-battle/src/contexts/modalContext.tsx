import { createContext, useState } from 'react'

type Props = {
	children: React.ReactNode
}

type ModalContextType = {
  isVisible: boolean,
	setIsVisible: (newValue: boolean) => void
}

const iModalContextState: ModalContextType = {
  isVisible: false,
  setIsVisible: () => {}
};

export const ModalContext = createContext(iModalContextState)

const ModalContextProvider = ({ children }: Props) => {
	const [isVisible, setIsVisible] = useState(iModalContextState.isVisible)

	return (
		<ModalContext.Provider value={{ isVisible, setIsVisible }}>
			{children}
		</ModalContext.Provider>
	);
}

export default ModalContextProvider