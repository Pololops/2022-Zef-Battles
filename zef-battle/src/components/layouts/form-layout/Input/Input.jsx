import PropTypes from 'prop-types';

import useAutoFocus from '../../../../hooks/useAutoFocusRef';

export default function Input({
	type,
	name,
	value,
	defaultValue,
	placeholder,
	autoComplete,
	onChange,
	isFocus,
	readOnly
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
			readOnly={readOnly}
		/>
	);
}

Input.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	defaultValue: PropTypes.string,
	placeholder: PropTypes.string,
	autoComplete: PropTypes.bool,
	onChange: PropTypes.func,
	isFocus: PropTypes.bool,
};

Input.defaultProps = {
	placeholder: '',
	value: '',
	defaultValue: '',
	autoComplete: true,
	onChange: null,
	isFocus: false,
};
