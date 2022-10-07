import PropTypes from 'prop-types';

import './Input.scss';

import useAutoFocus from '../../../../hooks/useAutoFocusRef';

export default function Input({
	type,
	name,
	value,
	placeholder,
	autoComplete,
	onChange,
	isFocus,
}) {
	const focus = useAutoFocus(isFocus);

	return (
		<input
			className="input"
			ref={focus}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			autoComplete={autoComplete ? 'on' : 'off'}
			onChange={onChange}
		/>
	);
}

Input.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	autoComplete: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	isFocus: PropTypes.bool,
};

Input.defaultProps = {
	autoComplete: true,
	isFocus: false,
};
