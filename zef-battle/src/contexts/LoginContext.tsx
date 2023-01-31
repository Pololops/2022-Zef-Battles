import { createContext, useState, useContext } from 'react';

const isUserLogin = () => {
	return !!localStorage.getItem('token')
}

type ContextProps = {
	isLogin: boolean,
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
	logout: () => void
}

const LoginContext = createContext<ContextProps | null>(null)

export const LoginProvider = ({ children }: React.PropsWithChildren) => {
	const [isLogin, setIsLogin] = useState(isUserLogin)

	const logout = (): void => {
		localStorage.clear()
		setIsLogin(false)
	}

	return (
		<LoginContext.Provider value={{ isLogin, setIsLogin, logout }}>
			{children}
		</LoginContext.Provider>
	);
}

export const useLoginContext = () => {
	const value = useContext(LoginContext)

	if (value === null) {
		throw new Error('You need to wrap this component with <LoginProvider>')
	}

	return value
}
