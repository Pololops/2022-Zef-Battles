import { createContext, useState } from 'react'

type Props = {
	children: React.ReactNode
}

type MessageContextType = {
	message: string,
	setMessage: (newValue: string) => void
}

const MessageContextState: MessageContextType = {
	message: '',
	setMessage: () => {}
};

export const MessageContext = createContext(MessageContextState)

const MessageContextProvider = ({ children }: Props) => {
	const [message, setMessage] = useState(MessageContextState.message)

	return (
		<MessageContext.Provider value={{ message, setMessage }}>
			{children}
		</MessageContext.Provider>
	);
}

export default MessageContextProvider