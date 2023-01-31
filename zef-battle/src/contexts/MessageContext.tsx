import { createContext, useState, useContext } from 'react';

export const enum MESSAGE {
	NONE,
	CARD,
	MODAL,
	DELETE_FAMILY,
}

type ContextProps = {
	messageContent: string,
	setMessageContent: React.Dispatch<React.SetStateAction<string>>
	messageToDisplay: MESSAGE
	setMessageToDisplay: React.Dispatch<React.SetStateAction<MESSAGE>>
}

const MessageContext = createContext<ContextProps | null>(null)

export const MessageProvider = ({ children }: React.PropsWithChildren) => {
	const [messageContent, setMessageContent] = useState('')
	const [messageToDisplay, setMessageToDisplay] = useState(MESSAGE.NONE)

	return (
		<MessageContext.Provider value={{ messageContent, setMessageContent, messageToDisplay, setMessageToDisplay }}>
			{children}
		</MessageContext.Provider>
	);
}

export const useMessageContext = () => {
	const value = useContext(MessageContext)

	if (value === null) {
		throw new Error('You need to wrap this component with <MessageProvider>')
	}

	return value
}
