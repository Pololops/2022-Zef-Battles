import './Form.scss';
import type { FormEventHandler, ReactNode } from 'react';

interface Props {
	className: string
	name?: string
	method?: 'get' | 'post'
	onSubmit: FormEventHandler
	children: ReactNode
	autoComplete?: boolean
}

export default function Form({ className, name, method = 'post', onSubmit, children, autoComplete = true, }: Props) {	
	return (
		<form
			className={className}
			name={name}
			method={method}
			onSubmit={onSubmit}
			autoComplete={autoComplete ? 'on' : 'off'}
		>
			{children}
		</form>
	);
}
