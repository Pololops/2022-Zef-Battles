import './Input.scss';
import { ReactEventHandler, useEffect, useState } from 'react';

import useAutoFocus from '../../../hooks/useAutoFocusRef';

interface Props {
	type: string,
	name: string,
	value?: string,
	min?: number,
	max?: number,
	step?: number,
	placeholder?: string,
	autoComplete?: boolean,
	onChange?: React.ChangeEventHandler<HTMLInputElement>,
	onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>,
	onMouseDown?: ReactEventHandler<HTMLInputElement>,
	onMouseUp?: ReactEventHandler<HTMLInputElement>,
	isFocus?: boolean,
	readOnly?: true,
}

const levelClassName = (className: string, level: number): string => {
	let formatClassName = className + ' input--range';

	if (level > 66) {
		formatClassName += ' level--max';
	} else if (level > 33) {
		formatClassName += ' level--mid';
	} else {
		formatClassName += ' level--min';
	}

	return formatClassName;
};

export default function Input({
	type,
	name,
	value = '',
	min = 0,
	max = 100,
	step = 1,
	placeholder = '',
	autoComplete = true,
	onChange,
	onKeyPress,
	onMouseDown,
	onMouseUp,
	isFocus = false,
	readOnly,
}: Props) {
	const [className, setClassName] = useState('input');
	let focus = useAutoFocus(isFocus);

	useEffect(() => {
		setClassName(levelClassName('input', Number(value)));
	}, [value])

	return (
		<input
			className={className}
			style={{ backgroundSize: `${(Number(value) - min) * 100 / (max - min)}% 100%` }}
			ref={focus} 
			type={type}
			name={name}
			value={value}
			{...(type === 'range' && { min, max, step })}
			placeholder={placeholder}
			autoComplete={autoComplete ? 'on' : 'off'}
			onChange={onChange}
			onKeyDown={onKeyPress}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			readOnly={readOnly}
		/>
	);
}
