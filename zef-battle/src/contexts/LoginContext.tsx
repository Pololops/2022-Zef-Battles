import { createContext, useState } from 'react'

type Props = {
	children: React.ReactNode
}

type LoginContextType = {
	isLogin: boolean,
	setIsLogin: (newValue: boolean) => void
	logout: () => void
}

const isUserLogin = () => {
	return !!localStorage.getItem('token')
}

const LoginContextState: LoginContextType = {
	isLogin: isUserLogin(),
	setIsLogin: () => {},
	logout: () => {}
};

export const LoginContext = createContext(LoginContextState)

const LoginContextProvider = ({ children }: Props) => {
	const [isLogin, setIsLogin] = useState(LoginContextState.isLogin)

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

export default LoginContextProvider
