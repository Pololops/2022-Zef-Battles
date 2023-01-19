import './Button.scss';

interface Props {
  className?: string,
	type?: 'submit' | 'reset',
	label: string
  onClick?: React.MouseEventHandler,
}

export default function Button({ className, type, label, onClick }: Props) {
	return (
		<div
			className={`${type ? `button button--${type}` : 'button'} ${className ? className : ''}`}
			onClick={onClick}
		>
			{label}
		</div>
	);
}