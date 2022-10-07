import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export default function Input({
	type,
	name,
	value,
	placeholder,
	onChange,
	isFocus,
}) {
	const input = useRef();

	useEffect(() => {
		if (isFocus) input.current.focus();
	}, [isFocus]);

	return (
		<input
			ref={input}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

Input.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isFocus: PropTypes.bool,
};

Input.defaultProps = {
	isFocus: false,
};
