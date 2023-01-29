import './Form.scss';

interface Props {
	className: string
	name?: string
	method?: 'get' | 'post'
	onSubmit: React.FormEventHandler
	children: React.ReactNode
	autoComplete?: boolean
}

export default function Form({ className, name, method = 'post', onSubmit, children, autoComplete = false, }: Props) {	
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
