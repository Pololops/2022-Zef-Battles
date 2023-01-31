import { createContext, useState } from 'react'

export const enum MESSAGE {
	NONE,
	CARD,
	MODAL,
	DELETE_FAMILY,
}

type MessageContextType = {
	messageContent: string,
	setMessageContent: (newValue: string) => void
	messageToDisplay: MESSAGE
	setMessageToDisplay: (newValue: MESSAGE) => void
}

const MessageContextState: MessageContextType = {
	messageContent: '',
	setMessageContent: () => {},
	messageToDisplay: MESSAGE.NONE,
	setMessageToDisplay: () => {}
};

export const MessageContext = createContext(MessageContextState)

const MessageContextProvider = ({ children }: React.PropsWithChildren) => {
	const [messageContent, setMessageContent] = useState(MessageContextState.messageContent)
	const [messageToDisplay, setMessageToDisplay] = useState(MessageContextState.messageToDisplay)

	return (
		<MessageContext.Provider value={{ messageContent, setMessageContent, messageToDisplay, setMessageToDisplay }}>
			{children}
		</MessageContext.Provider>
	);
}

export default MessageContextProvider