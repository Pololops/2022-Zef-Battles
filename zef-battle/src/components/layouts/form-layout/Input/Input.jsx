import PropTypes from 'prop-types';

import './Input.scss';
import { useEffect, useState } from 'react';

import useAutoFocus from '../../../../hooks/useAutoFocusRef';

const levelClassName = (className, level) => {
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
	value,
	min,
	max,
	step,
	placeholder,
	autoComplete,
	onChange,
	onKeyPress,
	isFocus,
	readOnly,
}) {
	const [className, setClassName] = useState('input');
	let focus = useAutoFocus(isFocus);

	useEffect(() => {
		setClassName(levelClassName('input', parseInt(value)));
	}, [value])

	return (
		<input
			className={className}
			style={{ backgroundSize: `${(value - min) * 100 / (max - min)}% 100%` }}
			ref={focus}
			type={type}
			name={name}
			value={value}
			{...(type === 'range' && { min, max, step })}
			placeholder={placeholder}
			autoComplete={autoComplete ? 'on' : 'off'}
			onChange={onChange}
			onKeyPress={onKeyPress}
			readOnly={readOnly}
		/>
	);
}

Input.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	min: PropTypes.string,
	max: PropTypes.string,
	step: PropTypes.string,
	placeholder: PropTypes.string,
	autoComplete: PropTypes.bool,
	onChange: PropTypes.func,
	onKeyPress: PropTypes.func,
	isFocus: PropTypes.bool,
};

Input.defaultProps = {
	placeholder: '',
	value: '',
	min: '0',
	max: '100',
	step: '1',
	autoComplete: true,
	onChange: null,
	onKeyPress: null,
	isFocus: false,
};
